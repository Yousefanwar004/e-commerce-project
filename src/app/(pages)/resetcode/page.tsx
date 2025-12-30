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
  resetCode:z.string()
    ,
})

type FormField = z.infer<typeof formSchema>

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (!sessionStorage.getItem('allow-reset-code')) {
      router.replace('/')
    }
  }, [])

  const form = useForm<FormField>({
    resolver: zodResolver(formSchema),
    defaultValues: { resetCode: "" },
  })

  async function onSubmit(values: FormField) {
    setIsLoading(true)

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resetCode: values.resetCode }),
      }
    )

    const data = await response.json()

    if (data.status === 'Success') {
      sessionStorage.removeItem('allow-reset-code')
      sessionStorage.setItem('allow-reset-password', 'true')
      router.push('/resetpassword')
    } else {
      setError(data.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <h1 className="my-3 text-2xl">Reset Code</h1>

      <Card className="p-5 w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
                      maxLength={6}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ''))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                  {error && <p className="text-red-600 text-center">{error}</p>}
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : 'Verify Code'}
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
