"use client";
import BitePointLogo from "@/components/Logo";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  type: "kitchen" | "cahsier" | "admin"
}

export default function TitleHeader(props: Props) {
  const {  orders } = useOrderDataStore();
  const total = orders.reduce((acc, order) => {
    const orderTotal = order.items?.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);
    return acc + orderTotal;
  }, 0);

  return (
    <div className="flex px-7 z-30 relative items-center py-2 border-b border-gray-200 justify-between">
      <BitePointLogo />
      <div className="flex gap-8 items-center">
        <p className="text-[13px] font-medium">
          Active Orders:{" "}
          <span className="text-sm ml-1 text-emerald-600">{4}</span>
        </p>
        <p className="text-[13px] font-medium">
          Total:{" "}
          <span className="text-sm ml-1 text-blue-600">
            {formatPrice(total)}
          </span>
        </p>
        <NotificationDropdown />
        <ProfileDropdown />
      </div>
    </div>
  );
}
