import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken() {
       
     const x=(await cookies()).get('next-auth.session-token')?.value; //bageb token         
   const accessToken= await decode({token:x,secret:process.env.AUTH_SECRET!})    // bafok tashfer cookies
     return accessToken?.token!
}