import { UserResponse } from "@/interfaces/login"
import NextAuth from "next-auth"

declare module "next-auth" {  // declare ==> deh eny fe 7aga mawgoda zay next-auth 3ayez a3adel 
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {   // hadeh shakel el data ely ha7tafez beha we hashfarha 
         user:UserResponse
         

  }
  interface User{         // hena bashfar el data
      user:UserResponse,
      token:string
  } 
}
import { JWT } from "next-auth/jwt"


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT  {
        user:UserResponse,
      token:string
  }

}