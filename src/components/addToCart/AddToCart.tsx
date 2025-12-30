'use client'

import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'
import { HeartIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToWishListAction } from '@/app/(pages)/wishlist/_action/addToWishList'
import { removeFromWishListAction } from '@/app/(pages)/wishlist/_action/removeToWishList'

export default function AddToCart({productId,isWishList = false}:{productId:string,isWishList?: boolean}) {
        const {getCart,setCartData}= useContext(CartContext)
       const session = useSession()
      const router = useRouter()

   const [isLoading, setIsLoading] = useState(false)
   async  function addProductToCart() {
            if (session.status=='authenticated') {
                     setIsLoading(true)
      const data = await  addToCartAction(productId)
      
         data.status=='success'&& toast.success('Product Added To Cart Successfuly')
             setCartData(data)
             
            // await getCart()
        //  console.log(data);
    
          setIsLoading(false)
            }else{
                router.push('/login')
            }  

    }
   async  function addProductToWishList() {
            if (session.status=='authenticated') {
      const data = await  addToWishListAction(productId)
      
         data.status=='success'&& toast.success('Product Added To Wislist Successfuly')
             
            // await getCart()
         console.log(data);
          return data
            }else{
                router.push('/login')
            }  

    }
async function removeFromWishList() {
                     if (session.status=='authenticated') {
      const data = await  removeFromWishListAction(productId)
      
         data.status=='success'&& toast.success('Product Removed To Wislist Successfuly')
             
         console.log(data);
          return data
            }else{
                router.push('/login')
            }  

}



  return <>
  
      <CardFooter className='gap-2'>
       <Button onClick={addProductToCart} className='grow cursor-pointer'>{isLoading?<Loader className='animate-spin'/> :<ShoppingCartIcon/> } Add To Cart</Button>
{!isWishList && (
  <HeartIcon
    onClick={addProductToWishList}
    className="cursor-pointer"
  />
)}    

{isWishList && (
  <div className="absolute top-0 right-0">
    <button onClick={removeFromWishList}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 cursor-pointer text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
)}

  </CardFooter>
  
  </>
}
