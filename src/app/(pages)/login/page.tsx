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
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'

const formSchema = z.object({
       email:z.email('Invalid Email').nonempty('Email Is Required'),
       password:z.string().nonempty('Password is Required').min(6,'min length is 6 chars')
})

type FormField=z.infer<typeof formSchema>


export default function Login() {
     const [isLoading, setIsLoading] = useState(false)
    let searchParams = useSearchParams()
    console.log(searchParams.get('error'));
    
      const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })


      async  function onSubmit(values:FormField ) {
        setIsLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
     const response =  await signIn('credentials',{
         email:values.email,
         password:values.password,
         callbackUrl:'/',
         redirect:true
     })
     setIsLoading(false)
    // console.log(values)
  }
  return <>
       <div className='flex flex-col justify-center items-center min-h-[60vh]'>
          <h1 className='my-3 text-2xl'>Login Now</h1>

          <Card className='p-5 w-sm'>
            
              <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ali@example.com" {...field} />
              </FormControl>
              <FormMessage />
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
        
        <Button  disabled={isLoading} type="submit" className='w-full cursor-pointer'>{isLoading?<Loader className='animate-spin'/>:'SignIn'}</Button>
        {searchParams.get('error')&& <p className='text-red-600 text-center'>{searchParams.get('error')}</p>}
      </form>
             </Form>
              <p className='text-center'><Link href={'/forgetpassword'} className=' text-red-500 hover:text-red-600'>Forgot Password</Link> ?</p>

            </Card>            

                <p className='text-center mt-1'>Dosen't have account?, please <Link href={'/register'} className=' text-blue-500 hover:text-blue-600'>SignUp</Link></p>

       </div>
  
  
  
  </>


}







