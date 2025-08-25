"use client";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import { useState, useEffect } from "react";

type Props = {
  zIndex?: string
}

export default function SearchText(props: Props) {
  const { setSearch } = useOrderDataStore();
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(localSearch);
    }, 500); // 400ms delay

    return () => clearTimeout(timeout);
  }, [localSearch, setSearch]);

  return (
    <div className={`h-10 ${props.zIndex} relative w-full border rounded-md border-gray-200`}>
      <input
        type="text"
        placeholder="Customer, Waiter, Table and Invoice No."
        className="outline-none placeholder:text-black h-full w-full pl-2 text-xs"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
}
