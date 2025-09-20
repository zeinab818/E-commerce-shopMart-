import { FaildLoginResponse, SuccessLoginResponse, UserResponse } from "@/interface"
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:AuthOptions={
    providers:[
        CredentialsProvider({

            name: 'credentials',
            credentials:{
                email:{},
                password:{}

            },
            authorize:async (credentials)=>{
                const respone= await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                    method:'POST',
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password,
                    }),
                    headers:{"content-type":"application/json"}
                })
                const payload:SuccessLoginResponse|FaildLoginResponse=await respone.json();
                console.log("payload from API:", payload);
                if('token' in payload){
                    return {
                        id:payload.user.email,
                        user:payload.user,
                        token:payload.token,
                    
                    } ;
                }else{
                    throw new Error(payload.message)
                }
            }
        })

    ],
    callbacks:{
        jwt:({token,user})=>{
            if(user){
                token.user=user.user;
                token.token=user.token;
                
            }
            return token;
        },
        session:({session,token})=>{
            session.user=token.user  as UserResponse;
            session.token = token.token as string;
            return session;
        },

    }, 

    pages:{
        signIn:'/login',
        error:'/login'
    },
    secret:process.env.NEXTAUTH_SECRET


}