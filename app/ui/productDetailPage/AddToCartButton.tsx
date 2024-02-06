'use client'
import { handleAddProductIdToCart } from '@/app/lib/actions';
import React from 'react'
import { TiShoppingCart } from "react-icons/ti";


export default function AddToCartButton({productId , className , title} :{
    productId:string,
    className:string,
    title:string
}) {
 const[result, setResult] = React.useState({status:"idle",message:""})
  return (
   <div className='flex flex-row-reverse gap-1'>
       {result.status !== "pending" ? <button className={`${className} m-auto`} onClick={ async ()=> {
            setResult({status:"pending" , message:""})
            const result = await handleAddProductIdToCart(productId)
            setResult(result)
            
        }}> { title }<TiShoppingCart size={30}/> </button> : <button className={`${className} m-auto`} > <span className="loading loading-dots loading-lg"></span> </button> }
        {result.status === "successful" && <p className='m-auto text-success mx-3'>{result?.message}</p>  }
   </div>
  )
}

