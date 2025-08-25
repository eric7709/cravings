import { useState, useRef, useEffect } from "react";

type Props = {
  selectedLabel: string;
  onChange?: (range: { startDate: Date; endDate: Date; label: string }) => void;
};

export default function TimePeriodDropdown({ selectedLabel, onChange }: Props) {
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(selectedLabel);
  }, [selectedLabel]);

  const periods = [
    "Yesterday",
    "Today",
    "Last Week",
    "This Week",
    "Last Month",
    "This Month",
    "3 Months",
    "6 Months",
    "This Year",
    "Last Year",
  ];

  // Calculate actual date ranges for each period
  const getDateRange = (period: string) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (period) {
      case "Today":
        startDate = new Date(now);
        endDate = new Date(now);
        break;
      case "Yesterday":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 1);
        endDate = new Date(startDate);
        break;
      case "Last Week":
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day - 6); // Monday of last week
        endDate = new Date(now);
        endDate.setDate(now.getDate() - day); // Sunday of last week
        break;
      case "This Week":
        const weekday = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - weekday + 1); // Monday
        endDate = new Date(now);
        break;
      case "Last Month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case "This Month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case "3 Months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = new Date(now);
        break;
      case "6 Months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        endDate = new Date(now);
        break;
      case "This Year":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      case "Last Year":
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        startDate = new Date(now);
        endDate = new Date(now);
    }

    return { startDate, endDate };
  };

  const handleSelect = (period: string) => {
    setSelected(period);
    setOpen(false);
    const range = getDateRange(period);
    if (onChange) onChange({ ...range, label: period });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white py-2 px-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200"
      >
        {selected}
        <svg
          className={`w-3 h-3 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-auto max-h-60">
          {periods.map((p, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(p)}
              className={`cursor-pointer px-3 py-1 text-sm hover:bg-blue-500 hover:text-white transition ${
                selected === p ? "bg-blue-100" : ""
              }`}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
