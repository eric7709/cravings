"use client";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useTableDataStore } from "../store/useTableDataStore";
import { FILTER_TABLE_DATA } from "../constants/tables";

export default function AllocationFilterDropdown() {
  const { setAllocationFilter } = useTableDataStore();
  const [opened, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const [active, setActive] = useState(0);
  return (
    <div className="relative z-20 w-full">
      <TiArrowSortedDown
        className={`absolute right-2 top-1/2 -translate-y-1/2 duration-300 ${
          opened ? "rotate-180" : ""
        }`}
      />
      <div
        onClick={() => setOpen(true)}
        className="flex select-none h-10 px-2 border-gray-200 border rounded-md relative text-sm items-center justify-between cursor-pointer"
      >
        <p className="capitalize text-xs font-medium">{FILTER_TABLE_DATA[active].label}</p>
      </div>
      <div
        ref={ref}
        className={`text-xs absolute bg-white top-[110%] w-full border-gray-200 border rounded-md left-0 transition-opacity duration-200 ${
          opened ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <p className="text-[13px] p-2 font-normal border-b border-gray-200">
          Filter Allocation
        </p>
        <div className="space-y-1">
          {FILTER_TABLE_DATA.map(({ label, value }, key) => (
            <div
              key={value}
              onClick={(e) => {
                setActive(key);
                setAllocationFilter(value);
                setOpen(false);
                e.stopPropagation();
              }}
              className={`flex p-2 hover:bg-blue-800 hover:text-white active:scale-[0.98] duration-300 items-center cursor-pointer justify-between ${
                active === key ? "bg-blue-500 text-white" : ""
              }`}
            >
              <p className="capitalize font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
