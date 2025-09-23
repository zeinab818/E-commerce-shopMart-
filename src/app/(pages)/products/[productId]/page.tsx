"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ProductI } from "@/interface/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RepeatIcon, StarIcon, WifiOff } from "lucide-react";
import Image from "next/image";
import ProductSlider from "@/components/carosusel/carousel";
import AddToCart from "@/components/AddToCart/AddToCart";
import Loading from "@/app/loading";
import { colors } from "@/Helpers/colors";

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params;

  const [product, setProduct] = useState<ProductI | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ useCallback عشان ESLint
  const fetchProductDetails = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/get-productID?productId=${productId}`,
        { cache: "no-store" }
      );

      if (!response.ok) throw new Error("Failed to fetch product details");

      const { data }: { data: ProductI } = await response.json();
      setProduct(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong 😢");
      }
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <WifiOff className="w-12 h-12 text-gray-500" />
        <p className="text-2xl font-bold text-red-600">{error}</p>
        <p className="text-gray-500 mt-2">
          Please check your internet connection and refresh the page.
        </p>
        <button
          onClick={fetchProductDetails}
          className="flex items-center justify-between gap-3 mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          <RepeatIcon className="w-5 h-5" /> Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-red-500 py-12 text-xl">
        Product not found.
      </p>
    );
  }

  return (
    <>
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4">
        {/* Product Image */}
        <div className="flex justify-center md:col-span-1">
          <ProductSlider images={product.images} altContent={product.title} />
        </div>

        {/* Product Info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <CardHeader>
            <CardDescription className="text-gray-500">
              {product.brand.name}
            </CardDescription>
            <CardTitle className="text-2xl font-bold">
              {product.title}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base">{product.category.name}</p>
          </CardContent>

          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.ratingsAverage)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <p className="pl-3">{product.ratingsAverage}</p>
              </div>
              <p className="pl-3">{product.ratingsQuantity} reviews</p>
            </div>

            <div className="flex items-center justify-between pt-3">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {product.price} EGP
              </p>
              <p className="pl-3">{product.quantity} in stock</p>
            </div>
          </CardContent>

          <div className="grid items-center w-[60%]">
            <AddToCart productId={product.id} />
          </div>
        </div>
      </Card>

      {/* Product Images Carousel */}
      <div className="py-20">
        <Carousel opts={{ loop: true }}>
          <CarouselContent className="gap-2 flex justify-center items-center">
            {product.images.map((img, index) => (
              <CarouselItem
                key={index}
                className="basis-auto"
                style={{ background: colors.secondary, color: colors.accent }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      className="rounded-xl shadow-md w-[300px] h-[300px] object-cover cursor-pointer"
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      width={300}
                      height={300}
                    />
                  </DialogTrigger>

                  <DialogContent
                    style={{ background: colors.secondary, color: colors.accent }}
                    className="max-w-3xl p-6 flex flex-col items-center"
                  >
                    <Carousel
                      opts={{ loop: true }}
                      setApi={(api) => {
                        api?.on("select", () => {
                          const currentIndex = api?.selectedScrollSnap() ?? 0;
                          const counter = document.getElementById("img-counter");
                          if (counter) {
                            counter.innerText = `${currentIndex + 1} / ${product.images.length}`;
                          }
                        });
                      }}
                    >
                      {/* Counter */}
                      <p id="img-counter" className="mb-4 text-sm text-gray-300">
                        1 / {product.images.length}
                      </p>

                      <CarouselContent className="flex items-center">
                        {product.images.map((modalImg, modalIndex) => (
                          <CarouselItem key={modalIndex} className="flex justify-center">
                            <Image
                              className="rounded-xl max-h-[70vh] w-auto object-contain"
                              src={modalImg}
                              alt={`${product.title} - ${modalIndex + 1}`}
                              width={700}
                              height={700}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
