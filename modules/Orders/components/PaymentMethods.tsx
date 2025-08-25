"use client";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  paymentMethod: string
  setPaymentMethod: Dispatch<SetStateAction<string>>
};
export default function PaymentMethods(props: Props) {
  const { paymentMethod, setPaymentMethod } = props;
  const methods = ["cash", "transfer", "card"];
  return (
    <div className="grid px-3 grid-cols-3 gap-1.5">
      {methods.map((el, key) => (
        <div
          onClick={() => setPaymentMethod(el)}
          key={key}
          className={`text-xs duration-300 cursor-pointer active:scale-90 flex justify-center py-2 rounded font-medium text-white ${el == paymentMethod ? "bg-green-500" : "bg-gray-300 text-gray-900"} `}
        >
          <p className={`capitalize`}>{el}</p>
        </div>
      ))}
    </div>
  );
}
