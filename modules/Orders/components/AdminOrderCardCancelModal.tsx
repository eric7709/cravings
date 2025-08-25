import ModalOverlay from "@/components/ModalOverlay";
import { Order } from "../types/orders";
import { Dispatch, SetStateAction } from "react";

type Props = {
  order: Order;
  showCancelModal: boolean;
  setShowCancelModal: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  handleOrderCancellation: () => void;
};
export default function AdminOrderCardCancelModal(props: Props) {
  const {
    order,
    showCancelModal,
    setShowCancelModal,
    handleOrderCancellation,
    isPending,
  } = props;

  return (
    <div>
      <ModalOverlay
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      >
        <div className="bg-white rounded-lg shadow-xl lg:w-[400px] mx-4  p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Cancel Order
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Are you sure you want to cancel order{" "}
            <span className="font-semibold text-blue-600">
              #{order.invoiceId}
            </span>{" "}
            for <span className="font-semibold">{order.customerName}</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowCancelModal(false)}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Keep Order
            </button>
            <button
              onClick={handleOrderCancellation}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Cancelling..." : "Yes, Cancel Order"}
            </button>
          </div>
        </div>
      </ModalOverlay>
    </div>
  );
}
