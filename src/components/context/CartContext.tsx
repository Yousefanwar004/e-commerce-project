'use client'

import { CartResponse } from "@/interfaces/cart"
import { createContext, ReactNode, useEffect, useState } from "react"

type CartContextType = {
  cartData: CartResponse | null
  setCartData: (value: CartResponse | null) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  getCart: () => Promise<void>
}

export const CartContext = createContext<CartContextType>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: async () => {},
})

export default function CartContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getCart() {
    try {
      setIsLoading(true)

      const response = await fetch('/api/get-cart', {
        cache: 'no-store',
      })

      if (!response.ok) {
        setCartData(null)
        return
      }

      const data: CartResponse = await response.json()
      setCartData(data)
    } catch (error) {
      console.error('GET CART ERROR:', error)
      setCartData(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
