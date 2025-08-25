import { Table } from "@/modules/Tables/types/table";
import { Order } from "../types/orders";
import { Clock, CreditCard, ShoppingBag, User, Utensils } from "lucide-react";
import Image from "next/image";
import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat";

type Props = {
  currentTable: Table | null;
  order: Order;
  count: number;
};
export default function AdminOrderCardMetaData(props: Props) {
  const { currentTable, order, count } = props;
  const formatItemsCount = `${count} ${count === 1 ? "Item" : "Items"}`;
  console.log(order, "ORDER WAITER")
  return (
    <div className="grid grid-cols-2 gap-1.5 mb-2.5 p-2 bg-white shadow-md rounded-md border border-slate-100">
      <div className="flex items-center gap-1.5 text-xs text-slate-600">
        <Clock
          size={12}
          className="text-slate-500 flex-shrink-0"
          strokeWidth={2}
        />
        <span className="font-medium">
          {convertTo12HourFormat(order.createdAt)}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-600">
        <Utensils
          size={12}
          className="text-slate-500 flex-shrink-0"
          strokeWidth={2}
        />
        <span className="font-medium">
          Table #{currentTable?.tableNumber ?? "—"}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-600">
        <ShoppingBag
          size={12}
          className="text-slate-500 flex-shrink-0"
          strokeWidth={2}
        />
        <span className="font-medium">{formatItemsCount}</span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-600">
        <CreditCard
          size={12}
          className="text-slate-500 flex-shrink-0"
          strokeWidth={2}
        />
        <span className="font-medium capitalize">
          {order.paymentMethod || "N/A"}
        </span>
      </div>
      {order.waiterName && (
        <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 col-span-2">
          <Image src={"/waiter.png"} height={10} alt="Waiter" width={15}/>
          <span className="text-black">Waiter:</span>
          <span className="font-medium capitalize truncate">
            {order.waiterName}
          </span>
        </div>
      )}
    </div>
  );
}
