import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart', '/wishlist', '/address', '/allorders'];
const authPages = ['/login', '/register'];

export default function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL("/login", req.nextUrl.origin);
      redirectURL.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(redirectURL);
    }
  }

  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(redirectURL);
    }
  }

  return NextResponse.next();
}
