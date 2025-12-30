'use client'

import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HeartIcon, Loader, ShoppingCartIcon, UserIcon } from 'lucide-react'

import { Badge } from "@/components/ui/badge" 
import { CartContext } from '../context/CartContext'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {

  const {cartData,isLoading} = useContext(CartContext)
   const session = useSession()
  //  console.log(session);
   
  return <>
  
   <nav className='bg-gray-200/50 shadow text-2xl font-semibold  px-2 sticky top-0 z-10'>
       <div className='container mx-auto'>
          <div className='block sm:flex  items-center justify-between'>
          <Link className='font-bold flex items-center gap-1 text-lg' href={'/'} ><span className='px-3 py-0.5 rounded-lg text-white bg-black'>S</span> ShopMart</Link>

                <NavigationMenu  >
  <NavigationMenuList className='block sm:flex py-3'>

         <NavigationMenuItem>
      <NavigationMenuLink asChild >
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    
    
         <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    
         <NavigationMenuItem className=''>
      <NavigationMenuLink asChild >
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

  </NavigationMenuList>
                </NavigationMenu>
      
             <div className='flex gap-2 py-2'>
                <DropdownMenu>
  <DropdownMenuTrigger><UserIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
   {session.status=='authenticated'?    <>
    <Link href={'/profile'}>
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </Link>
     <Link href={'/allorders'}>
    <DropdownMenuItem>My Orders</DropdownMenuItem>
  </Link>
      <DropdownMenuItem onClick={()=>{signOut({
        callbackUrl:'/'
      })}}>Logout</DropdownMenuItem>

    </>:   <>
            <Link href={'/login'}>
    <DropdownMenuItem>Login</DropdownMenuItem>
  </Link>
  <Link href={'/register'}>
    <DropdownMenuItem>Register</DropdownMenuItem>
  </Link>

        </>}
 

     
  
  </DropdownMenuContent>
                </DropdownMenu>
               {session.status=='authenticated'&& <>    <Link href={'/wishlist'}>
                 
                        <HeartIcon className='cursor-pointer'/>

                 </Link> <div className='relative'>
                   <Link href={'/cart'}>
                                     <ShoppingCartIcon/>
                       <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono tabular-nums">
                {isLoading?<Loader className='animate-spin'/>:cartData?.numOfCartItems}
                      </Badge>
                   
                   </Link>
             

                 </div>
          

               </>
                 }
             </div>

          </div>

       </div>



   </nav>
  
  
  
  
  </>
}
