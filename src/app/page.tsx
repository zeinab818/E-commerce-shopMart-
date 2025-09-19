'use client';

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import ProductSlider from "@/components/carosusel/carousel";
import TrendingProducts from "@/components/Trending/TrendingProuducts";

import Img1 from '@/assets/1.webp';
import Img2 from '@/assets/Ecommerce web page-pana.png';
import Img3 from '@/assets/Online shopping-pana.png';
import Img4 from '@/assets/Retail markdown-pana.png';
import { colors } from "@/Helpers/colors";

export default function Home() {
  const images = [Img1, Img2, Img3, Img4];

  return (
    <div style={{ backgroundColor: colors. secondary, color: colors.foreground }} className="min-h-screen rounded-2xl text-foreground flex flex-col items-center px-8 py-12 gap-12 transition-colors duration-500">

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full items-center">
        {/* Left Content */}
        <main className="md:col-span-2 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 flex items-center gap-3 animate-fadeInDown">
            Welcome to ShopMart
            <ShoppingCartIcon className="w-12 h-12 text-purple-600 animate-bounce" />
          </h1>

          <p style={{ color: colors.foreground }} className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-xl animate-fadeInUp">
            Discover amazing products with the best prices and fast delivery.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fadeInUp">
            <Link
              href="/products"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 text-center"
            >
              Shop Now
            </Link>
            <Link
            style={{ backgroundColor: colors. secondary, color: colors.foreground }}
              href="/categories"
              className="px-8 py-3 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 border border-purple-200 dark:border-gray-600 text-center"
            >
              Browse Categories
            </Link>
          </div>
        </main>

        {/* Right Slider */}
        <div className="md:col-span-1 flex justify-center items-center">
          <div className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-fadeInUp bg-card dark:bg-gray-800 text-card-foreground dark:text-gray-100">
            <ProductSlider images={images} />
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="w-full max-w-7xl">
        <TrendingProducts />
      </div>

    </div>
  );
}
