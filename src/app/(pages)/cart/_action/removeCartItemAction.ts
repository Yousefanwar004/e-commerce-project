
'use server'

import { getUserToken } from "@/app/Helper/getUserToken"

export async function removeCartItemAction(productId: string) {
  const token = await getUserToken()

  const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: { token }
  })

  return await response.json()
}