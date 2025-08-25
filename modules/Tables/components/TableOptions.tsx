"use client";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";

import { BsPersonCheck } from "react-icons/bs";
import { BsPersonDash } from "react-icons/bs";
import { Table, TableModalType } from "../types/table";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import { ACTIONS } from "../constants/tables";
import { TableService } from "../services/tableServices";

type Props = {
  table: Table;
  bgColor: string;
};

const actionIcons = [
  <MdOutlineEdit />,
  <BsPersonCheck />,
  <BsPersonDash />,
  <BsQrCode />,
  <FaRegTrashAlt />,
];

export default function TableOptions({ table }: Props) {
  const { activeTable, clearActiveTable, setModal } = useTableSelectionStore();
  const isActive = table.id === activeTable?.id;
  const handleClick = (backdropKey: TableModalType) => {
    setModal(backdropKey);
  };
  return (
    <div
      className={`w-full text-white absolute inset-0 z-40 duration-300 rounded-xl h-full overflow-hidden gap-1 bg-cyan-800 ${TableService.containerClass(
        isActive
      )}`}
    >
      <div className="relative h-full w-full grid grid-cols-2 grid-rows-2 border border-gray-700">
        <div
          onClick={(e: any) => {
            clearActiveTable();
            e.stopPropagation();
          }}
          className={`h-9 w-9 bg-black text-white grid cursor-pointer duration-300 hover:scale-110 active:scale-100 place-content-center rounded-full border-t-2 border-b-2 border-blue-600 absolute top-1/2 ${
            activeTable == null ? "opacity-0 invisible" : "opacity-100 visible"
          } -translate-y-1/2 z-50 left-1/2 -translate-x-1/2`}
        >
          <FaTimes />
        </div>
        {ACTIONS.map(({ label, backdropKey }, key) => {
          const isQRCodeHidden = !activeTable?.waiter && key === 2;
          const isWaiterHidden = activeTable?.waiter && key === 1;
          const isHidden = isQRCodeHidden || isWaiterHidden;
          if (isHidden) return null;
          const visibleIndex = ACTIONS.slice(0, key).filter((_, i) => {
            const hideQRCode = !activeTable?.waiter && i === 2;
            const hideWaiter = activeTable?.waiter && i === 1;
            return !(hideQRCode || hideWaiter);
          }).length;
          const isDiagonal1 = visibleIndex === 0 || visibleIndex === 3;
          const isDiagonal2 = visibleIndex === 1 || visibleIndex === 2;
          return (
            <div
              key={label}
              onClick={() => handleClick(backdropKey as TableModalType)}
              className={`
        flex flex-col justify-center items-center gap-3 cursor-pointer duration-300 active:scale-90
        ${isDiagonal1 ? "bg-blue-800" : ""}
        ${isDiagonal2 ? "bg-black" : ""}
        border-white
      `}
            >
              <p className="text-xl">{actionIcons[key]}</p>
              <p className="text-[13px] font-semibold">{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
