import { FailedLoginResponse, SuccessLoginResponse } from "@/interfaces/login"
import { AuthOptions } from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions:AuthOptions={
   providers:[                      // badelo el option ely hasht8al beh Ex  Credentials aw Email aw OAuth
            CredentialsProvider({
                name:'credentials',
                credentials:{
                    email:{},
                    password:{}
                },
                authorize: async (credentials)=>{                  //method ely request haytem 3an tare2ha    // lazet te return 3ashan keda metla3a error
                    const response= await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                        method:'POST',
                        body:JSON.stringify({
                            email:credentials?.email,
                            password:credentials?.password
                        }),
                        headers:{'content-type':'application/json'}
                        

                    })
                    const payload:SuccessLoginResponse|FailedLoginResponse =await response.json() // beysamoha payload badl data 
                    console.log(payload);
                    if ('token' in payload) {
                        return {    // object beyb2a 3aref eno haymel return lel user we lazem yeb2a leh id
                          id:payload.user.email,
                          user:payload.user,
                          token:payload.token
                    }
                    
                    }
                    else{
                        throw new Error(payload.message)
                    }

                },
            
              


            })
   ],
   callbacks:{     //beta5od el methods ba3d ma tesht8al
       jwt:({token,user})=>{      //mas2ola 3an tashfer   //token ely fe object dah  beta3 nextAuth
         //token==>token.nextAuth
         //user==>payload(user,token)
       if (user) {
          token.user=user.user                // token.user ==> keda 3malt proprty gowa el token deh be user
          token.token=user.token
       }
         return token      // keda ba2a ma3aya token metshfar token{tokn,user}                
       },
    session:({session,token})=>{                 //session deh ha5od menha el data el metshfra ely hasta5demha
         //session==> deh ely ha7ot feha data
         //token==> deh token bta3et nextAuth ely met5azen feha el tokens ely metshafra
         session.user=token.user
         

         return session
    }
   }, 
   pages:{
    signIn:'/login',
    error:'/login'
    
   },
   secret:process.env.NEXTAUTH_SECRET           
}