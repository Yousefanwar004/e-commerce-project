
import { getId } from "@/app/Helper/getId"
import { getUserToken } from "@/app/Helper/getUserToken"
import { OrdersI } from "@/interfaces/orders"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
export default async function AllOrders() {

  const userId= await getId()
  
    const response= await fetch(`${process.env.API_URL}/orders/user/`+userId,{
         method:'GET',   


    })
      const data:OrdersI[]= await response.json()
           
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}


  
  return <>
       <div className='container mx-auto px-4 py-6'>
                <h1 className="text-3xl font-bold tracking-tight mb-6">All Orders</h1>
               {data.length===0&&<div className='flex min-h-[60vh] justify-center items-center'><p className='text-muted-foreground text-lg '>You dosen't have order Yet</p></div>}

         {data.length>0&&data.map((order)=>    
           <div key={order.id} className="mb-8 border rounded-lg shadow p-6 bg-white">
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            
            <div className="text-gray-600 text-sm mb-1">Order Date: {formatDate(order.createdAt)}</div>
            <div className="text-gray-600 text-sm mb-1">Payment: {order.paymentMethodType} <span className="text-green-600">(Paid)</span>
            </div>
            <div className="text-gray-600 text-sm mb-1">Delivered: <span className="text-yellow-600">No</span></div>
            <div className="text-gray-600 text-sm">Total: <span className="font-bold">{order.totalOrderPrice} EGP</span></div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Shipping Address</h3>
              <div className="text-gray-700 text-sm">{order.shippingAddress.details},{order.shippingAddress.city} <br /> Phone: {order.shippingAddress.phone}</div>
            </div>
      <div className="mb-4">
        <div  className="w-35.5 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm font-medium"  id="radix-«r0»" aria-haspopup="menu" aria-expanded="false" data-state="closed" data-slot="dropdown-menu-trigger">
                 <DropdownMenu>
                <DropdownMenuTrigger>View Order Items</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Order Items</DropdownMenuLabel>
                  <DropdownMenuSeparator />
             
                  
                  
                           
                        
               {order.cartItems.map((item) => (
  <DropdownMenuItem key={item._id}>
    <div className="flex items-start gap-3">
      
      {/* Image */}
      <Image
        src={item.product.imageCover}
        alt={item.product.title}
        width={40}
        height={40}
        className="rounded object-cover"
      />

      {/* Text */}
      <div className="flex flex-col text-sm">
        <p className="font-medium">{item.product.brand.name}</p>
        <p className="text-muted-foreground">
          Qty: {item.count} | Price: {item.price} EGP
        </p>
      </div>

    </div>
  </DropdownMenuItem>
))}

           



                 
               
              
                   
                
                </DropdownMenuContent>
                  
                   </DropdownMenu>



        </div>
        </div>
      <div className="text-right text-sm text-gray-500">Last updated: {formatDate(order.updatedAt)}</div>
       
       
         </div>
)}
 
       </div>
  
  
  
  </>
}
