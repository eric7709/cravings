"use client";
import { useState } from "react";
import { getStyle } from "../utils/getStyle";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import { STATUSES } from "../constants/statuses";


type Props = {
  zIndex?: string
}

export default function StatusDropdown(props: Props) {
  const { setStatus, counts } = useOrderDataStore();
  const [active, setActive] = useState(0);
  const [opened, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div className={`relative bg-white ${props.zIndex} w-full`}>
      <div
        onClick={() => setOpen(true)}
        className="flex select-none  h-10 px-2 border-gray-200 border rounded-md relative text-sm items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 ${getStyle(STATUSES[active][1]).bg} ${getStyle(STATUSES[active][1]).border} border rounded-full`}
          ></div>
          <p className="capitalize text-xs font-medium">
            {STATUSES[active][1]}
          </p>
        </div>
        <p className="font-semibold text-xs">
          {counts[STATUSES[active][1]] || 0}
        </p>
      </div>

      <div
        ref={ref}
        className={`text-xs absolute bg-white top-[110%] w-full border-gray-200 border rounded-md left-0 ${
          opened ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <p className="text-[13px] p-2 font-normal border-gray-200 border-b">
          Filter by status
        </p>
        <div className="space-y-1">
          {STATUSES.map(([label, value], key) => (
            <div
              onClick={(e) => {
                setActive(key);
                setStatus(value);
                setOpen(false);
                e.stopPropagation();
              }}
              className={`flex p-2 hover:bg-blue-800 hover:text-white active:scale-[.98] duration-300 items-center cursor-pointer justify-between ${
                active == key && getStyle(value).bg
              }`}
              key={value}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 ${getStyle(value).bg} ${
                    active == key ? "border-white" : `${getStyle(value).border}`
                  } border-2 rounded-full`}
                ></div>
                <p className="capitalize font-medium">{label}</p>
              </div>
              <p
                className={`font-medium duration-300 ${
                  active == key && "-translate-x-1.5 text-white font-bold"
                }`}
              >
                {counts[value] || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
