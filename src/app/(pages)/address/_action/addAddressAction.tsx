"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function addAddressAction(newAddress: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) {
  try {
    const token = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Add address error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
