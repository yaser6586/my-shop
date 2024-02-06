"use client";

import { ProductType } from "@/app/lib/definations";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiReadCvLogoBold } from "react-icons/pi";

function ProductLinker({ ProductData }: { ProductData: ProductType }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <button className="btn  btn-wide bg-slate-500 m-auto my-2  text-white flex flex-row gap-1 disabled">
          <span className="loading loading-dots loading-md"></span>
        </button>
      ) : (
        <Link
          href={`/products/${ProductData.slug}`}
          onClick={() => {
            setLoading(true);
           
          }}
          className="  btn  btn-wide bg-warning m-auto my-2  text-slate-700 flex flex-row gap-1"
        >
          جزئیات محصول
          <PiReadCvLogoBold size={15} />
        </Link>
        
      )}
      <span className="bg-yellow-50 rounded-2xl max-w-fit mr-5 m-auto p-1 text-sm" dir="rtl">  {ProductData.price} ریال</span>
    </>
  );
}

export default ProductLinker;