import { LiaTimesSolid } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import { OrderMenutItem } from "../types/orders";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { getSelectedItem } from "@/modules/MenuItems/utils/getSelectedItem";
import { formatPrice } from "@/utils/formatPrice";

export default function MenuItemCartCard(item: OrderMenutItem) {
  const {
    removeMenuItem,
    toggleTakeHome,
    items,
    increaseQuantity,
    decreaseQuantity,
  } = useOrderSelectionStore();
  const selectedItem = getSelectedItem(items, item.id);
  return (
    <div className="border-2 border-blue-500 shadow flex flex-col gap-2 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium mb-1">{item.name}</p>
        <div
          onClick={() => removeMenuItem(item.id)}
          className="flex items-center gap-2 border-2 rounded-full text-red-500 border-red-500 p-1.5 duration-300 active:scale-90 ml-auto"
        >
          <FaTrashAlt className="text-sm" />
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <p className="font-semibold">{item.quantity}</p>
        <LiaTimesSolid className="text-sm" />
        <p className="font-semibold text-green-500">
          {formatPrice(item.price)}
        </p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div
          onClick={() => toggleTakeHome(item.id)}
          className={`flex active:scale-90 border duration-300 rounded-full  text-sm font-medium items-center gap-2  px-3 w-fit py-1.5 ${selectedItem?.takeHome ? "bg-blue-500 text-white border-blue-900" : "bg-gray-300 border-gray-400 text-black"}`}
        >
          <p>Take out</p>
        </div>
        <div className="flex items-center">
          <div
            onClick={() => decreaseQuantity(item.id)}
            className="h-7 w-7 duration-300 active:scale-90 cursor-pointer rounded-full border-2 grid place-content-center"
          >
            <Minus size={15} />
          </div>
          <div className="h-7 flex justify-center w-9">
            <p>{selectedItem?.quantity}</p>
          </div>
          <div
            onClick={() => increaseQuantity(item.id)}
            className="h-7 w-7 duration-300 active:scale-90 cursor-pointer rounded-full border-2 grid place-content-center"
          >
            <Plus size={15} />
          </div>
        </div>
      </div>
      <p>{item.takeHome}</p>
    </div>
  );
}
