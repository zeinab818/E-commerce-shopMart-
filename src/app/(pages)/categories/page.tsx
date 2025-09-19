"use client"; // عشان الزرار يشتغل لازم يكون Client Component
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CategoryI } from "@/interface/category";
import Loading from "@/app/loading";
import { RepeatIcon, WifiOff } from "lucide-react";
import { colors } from "@/Helpers/colors";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryI[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3000/api/get-categories", {
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Failed to fetch categories");

      const { data }: { data: CategoryI[] } = await response.json();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories 😢");
      setCategories(null);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchCategories();
  }, []);

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
          onClick={fetchCategories}
          className="flex items-center justify-between gap-3 mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          <RepeatIcon className="w-5 h-5"></RepeatIcon>Retry 
        </button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <p className="text-center text-red-500 py-12 text-xl">
        No categories found.
      </p>
    );
  }

  return (
    <>
      {/* Title */}
      <h1 className="text-center animate__animated animate__rubberBand text-5xl font-extrabold py-12 relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Categories
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

      {/* Categories Grid */}
      <div className="animate__animated animate__backInUp grid gap-6 
                      grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {categories.map((Category) => (
          <Link key={Category._id} href={`/categories/${Category._id}`}>
            <Card className="group rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={Category.image}
                  alt={Category.name}
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <CardContent className="p-4 flex justify-center items-center">
                <p style={{ color: colors.accentForeground }} className="text-center text-lg font-semibold tracking-wide capitalize text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                  {Category.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
