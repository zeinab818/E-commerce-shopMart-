
"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon, Loader2, ShoppingCartIcon} from "lucide-react";
import { toast } from "sonner";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext/WishlistContext";
import { removewishlistItemAction } from "./_action/RemoveWishlistItemAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductI } from "@/interface";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoadingCart] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

  const { wishlistData, setWishlistData, getWishlist } =
    useContext(WishlistContext);
  const {  setCartData } = useContext(CartContext);
  const session=useSession();
  const route=useRouter();

  const isInWishlist = wishlistData?.data?.some(
    (item: ProductI) => item._id === productId
  );

  async function addToCart(productId: string) {
    if(session.status=='authenticated'){
            try {
        const response = await fetch("/api/add-to-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (data.status === "success") {
          toast.success("Added to cart 🛒");
          setCartData(data); 

        } else {
          toast.error(data.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to add to cart");
      }
    }
    else{
      route.push('/login')
    }
}
  async function addToWishlist(productId: string) {
 
      if(session.status=='authenticated'){
        try{
              const response = await fetch("/api/add-to-wishlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId }),
  
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("Added to wishlist ❤️");
      await getWishlist();
    } else {
      toast.error(data.message || "Something went wrong");
    }
        }  catch (err) {
        console.error(err);
        toast.error("Failed to add to whishlist");
      }
      finally{
        setIsLoadingWishlist(false)
      }
    }
    else{
      route.push('/login')
    }
    
  }
  async function toggleWishlist() {
    setIsLoadingWishlist(true);
    try {
      if (isInWishlist) {
        await removeWishlistItem(productId);
      } else {
        await addToWishlist(productId);
      }
      await getWishlist();
    } finally {
      setIsLoadingWishlist(false);
    }
  }
  async function removeWishlistItem(productId: string) {
  
    if(session.status=='authenticated'){
        const data = await removewishlistItemAction(productId)

    if (data.status === "success") {
      toast.success("Removed from wishlist 🤍");
    } else {
      toast.error("Failed to remove item from wishlist");
    }
    }
    else{
      route.push('/login')
    }
  }

  return (
    <CardFooter className="gap-5">

     <Button
        onClick={() => addToCart(productId)}  // 
        disabled={isLoadingCart}
        className={`w-[80%] text-xl cursor-pointer flex gap-2 items-center justify-center text-white py-2 rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500`}
      >
        {isLoadingCart ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <ShoppingCartIcon className="w-5 h-5" />
        )}
        <span>{"Add to Cart"}</span>
      </Button>

      <button
        onClick={toggleWishlist}
        disabled={isLoadingWishlist}
        className="transition-all duration-300 hover:scale-105"
      >
        {isLoadingWishlist ? (
          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
        ) : (
          <HeartIcon
            className={`w-8 h-7 cursor-pointer ${
              isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        )}
      </button>
    </CardFooter>
  );
}
