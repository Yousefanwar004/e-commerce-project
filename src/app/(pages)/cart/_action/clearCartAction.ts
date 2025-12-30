'use server'
import { getUserToken } from "@/app/Helper/getUserToken"

export async function clearCartAction() {
  const token = await getUserToken()

  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: "DELETE",
    headers: { token }
  })

  return await response.json()
}