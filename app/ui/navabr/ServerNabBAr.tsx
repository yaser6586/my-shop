
import React from 'react'
import ProfileInNavbar from './ProfileInNavbar'
import CartInNavbar from './CartInNavbar'

import { getCart } from '@/app/lib/data'

import { CartType, ShoppingCart } from '@/app/lib/definations'
import Link from 'next/link'

export default async function ServerNabBAr() {
    const cart = await getCart()
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link href={"/"} className="btn btn-ghost text-xl">daisyUI</Link>
  </div>
  <div className="flex-none">
  <CartInNavbar cartData={cart as ShoppingCart}/>
<ProfileInNavbar/>
  </div>
</div>
  )
}
