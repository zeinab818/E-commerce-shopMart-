'use client'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { CartResponse } from "@/interface";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export const CartContext = createContext<{
    cartData: CartResponse | null;
    isLoading: boolean;
    setCartData: (value:CartResponse | null)=>void;
    setIsLoading:(value:boolean)=>void,
    getCart:()=> void,
    userId:string,
    }>({
    cartData: null,
    isLoading: true,
    setCartData: () => {},
    setIsLoading:()=>{},
    getCart(){ },
    userId:''


});

export default function CartContextProvider({children}:{children:ReactNode}) {
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userId]=useState<string>("")
    const session=useSession();
    const route =useRouter();

    async function getCart() {
        if(session.status=='authenticated'){
            const response = await fetch('http://localhost:3000/api/get-cart', {
        })
        const data : CartResponse = await response.json();
        setIsLoading(false)
        setCartData(data);
        if(cartData?.data.cartOwner){
            localStorage.setItem("userId",cartData?.data.cartOwner);
            
        }

        }
        else{
            route.push('/login')
        }

    }

    

    useEffect(() => {
    if (session.status === "authenticated") {
        getCart();
    } else if (session.status === "unauthenticated") {
        route.push("/login");
    }
    }, [session.status]);

    return (
        <CartContext.Provider value={{ cartData, isLoading, setCartData,setIsLoading,getCart ,userId}}>
            {children}
        </CartContext.Provider>
    )
}
