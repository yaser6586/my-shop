'use client'
import { ChangeQuantityOfCartItem } from '@/app/lib/actions'
import { CartItemWithProduct } from '@/app/lib/definations'

import React from 'react'

export default function ChangeQuantitySelect({cartItem }: {cartItem: CartItemWithProduct}) {
  const [result,setResult] = React.useState({status:"idle",message :""})
  let quantityOption = []
  for (let i = 1; i < 99; i++) {
    quantityOption.push(i)
  }
  return (
    <div className=' w-full flex flex-col min-h-[130px] pt-8 md:flex-row justify-between md:pt-0'>
       <select className="select select-bordered  max-w-xs m-auto basis-1/5" 
    name="quantity" id="quantity" value={cartItem.quantity} 
   
    onChange={async (e) => {
      const newQuantity = parseInt(e.currentTarget.value)
      setResult({status:"loading",message :""})
      const result = await ChangeQuantityOfCartItem(newQuantity,cartItem.id)
    setResult(result)}} >
     
     {quantityOption.map(option => <option key={option}>{option}</option>)}
     </select>

     <div className="text-success m-auto basis-4/5 mx-3">{result.message}</div>
     </div>
  )
}
