"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function AddressAction() {
  try {
    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      method: "GET",
      headers: {
        token:token+'',
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Checkout error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
