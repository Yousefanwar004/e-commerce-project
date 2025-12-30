import { getUserToken } from "./getUserToken";

 export async function getId() {
      const token = await getUserToken()   
         
      const response = await fetch(`${process.env.API_URL}/auth/verifyToken`,
        
        {
          method:'GET',
          headers:{token:token}
        }
      )
      const {decoded} = await response.json()
      return decoded.id
      
 }
