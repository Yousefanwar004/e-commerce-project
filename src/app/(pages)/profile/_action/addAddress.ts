'use server'

import { getUserToken } from "@/app/Helper/getUserToken"



export async function addAddressAction(name:string,details:string,phone:string,city:string) {
          const token = await getUserToken()
        

     const resopnse= await fetch(`${process.env.API_URL}/addresses`,
          {
            method:'POST',
            body:JSON.stringify({
                  name:name,
                  details:details,
                  phone:phone,
                  city:city

            }),
            headers:{
            token:token,
            'content-type':'application/json'
            }
             
          }
         )
           return await resopnse.json()

}

  export  async function getAllAddress() {
                  const token = await getUserToken()

      const response = await fetch(`${process.env.API_URL}/addresses`,{
         method:'GET',
         headers:{
            token:token
         }
         
      })
            const data = await response.json() 
            // console.log(data);
            
       return data
}
