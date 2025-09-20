"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BrandI } from "@/interface/brand";
import Loading from "@/app/loading";
import { RepeatIcon, WifiOff } from "lucide-react";
import { colors } from "@/Helpers/colors";

export default function Brands() {
  const [brands, setBrands] = useState<BrandI[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchBrands() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/get-brands", {
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Failed to fetch brands");

      const { brands }: { brands: BrandI[] } = await response.json();
      setBrands(brands);
    
    } catch (err) {
      setError("Failed to load brands 😢");
      setBrands(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center min-h-screen">
        <WifiOff className="w-12 h-12 text-gray-500" />
        <p className="text-2xl font-bold text-red-600">{error}</p>
        <p className="text-gray-500 mt-2">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={fetchBrands}
          className="flex items-center justify-between gap-3 mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90 transition"
        >
          <RepeatIcon className="w-5 h-5" /> Retry
        </button>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <p className="text-center text-red-500 py-12 text-xl">
        No brands found.
      </p>
    );
  }

  return (
    <>
      {/* Title */}
      <h1 className="text-center animate__animated animate__rubberBand text-5xl font-extrabold py-12 relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          Brands
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

      {/* Brands Grid */}
      <div className="animate__animated animate__backInUp grid py-5 gap-6 
                      grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <Card className="group flex flex-col items-center justify-center p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
              {/* Brand Logo */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain rounded-full border p-2 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Brand Name */}
              <CardContent className="pt-4 text-center">
                <p style={{ color: colors.accentForeground }} className="text-lg font-semibold tracking-wide text-gray-700 group-hover:text-amber-600 transition-colors duration-300">
                  {brand.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
