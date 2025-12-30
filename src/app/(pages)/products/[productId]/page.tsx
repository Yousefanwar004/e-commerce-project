
import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
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

import ProductSlider from '@/components/productSlider/ProductSlider';
import AddToCart from '@/components/addToCart/AddToCart';

export default async function ProductDetails({params}:{params:Params}) {
  
  let {productId} = await params
  console.log(productId);
  

    const response = await fetch(`${process.env.API_URL}/products/`+productId);
    const {data:product}:{data:ProductI} =await response.json()
    console.log(product);
    

  return <>
  
  <Card className='grid md:grid-cols-2 items-center w-3/4 mx-auto'>
      <div className='p-3'>

      <ProductSlider images={product.images} altContent={product.title}/>
      </div>
     <div>
        <CardHeader>
         <CardDescription>{product.brand.name}</CardDescription>

    <CardTitle>{product.title}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
  </CardHeader>
  <CardContent>
         <CardDescription>{product.category.name}</CardDescription>
         <div className='flex gap-1 my-1'>
           <MyStarIcon/>
           <MyStarIcon/>
           <MyStarIcon/>
           <MyStarIcon/>
           <p>({product.ratingsQuantity})</p>

         </div>
        <div className='flex justify-between my-2'>
          <p className='font-bold py-1'>EGP {product.price}.00 </p>
          <p className='font-bold'>Quantity: {product.quantity}</p>

        </div>

  </CardContent>
   
    <AddToCart productId={product.id} />

     </div>

</Card>
  
  
  
  
  </>
}
