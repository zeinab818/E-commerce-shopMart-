"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { BrandI } from "@/interface/brand";
import { ProductI } from "@/interface/products";
import Link from "next/link";
import { StarIcon, WifiOff, RepeatIcon } from "lucide-react";
import AddToCart from "@/components/AddToCart/AddToCart";
import Loading from "@/app/loading";
import { colors } from "@/Helpers/colors";

export default function BrandDetails({ params }: { params: { brandId: string } }) {
  const { brandId } = params;

  const [brand, setBrand] = useState<BrandI | null>(null);
  const [products, setProducts] = useState<ProductI[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchBrandDetails() {
    try {
      setLoading(true);
      setError(null);

      // Fetch brand info
      const brandRes = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
        { cache: "no-store" }
      );
      if (!brandRes.ok) throw new Error("Failed to fetch brand info");
      const { data: brandData }: { data: BrandI } = await brandRes.json();
      setBrand(brandData);

      // Fetch products by brand
      const productsRes = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
        { cache: "no-store" }
      );
      if (!productsRes.ok) throw new Error("Failed to fetch products");
      const { data: productsData }: { data: ProductI[] } = await productsRes.json();
      setProducts(productsData);
    } catch (err: any) {
      setError(err.message || "Something went wrong 😢");
      setBrand(null);
      setProducts(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBrandDetails();
  }, [brandId]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
        <WifiOff className="w-12 h-12 text-gray-500" />
        <p className="text-2xl font-bold text-red-600">{error}</p>
        <p className="text-gray-500 mt-2">Please check your internet connection and try again.</p>
        <button
          onClick={fetchBrandDetails}
          className="flex items-center justify-between gap-3 mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          <RepeatIcon className="w-5 h-5" /> Retry
        </button>
      </div>
    );
  }

  if (!brand || !products) {
    return (
      <p className="text-center text-red-500 py-12 text-xl">Brand or products not found.</p>
    );
  }

  return (
    <div className="py-12 px-4 md:px-12">
      {/* Products Title */}
      <h1 className="text-center text-4xl font-extrabold mb-12 animate__animated animate__fadeInUp">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Products of {brand.name}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500 animate__animated animate__fadeIn">
            No products available for this brand.
          </p>
        )}

        {products.map((product, idx) => (
          <Card
          key={product.id}
          className="w-full rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate__animated animate__fadeInUp bg-[var(--card)] text-[var(--card-foreground)] ]"
          style={{ backgroundColor: colors.secondary}}
        >

            <Link href={`/products/${product.id}`}>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-60 object-cover transition-all duration-500 hover:scale-110"
              />
              <CardHeader className="pt-4">
                <CardTitle
                  className="truncate text-lg font-semibold group-hover:text-purple-600 transition-colors"
                  style={{ color: colors.accentForeground }}
                >
                  {product.title}
                </CardTitle>

                <p className="text-sm text-gray-500">{product.brand.name}</p>
                <CardDescription className="text-gray-400">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(product.ratingsAverage)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{product.ratingsAverage}</p>
                </div>
                <p className="pt-2 text-lg font-bold text-blue-700">
                  {product.price}{" "}
                  <span className="text-sm text-gray-500 font-normal">EGP</span>
                </p>
              </CardContent>
            </Link>
            <div className="p-4">
              <AddToCart productId={product.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
