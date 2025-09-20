"use client";

import { ProductI } from '@/interface/products';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { Repeat1Icon, StarIcon, WifiOff } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { Button } from "@/components/ui/button";
import Loading from '@/app/loading';

export default function Products() {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/get-products', {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load products. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Title */}
      <h1 className="text-center animate__animated animate__rubberBand text-5xl font-extrabold py-12 relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Products
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

      {/* Loading */}
      {loading && (
        <Loading></Loading>
      )}

      {/* Error Handling */}
      {error && (
          <div className="col-span-full flex flex-col items-center justify-center min-h-screen text-center space-y-4">
              <WifiOff className="w-12 h-12 text-gray-500" />
              <p className="text-2xl font-bold text-red-600">{error}</p>
                <p className="text-gray-500 mt-2">
                  Please check your internet connection and try again.
                </p>
          {/* Retry Button */}
          <Button
            onClick={fetchProducts}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center gap-2 px-6 py-2 rounded-lg shadow-md transition"
          >
            <Repeat1Icon className="w-5 h-5" />
            <span>Retry</span>
          </Button>
            </div>

      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate__animated animate__backInUp">
        {products.map((product) => (
          <Card
            key={product.id}
            className="w-full rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-60 object-cover transition-all duration-500 hover:scale-105"
              />
              <CardHeader className="pt-4">
                <CardTitle className="truncate">{product.title}</CardTitle>
                <p className="text-sm text-gray-500">{product.brand.name}</p>
                <CardDescription>{product.category.name}</CardDescription>
              </CardHeader>
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
                  </div>
                  <p>{product.ratingsAverage}</p>
                </div>
                <p className="pt-2 text-lg font-semibold text-blue-800">
                  {product.price}{" "}
                  <span className="text-sm text-gray-500">EGP</span>
                </p>
              </CardContent>
            </Link>
            <AddToCart productId={product.id} />
          </Card>
        ))}
      </div>
    </>
  );
}
