import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
 
    const { productId } = await req.json();
    console.log("Product ID received:", productId);
    const token=await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token+'',
      },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();
    return NextResponse.json(data)


   

}
