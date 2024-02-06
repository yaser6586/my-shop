import Image from "next/image";
import Link from "next/link";
import React from "react";

import { IoEyeOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";


import { PiReadCvLogoBold } from "react-icons/pi";
import { ProductType } from "@/app/lib/definations";
import ProductLinker from "./ProductLinker";

async function ProductCard({ productData }: { productData: ProductType }) {
 


  return (
    <div
      className="post flex flex-col w-[400px] h-[320px] border
     bg-white justify-center mx-auto my-3 rounded-lg shadow-md shadow-amber-500"
    >
      {productData.image ? (
        <Image
          alt="post image"
          src={productData.image}
          width={800}
          height={600}
          className="m-auto mt-0 w-full max-h-[170px] min-h-[170px] rounded-t-lg object-cover"
        />
      ) : (
        <Image
          alt="post image"
          src="/post1.jpg"
          width={600}
          height={450}
          className="m-auto mt-0 w-full max-h-[170px] rounded-t-lg object-cover "
        />
      )}

      <div className={`text-l m-auto font-bold mx-2`} dir="rtl">
        {productData.name}
      </div>
      <p className={`m-auto text-xs justify-end `} dir="rtl">
        {productData.description?.slice(0, 45)}...
      </p>
      

      <ProductLinker ProductData={productData as ProductType}/>

      
      
    </div>
  );
}

export default ProductCard;
