"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function checkoutAction(
  cartId: string,
  details: string,
  city: string,
  phone: string
) {
  try {
    const shippingAddress = { details, city, phone };
    const token=await getUserToken();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
      {
        method: "POST",
        headers: {
          token:  token+'', 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Checkout error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
