import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    try {
        const tokenAuth = (await cookies()).get('next-auth.session-token')?.value;
        if (!tokenAuth) return null;

        const decoded = await decode({
            token: tokenAuth,
            secret: process.env.NEXTAUTH_SECRET!
        });

        // لو مفيش token صالح أو انتهت صلاحيته
        if (!decoded?.token) return null;

        return decoded.token as string;
    } catch (err) {
        console.error("Error decoding token:", err);
        return null;
    }
}
