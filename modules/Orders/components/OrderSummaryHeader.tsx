import { Customer } from "@/modules/Customers/types/customer";

type Props = {
  success: boolean;
  customer: Customer | null;
};

export default function OrderSummaryHeader(props: Props) {
  const { customer, success } = props;
  return (
    <div>
      <header className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
        {!success ? (
          <h2 className="text-lg font-bold text-gray-900">Review Your Order</h2>
        ) : (
          <h2 className="text-lg font-semibold text-center text-gray-900">
            Thank you{" "}
            <span className="font-bold text-blue-700">
              {customer?.title} {customer?.name} 😊
            </span>
          </h2>
        )}
      </header>
    </div>
  );
}
