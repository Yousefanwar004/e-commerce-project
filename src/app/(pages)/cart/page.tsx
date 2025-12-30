'use client'

import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/checkOut'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { Loader, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { removeCartItemAction } from './_action/removeCartItemAction'
import { clearCartAction } from './_action/clearCartAction'
import { updateCartItemAction } from './_action/updateCartItemAction'

export default function Cart() {
  const { cartData, isLoading, setCartData } = useContext(CartContext)

  const [removingId, setRemovingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [isClearing, setIsClearing] = useState(false)

  const products = cartData?.data?.products ?? []

  if (isLoading) {
    return <Loading />
  }

  if (!cartData || products.length === 0) {
    return (
      <div className='flex min-h-[75vh] items-center justify-center flex-col'>
        <h2 className='text-2xl my-4'>Your Cart Is Empty.. 😥</h2>
        <Link href='/products'>
          <Button>Add Products To Cart</Button>
        </Link>
      </div>
    )
  }

  async function removeCartItem(productId: string) {
    setRemovingId(productId)

    const data = await removeCartItemAction(productId)

    if (data?.status === 'success') {
      toast.success('Product deleted successfully')
      setCartData(data)
    }

    setRemovingId(null)
  }

  async function clearCart() {
    setIsClearing(true)

    const data = await clearCartAction()

    if (data?.message === 'success') {
      toast.success('Cart cleared successfully')
      setCartData(null)
    }

    setIsClearing(false)
  }

  async function updatingCartItem(productId: string, count: number) {
    setUpdatingId(productId)

    const data = await updateCartItemAction(productId, count)

    if (data?.status === 'success') {
      toast.success('Product quantity updated')
      setCartData(data)
    }

    setUpdatingId(null)
  }

  return (
    <div className='container mx-auto py-6 px-4'>
      <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
      <p className='text-muted-foreground mt-1'>
        {cartData.numOfCartItems} in your cart
      </p>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
        <div className='lg:col-span-2 space-y-4'>
          {products.map((item) => (
            <div
              key={item._id}
              className='flex gap-4 rounded-xl border shadow-sm bg-card'
            >
              <img
                src={item.product.imageCover}
                className='w-24 h-24 rounded-lg object-cover'
                alt={item.product.title}
              />

              <div className='flex-1'>
                <h3 className='font-semibold'>
                  {item.product.title.split(' ', 2).join(' ')}
                </h3>

                <div className='mt-3 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <button
                      disabled={item.count === 1}
                      onClick={() =>
                        updatingCartItem(item.product.id, item.count - 1)
                      }
                    >
                      -
                    </button>

                    <span>
                      {updatingId === item.product.id ? (
                        <Loader className='animate-spin' />
                      ) : (
                        item.count
                      )}
                    </span>

                    <button
                      onClick={() =>
                        updatingCartItem(item.product.id, item.count + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={removingId !== null}
                    onClick={() => removeCartItem(item.product.id)}
                  >
                    {removingId === item.product.id ? (
                      <Loader className='animate-spin' />
                    ) : (
                      'Remove'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <CheckOut cartId={cartData.cartId} />

          <Button
            variant='outline'
            onClick={clearCart}
            className='mt-2 text-destructive'
          >
            {isClearing ? <Loader className='animate-spin' /> : <Trash2Icon />}
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
