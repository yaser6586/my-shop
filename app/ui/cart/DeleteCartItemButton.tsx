"use client";
import { removeCartItem } from "@/app/lib/actions";
import { CartItemWithProduct } from "@/app/lib/definations";
import React from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export default function DeleteCartItemButton({
  cartItem,
}: {
  cartItem: CartItemWithProduct;
}) {
  return (
    <div>
      <button
        className="text-error hover:text-black "
        title="حذف از سبد خرید"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement;
          modal.showModal();
        }}
      >
        {" "}
        <MdOutlineRemoveShoppingCart size={35} />
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">کاربر محترم</h3>

          <p className="py-4">آیا میخواهید این محصول را حذف کنید</p>
          <div className="modal-action">
            <form method="dialog ">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn m-auto ">بستن</button>

              <button
                className="btn  btn-error mx-2 m-auto"
                onClick={() => {
                  removeCartItem(cartItem.id);
                }}
              >
                بله
              </button>
            </form>
          </div>
        </div>
        /
      </dialog>
    </div>
  );
}
