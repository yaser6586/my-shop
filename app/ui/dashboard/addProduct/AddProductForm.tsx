"use client";

import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { handleAddProduct } from "@/app/lib/actions";
const initial = {
  status: "",
  message: "",
};
function AddProductForm() {
  const [state, formAction] = useFormState(handleAddProduct, initial);
  if (state.status === "successful") {
    const form = window.document.getElementById("form") as HTMLFormElement;
    form.reset();
  }
  return (
    <div className="w-full flex flex-col justify-center">
      <form
        action={formAction}
        className="m-auto flex flex-col justify-center gap-4 pt-4 w-full px-5"
        id="form"
      >
        <label htmlFor="name" className="m-auto">
          نام
        </label>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          className="input input-bordered
       m-auto w-full max-w-5xl "
          required
        />

        <label htmlFor="slug" className="m-auto">
          اسلاگ
        </label>
        <input
          type="text"
          name="slug"
          placeholder="Type here"
          className="input input-bordered 
      m-auto w-full max-w-5xl "
          required
        />

        <label htmlFor="imageUrl" className="m-auto">
          آدرس عکس
        </label>
        <input
          type="url"
          name="imageUrl"
          placeholder="Type here"
          className="input input-bordered
       m-auto w-full max-w-5xl "
          required
        />

        <label htmlFor="description" className="m-auto">
          توضیحات
        </label>
        <input
          type="text"
          name="description"
          placeholder="Type here"
          className="input input-bordered  input-lg min-h-40 overflow-scroll
      m-auto w-full max-w-5xl "
          required
        />

        <label htmlFor="price" className="m-auto">
          قیمت
        </label>
        <input
          type="number"
          name="price"
          placeholder="Type here"
          className="input input-bordered
       m-auto w-full max-w-5xl "
          required
        />

        <div className="m-auto">
          <SubmitButton title="اضافه کردن محصول" className="btn-wide" />
        </div>
      </form>
      <div className="m-auto my-3">
        {state?.status === "error" ? (
          <div className="text-error">{state.message}</div>
        ) : (
          <div className="text-success">{state?.message}</div>
        )}
      </div>
    </div>
  );
}

export default AddProductForm;
