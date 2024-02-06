import React from "react";
import { getCart } from "../lib/data";
import CartEntries from "../ui/cart/CartEntries";
import { IrRial } from "../lib/scripts";

export default async function CartPage() {
  const product = await getCart();

  return (
    <div className="flex  flex-col md:flex-row-reverse justify-center w-full h-full ">
      <div className="w-full h-fit flex flex-col items-start justify-start gap-1 basis-2/3 ">
        {product?.CartItem.map((item, i) => (
          <CartEntries key={i} cartItem={item} />
        ))}
        {product?.size === 0 && (
          <div className="m-auto font-bold">سبد خرید شما خالی است</div>
        )}
      </div>
      <div
        className="basis-1/3 m-auto border rounded-xl w-full min-h-screen flex flex-col 
      justify-center items-start mt-2 sticky top-2"
      >
        <div className="m-auto ">جمع فاکتور</div>
        <div className="m-auto ">
          تعداد اقلام کالا : {product?.size.toLocaleString("fa-IR")}
        </div>
        <div className="m-auto">
          مبلغ فاکتور : {IrRial.format(product?.subtotal as number)}
        </div>
        <div className="m-auto">
          <button className="btn btn-wide bg-warning">تصویه حساب</button>
        </div>
      </div>
    </div>
  );
}
