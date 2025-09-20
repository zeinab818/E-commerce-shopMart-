"use server";

import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { cookies } from "next/headers";

export async function changePasswordAction(changePassword: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  try {
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          token: token+'',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changePassword),
      }
    );

    const data = await response.json();
    if (data.message === "success") {
      (await cookies()).delete("next-auth.session-token");
    }

    return data;
  } catch (error) {
    console.error("Change password error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
