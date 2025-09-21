import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const x = (await cookies()).get("next-auth.session-token")?.value;

  const decoded = await decode({
    token:x,
    secret:process.env.NEXTAUTH_SECRET!,
  }) ;

  return decoded?.token
}
