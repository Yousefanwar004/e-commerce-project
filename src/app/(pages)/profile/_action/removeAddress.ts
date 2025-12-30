'use server'

import { getUserToken } from "@/app/Helper/getUserToken"



export async function deleteAddressAction(addressId:string) {
          const token = await getUserToken()
        

     const resopnse= await fetch(`${process.env.API_URL}/addresses/${addressId}`,
          {
            method:'DELETE',
            headers:{
            token:token,
            }
             
          }
         )
           return await resopnse.json()

}
