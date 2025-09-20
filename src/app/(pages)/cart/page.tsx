/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/format";
import { CartContext } from "@/components/Context/CartContext";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

import { Loader2, ShoppingCartIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

import Checkout from "@/components/Checkout/Checkout";
import { removeCartItemAction } from "./_action/RemoveCart.action";
import { removeCartItemAllAction } from "./_action/RemoveCartAll.action copy";
import { updateCartItemAction } from "./_action/UpdateCart.action copy";
import { useSession } from "next-auth/react";
import { checkoutAction } from "@/components/Checkout/_action/checkoutAction";
import { colors } from "@/Helpers/colors";



export default function Cart() {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const session=useSession();
  const route=useRouter();

  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);

  const router = useRouter();
  function backHome() {
    router.push("/");
  }

  async function removeCartItem(productId: string) {
    if(session.status=='authenticated'){
        setRemoveId(productId);
 

    const data=await removeCartItemAction(productId)

    if (data.status === "success") {
      setCartData(data);
      toast.success("Removed from cart 🛒");
    }
    setRemoveId(null);
    }
    else{
      route.push('/login')
    }
  }

  async function clearCart() {
    setIsClearing(true);

    const data=await removeCartItemAllAction()

    if (data.message === "success") {
      setCartData(null);
      toast.success("Cart cleared successfully");
    }
    setIsClearing(false);
  }


  async function updateCartItemCount(productId: string, count: number) {
    if (count === 0) {
      return removeCartItem(productId);
    }

    setUpdateId(productId);
  
    const data=await updateCartItemAction(productId,count)

    if (data.status === "success") {
      setCartData(data);
      toast.success("Product quantity updated successfully");
    }
    setUpdateId(null);
  }


  async function checkoutSession(
    cartId: string,
    details: string,
    city: string,
    phone: string
  ) {




    const data = await checkoutAction(cartId, details, city, phone);
    console.log(data);
  }

  if (typeof cartData?.data?.products?.[0]?.product === "string") {
    getCart();
  }

  if (isLoading) return <Loading />;

  if (!cartData?.numOfCartItems) {
    return (
      <div className="container mx-auto py-20 text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
          <ShoppingCartIcon className="w-8 h-8 text-purple-600 animate__animated animate__bounce" />
          The Shopping Cart is Empty
        </h1>
        <p className="text-muted-foreground">You haven&apos;t added any items yet</p>
        <Button
          onClick={backHome}
          className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Title */}
      <h1 className="animate__animated animate__rubberBand text-3xl font-extrabold relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Shopping Cart
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>
      <p className="text-muted-foreground mt-2">
        {cartData?.numOfCartItems} items in your cart
      </p>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 animate__animated animate__fadeInLeft">
          {cartData?.data.products.map((product) => (
            <div
              key={product._id}
              className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
            >
              <img
                src={product.product.imageCover}
                alt={product.product.title}
                width={120}
                height={120}
                className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base">
                      {product.product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {product.product.brand?.name || ""}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {product.product.category?.name || ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-lg text-purple-600">
                      {formatCurrency(product.price)}
                    </div>
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between mt-3 ">
                  <div className="flex items-center gap-2">
                    <Button
                      className="cursor-pointer"
                      disabled={product.count == 1}
                      onClick={() =>
                        updateCartItemCount(product.product._id, product.count - 1)
                      }
                      size="sm"
                      variant="outline"
                      aria-label="decrease"
                    >
                      -
                    </Button>
                    <span className="px-2">
                      {updateId == product.product._id ? (
                        <Loader2 className="animate-spin size-3" />
                      ) : (
                        product.count
                      )}
                    </span>
                    <Button
                      className="cursor-pointer"
                      disabled={product.count == 20}
                      onClick={() =>
                        updateCartItemCount(product.product._id, product.count + 1)
                      }
                      size="sm"
                      variant="outline"
                      aria-label="increase"
                    >
                      +
                    </Button>
                  </div>
                  <button
                    disabled={removeId === product.product._id}
                    onClick={() => removeCartItem(product.product._id)}
                    className="cursor-pointer text-sm text-red-500 hover:underline flex items-center gap-1"
                  >
                    {removeId === product.product._id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin inline" />
                        Removing...
                      </>
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div style={{background:colors.secondary ,color:colors.accentForeground}} className="animate__animated animate__fadeInRight rounded-xl lg:sticky lg:top-40 border p-6 shadow-md bg-white space-y-4 h-fit">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(cartData?.data.totalCartPrice || 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cartData?.data.totalCartPrice || 0)}</span>
          </div>

          <div className="space-y-2 pt-4">
            <Checkout cartId={cartData.cartId}></Checkout>
            

            

            <Button onClick={backHome} variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </div>
          <Button
            onClick={clearCart}
            disabled={isClearing}
            className="mt-3 ms-auto flex cursor-pointer text-destructive hover:text-destructive"
            variant="outline"
          >
            {isClearing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin inline" /> Clearing...
              </>
            ) : (
              <>
                <Trash2 /> Clear Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
