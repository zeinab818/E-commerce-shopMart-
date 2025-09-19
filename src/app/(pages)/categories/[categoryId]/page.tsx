"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { CategoryI } from "@/interface/category";
import { ProductI } from "@/interface/products";
import Link from "next/link";
import { RepeatIcon, StarIcon, WifiOff } from "lucide-react";
import AddToCart from "@/components/AddToCart/AddToCart";
import Loading from "@/app/loading";

export default function CategoryDetails({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;

  const [category, setCategory] = useState<CategoryI | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCategoryAndProducts() {
    try {
      setLoading(true);
      setError(null);

      const [categoryRes, productsRes] = await Promise.all([
        fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
          cache: "no-store",
        }),
        fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
          cache: "no-store",
        }),
      ]);

      if (!categoryRes.ok || !productsRes.ok) {
        throw new Error("Failed to fetch category or products");
      }

      const { data: categoryData }: { data: CategoryI } = await categoryRes.json();
      const { data: productsData }: { data: ProductI[] } = await productsRes.json();

      setCategory(categoryData);
      setProducts(productsData);
    } catch (err) {
      setError("Failed to load category or products 😢");
      setCategory(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center min-h-screen">
        <WifiOff className="w-12 h-12 text-gray-500" />
        <p className="text-2xl font-bold text-red-600">{error}</p>
        <p className="text-gray-500 mt-2">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={fetchCategoryAndProducts}
          className="mt-6 px-6 flex justify-between items-center gap-2  py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          <RepeatIcon className="w-5 h-5"></RepeatIcon>Retry 
        </button>
      </div>
    );
  }

  if (!category) {
    return (
      <p className="text-center text-red-500 py-12 text-xl">
        No category found.
      </p>
    );
  }

  return (
    <div className="py-12">
      {/* Products Title with gradient */}
      <h1 className="text-center animate__animated animate__pulse animate__infinite text-5xl font-extrabold py-12 relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Products in {category.name}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate__animated animate__fadeInUp">
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No products available for this category.
          </p>
        )}
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
    </div>
  );
}
