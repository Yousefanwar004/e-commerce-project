import { Card } from '@/components/ui/card';
import { CategoryI } from '@/interfaces/category';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {

     const response= await fetch(`${process.env.API_URL}/categories`,{
        method:'GET'
       })
       const {data:categories}:{data:CategoryI[]}= await response.json()
      //  console.log(categories);
         




  return <>
      <div className='container mx-auto px-4 py-8'>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Categories</h1>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  '>
                 
               {categories.map((category)=><div key={category._id}>
                <Link href={'/categories/'+category._id}>
             <Card className="hover:shadow-lg">
  <div className="mx-auto w-72 h-48 relative overflow-hidden">
    <Image src={category.image} alt={category.name}  className="object-cover" width={400} height={400}   />
  </div>
  <div className="p-3 text-center font-semibold">
    {category.name}
  </div>
</Card>
                  </Link>
            </div> )}



              </div>



      </div>
  
  
  
  
  </>
}
