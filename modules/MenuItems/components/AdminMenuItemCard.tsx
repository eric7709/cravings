"use client";
import { FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";
import { useMenuItemSelectionStore } from "../store/useMenuItemSelectionStore";
import { MenuItem } from "../types/menuItems";
import { useToggleMenuItemAvailability } from "../hooks/useMenuItemsServices";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im"; 
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  menuItem: MenuItem;
  index?: number;
};

export default function AdminMenuItemCard({ menuItem, index }: Props) {
  const { selectMenuItem, setModal, } = useMenuItemSelectionStore();
  const { updateMenuItem } = useMenuItemDataStore();
  const { mutate, data, isPending } = useToggleMenuItemAvailability();

  useEffect(() => {
    if (data) {
    updateMenuItem(data.id, data);
    }
  }, [data]);

  return (
    <div
      onClick={() => {
        selectMenuItem(menuItem);
        setModal("update");
      }}
      className={`w-full  h-56 p-3 bg-emerald-900 text-white rounded-lg shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer relative`}
    >
      <div className="h-full relative z-40 flex flex-col items-center justify-center">
        <div
          onClick={(e) => {
            if (!isPending) {
              mutate({ id: menuItem.id, isAvailable: !menuItem.isAvailable });
              e.stopPropagation();
            }
          }}
          className="h-8 w-8 active:scale-90 bg-gradient-to-br from-black to-gray-900 grid border-2 absolute top-3 text-white left-4 border-white rounded-full place-content-center"
        >
          {isPending ? (
            <ImSpinner2 className="animate-spin text-sm" />
          ) : menuItem.isAvailable ? (
            <FaEye />
          ) : (
            <FaEyeSlash />
          )}
        </div>

        <div
          onClick={(e) => {
            selectMenuItem(menuItem)
            setModal("delete");
            e.stopPropagation();
          }}
          className="h-8 w-8 bg-gradient-to-br from-black to-gray-900 grid border-2 absolute top-3 text-white right-4 border-white rounded-full place-content-center"
        >
          <FaTrashAlt />
        </div>

        <p className="text-md mt-5 text-center font-semibold capitalize">
          {menuItem.name}
        </p>
        <p className="text-[13px] font-medium capitalize mt-1 text-gray-200">
          {menuItem.category?.name}
        </p>
      </div>
      <p className="absolute bottom-3 left-1/2 font-semibold -translate-x-1/2">
        {formatPrice(menuItem.price)}
      </p>
    </div>
  );
}
