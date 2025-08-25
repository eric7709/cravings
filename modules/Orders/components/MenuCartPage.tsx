"use client";
import { FaTimes } from "react-icons/fa";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import MenuItemCartCard from "./MenuItemCartCard";
import { useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import MenuCardFooter from "./MenuCardFooter";

export default function MenuCartPage() {
  const { items, cartModalOpened, closeCartModal } = useOrderSelectionStore();
  useEffect(() => {
    if (items.length == 0) {
      closeCartModal();
    }
  }, [items]);
  return (
    <div
      className={`fixed h-screen flex flex-col duration-500 bg-white z-30 ${cartModalOpened ? "inset-y-0 inset-x-0 opacity-100 visible" : "-inset-y-7 inset-x-0 opacity-0 invisible"}`}
    >
      <div className="flex border-b border-gray-300 p-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative shadow-md cursor-pointer text-white text-xl border-white border-2 duration-300 active:scale-90 hover:bg-blue-600 grid place-content-center rounded-full bg-blue-500">
            <HiOutlineShoppingBag />
          </div>
          <div className="leading-none">
            <p className="font-semibold text-lg">Your Order</p>
            {items.length >= 1 && (
              <p>
                {items.length} {items.length == 1 ? "item" : "items"}
              </p>
            )}
          </div>
        </div>
        <div
          onClick={closeCartModal}
          className="cursor-pointer duration-300 hover:scale-110 active:scale-90"
        >
          <FaTimes className="text-xl" />
        </div>
      </div>
      {items.length > 0 && (
        <div className="flex flex-1 p-4 overflow-y-auto flex-col gap-5">
          {items.map((item) => (
            <MenuItemCartCard {...item } key={item.id} />
          ))}
        </div>
      )}
      {items.length == 0 && (
        <div className="flex-1 text-2xl font-medium grid place-content-center">
          <p>Your Card is Empty</p>
        </div>
      )}
      <MenuCardFooter />
    </div>
  );
}
