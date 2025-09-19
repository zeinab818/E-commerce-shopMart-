
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { WishlistResponse } from "@/interface/wishlist";
import { NextResponse } from "next/server"

export async function GET() {
    const token=await getUserToken();
    
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method:'GET',
        headers:{
            token: token,
            "content-type":"application/json"
        }
        
    }
   
    
)
    const data: WishlistResponse = await response.json();
    return NextResponse.json(data)
    
}