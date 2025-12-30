// app/actions/cart/updateCartItemAction.ts
'use server'

import { getUserToken } from "@/app/Helper/getUserToken"

export async function updateCartItemAction(productId: string, count: number) {
  const token = await getUserToken()

  const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      token,
      "content-type": "application/json"
    },
    body: JSON.stringify({ count })
  })

  return await response.json()
}
