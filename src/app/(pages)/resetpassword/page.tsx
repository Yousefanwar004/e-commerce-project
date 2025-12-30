"use client"

import React, { useEffect, useState } from 'react'
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
  email: z.string().email('Invalid Email'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Password must be strong'
    ),
})

type FormField = z.infer<typeof formSchema>

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (!sessionStorage.getItem('allow-reset-password')) {
      router.replace('/')
    }
  }, [])

  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: FormField) {
    setIsLoading(true)

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: 'PUT',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          newPassword: values.password,
        }),
      }
    )

    const data = await response.json()
  //  console.log(data);

    if (data.token) {
      sessionStorage.removeItem('allow-reset-password')
      router.push('/login')
    } else {
      setError(data.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <h1 className="my-3 text-2xl">Reset Password</h1>

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
                    <Input {...field} />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error && <p className="text-red-600 text-center">{error}</p>}
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : 'Reset Password'}
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
