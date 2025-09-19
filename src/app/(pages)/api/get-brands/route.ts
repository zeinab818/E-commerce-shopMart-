// /app/api/get-brands/route.ts
import { NextResponse } from "next/server";
import { BrandI } from "@/interface/brand";

export async function GET() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      method: 'GET',
    });

    const { data: brands }: { data: BrandI[] } = await response.json();
    return NextResponse.json({ brands });
  } catch (err) {
    console.error("Failed to fetch brands:", err);
    return NextResponse.json({ brands: [] }, { status: 500 });
  }
}
