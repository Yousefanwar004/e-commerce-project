'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Span } from "next/dist/trace";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
     const session = useSession()
  
  return <>
      <section className="container mx-auto ">
               <div className="flex items-center justify-center flex-col py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">Welcome to ShopMart {session.status=='authenticated'&& <span className='capitalize'>{session.data.user.name}</span>}</h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
                    </div>
                    <div>
                       <Link href={'/products'}> <Button className="px-9 py-5 cursor-pointer ">Shop Now</Button></Link>
                       <Link href={'/categories'}> <Button className="bg-white cursor-pointer text-black border-2 border-black  rounded-md font-medium hover:bg-gray-50 transition-colors duration-200 px-9 py-5">Browse Categories</Button></Link>

                    </div>
               </div>
          


      </section>



  </>
}
