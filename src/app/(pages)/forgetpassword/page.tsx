"use client"

import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z
    .string()
    .nonempty('Email Is Required')
    .email('Invalid Email'),
})

type FormField = z.infer<typeof formSchema>

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: FormField) {
    setIsLoading(true)

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      }
    )

    const data = await response.json()
      //  console.log(data);
       
    if (data.statusMsg === 'success') {
      sessionStorage.setItem('allow-reset-code', 'true')
      router.push('/resetcode')
    } else {
      setError(data.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <h1 className="my-3 text-2xl">Forgot Password</h1>

      <Card className="p-5 w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  {error && <p className="text-red-600 text-center text-sm">{error}</p>}
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : 'Send Code'}
            </Button>
          </form>
        </Form>
      </Card>

      <p className="mt-2">
        Remembered? <Link href="/login" className="text-blue-500">Sign In</Link>
      </p>
    </div>
  )
}
