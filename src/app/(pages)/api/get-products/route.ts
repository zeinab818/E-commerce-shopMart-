import { NextResponse } from "next/server";
import { ProductI } from "@/interface";

export async function GET() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
      method: 'GET',
  
    });

    const { data: products }: { data: ProductI[] } = await response.json();
    return NextResponse.json({ products });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
