'use server'

import { getUserToken } from "@/app/Helper/getUserToken"
     
export async function addToWishListAction(productId:string) {
      const token = await getUserToken()   
       const response = await fetch(`${process.env.API_URL}/wishlist`,{
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
