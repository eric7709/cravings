import DateDropdown from "./DateDropdown";
import SearchText from "./SearchText";
import SortDropdown from "./SortDropdown";
import StatusDropdown from "./StatusDropdown";

export default function AdminOrderHeader() {
  return (
    <div className="flex items-center mt-3 border-b border-gray-200 pb-3 gap-4 px-3">
      <SearchText />
      <DateDropdown />
      <div className="ml-auto flex gap-4">
        <StatusDropdown />
        <SortDropdown />
      </div>
    </div>
  );
}
