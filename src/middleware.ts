import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "./Helpers/getUserToken/getUserToken";

const protectedPages = ['/cart', '/wishlist', '/address', '/allorders'];
const authPages = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
    const token = await getUserToken();

    if (protectedPages.includes(req.nextUrl.pathname)) {
        if (token) {
        return NextResponse.next();
        } else {
        const redirectURL = new URL('/login', process.env.NEXT_URL);
        redirectURL.searchParams.set('callback-url',req.nextUrl.pathname)
        return NextResponse.redirect(redirectURL);
        }
    }

    if (authPages.includes(req.nextUrl.pathname)) {
        if (!token) {
        return NextResponse.next();
        } else {
        const redirectURL = new URL('/', process.env.NEXT_URL);
        return NextResponse.redirect(redirectURL);
        }
    }

    return NextResponse.next();
}
