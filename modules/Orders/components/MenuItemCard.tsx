import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { isSelected } from "@/modules/MenuItems/utils/isSelected";
import MenuItemCardNameDescriptionPrice from "./MenuItemCardNameDescriptionPrice";
import MenuItemCardQuantityTakeHome from "./MenuItemCardQuantityTakeHome";
import HorizontalFoodCard from "@/app/test/page";

type Props = {
  menuItem: MenuItem;
};
export default function MenuItemCard(props: Props) {
  const { menuItem } = props;
  const { items } = useOrderSelectionStore();
  const selected = isSelected(items, menuItem.id);
  return (
    <div
      className={`duration-300 relative rounded-lg shadow-md ${selected ? "bg-blue-100" : "bg-gray-50"}`}
    >
     <HorizontalFoodCard {...menuItem}/>
    </div>
  );
}
