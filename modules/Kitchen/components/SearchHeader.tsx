import OrderPagination from "@/modules/Orders/components/OrderPagination";
import DateDropdown from "./DateDropdown";
import SortDropdown from "./SortDropdown";
import StatusDropdown from "./StatusDropdown";
import ScalingCircle from "./ScalingCircle";
import SearchText from "./SearchText";

export default function SearchHeader() {
  return (
    <div className="flex items-center mt-3 border-b border-gray-200 pb-3 gap-4 px-7">
      <SearchText />
      <DateDropdown />
      <StatusDropdown />
      <OrderPagination />
      <SortDropdown />
      <ScalingCircle />
    </div>
  );
}
