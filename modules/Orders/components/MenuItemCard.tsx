import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { isSelected } from "@/modules/MenuItems/utils/isSelected";
import MenuItemCardNameDescriptionPrice from "./MenuItemCardNameDescriptionPrice";
import MenuItemCardQuantityTakeHome from "./MenuItemCardQuantityTakeHome";

type Props = {
  menuItem: MenuItem;
};
export default function MenuItemCard(props: Props) {
  const { menuItem } = props;
  const { items } = useOrderSelectionStore();
  const selected = isSelected(items, menuItem.id);
  return (
    <div
      className={`duration-300 relative p-3 rounded-lg shadow-md ${selected ? "bg-blue-100" : "bg-gray-50"}`}
    >
      <MenuItemCardNameDescriptionPrice {...menuItem} />
      <div className={`${!menuItem.isAvailable && "opacity-20"}`}>
        <MenuItemCardQuantityTakeHome {...menuItem } />
      </div>
      {!menuItem.isAvailable && (
        <div className="inset-0 bg-gray-200/20 absolute rounded-lg flex items-center justify-center text-red-600 font-semibold text-lg">
          <p>Unavailable</p>
        </div>
      )}
    </div>
  );
}
