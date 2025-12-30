import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken() {
       const myCookies = await cookies()
       const decodedToken=myCookies.get('next-auth.session-token')?.value ||myCookies.get('__Secure-next-auth.session-token')?.value
    //  const x=(await cookies()).get('next-auth.session-token')?.value; //bageb token         
     const accessToken= await decode({token:decodedToken,secret:process.env.AUTH_SECRET!})    // bafok tashfer cookies
     return accessToken?.token!
}