import { Card } from '@/components/ui/card'
import { BrandI } from '@/interfaces/brand'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default async function Brands() {
       const response= await fetch(`${process.env.API_URL}/brands`,{
        method:'GET'
       })
       const {data:brands}:{data:BrandI[]}= await response.json()
         

  return <>
         <div className='container mx-auto px-4 py-8'>
               <h1 className='text-3xl font-bold tracking-tight mb-8'>Brands</h1>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 '>
                 
               {brands.map((brand)=><div key={brand._id}>
                <Link href={'/brands/'+brand._id}>
                <Card className='hover:shadow-lg'>
                     <Image src={brand.image} className='w-full' alt={brand.name} height={300} width={300} ></Image>



                </Card>
                  </Link>
            </div> )}



              </div>

         </div>
  
  
  
  
  </>
}
