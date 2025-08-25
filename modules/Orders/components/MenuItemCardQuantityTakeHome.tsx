import { Minus, Plus } from "lucide-react";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { getSelectedItem } from "@/modules/MenuItems/utils/getSelectedItem";
import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { isSelected } from "@/modules/MenuItems/utils/isSelected";


export default function MenuItemCardQuantityTakeHome(menuItem: MenuItem) {
  const {
    items,
    addMenuItem,
    decreaseQuantity,
    toggleTakeHome,
    increaseQuantity,
  } = useOrderSelectionStore();
  const selectedItem = getSelectedItem(items, menuItem.id);
  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => addMenuItem(menuItem)}
        className={`duration-300 cursor-pointer mx-auto overflow-hidden grid place-content-center h-12 rounded-full bg-blue-500 text-white active:scale-90 shadow-md ${isSelected(items, menuItem.id) ? "w-0" : "w-20"}`}
      >
        <Plus />
      </div>
      <div
        className={`flex h-12 overflow-hidden items-center justify-between ${isSelected(items, menuItem.id) ? "flex-1" : "flex-[0]"}`}
      >
        <div className="flex">
          <div
            onClick={() => decreaseQuantity(menuItem.id)}
            className="h-7 w-7 rounded-full border-2 grid place-content-center"
          >
            <Minus size={15} />
          </div>
          <div className="h-7 flex justify-center w-9">
            <p>{selectedItem?.quantity}</p>
          </div>
          <div
            onClick={() => increaseQuantity(menuItem.id)}
            className="h-7 w-7 rounded-full border-2 grid place-content-center"
          >
            <Plus size={15} />
          </div>
        </div>
        <div
          onClick={() => toggleTakeHome(menuItem.id)}
          className={`flex items-center gap-2 w-fit px-3 py-2  text-sm font-medium rounded-full cursor-pointer border duration-300 active:scale-90 ${selectedItem?.takeHome ? "bg-blue-500 text-white border-blue-900" : "bg-gray-300 text-black border-gray-400"}`}
        >
          <p>Take out</p>
        </div>
      </div>
    </div>
  );
}
