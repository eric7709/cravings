"use client";
import { FaUtensils } from "react-icons/fa";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import { Table } from "../types/table";
import TableOptions from "./TableOptions";

export default function TableCard(table: Table) {
  const { setActiveTable } = useTableSelectionStore();
  if (!table) return null;
  const hasWaiter = !!table.waiter;
  const allocatedColors = [
    "bg-blue-950",
    "bg-red-900",
    "bg-amber-900",
    "bg-emerald-900",
  ];
  const bgColor = hasWaiter
    ? allocatedColors[table.tableNumber % allocatedColors.length]
    : "bg-gray-800";
  const handleClick = () => {
    setActiveTable(table);
  };
  return (
    <div
      onClick={handleClick}
      className="w-full select-none overflow-hidden rounded-xl relative h-fit"
    >
      <TableOptions {...{ bgColor, table }} />
      <div
        className={`w-full z-20 rounded-xl shadow border border-gray-200 px-6 py-8 text-center bg-gray-800 text-white cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
      >
        {/* Table Label */}
        <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide">
          <FaUtensils className="text-white" />
          Table
        </div>

        {/* Table Number */}
        <div className="text-5xl font-extrabold mt-1 drop-shadow-sm">
          {table.tableNumber}
        </div>

        {/* Table Name */}
        <div className="text-lg mt-2 capitalize font-medium">{table.name}</div>

        {/* Waiter / Unallocated */}
        <div className="mt-6">
          <div className="text-base">
            {hasWaiter ? (
              <div className="flex justify-center items-center gap-2 ">
                <img src="/waiter.png" className="h-6" />
                <span className="inline-block font-semibold text-[15px] mt-1">
                  {`${table.waiter?.firstName ?? ""} ${
                    table.waiter?.lastName ?? ""
                  }`}
                </span>
              </div>
            ) : (
              <span className="inline-block font-semibold text-sm mt-1 text-red-500">
                Unallocated
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
