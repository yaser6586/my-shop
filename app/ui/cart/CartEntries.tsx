import { CartItemWithProduct } from "@/app/lib/definations";
import { IrRial } from "@/app/lib/scripts";
import Image from "next/image";
import React from "react";

import ChangeQuantitySelect from "./ChangeQuantitySelect";
import { removeCartItem } from "@/app/lib/actions";
import DeleteCartItemButton from "./DeleteCartItemButton";

export default function CartEntries({
  cartItem,
}: {
  cartItem: CartItemWithProduct;
}) {
  return (
    <div
      className="m-auto flex flex-col justify-center align-middle md:flex-row  md:justify-start w-full pr-10 border-b pb-1"
      dir="rtl"
    >
      <div className="m-auto h-full">
        <Image
          src={cartItem.product.image as string}
          width={300}
          height={300}
          alt={cartItem.product.name}
          className="m-auto object-cover"
        />
      </div>
      <div className="m-auto flex flex-col justify-end w-full pr-10 gap-2 ">
        <div className="m-auto w-full text-xl font-bold">
          {cartItem.product.name}
        </div>
        <div className="m-auto w-full">
          قیمت واحد : {IrRial.format(cartItem.product.price)}
        </div>

        <div className="m-auto w-full flex flex-row justify-start">
          <div className="mx-2 pt-12">تعداد: </div>{" "}
          <ChangeQuantitySelect cartItem={cartItem} />
        </div>
        <div className="m-auto w-full flex flex-row md:gap-3">
          <div>جمع قیمت :</div>
          <div>
            {" "}
            {IrRial.format(cartItem.product.price * cartItem.quantity)}
          </div>
        </div>
        <div className="m-auto w-full ">
          <DeleteCartItemButton cartItem={cartItem} />
        </div>
      </div>
    </div>
  );
}
