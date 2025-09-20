import { cookies } from "next/headers";

export async function getUserToken() {
  const token = (await cookies()).get("token")?.value;
  return token || null;
}
