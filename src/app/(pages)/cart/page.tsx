'use client'
import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/checkOut'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces/cart'
import { Loader, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { removeCartItemAction } from './_action/removeCartItemAction'
import { clearCartAction } from './_action/clearCartAction'
import { updateCartItemAction } from './_action/updateCartItemAction'
import AllOrders from '../allorders/page'

export default function Cart() {
   const {cartData,isLoading,getCart,setCartData} = useContext(CartContext)
    const [removingId, setRemovingId] = useState <string|null>(null)
    const [updatingId, setUpdatingId] = useState <string|null>(null)
    const [isClearing, setIsClearing] = useState <boolean>(false)
     const [cartOwnerId, setCartOwnerId] = useState(cartData?.data?.cartOwner!)
     useEffect(() => {
      if( typeof cartData?.data.products[0]?.product=='string' || cartData==null){
        getCart()
      }
      }, [cartData])

      // async function removeCartItem(productId:string) {
      //         const token= await getUserToken()

      //    setRemovingId(productId)
      //  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,
      //   {
      //     method:"DELETE",
      //     headers:{
      //       token:token,
      //     }
      //   }
      //  )
      //  const data:CartResponse= await response.json()
      //  console.log(data);
      //   if (data.status=='success') {
      //      toast.success('product deleted successfuly')
      //     setCartData(data)
      //   }
        
      //   setRemovingId(null)
        
      //  }

           async function removeCartItem(productId: string) {
    setRemovingId(productId);

    const data: CartResponse = await removeCartItemAction(productId);

    if (data.status === "success") {
      toast.success("Product deleted successfully");
      setCartData(data);
    }

    setRemovingId(null);
  }


      //     async function clearCart() {
      //       const token= await getUserToken()

      //    setIsClearing(true)
      //  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/',
      //   {
      //     method:"DELETE",
      //     headers:{
      //       token:token,
      //     }
      //   }
      //  )
      //  const data:CartResponse= await response.json()
      //  console.log(data);
      //   if (data.message=='success') {
      //      toast.success('cart deleted successfuly')
      //     setCartData(null)
      //   }
        
      //   setIsClearing(false)
        
      //  }
      async function clearCart() {
    setIsClearing(true);

    const data: CartResponse = await clearCartAction();

    if (data.message === "success") {
      toast.success("Cart cleared successfully");
      setCartData(null);
    }

    setIsClearing(false);
  }



  // async function updatingCartItem(productId:string,count:number) {
  //         const token= await getUserToken()
  //        setUpdatingId(productId)
  //      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,
  //       {
  //         method:"PUT",
  //         headers:{
  //           token:token,
  //           'content-type':'application/json'
  //         },
  //         body:JSON.stringify({count})
  //       }
  //      )
  //      const data:CartResponse= await response.json()
  //      console.log(data);
  //       if (data.status=='success') {
  //          toast.success('product quantity updated successfuly')
  //         setCartData(data)
  //       }
        
  //       setUpdatingId(null)
        
  //      }

     
  async function updatingCartItem(productId: string, count: number) {
    setUpdatingId(productId);

    const data: CartResponse = await updateCartItemAction(productId, count);

    if (data.status === "success") {
      toast.success("Product quantity updated");
      setCartData(data);
    }

    setUpdatingId(null);
  }


  return <>
     {isLoading ||typeof cartData?.data.products[0]?.product =="string"? <Loading/>:cartData?.numOfCartItems!>0?
        <div className='container mx-auto py-6 px-4'>
         <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
         <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} in your cart</p>
         
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6'>

                  <div className='lg:col-span-2 space-y-4'>
                     {cartData?.data.products.map((item)=>      <div key={item._id} className='flex gap-4 rounded-xl border shadow-sm bg-card'>
                      <img src={item.product.imageCover} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' alt={item.product.title} />
                      <div className='flex-1'>
                        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                                <div className=''>
                                     <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                          {item.product.title.split(' ',2).join(' ')}
                                     </h3>
                                     <p className='text-sm text-muted-foreground mt-1'>
                                           { item.product.brand.name}, { item.product.category.name}

                                     </p>
                                </div>
                               <div className='text-right p-1'>
                                      <div className='font-semibold'>
                                        EGP {item.price}
                                      </div>

                               </div>
                            
                        </div>
                           <div className='mt-3 flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                       <button aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent' disabled={item.count==1} onClick={()=>updatingCartItem(item.product.id,item.count-1)}>-</button>
                                       <span className='w-6 text-center font-medium'>
                                         {updatingId==item.product.id? <Loader className='animate-spin'/>:item.count}
                                       </span>
                                       <button aria-label='increase' className='size-8 rounded-lg border hover:bg-accent' onClick={()=>updatingCartItem(item.product.id,item.count+1)}>+</button>

                                </div>
                                 <button ria-label='remove' disabled={removingId !=null}  onClick={()=>removeCartItem(item.product.id)} className='text-sm cursor-pointer flex text-destructive hover::underline items-center me-1'>
                                    {removingId==item.product.id ? <Loader className='animate-spin'/>:'Remove'} 
                                 </button>
                           </div>


                      </div>
                        
                    </div>)}
                    
                  </div>


                  <div className='lg:col-span-1 sticky top-18'>
                         <div className='rounded-xl border p-5 shadow-sm'>
                          <h2 className='text-lg font-semibold'>Order Summary</h2>
                          <div className='mt-4 space-y-2'>
                             <div className='flex items-center justify-between'>
                               <span className='text-sm text-muted-foreground'>
                                  Subtotal :{cartData?.numOfCartItems} items

                               </span>
                               <span className='font-semibold'>
                                     {cartData?.data.totalCartPrice} EGP
                               </span>

                             </div>
                             <div className='flex items-center justify-between'>
                              <span className='text-sm text-muted-foreground'>Shipping</span>
                              <span className='text-emerald-600 font-medium'>Free</span>

                             </div>

                          </div>
                           <div className='my-4  border-t'>
                                     <div className='flex items-center justify-between'>
                                      <span className='text-base font-semibold'>Total</span>
                                      <span className='text-base font-bold'>{cartData?.data.totalCartPrice} EGP</span>

                                     </div>
                                      <CheckOut cartId={cartData?.cartId!} />
                                        <Link href={'/products'}><Button className='w-full text-lg mt-2 cursor-pointer'>Continue Shopping</Button></Link>

                           </div>

                         </div>

                           <Button variant={'outline'} onClick={(()=>clearCart())} className='mt-2 ms-auto text-destructive hover:text-destructive flex cursor-pointer'>{isClearing?<Loader className='animate-spin'/>:<Trash2Icon/>}Clear Cart</Button>


                  </div>



            </div>



       </div>
       : <div className='flex min-h-[75vh] items-center justify-center flex-col'>
              <h2 className='text-2xl my-4'>Your Cart Is Empty..😥</h2>
              <Link href={'/products'}><Button className='cursor-pointer'>Add Products To Cart</Button></Link>

       </div>
         
  
       
       }
  
  
  
  </>




}








// 'use client'

// import Loading from '@/app/loading'
// import { CartContext } from '@/components/context/CartContext'
// import { OrdersI } from '@/interfaces/orders'
// import React, { useContext, useEffect, useState } from 'react'

// export default function AllOrders() {

//   const {cartData,isLoading} = useContext(CartContext)
//   const [orders, setOrders] = useState<OrdersI[] | null>(null)
//   const [loadingOrders, setLoadingOrders] = useState(false)

//   async function userOrders() {
//     const userId = cartData?.data?.cartOwner
//     if (!userId) return

//     setLoadingOrders(true)

//     const response = await fetch(
//       `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
//     )
//     const data = await response.json()

//     console.log("ORDER RESPONSE:", data)

//     // RouteMisr بيرجع Array مش data.data
//     setOrders(Array.isArray(data) ? data : data?.data || [])

//     setLoadingOrders(false)
//   }

//   useEffect(() => {
//     if (cartData?.data?.cartOwner) {
//       userOrders()
//     }
//   }, [cartData])

//   console.log("ORDERS STATE:", orders)

//   return (
//     <div className='container mx-auto px-4 py-6'>
//       <h1 className="text-3xl font-bold tracking-tight mb-6">All Orders</h1>

//       {loadingOrders && <Loading/>}

//       {orders?.length === 0 && <p>No orders found.</p>}

//   {orders && orders.map((order) => (
//   <>

//     <div key={order._id} className="mb-8 border rounded-lg shadow p-6 bg-white">

//       {/* --- Order Header --- */}
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold mb-2">
//           Order #{order.id}
//         </h2>

//         <div className="text-gray-600 text-sm mb-1">
//           Order Date: {new Date(order.createdAt).toLocaleString()}
//         </div>

//         <div className="text-gray-600 text-sm mb-1">
//           Payment: {order.paymentMethodType}{' '}
//           <span className="text-green-600">
//             ({order.isPaid ? "Paid" : "Not Paid"})
//           </span>
//         </div>

//         <div className="text-gray-600 text-sm mb-1">
//           Delivered:{" "}
//           <span className={order.isDelivered ? "text-green-600" : "text-yellow-600"}>
//             {order.isDelivered ? "Yes" : "No"}
//           </span>
//         </div>

//         <div className="text-gray-600 text-sm">
//           Total: <span className="font-bold">{order.totalOrderPrice} EGP</span>
//         </div>
//       </div>

//       {/* --- Address --- */}
//       <div className="mb-4">
//         <h3 className="font-semibold mb-1">Shipping Address</h3>
//         <div className="text-gray-700 text-sm">
//           {order.shippingAddress.city}, {order.shippingAddress.details}  
//           <br />
//           Phone: {order.shippingAddress.phone}
//         </div>
//       </div>

//       {/* --- Button --- */}
//       <div className="mb-4">
//         <button
//           className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm font-medium"
//         >
//           View Order Items
//         </button>
//       </div>

//       {/* --- Last Update --- */}
//       <div className="text-right text-sm text-gray-500">
//         Last updated: {new Date(order.updatedAt).toLocaleString()}
//       </div>

//     </div>
//   </>
// ))}
//     </div>
//   )
// }
