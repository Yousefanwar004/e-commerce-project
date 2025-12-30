import React from 'react'
import { ProductI } from '@/interfaces/product';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/addToCart/AddToCart';
import { getUserToken } from "@/app/Helper/getUserToken"



export default async function WishList() {
       const token = await getUserToken()   

    const response= await fetch(`${process.env.API_URL}/wishlist`,
        {
            headers:{
                token:token
            }
        }

    )
    const {data:products}:{data:ProductI[]}= await response.json()
  
  console.log(products);
  
  
  
  return <>                <h1 className="text-3xl font-bold tracking-tight mb-8">Wishlist</h1>

                    {products.length===0&&<div className='flex flex-col min-h-[60vh] justify-center items-center'>  <h2 className='text-2xl my-4'>Your WishList Is Empty..😥</h2>
              <Link href={'/products'}><Button className='cursor-pointer'>Add WishList</Button></Link>
             </div>}


        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-5 p-4 '>

            {products.length>0&&products.map((product)=> <div key={product.id}>
     
                    <Card className='relative z-9'> 
                  
    <Link href={'/products/'+product.id}>
  <CardHeader>
      <Image src={product.imageCover} className='w-full' alt={product.title} height={300} width={300}></Image>
    <CardTitle>{product.title.split(' ',2).join(' ')}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
    <CardDescription>{product.brand.name}</CardDescription>
  </CardHeader>
  <CardContent>
     
     <div className='flex'>
       <MyStarIcon/>
       <MyStarIcon/>
       <MyStarIcon/>
       <MyStarIcon/>



        <p>{product.ratingsAverage}</p>

     </div>
     <p className='font-bold text-xl'>EGP <span>{product.price} </span></p>
  </CardContent>
     </Link>
         <AddToCart productId={product.id} isWishList/>


     </Card>
       
       
    
           </div>)}
  
     </div>
  





   
  </>
}
