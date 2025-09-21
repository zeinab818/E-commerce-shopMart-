import { cookies } from "next/headers";

export async function getUserToken() {
  const token = (await cookies()).get("next-auth.session-token")?.value;
  return token ;
}
