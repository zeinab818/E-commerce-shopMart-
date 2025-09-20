import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getUserToken();

  if (!token) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token:token+''
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
