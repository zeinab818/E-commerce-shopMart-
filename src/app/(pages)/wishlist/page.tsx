/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/format";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { WishlistContext } from "@/components/Context/WishlistContext/WishlistContext";
import { WishlistResponse } from "@/interface/wishlist";
import Loading from "@/app/loading";
import AddToCart from "@/components/AddToCart/AddToCart";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Wishlist() {
  const { wishlistData, isLoading, setWishlistData } = useContext(WishlistContext);
  const router = useRouter();
  const session=useSession();

  function backHome() {
    router.push("/");
  }


  async function getWishlist() {
    if(session.status=='authenticated'){
        try {
      const response = await fetch("http://localhost:3000/api/get-wishlist", {
        
      });
      const data: WishlistResponse = await response.json();
      setWishlistData(data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
    }
    else{
      router.push('/login')
    }
  
  }

  // 🟣 remove from wishlist
  async function removeFromWishlist(productId: string) {
    if(session.status=='authenticated'){
      try {
      await fetch(`http://localhost:3000/wishlist/${productId}`, {
      });

      // Update local state
      setWishlistData((prev: WishlistResponse) => ({
        ...prev,
        data: prev.data.filter((item) => item._id !== productId),
      }));
    } catch (err) {
      console.error("Failed to remove product", err);
    }
    }
    else{
      router.push('/login')
    }
  }


    useEffect(() => {
      if (session.status === "authenticated") {
          getWishlist();
      } else if (session.status === "unauthenticated") {
          router.push("/login");
      }
      }, [session.status]);

  if (isLoading) return <Loading />;

  if (!wishlistData?.data?.length) {
    return (
      <div className="container mx-auto py-20 text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
          <Heart className="w-8 h-8 text-pink-500 animate__animated animate__bounce" />
          The Wishlist is Empty
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
      <h1 className="animate__animated animate__rubberBand text-3xl font-extrabold relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Wishlist
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>
      <p className="text-muted-foreground mt-2">
        {wishlistData?.data?.length} items in your wishlist
      </p>

      {/* Cards grid like products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {wishlistData?.data?.map((product) => (
          <div
            key={product._id}
            className="group rounded-xl border bg-card shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <Link href={`/products/${product._id}`} className="relative block">
              <img
                src={product?.imageCover}
                alt={product?.title}
                width={300}
                height={200}
                className="w-full h-80 object-cover hover:opacity-90 transition"
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(product._id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
              >
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500 hover:text-gray-400 hover:fill-gray-400 transition" />
              </button>
            </Link>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-base line-clamp-2">
                <Link
                  href={`/products/${product._id}`}
                  className="hover:text-purple-600 transition truncate"
                >
                  {product?.title}
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm">{product?.brand?.name || ""}</p>
              <p className="text-muted-foreground text-sm">{product?.category?.name || ""}</p>

              <div className="mt-1 font-semibold text-lg text-purple-600 mb-3">
                {product?.price ? formatCurrency(product.price) : "No Price"}
              </div>

              <AddToCart productId={product._id} />

              <Link
                href={`/products/${product._id}`}
                className="mt-2 text-sm text-purple-600 hover:underline flex items-center justify-center"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
