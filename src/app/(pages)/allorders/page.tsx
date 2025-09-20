/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AllordersAction } from "./_action/allordersAction";
import { colors } from "@/Helpers/colors";
import { Repeat1Icon, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

// ----- TypeScript Types -----
interface ProductInOrder {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface CartItem {
  id: string;
  product: ProductInOrder;
  count: number;
  price: number;
}

interface OrderI {
  id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  cartItems: CartItem[];
}

// ----------------------------

export default function AllOrders() {
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const session = useSession();
  const router = useRouter();
  type SortType = "newest" | "oldest" | "highest" | "lowest";


  // ----- Fetch Orders -----
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getUserOrders(userId: string) {
    if (session.status === "authenticated") {
      try {
        setIsLoading(true);
        setError(null);
        const data = await AllordersAction(userId);
        setOrders(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push("/login");
    }
  }

  // ----- useEffect -----
  useEffect(() => {
    if (userId && session.status === "authenticated") {
      getUserOrders(userId);
    } else if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [userId, session.status]);

  // ----- Sorting -----
  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "highest":
        return b.totalOrderPrice - a.totalOrderPrice;
      case "lowest":
        return a.totalOrderPrice - b.totalOrderPrice;
      default:
        return 0;
    }
  });

  // ----- Render -----
  return (
    <div className="p-6">
      <h1 className="animate__animated animate__rubberBand text-5xl font-extrabold py-12 relative text-center">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          My Orders
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

      {/* ----- Sorting Buttons ----- */}

<div className="mb-6 flex gap-3 justify-center">
  {["newest", "oldest", "highest", "lowest"].map((type) => (
    <button
      key={type}
      onClick={() => setSortBy(type as SortType)}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        sortBy === type ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ))}
</div>

      {/* ----- Loading State ----- */}
      {isLoading && (
        <p className="text-center text-lg font-medium mt-8">Loading orders...</p>
      )}

      {/* ----- Error State ----- */}
      {error && (
        <div style={{background:colors.secondary , color:colors.accentForeground}} className="flex flex-col items-center justify-center mt-8 space-y-4">
          <WifiOff className="w-12 h-12 text-gray-500" />
          <p className="text-red-600 font-bold text-xl">{error}</p>
          <Button
            onClick={() => userId && getUserOrders(userId)}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center gap-2 px-6 py-2 rounded-lg shadow-md transition"
          >
            <Repeat1Icon className="w-5 h-5" />
            Retry
          </Button>
        </div>
      )}

      {/* ----- Orders List ----- */}
      {!isLoading && !error && sortedOrders.length === 0 && (
        <p className="text-center mt-8 text-gray-500">No orders found.</p>
      )}

      {!isLoading && !error && sortedOrders.length > 0 && (
        <div className="space-y-8 mt-4" style={{background:colors.secondary , color:colors.accentForeground}}>
          {sortedOrders.map((order) => (
            <div key={order.id} className="border p-4 rounded-xl shadow-md bg-white">
              <h2 className="font-semibold text-lg mb-2">Order ID: {order.id}</h2>
              <p className="text-sm mb-2" style={{ color: colors.accentForeground }}>
                <b>Date:</b> {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
              <p className="mb-2" style={{ color: colors.accentForeground }}>
                <b>Total:</b> {order.totalOrderPrice} EGP
              </p>
              <p className="mb-4">
                <b>Payment:</b> {order.paymentMethodType}
              </p>

              <div style={{background:colors.secondary , color:colors.accentForeground}} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {order.cartItems.map((item) => (
                  <Link key={item.id} href={`/products/${item.product._id}`} passHref>
                    <div className="border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <p className="font-medium" style={{ color: colors.accentForeground }}>
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600" style={{ color: colors.cardForeground }}>
                        Qty: {item.count}
                      </p>
                      <p className="text-sm text-gray-800 font-semibold" style={{ color: colors.accentForeground }}>
                        {item.price} EGP
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
