
"use server"
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { CartResponse } from "@/interface";

export async function checkoutActionAction(cartId: string, ) {
    const token=await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: {
          token:token+'',
          "content-type": "application/json",
        },
      }
    );

      const data: CartResponse = await response.json();
    return data;
}