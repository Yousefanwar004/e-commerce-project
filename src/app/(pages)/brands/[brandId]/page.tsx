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
import { Params } from 'next/dist/server/request/params';
import AddToCart from '@/components/addToCart/AddToCart';
import Products from '../../products/page';
import { BrandI } from '@/interfaces/brand';


export default async function BrandDetails({params}:{params:Params}) {
  let {brandId} = await params
  const res = await fetch(`${process.env.API_URL}/brands/`+brandId);
    const {data:brand}:{data:BrandI} =await res.json()
    console.log(brand);
    

     const response= await fetch(`${process.env.API_URL}/products?brand=`+brandId)
      const {data:products}:{data:ProductI[]}= await response.json()
      


  return <>
     <div className='container mx-auto'>
<div className="mb-8">
  <h1 className="text-3xl font-bold tracking-tight mb-2">{brand.name}</h1>
  <p className="text-muted-foreground">Products from this brand</p>
  </div>
              {products.length===0&&<div className='flex min-h-[60vh] justify-center items-center'><p className='text-muted-foreground text-lg '>No products found from this brand.</p></div>}
          
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-5 p-4'>
            {products.length>0 &&products.map((product)=> 
            
            <div key={product.id}>
            <div>
               <Card>  
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
       
       
            </div>
             
    
            </div>


             )}
  
            </div>
        
     </div>
  
  
  
  
  </>
}
