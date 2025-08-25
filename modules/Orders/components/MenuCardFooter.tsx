import { getCustomerFromCookie } from "@/utils/getCustomerFromCookie";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { formatPrice } from "@/utils/formatPrice";

export default function MenuCardFooter() {
  const { items, getTotal, setModal, resetItems } = useOrderSelectionStore();
  const total = getTotal();
  const isEmpty = items.length === 0;

  const handleSubmit = () => {
    const customer = getCustomerFromCookie();
    if (customer) {
      setModal("summary");
    } else {
      setModal("create");
    }
  };

  return (
    <div
      className={` z-50 transition-all duration-300 ${
        isEmpty ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="bg-white border-t border-gray-200 shadow-md p-2 flex items-center justify-between gap-2">
        {/* Clear Button */}
        <button
          onClick={resetItems}
          className="flex items-center gap-1 px-6 py-3.5 bg-red-500 text-white text-[15px] font-medium rounded-lg shadow-sm transition active:scale-95 hover:bg-red-600"
          type="button"
        >
          <FaTrash className="text-xs" />
          Clear
        </button>

        {/* Order Button */}
        <button
          onClick={handleSubmit}
          className="flex items-center gap-1 px-4 flex-1 justify-center py-3.5 bg-blue-500 text-white text-[15px] font-semibold rounded-lg shadow-sm transition active:scale-95 hover:bg-blue-600"
          type="button"
        >
          <FaShoppingCart className="text-sm" />
          Order • {formatPrice(total)}
        </button>
      </div>
    </div>
  );
}
