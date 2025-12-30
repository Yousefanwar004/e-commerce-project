'use server'
import { revalidatePath } from 'next/cache'

import { getUserToken } from "@/app/Helper/getUserToken"
     
export async function removeFromWishListAction(productId:string) {
      const token = await getUserToken()   
       const response = await fetch(`${process.env.API_URL}/wishlist/`+productId,{
         method:'DELETE',
         headers:{
            token:token,
         }
           
        

      })
         const data = await response.json()
  revalidatePath('/wishlist')

    return data
}
