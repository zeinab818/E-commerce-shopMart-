/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AllordersAction } from "./_action/allordersAction";
import { colors } from "@/Helpers/colors";
export default function AllOrders() {
  const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sortBy, setSortBy] = useState("newest"); // default sort
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const sesstion=useSession();
  const route=useRouter();
async function getUserOrders(userId:string) {
    if(sesstion.status=='authenticated'){
       try {
    const data = await AllordersAction(userId);
        console.log("USER ID:", userId);
        console.log("ORDERS API RESPONSE:", data);


    console.log("ORDERS:", data);

     setOrders(Array.isArray(data) ? data : data?.data || []);

  } catch (err) {
    console.error("Error fetching orders:", err);
    setOrders([]);
  }
    }
    else{
      route.push('/login')
    }
}


useEffect(() => {
  if (userId && sesstion.status === "authenticated") {
    getUserOrders(userId);
  } else if (sesstion.status === "unauthenticated") {
    route.push("/login");
  }
}, [userId, sesstion.status]);

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

  return (
    <div className="p-6">
      <h1 className="animate__animated animate__rubberBand text-5xl font-extrabold py-12 relative">
        <span className="relative inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-transparent bg-clip-text">
          My Orders
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></span>
        </span>
      </h1>

  
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setSortBy("newest")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "newest"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Newest
        </button>
        <button
          onClick={() => setSortBy("oldest")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "oldest"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Oldest
        </button>
        <button
          onClick={() => setSortBy("highest")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "highest"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Highest Price
        </button>
        <button
          onClick={() => setSortBy("lowest")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "lowest"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Lowest Price
        </button>
      </div>

      {sortedOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8" >
          {sortedOrders.map((order: any) => (
            <div
              style={{background:colors.secondary}}
              key={order._id}
              className="border p-4 rounded-xl shadow-md bg-white"
            >
              <h2 className="font-semibold text-lg mb-2">
                Order ID: {order._id}
              </h2>
              <p className="text-sm text-gray-500 mb-2" style={{color:colors.accentForeground}}>
                <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
              <p className="mb-2" style={{color:colors.accentForeground}}>
                <b>Total:</b> {order.totalOrderPrice} EGP
              </p>
              <p className="mb-4">
                <b>Payment:</b> {order.paymentMethodType}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {order.cartItems.map((item: any) => (
                  <Link key={item._id} href={`/products/${item.product._id}`}>
                    <div className="border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <p className="font-medium" style={{color:colors.accentForeground}}>{item.product.title}</p>
                      <p className="text-sm text-gray-600" style={{color:colors.cardForeground}}>
                        Qty: {item.count}
                      </p>
                      <p className="text-sm text-gray-800 font-semibold" style={{color:colors.accentForeground}}>
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
