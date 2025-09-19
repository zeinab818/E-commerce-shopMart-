"use client";
import { ShoppingCartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "animate.css";

export default function Logo() {
  const [animation, setAnimation] = useState("animate__zoomInLeft");

  useEffect(() => {
    const runAnimation = () => {
      setAnimation("animate__zoomInLeft");
      setTimeout(() => setAnimation("animate__rotateIn"), 700);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href="/"
      className="flex items-center main-color gap-1 text-2xl font-bold"
    >
      Sh
      <span
        className={`flex animate__animated ${animation} items-center justify-center w-8 h-8 bg-purple-600 text-gray-200 rounded-2xl`}
      >
        <ShoppingCartIcon className="w-5 h-5" />
      </span>
      pMart
    </Link>
  );
}
