import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return<>
        <div className='min-h-screen flex flex-col justify-center items-center'>

           <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-black flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <span className="text-2xl font-bold text-black">ShopMart</span>
                                </div>
               <span className="loader text-2xl"></span>        
    </div>


  </>
}
