import { Dispatch, SetStateAction } from "react";
import { Order } from "../types/orders";
import PaymentMethod from "./PaymentMethods";

type Props = {
  order: Order;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  error: string;
};
export default function CashierOrderCardPaymentMethod(props: Props) {
  const { error, order, paymentMethod, setPaymentMethod } = props;
  return (
    <div className={`${order.status !== "completed" && "hidden"} ${error ? "mb-1" : "mb-2"} mt-auto`}>
      <PaymentMethod {...{ paymentMethod, setPaymentMethod }} />
      {error && <p className="text-red-500 text-xs my-1 px-4">{error}</p>}
    </div>
  );
}
