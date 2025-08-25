import { HiOutlineShoppingBag } from "react-icons/hi";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";

export default function MenuPageHeader() {
  const { toggleCartModal, items} = useOrderSelectionStore();
  return (
    <div className="flex px-4 py-3 border-b border-gray-300 shadow mb-1 justify-between items-center">
      <div className="">
        <p className="text-lg font-semibold">BitePoint</p>
        <p className="text-xs text-gray-600">Delicious Meal</p>
      </div>
      <div
        onClick={toggleCartModal}
        className="h-10 w-10 relative shadow-md cursor-pointer text-white text-xl border-white border-2 duration-300 active:scale-90 hover:bg-blue-600 grid place-content-center rounded-full bg-blue-500"
      >
        <div className={`absolute -top-1.5 -right-1.5 text-xs bg-white rounded-full border-2 border-red-500 duration-300 h-5 w-5 grid place-content-center font-medium text-red-600 ${items.length > 0 ? "opacity-100" : "opacity-0"}`}>
          <p>{items.length}</p>
        </div>
        <HiOutlineShoppingBag />
      </div>
    </div>
  );
}
