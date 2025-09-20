"use client";
import React, { useEffect, useState } from "react";
import { ProductI } from "@/interface/products";

    import {
    Carousel,
    CarouselContent,
    CarouselItem,
    } from "@/components/ui/carousel";
    import Image from "next/image";
    import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
    import Link from "next/link";
import Loading from "@/app/loading";

    export default function TrendingProducts() {
    const [products, setProducts] = useState<ProductI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const { data } = await res.json();
        const topTrending = data.sort((a: { sold: number; }, b: { sold: number; }) => b.sold - a.sold).slice(0, 20);
        setProducts(topTrending);
        setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) return <>
            <p className="text-center py-12 text-purple-600 font-semibold">Loading trending products...</p>
            <Loading></Loading>;
    </>

    return (
        <div className="py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-8 animate-fadeInUp">
            🔥 Trending Products
        </h2>

        <Carousel opts={{ loop: true }}>
            <CarouselContent className="gap-6 flex justify-start items-start">
            {products.map((product, prodIndex) =>
                product.images.map((img, imgIndex) => (
                <CarouselItem key={`${prodIndex}-${imgIndex}`} className="basis-auto flex flex-col items-center gap-2">
                    <Dialog>
                    <DialogTrigger asChild>
                        <Image
                        className="rounded-2xl shadow-lg w-[250px] h-[250px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                        src={img}
                        alt={`${product.title} - ${imgIndex + 1}`}
                        width={250}
                        height={250}
                        />
                    </DialogTrigger>

                 
                    <DialogContent className="max-w-md p-4 flex flex-col items-center gap-4">
                        <Image
                        className="w-[300px] h-[300px] rounded-xl object-contain"
                        src={img}
                        alt={`${product.title} - ${imgIndex + 1}`}
                        width={300}
                        height={300}
                        />
                        <p className="font-semibold text-purple-600 text-center">{product.title}</p>
                        <p className="text-lg font-bold text-pink-500">{product.price} EGP</p>
                        <Link
                        href={`/products/${product.id}`}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors"
                        >
                        View Details
                        </Link>
                    </DialogContent>
                    </Dialog>

                    {/* اسم المنتج والسعر تحت الصورة في Carousel */}
                    <div className="text-center mt-2">
                    <p className="font-semibold text-purple-600 truncate max-w-[250px]">{product.title}</p>
                    <p className="text-lg font-bold text-pink-500">{product.price} EGP</p>
                    </div>
                </CarouselItem>
                ))
            )}
            </CarouselContent>
        </Carousel>
        </div>
    );
    }
