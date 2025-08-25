"use client";
import { getCustomerFromCookie } from "@/utils/getCustomerFromCookie";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { formatPrice } from "@/utils/formatPrice";

export default function CreateOrderButton() {
  const { getTotal, items, setModal } = useOrderSelectionStore();

  const handleSubmit = () => {
    const customer = getCustomerFromCookie();
    setModal(customer ? "summary" : "create");
  };

  const isVisible = items.length > 0;

  return (
    <div
      className={`overflow-hidden sticky px-4 py-3 border-t border-gray-300 bottom-0 duration-500 flex justify-between items-center ${
        isVisible ? "opacity-100" : "h-0 opacity-0"
      }`}
    >
      <p className="font-semibold text-lg">
        Total: {formatPrice(getTotal())}
      </p>
      <button
        onClick={handleSubmit}
        className="w-fit px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm cursor-pointer active:scale-90 duration-300"
      >
        Place Order
      </button>
    </div>
  );
}
