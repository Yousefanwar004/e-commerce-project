
// Route Handler ==> bet5alny a3mel ana api men 3andy 3ashan a3mel protect lel api el asly 3ashan maytsre2sh

import { getUserToken } from "@/app/Helper/getUserToken"
import { CartResponse } from "@/interfaces/cart"
import { NextResponse } from "next/server"

export async function GET() {
              const token = await getUserToken()   
        
       const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
    
                    token:token
                }
    
             
            })
        const data:CartResponse = await response.json()

        return NextResponse.json(data)


}