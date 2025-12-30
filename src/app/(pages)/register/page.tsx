"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import {signIn} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { RegisterFaild, RegisterSuccess } from '@/interfaces/register'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
       name:z.string().nonempty('Name Is Required'),
       email:z.email('Invalid Email').nonempty('Email Is Required').regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,'Invaild Email enter correct email'),
       password:z.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,'Passwowrd must include 8 num and char upercase'),
       rePassword:z.string().nonempty('rePassword is Required'),
       phone:z.string().nonempty('Phone is Required').regex(/^(010|011|012|015)\d{8}$/,'Enter Correct phone ')
}).refine((data)=>data.password===data.rePassword,{path:['rePassword'],message:'password and rePassword must be same'})
type FormField=z.infer<typeof formSchema>



export default function Register() {
       const [message, setMessage] = useState<string|boolean>(false)
     const [isLoading, setIsLoading] = useState(false)

      const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password:"",
      rePassword:"",
      phone:""

    },
     mode:"onTouched"

  })
        const router = useRouter()

      async  function onSubmit(values:FormField ) {
        setIsLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
         const response= await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
                method:'POST',
                body:JSON.stringify({
                    name:values.name ,
                    email:values.email,
                    password:values.password,
                    rePassword:values.rePassword,
                    phone:values.phone
                }),
                 headers: {
                      "content-Type":"application/json",
                         }


                })
          const data:RegisterSuccess|RegisterFaild = await response.json()
          if (data.message=='Account Already Exists') {
            setMessage(data.message)

          }else{
                router.push('/login')
          }
          
     setIsLoading(false)
  }






  return <>
               <div className='flex flex-col justify-center items-center min-h-[60vh]'>
          <h1 className='my-3 text-2xl'>Login Now</h1>

          <Card className='p-5 w-sm'>
            
              <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ahmed" {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='ali@example'  {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}


          
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}


          
        />
                <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}


          
        />
                <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}


          
        />
        
        
        <Button  disabled={isLoading} type="submit" className='w-full cursor-pointer'>{isLoading?<Loader className='animate-spin'/>:'SignUp'}</Button>
                         {message=='Account Already Exists' &&<p className='text-center text-red-500'>Account Already Exists</p>}

      </form>
             </Form>
                <p className='text-center'>Dose have account?, please <Link href={'/login'} className='underline text-blue-500 hover:text-blue-600'>SignIn</Link></p>
                  
            </Card>            


       </div>
  
  </>
}
