"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { AddressData } from "@/interface/address";

export async function addAddressAction(addressData: AddressData) {
  const token = await getUserToken();
  if (!token) return { status: "error", message: "User not authenticated" };

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "POST",
    headers: {
      token:token+'',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressData),
  });

  return response.json();
}
