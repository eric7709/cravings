import React from "react";
import { MostMeasurementAnalytics } from "../types/analytics";
import AnalyticsTitle from "./AnalyticsTitle";
import { LucideIcon } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  title: string;
  icon: LucideIcon;
  bgColor?: string;
  iconBg?: string; // icon wrapper bg
  iconColor?: string; // icon color
  iconSize?: string;
  data: MostMeasurementAnalytics[] | undefined;
};

export default function SalesCardGrid(props: Props) {
  const { title, data, icon, bgColor, iconBg, iconColor, iconSize } = props;
  if (!data) return null;
  return (
    <div className="">
      <AnalyticsTitle
        {...{ icon, title, bgColor, iconBg, iconColor, iconSize }}
      />
      <div
        className={`grid grid-cols-1 gap-5 ${data.length === 1 ? "lg:grid-cols-1" : data.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`py-8 relative group bg-white overflow-hidden w-full rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition 
               text-white`}
          >
            <div className="relative z-10 space-y-0.5 text-center transition-colors duration-300 text-black">
              <p className="text-lg capitalize font-semibold ">
                {item.title}
              </p>
              <p className="text-2xl font-extrabold">
                {formatPrice(item.totalRevenue)}
              </p>
              <p className="text-sm opacity-80">
                {item.totalOrders} {item.totalOrders <= 1 ? "Order" : "Orders"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
