import { useEffect, useState } from "react";
import AdminTitle from "@/modules/Orders/components/AdminTitle";
import TimePeriodDropdown from "./TimePeriodDropdown";
import { Divide as Hamburger } from "hamburger-react";
import DateRangePicker from "./DateRangePicker";
import { Filter } from "lucide-react";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import { useUIStore } from "@/store/useUIStore";




export default function AnalyticsHeader() {
  // Fixed date initialization
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7); // Create separate date object
  
  const [range, setRange] = useState({
    startDate,
    endDate,
    label: "This Week",
  });

  // When dropdown changes
  const handleDropdownChange = (newRange: {
    startDate: Date;
    endDate: Date;
    label: string;
  }) => {
    setRange(newRange);
  };

  // When date range picker changes
  const handleDateRangeChange = (newRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    setRange({ ...newRange, label: "Custom Range" });
  };

  const { setDateRange } = useAnalyticsDataStore();

  useEffect(() => {
    setDateRange(range.startDate, range.endDate, range.label);
  }, [range, setDateRange]);

  const { toggleDrawer, drawerOpened } = useUIStore();
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <div className="h-16 bg-white flex flex-col lg:flex-row relative z-50 justify-between lg:items-center lg:px-4 border-gray-300 border-b">
      <div className="flex items-center h-full">
        <button className=" lg:hidden">
          <Hamburger size={18} toggled={drawerOpened} toggle={toggleDrawer} />
        </button>
        <AdminTitle title="Analytics" />
      </div>
      <Filter
        size={18}
        className="lg:hidden absolute top-4 right-3"
        onClick={() => setOverlayOpen(!overlayOpen)}
      />
      <div className="hidden lg:flex items-center gap-3">
        <DateRangePicker
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={handleDateRangeChange}
        />
        <TimePeriodDropdown
          selectedLabel={range.label}
          onChange={handleDropdownChange}
        />
      </div>
      <div
        className={` lg:hidden overflow-hidden flex-wrap border-b border-gray-300 shadow top-16 w-full bg-white  duration-300 flex  justify-center items-center gap-3 ${overlayOpen ? "opacity-100 h-fit visible p-4" : "invisible h-0 opacity-0"}`}
      >
        <DateRangePicker
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={handleDateRangeChange}
        />
        <TimePeriodDropdown
          selectedLabel={range.label}
          onChange={handleDropdownChange}
        />
      </div>
    </div>
  );
}