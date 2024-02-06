"use client";
import { handleSignUpForm } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import SelectCities from "./SelectCities";
import { useState } from "react";
import { CityCounty } from "@/app/lib/definations";
import { CitiesName } from "@/app/lib/iranstates";
import SubmitButton from "../dashboard/addProduct/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const initialState = { status: "", message: "" };
export default function SignUpForm() {
  const [state, formActions] = useFormState(handleSignUpForm, initialState);
  const [selectValue, setSelectValue] = useState<CityCounty>();
  const [closeMessage, setCloseMessage] = useState(false);

  const router = useRouter();
  // function showDialog() {
  //   const errorDialog = document.getElementById(
  //     "errorDialog"
  //   ) as HTMLDialogElement;
  //   const successDialog = document.getElementById(
  //     "successDialog"
  //   ) as HTMLDialogElement;

  //   if (state.status === "error") {
  //     errorDialog?.showModal();
  //   }
  //   if (state.status === "successful") {
  //     successDialog?.showModal();
  //   }
  // }

  function showDialog() {
    setCloseMessage(false);
  }
  if (state.status === "successful") {
    const form = window.document.getElementById("form") as HTMLFormElement;
    form.reset();
  }

  return (
    <>
      <span className="m-auto">فرم ثبت نام در سایت</span>
      <form
        action={formActions}
        className="m-auto flex flex-col justify-center gap-5 w-full px-10 py-5 border rounded-2xl "
        dir="rtl"
        id="form"
      >
        <label htmlFor="name" className="m-auto">
          نام
        </label>
        <input
          type="text"
          name="name"
          placeholder="نام"
          className="m-auto input input-bordered w-full max-w-lg md:w-full"
          required
        />
        <label htmlFor="email" className="m-auto">
          ایمیل
        </label>
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          className="m-auto input input-bordered w-full max-w-lg md:w-full"
          required
        />
        <label htmlFor="phone" className="m-auto">
          شماره موبایل
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          className="m-auto input input-bordered w-full max-w-lg md:w-full"
          minLength={10}
          required
        />
        <label htmlFor="city" className="m-auto">
          استان و شهرستان
        </label>
        <div className="m-auto flex flex-row gap-2 justify-between ">
          <select
            name="city"
            id="city"
            defaultValue={"--استان--"}
            onChange={(e) => {
              const { value } = e.target;
              const county = CitiesName.find((city) => city.name === value);
              setSelectValue(county!);
            }}
            className="select select-bordered w-full max-w-xs m-auto"
            required
          >
            {!selectValue && <option value="--استان--">--استان--</option>}
            {CitiesName.map((city, i) => (
              <option key={i} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <select
            name="county"
            id="county"
            defaultValue={"--شهرستان--"}
            className="select select-bordered w-full max-w-xs m-auto"
            required
          >
            {selectValue?.counties.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
            {!selectValue && <option value="--شهرستان--">--شهرستان--</option>}
          </select>
        </div>
        <label htmlFor="address" className="m-auto">
          آدرس
        </label>
        <input
          type="text"
          name="address"
          placeholder="آدرس"
          className="m-auto input input-bordered input-lg w-full max-w-lg min-h-20"
          required
        />
        <label htmlFor="zipCode" className="m-auto">
          کد پستی
        </label>
        <input
          type="number"
          name="zipCode"
          id="zipCode"
          minLength={10}
          className="m-auto input input-bordered w-full max-w-lg md:w-full"
          required
        />
        <label htmlFor="password" className="m-auto">
          پسورد
        </label>
        <input
          type="password"
          name="password"
          placeholder="<پسورد>"
          className="m-auto input input-bordered w-full max-w-lg md:w-full"
          required
          minLength={6}
        />
        <label htmlFor="confirmPassword" className="m-auto">
          تکرار پسورد
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="<تکرار پسورد> "
          className="m-auto input input-bordered w-full max-w-lg md:w-full"
          required
          minLength={6}
        />
        {state.status === "successful" && closeMessage === false && (
          <div
            id="successDialog"
            className="m-auto w-full max-w-lg rounded-2xl p-5 border bg-success flex flex-col justify-center relative"
          >
            <div className="m-auto text-slate-50"> {state.message}</div>
            <Link className="m-auto text-blue-900" href={"/"}>
              بازگشت به صفحه اصلی
            </Link>
            <button
              className="btn btn-square btn-outline absolute top-2 text-slate-50 left-1"
              onClick={() => {
                setCloseMessage(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {state.status === "error" && closeMessage === false && (
          <div
            id="errorDialog"
            className=" m-auto w-full max-w-lg rounded-2xl p-5 border bg-error text-slate-50 relative"
          >
            {state.message}
            <button
              className="btn btn-square btn-outline text-slate-50 absolute top-2 left-1"
              onClick={() => setCloseMessage(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="m-auto">
          <SubmitButton
            title="ثبت نام"
            className="btn btn-wide"
            onClick={showDialog}
          />
        </div>
      </form>
    </>
  );
}
