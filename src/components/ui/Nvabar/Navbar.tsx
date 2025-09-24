"use client";
import React, { useContext, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  HeartIcon,
  Loader2,
  LocateIcon,
  ShoppingCartIcon,
  User2Icon,
} from "lucide-react";
import { CartContext } from "@/components/Context/CartContext";
import Logo from "@/components/logo/Logo";
import { WishlistContext } from "@/components/Context/WishlistContext/WishlistContext";
import { signOut, useSession } from "next-auth/react";
import { colors } from "@/Helpers/colors";

interface NavbarProps {
  mode: string;
  changeMood: () => void;
}

export default function Navbar({ mode, changeMood }: NavbarProps) {
  const { isLoading, cartData } = useContext(CartContext);
  const { isLoading: wishlistLoading, wishlistData } =
    useContext(WishlistContext);
  const [open, setOpen] = useState(false);
  const session = useSession();

  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <nav
      style={{ background: colors.secondary, color: colors.accentForeground }}
      className="bg-gradient-to-b from-purple-50 to-pink-50 text-gray-800 py-4 top-0 left-0 right-0 fixed w-full z-40"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-5">
          <h1>
            <Logo />
          </h1>

          {/* Desktop Menu */}
          <NavigationMenu className="md:flex hidden">
            <NavigationMenuList className="main-color ">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-2xl">
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-2xl">
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-2xl">
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Icons */}
          <div className="md:flex hidden main-color ">
            <DropdownMenu>
              <DropdownMenuTrigger
                style={{ background: colors.secondary }}
                className="outline-0 cursor-pointer"
              >
                <User2Icon
                  style={{ color: colors.accentForeground }}
                  className="w-6 h-6 hover:text-purple-600 transition-colors"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 shadow-lg rounded-lg style={{background:colors.secondary}}">
                {session.status === "authenticated" && (
                  <DropdownMenuLabel
                    style={{ color: colors.accentForeground }}
                    className="px-4 py-2 text-gray-700 font-semibold"
                  >
                    Hi {session.data?.user.name}
                  </DropdownMenuLabel>
                )}
                <DropdownMenuSeparator />

                {session.status === "authenticated" ? (
                  <>
                    <Link href="/profileUser">
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 cursor-pointer">
                        <User2Icon className="w-4 h-4 text-gray-500" />
                        Profile
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/address">
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 cursor-pointer">
                        <LocateIcon className="w-4 h-4 text-pink-500" />
                        My Address
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/allorders">
                      <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 cursor-pointer">
                        <ShoppingCartIcon className="w-4 h-4 text-purple-500" />
                        My Orders
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                        />
                      </svg>
                      LogOut
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem className="px-4 py-2 hover:bg-purple-50 cursor-pointer">
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem className="px-4 py-2 hover:bg-purple-50 cursor-pointer">
                        Register
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {session.status == "authenticated" && (
              <>
                <Link href={"/cart"}>
                  <div className="relative p-3 cursor-pointer">
                    <ShoppingCartIcon style={{ color: colors.accentForeground }} />
                    <Badge className="absolute top-0 end-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold shadow-md">
                      {isLoading ? (
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          style={{ color: colors.accentForeground }}
                        />
                      ) : (
                        cartData?.numOfCartItems ?? 0
                      )}
                    </Badge>
                  </div>
                </Link>

                <Link href={"/wishlist"}>
                  <div className="relative p-3 cursor-pointer">
                    <HeartIcon style={{ color: colors.accentForeground }} />
                    <Badge className="absolute top-0 end-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white text-xs font-bold shadow-md">
                      {wishlistLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : Array.isArray(wishlistData?.data) ? (
                        wishlistData.data.length
                      ) : (
                        0
                      )}
                    </Badge>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div onClick={toggleMenu} className="md:hidden cursor-pointer text-gray-800">
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ color: colors.accentForeground }}
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-purple-950"
                style={{ color: colors.accentForeground }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </div>

          {/* Mode Toggle */}
          <div className="cursor-pointer" onClick={changeMood}>
            {mode === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-8 h-8 stroke-purple-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-8 h-8 stroke-purple-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998Z"
                />
              </svg>
            )}
          </div>
        </div>
        {/* Mobile Menu Content */}
        {open && (
          <div
            style={{ background: colors.secondary }}
            className="md:hidden  mt-2 bg-gradient-to-b from-purple-50 to-pink-50 rounded-lg shadow p-4 space-y-4 animate__animated animate__fadeInDown"
          >
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              <Link href="/products" onClick={() => setOpen(false)} className="block px-2 py-2 rounded transition">
                Products
              </Link>
              <Link href="/categories" onClick={() => setOpen(false)} className="block px-2 py-2 rounded transition">
                Categories
              </Link>
              <Link href="/brands" onClick={() => setOpen(false)} className="block px-2 py-2 rounded transition">
                Brands
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex flex-col space-y-2 border-t border-gray-200 pt-2">
              <div className="flex items-center gap-2 px-2 py-2">
                <User2Icon className="w-5 h-5" />
                <span>
                  {session.status === "authenticated"
                    ? `Hi ${session.data?.user.name}`
                    : "Account"}
                </span>
              </div>
              {session.status === "authenticated" ? (
                <>
                  <Link href="/profileUser" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 rounded">
                    <User2Icon className="w-4 h-4 text-gray-500" /> Profile
                  </Link>
                  <Link href="/address" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 rounded">
                    <LocateIcon className="w-4 h-4 text-pink-500" /> My Address
                  </Link>
                  <Link href="/allorders" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 rounded">
                    <ShoppingCartIcon className="w-4 h-4 text-purple-500" /> My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 rounded"
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="px-4 py-2 rounded">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)} className="px-4 py-2 rounded">
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Cart & Wishlist */}
            {session.status === "authenticated" && (
              <div className="flex gap-4 mt-2 border-t border-gray-200 pt-2">
                <Link href="/cart" onClick={() => setOpen(false)} className="relative p-2">
                  <ShoppingCartIcon className="w-6 h-6" />
                  <Badge className="absolute top-0 right-0 h-5 w-5 text-xs bg-purple-500 text-white">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : cartData?.numOfCartItems ?? 0}
                  </Badge>
                </Link>
                <Link href="/wishlist" onClick={() => setOpen(false)} className="relative p-2">
                  <HeartIcon className="w-6 h-6" />
                  <Badge className="absolute top-0 right-0 h-5 w-5 text-xs bg-pink-500 text-white">
                    {wishlistLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : wishlistData?.data?.length ?? 0}
                  </Badge>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
