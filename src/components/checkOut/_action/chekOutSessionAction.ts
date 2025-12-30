'use server'

import { getUserToken } from "@/app/Helper/getUserToken"



export async function chekOutSessionAction(cartId:string,shippingAddress:{}) {
          const token = await getUserToken()
        

     const resopnse= await fetch(`${process.env.API_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
          {
            method:'POST',
            body:JSON.stringify({shippingAddress}),
            headers:{
            token:token,
            'content-type':'application/json'
            }
             
          }
         )
           return await resopnse.json()

}
export async function chekOutSessionCashAction(cartId:string,shippingAddress:{}) {
          const token = await getUserToken()
        

     const resopnse= await fetch(`${process.env.API_URL}/orders/`+cartId,
          {
            method:'POST',
            body:JSON.stringify({shippingAddress}),
            headers:{
            token:token,
            'content-type':'application/json'
            }
             
          }
         )
           return await resopnse.json()

}