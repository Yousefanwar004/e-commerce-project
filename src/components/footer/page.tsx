import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return <>
           <footer className='border-t-2 py-5 mt-15'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 '>
                     <div className='lg:col-span-1'>
                         <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-black flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <span className="text-xl font-bold text-black">ShopMart</span>
                                </div>
                              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
                              <div className="space-y-3">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 mr-2" aria-hidden="true">
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <span>123 Shop Street, Octoper City, DC 12345</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-4 h-4 mr-2" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                                    </svg><span>(+20) 01093333333</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-4 h-4 mr-2" aria-hidden="true">
                                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                        </svg>
                                        <span>support@shopmart.com</span>
                                        </div>
                                        </div>
                     </div>
     <div>
    <h3 className="text-black font-bold text-sm mb-4">SHOP</h3>
    <ul className="space-y-2">
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Electronics</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Fashion</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Home &amp; Garden</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Sports</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Deals</Link>
        </li>
    </ul>
    
    </div>





<div>
    <h3 className="text-black font-bold text-sm mb-4">CUSTOMER SERVICE</h3>
    <ul className="space-y-2">
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/contact">Contact Us</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/help">Help Center</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/track-order">Track Your Order</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/returns">Returns &amp; Exchanges</Link>
        </li>
        <li><Link className="text-gray-600 text-sm hover:text-black transition-colors" href="/size-guide">Size Guide</Link>
        </li>
        </ul>
</div>
               <div><h3 className="text-black font-bold text-sm mb-4">ABOUT</h3><ul className="space-y-2"><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/about">About shopmart</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/careers">Careers</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/press">Press</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/investor-relations">Investor Relations</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/sustainability">Sustainability</a></li></ul></div>

               <div><h3 className="text-black font-bold text-sm mb-4">POLICIES</h3><ul className="space-y-2"><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/privacy-policy">Privacy Policy</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/terms-of-service">Terms of Service</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/cookie-policy">Cookie Policy</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/shipping-policy">Shipping Policy</a></li><li><a className="text-gray-600 text-sm hover:text-black transition-colors" href="/refund-policy">Refund Policy</a></li></ul></div>
               
                </div>


           </footer>
  
  
  
  </>
}
