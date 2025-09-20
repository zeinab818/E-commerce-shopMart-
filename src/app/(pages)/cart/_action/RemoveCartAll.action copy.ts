
"use server"
import { CartResponse } from "@/interface";
import { getUserToken } from '@/Helpers/getUserToken/getUserToken';

export async function removeCartItemAllAction() {
  const token=await getUserToken();
   const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: {
        token:token+'',
      },
    });
    const data: CartResponse = await response.json();
    return data;
}