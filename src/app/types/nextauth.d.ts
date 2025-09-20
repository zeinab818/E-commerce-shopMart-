import { UserResponse } from "@/interface";


declare module "next-auth" {
  interface Session {
    user: UserResponse;
    token: string; 
  }

  interface User {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {

}

