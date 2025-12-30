'use client'
import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
export default function ProductSlider({images,altContent}:{images:string[],altContent:string}) {
  return <>
           <Carousel opts={
          {
            loop:true
          }
        }
            plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}
        
        >
  <CarouselContent>
    {images.map((image,index)=>    <CarouselItem key={index}><Image src={image} alt={altContent} width={300} height={300}></Image></CarouselItem>
         )}

  </CarouselContent>
        </Carousel>
  
  
  
  </>
}
