import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

const protectedPages = ['/cart', '/wishlist', '/address', '/allorders'];
const authPages = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const token = await getToken({req})

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
    if (!token ) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(redirectURL);
    }
  }

  return NextResponse.next();
}
