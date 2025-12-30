import AddToCart from '@/components/addToCart/AddToCart';
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryI } from '@/interfaces/category';
import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function CategoriesDetails({params}:{params:Params}) {
 
 
 let {categorieId} = await params
   const res = await fetch(`${process.env.API_URL}/categories/`+categorieId);
     const {data:categorie}:{data:CategoryI} =await res.json()
    //  console.log(categorie);
     
 
      const response= await fetch(`${process.env.API_URL}/products?category[in]=`+categorieId)
       const {data:products}:{data:ProductI[]}= await response.json()
       
 
 
 
 return <>
  
  
  
       <div className='container mx-auto'>
<div className="mb-8">
  <h1 className="text-3xl font-bold tracking-tight mb-2">{categorie.name}</h1>
  <p className="text-muted-foreground">Products from this categorie</p>
  </div>
         {products.length===0&&<div className='flex min-h-[60vh] justify-center items-center'><p className='text-muted-foreground text-lg '>No products found in this category.</p></div>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-5 p-4'>
            {products.length>0&& products.map((product)=> <div key={product.id} >
              
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
       
       
    
           </div>)}
  
     </div>
  
        
     </div>
  
  
  
  
  
  
  </>
}
