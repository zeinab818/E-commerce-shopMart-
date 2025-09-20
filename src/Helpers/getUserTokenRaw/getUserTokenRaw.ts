// src/Helpers/getUserToken/getUserToken.ts
import { cookies } from "next/headers";

export async function getUserTokenRaw(): Promise<string | null> {
  try {
    const token = (await cookies()).get("next-auth.session-token")?.value || null;

    if (!token) {
      console.warn("No session token found in cookies");
      return null;
    }

    // ده الـ token الأصلي اللي هيتبعت للـ API
    return token;

  } catch (err) {
    console.error("Error getting raw token from cookies:", err);
    return null;
  }
}
