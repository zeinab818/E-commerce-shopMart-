"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import { WishlistResponse } from "@/interface/wishlist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const WishlistContext = createContext<{
  wishlistData: WishlistResponse | null;
  isLoading: boolean;
  setWishlistData: (value: WishlistResponse | null) => void;
  setIsLoading: (value: boolean) => void;
  getWishlist: () => void;
}>({
  wishlistData: null,
  isLoading: true,
  setWishlistData: () => {},
  setIsLoading: () => {},
  getWishlist() {},
});

export default function WishlistContextProvider({children,}: {children: ReactNode;}) {
  const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const session=useSession();
  const route=useRouter();


  async function getWishlist() {
    if(session.status=='authenticated'){
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/get-wishlist",
      );
      const data: WishlistResponse = await response.json();
      setWishlistData(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setIsLoading(false);
    }
    }
    else{
      route.push('./login')
    }
  }

    useEffect(() => {
      if (session.status === "authenticated") {
          getWishlist();
      } else if (session.status === "unauthenticated") {
          route.push("/login");
      }
      }, [session.status]);
  

  return (
    <WishlistContext.Provider
      value={{ wishlistData, isLoading, setWishlistData, setIsLoading, getWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
