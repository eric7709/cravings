"use client";
import { useRef, useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOutsideClickToggle } from "@/hooks/useOutsideClickToggle";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
type QuickSelectType = "today" | "week" | "month";
type Props = {
  zIndex?: string;
};

export default function DateDropdown(props: Props) {
  const { dateFrom, dateTo, setDateRange } = useOrderDataStore();

  const {
    ref: dropdownRef,
    isOpen,
    toggle,
    close,
  } = useOutsideClickToggle<HTMLDivElement>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Sync local state with store
  useEffect(() => {
    setStartDate(dateFrom ? new Date(dateFrom) : null);
    setEndDate(dateTo ? new Date(dateTo) : null);
  }, [dateFrom, dateTo]);

  const setRange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setDateRange(
      start?.toISOString() || undefined,
      end?.toISOString() || undefined
    );
  };

  const getQuickSelectRange = (type: QuickSelectType) => {
    const today = new Date(); 
    let start = new Date(today);
    let end = new Date(today);

    if (type === "today") {
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999); 
    } else if (type === "week") {
      const dayOfWeek = today.getDay();
      start.setDate(today.getDate() - dayOfWeek); 
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
    } else if (type === "month") {
      start = new Date(today.getFullYear(), today.getMonth(), 1); 
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
    }
    return { start, end };
  };
  const handleQuickSelect = (type: QuickSelectType) => {
    const { start, end } = getQuickSelectRange(type);
    setRange(start, end);
    close();
  };
  const handleClear = () => {
    setRange(null, null);
    close();
  };
  const handleApply = () => {
    setRange(startDate, endDate);
    close();
  };
  const quickSelects: { label: string; type: QuickSelectType }[] = [
    { label: "Today", type: "today" },
    { label: "This Week", type: "week" },
    { label: "This Month", type: "month" },
  ];
  const formatShortDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  const getPlaceholderText = () => {
    if (!startDate && !endDate) return "Select date";
    if (startDate && endDate) {
      const start = formatShortDate(startDate);
      const end = formatShortDate(endDate);
      return `${start} - ${end}`;
    }
    const todayRange = getQuickSelectRange("today");
    const weekRange = getQuickSelectRange("week");
    const monthRange = getQuickSelectRange("month");
    if (
      startDate?.toDateString() === todayRange.start.toDateString() &&
      endDate?.toDateString() === todayRange.end.toDateString()
    ) {
      return "Today";
    }
    if (
      startDate?.toDateString() === weekRange.start.toDateString() &&
      endDate?.toDateString() === weekRange.end.toDateString()
    ) {
      return "This Week";
    }
    if (
      startDate?.toDateString() === monthRange.start.toDateString() &&
      endDate?.toDateString() === monthRange.end.toDateString()
    ) {
      return "This Month";
    }
    return `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
  };
  return (
    <div className={`relative ${props.zIndex} w-full`}>
      <div
        ref={triggerRef}
        onClick={toggle}
        className="h-10 text-xs cursor-pointer font-medium gap-2 items-center flex px-3 border border-gray-200 rounded-md"
      >
        <Calendar size={17} />
        <p>{getPlaceholderText()}</p>
        {(startDate || endDate) && (
          <FaTimes
            className="text-red-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          />
        )}
      </div>
      <div
        ref={dropdownRef}
        className={`bg-white border absolute top-[110%] left-0 border-gray-200 rounded-md shadow-sm p-4 w-80 space-y-3 z-50 transition-all duration-200 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div>
          <p className="text-sm font-medium mb-3">Quick Select</p>
          <div className="grid grid-cols-3 gap-2">
            {quickSelects.map(({ label, type }) => (
              <button
                key={type}
                onClick={() => handleQuickSelect(type)}
                className="px-3 py-2.5 text-xs font-medium bg-gray-100 rounded hover:bg-gray-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="">
          <label className="block text-xs font-medium mb-1">Start Date</label>
          <div className="w-full grid grid-cols-1">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border rounded px-2 py-2 text-xs"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">End Date</label>
          <div className="w-full grid grid-cols-1">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full border rounded px-2 py-2 text-xs"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleClear}
            className="text-[13px] font-medium text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 font-medium bg-orange-500 text-white rounded hover:bg-orange-600 text-[13px]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
