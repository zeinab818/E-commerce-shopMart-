/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/format";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { WishlistContext } from "@/components/Context/WishlistContext/WishlistContext";
import Loading from "@/app/loading";
import AddToCart from "@/components/AddToCart/AddToCart";
import Link from "next/link";

export default function Wishlist() {
  const { wishlistData, isLoading } = useContext(WishlistContext);
  const router = useRouter();

  function backHome() {
    router.push("/");
  }

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
      <h1 className="px-5 animate__animated animate__rubberBand text-3xl font-extrabold relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Wishlist
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>
      <p className="px-5 text-muted-foreground mt-2">
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

              {/* زرار Add to Cart فقط */}
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
