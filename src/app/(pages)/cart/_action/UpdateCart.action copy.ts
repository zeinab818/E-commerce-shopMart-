
"use server"
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { CartResponse } from "@/interface";

export async function updateCartItemAction(productId: string, count: number) {
    const token=await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token:token+'',
          "content-type": "application/json",
        },
      }
    );

      const data: CartResponse = await response.json();
    return data;
}