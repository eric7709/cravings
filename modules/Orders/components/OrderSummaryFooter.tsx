"use client";

import { formatPrice } from "@/utils/formatPrice";


type Props = {
  total: number;
  success: boolean;
  isSubmitting: boolean;
  closeModal: () => void;
  resetItems: () => void;
  handleConfirm: () => void;
};

export default function OrderSummaryFooter({
  total,
  success,
  isSubmitting,
  closeModal,
  resetItems,
  handleConfirm,
}: Props) {
  return (
    <footer className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-semibold text-gray-800">Total:</span>
        <span className="text-lg font-extrabold text-gray-900">
          {formatPrice(total)}
        </span>
      </div>
      {success && (
        <p className="mb-4 text-center text-green-700 font-semibold text-sm">
          ✅ Order placed successfully!
        </p>
      )}
      {!success && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              closeModal();
              resetItems();
            }}
            disabled={isSubmitting}
            className="py-3.5 rounded-lg cursor-pointer bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition active:scale-95 text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`py-3.5 rounded-lg cursor-pointer text-white font-semibold transition shadow-md text-sm ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 active:scale-95 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Placing..." : "Confirm"}
          </button>
        </div>
      )}
    </footer>
  );
}
