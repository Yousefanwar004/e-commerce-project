'use client'
import React, { useContext, useRef, useState } from 'react'
import { Button } from '../ui/button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { Loader } from 'lucide-react'
import { chekOutSessionAction, chekOutSessionCashAction } from './_action/chekOutSessionAction'
import { useRouter } from 'next/navigation'
import { CartContext } from '../context/CartContext'


export default function CheckOut({cartId}:{cartId:string}) {
const { setCartData } = useContext(CartContext)
    const [isChecking, setisChecking] = useState<boolean>(false)
   const [cashChecking, setCashChecking] = useState<boolean>(false)
 let detailsInput=useRef<HTMLInputElement | null>(null)
 let cityInput=useRef<HTMLInputElement | null>(null)
 let phoneInput=useRef<HTMLInputElement | null>(null)


 async function chekOutSession() {
          setisChecking(true)
        const shippingAddress ={
           details:detailsInput.current?.value,
           city:cityInput.current?.value,
           phone:phoneInput.current?.value
        }
     
         const data =await chekOutSessionAction(cartId,shippingAddress)
         console.log(data);
         if (data.status=='success') {
            window.location.href=data.session.url
         }
       setisChecking(false)
      }
const router = useRouter()

 async function chekOutSessionCash() {
          setCashChecking(true)
        const shippingAddress ={
           details:detailsInput.current?.value,
           city:cityInput.current?.value,
           phone:phoneInput.current?.value
        }
     
         const data =await chekOutSessionCashAction(cartId,shippingAddress)
         console.log(data);
         
         if (data.status=='success') {
              router.push('/allorders')
               setCartData(null)
         }
       setCashChecking(false)
      }
  
   
  return <>
  

     <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className='w-full text-lg mt-4 cursor-pointer'>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Make Sure that your enterd correct address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>city</Label>
              <Input ref={cityInput} id="city"   />
            </div>
             <div className="grid gap-3">
              <Label>details</Label>
              <Input ref={detailsInput} id="details"   />
            </div>
             <div className="grid gap-3">
              <Label>phone</Label>
              <Input ref={phoneInput} id="phone"   />
            </div>
          
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='cursor-pointer'>Cancel</Button>
            </DialogClose>
            <Button type="submit" className='cursor-pointer' onClick={()=>chekOutSession()}>{isChecking?<Loader className='animate-spin'/>:'Visa'}</Button>
            <Button type="submit" className='cursor-pointer' onClick={()=>chekOutSessionCash()}>{cashChecking?<Loader className='animate-spin'/>:'Cash'}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  
  
  </>
}
