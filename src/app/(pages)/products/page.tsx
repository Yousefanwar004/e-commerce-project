import { ProductI } from '@/interfaces/product';
import React from 'react'

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


export default async function Products({brandId}:{brandId:string}) {
 
  const response= await fetch(`${process.env.API_URL}/products`)
  const {data:products}:{data:ProductI[]}= await response.json()
  // console.log(products);
  

  return <>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-5 p-4 '>
            {products.map((product)=> <div key={product.id}>
     
                    <Card className=''>  
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
         <AddToCart productId={product.id}/>
                    </Card>
       
       
    
           </div>)}
  
     </div>
  
  
  </>
}
