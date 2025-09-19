import { ProductI } from "@/interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`, {
    method: "GET",
  });

  const { data }: { data: ProductI } = await response.json();
  return NextResponse.json({ data });
}
