import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  startDate: Date;
  endDate: Date;
  onChange?: (range: { startDate: Date; endDate: Date }) => void;
};

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: Props) {
  const [range, setRange] = useState([
    { startDate, endDate, key: "selection" },
  ]);

  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRange([{ startDate, endDate, key: "selection" }]);
  }, [startDate, endDate]);

  const handleSelect = (ranges: any) => {
    setRange([ranges.selection]);
    if (onChange)
      onChange({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
      });
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-5">
      <p className="font-medium hidden lg:block text-sm text-gray-700">Date Range</p>
      <div className="relative" ref={pickerRef}>
        <input
          readOnly
          value={`${range[0].startDate.toLocaleDateString()} - ${range[0].endDate.toLocaleDateString()}`}
          onClick={() => setOpen(!open)}
          className="cursor-pointer rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none w-full text-sm text-gray-700"
        />
        {open && (
          <div className="absolute z-50 mt-2 shadow-lg rounded-xl overflow-hidden">
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="rounded-xl text-gray-700 text-sm"
            />
          </div>
        )}
        <style jsx global>{`
          /* Compact text inside react-date-range */
          .rdrCalendarWrapper,
          .rdrMonths,
          .rdrMonth {
            border-radius: 0.15rem; /* Tailwind rounded-xl */
          }

          .rdrMonthAndYearPickers,
          .rdrWeekDay,
          .rdrDayNumber span,
          .rdrDayNumber span:hover,
          .rdrDayPassive,
          .rdrDaySelected,
          .rdrDayStartPreview,
          .rdrDayInPreview,
          .rdrDayEndPreview {
            font-size: 0.75rem; /* Tailwind text-xs */
            color: #4b5563; /* Tailwind gray-700 */
          }

          .rdrInput {
            font-size: 0.875rem; /* text-sm for editable inputs */
            color: #374151; /* Tailwind gray-800 */
          }
        `}</style>
      </div>
    </div>
  );
}
