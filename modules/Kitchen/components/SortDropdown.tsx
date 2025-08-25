"use client";

import { useClickOutside } from "@/hooks/useOutsideClick";
import { useState } from "react";
import { Order } from "@/modules/Orders/types/orders";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import { TiArrowSortedDown } from "react-icons/ti";

type Props = {
  zIndex?: string;
};

export default function SortDropdown({ zIndex }: Props) {
  const { setSort } = useOrderDataStore();
  const [opened, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const sortItems: { label: string; field: keyof Order; order: "asc" | "desc"; color: string }[] = [
    { label: "Table", field: "tableName", order: "asc", color: "bg-blue-500" },
    { label: "Customer (Asc)", field: "customerName", order: "asc", color: "bg-green-500" },
    { label: "Customer (Desc)", field: "customerName", order: "desc", color: "bg-red-500" },
    { label: "Date (Asc)", field: "createdAt", order: "asc", color: "bg-yellow-500" },
    { label: "Date (Desc)", field: "createdAt", order: "desc", color: "bg-purple-500" },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className={`relative ${zIndex} w-full`}>
      <TiArrowSortedDown
        className={`absolute right-2 top-1/2 -translate-y-1/2 duration-300 ${opened && "rotate-180"}`}
      />
      <div
        onClick={() => setOpen(true)}
        className="flex select-none h-10 px-2 border-gray-200 border rounded-md relative text-sm items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 ${sortItems[active].color} border border-gray-700 rounded-full`}></div>
          <p className="capitalize text-xs font-medium">{sortItems[active].label}</p>
        </div>
      </div>
      <div
        ref={ref}
        className={`text-xs absolute bg-white top-[110%] w-full border-gray-200 border rounded-md left-0 ${opened ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <p className="text-[13px] p-2 font-normal border-gray-200 border-b">
          Sort by
        </p>
        <div className="space-y-1">
          {sortItems.map(({ label, field, order, color }, key) => (
            <div
              onClick={(e) => {
                setActive(key);
                setSort(field, order);
                setOpen(false);
                e.stopPropagation();
              }}
              className={`flex p-2 hover:bg-blue-800 hover:text-white active:scale-[.98] duration-300 items-center cursor-pointer justify-between ${active === key && `${color} text-white`}`}
              key={label}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 ${color} ${active === key ? "border-white" : "border-gray-700"} border-2 rounded-full`}
                ></div>
                <p className="capitalize font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}