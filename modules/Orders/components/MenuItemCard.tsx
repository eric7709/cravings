"use client";
import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { formatPrice } from "@/utils/formatPrice";
import { useOrderSelectionStore } from "@/modules/Orders/store/useOrderSelectionStore";
import { getSelectedItem } from "@/modules/MenuItems/utils/getSelectedItem";

export default function MenuItemCard(menuItem: MenuItem) {
  const { items } = useOrderSelectionStore();
  const selectedItem = getSelectedItem(items, menuItem.id);

  const {
    addMenuItem,
    increaseQuantity,
    decreaseQuantity,
    removeMenuItem,
    toggleTakeHome,
  } = useOrderSelectionStore();

  const addToCart = () => {
    if (menuItem.isAvailable === false) return;
    addMenuItem(menuItem);
  };

  const incrementQuantity = () => {
    if (menuItem.isAvailable === false) return;
    increaseQuantity(menuItem.id);
  };

  const decrementQuantity = () => {
    if (menuItem.isAvailable === false) return;
    if (selectedItem?.quantity && selectedItem.quantity > 1) {
      decreaseQuantity(menuItem.id);
    }
  };

  const deleteItem = () => {
    removeMenuItem(menuItem.id);
  };

  const isUnavailable = menuItem.isAvailable === false;

  return (
    <div
      className={`bg-transparent rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
        isUnavailable ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex p-3 gap-3">
        {/* Image Section */}
        <div className="relative h-28">
          <img
            src={
              menuItem.imageUrl ||
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            }
            alt={menuItem.name}
            className="w-28 h-full rounded-xl object-cover flex-shrink-0"
          />

          {/* Take Home Toggle */}
          {!isUnavailable &&
            selectedItem?.quantity &&
            selectedItem.quantity > 0 && (
              <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center p-3">
                <button
                  onClick={() => toggleTakeHome(menuItem.id)}
                  className={`px-3 h-8 rounded-full text-xs font-semibold transition-all duration-200 shadow-lg ${
                    selectedItem?.takeHome
                      ? "bg-blue-500 text-white scale-105 shadow-blue-500/25"
                      : "bg-white/95 text-gray-800 hover:bg-white hover:scale-105 hover:shadow-xl"
                  }`}
                >
                  <span className="text-[11px]">Take Home</span>
                </button>
              </div>
            )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h4
              className={`font-medium ${
                isUnavailable ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {menuItem.name}
            </h4>

            {/* Remove button */}
            {!isUnavailable &&
              selectedItem?.quantity &&
              selectedItem.quantity > 0 && (
                <button
                  onClick={deleteItem}
                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
          </div>

          {/* Description or Unavailable */}
          {isUnavailable ? (
            <p className="text-red-600 font-bold mb-2">Unavailable</p>
          ) : (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {menuItem.description ||
                "Delicious meal prepared with fresh ingredients"}
            </p>
          )}

          {/* Price & Controls */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`font-semibold ${
                isUnavailable ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {formatPrice(menuItem.price)}
            </span>

            {!isUnavailable &&
            (!selectedItem?.quantity || selectedItem.quantity === 0) ? (
              <button
                onClick={addToCart}
                className="bg-emerald-500 grid place-content-center hover:bg-emerald-600 text-xl text-white h-7 w-7 rounded-full cursor-pointer font-medium transition-colors"
              >
                <Plus className="w-4 h-4 stroke-4" />
              </button>
            ) : (
              !isUnavailable && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    className="w-7 h-7 rounded-full border border-emerald-500 text-emerald-500 flex items-center justify-center hover:bg-emerald-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 stroke-4" />
                  </button>

                  <span className="font-semibold text-gray-900 min-w-[1.5rem] text-center text-sm">
                    {selectedItem?.quantity}
                  </span>

                  <button
                    onClick={incrementQuantity}
                    className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 stroke-4" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
