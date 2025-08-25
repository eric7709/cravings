import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { formatPrice } from "@/utils/formatPrice";

export default function MenuItemCardNameDescriptionPrice(menuItem: MenuItem) {
  return (
    <div className="mb-3">
      <div className="flex justify-between gap-5 ">
        <p className={`font-semibold ${!menuItem.isAvailable && "opacity-50"}`}>{menuItem.name} </p>
        <p className={`font-semibold ${!menuItem.isAvailable && "opacity-50"} text-green-500`}>{formatPrice(menuItem.price)}</p>
      </div>
      <p className={`py-1 w-fit text-[13px] text-gray-700 rounded italic ${!menuItem.isAvailable && "opacity-50"}`}>
        {menuItem.category?.name}
      </p>
      <p className={`text-sm ${!menuItem.isAvailable && "opacity-50"} mt-2`}>{menuItem.description}</p>
    </div>
  );
}
