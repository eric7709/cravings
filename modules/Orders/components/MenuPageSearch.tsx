"use client";

import { BsSearch } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";

export default function MenuPageSearch() {
  const { searchTerm, changeSearchTerm, clearSearchTerm } = useOrderSelectionStore();

  return (
    <div className="w-full relative px-4 py-2">
      <BsSearch className="absolute top-1/2 left-8 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search menu..."
        value={searchTerm}
        onChange={changeSearchTerm}
        className="w-full h-11 px-10 text-[15px] rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      />
      <FaTimes
        onClick={clearSearchTerm}
        className={`
          absolute top-1/2 right-8 -translate-y-1/2 
          cursor-pointer duration-300 active:scale-75 
          ${searchTerm.trim().length > 0 ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />
    </div>
  );
}
