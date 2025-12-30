
 // Server Acton==>dah bey5alny a3mel action 3la server badal client 3ashan api we token maybanosh fe network

'use server'

import { getUserToken } from "@/app/Helper/getUserToken"
     
export async function addToCartAction(productId:string) {
      const token = await getUserToken()   
       const response = await fetch(`${process.env.API_URL}/cart`,{
         method:'POST',
         body:JSON.stringify({productId}),
         headers:{
            token:token,
            'content-type':'application/json'
         }
           
        

      })
         const data = await response.json()

    return data
}
