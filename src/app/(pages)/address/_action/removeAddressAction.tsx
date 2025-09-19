"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function removeAddressAction(id: string) {
  try {
    const token = await getUserToken();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Remove address error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
