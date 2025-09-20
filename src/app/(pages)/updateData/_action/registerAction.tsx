"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function updateDataAction(UpdateAccount: {
  name: string;
  email: string;
  phone:string;
}) {
  try {
    const token=await getUserToken()
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      {
        method: "PUT",
        headers: {
          token:token+'',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateAccount),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
