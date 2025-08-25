"use client";
import { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { Search, X } from "lucide-react";
import AdminTitle from "@/modules/Orders/components/AdminTitle";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";
import CategoryDropdown from "@/modules/Category/components/CategoriesDropdown";
import AvailabilityDropdown from "@/modules/Category/components/AvailableDropdown";
import { useUIStore } from "@/store/useUIStore";

export default function MenuItemHeader() {
  const { searchTerm, setSearchTerm } = useMenuItemDataStore();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { toggleDrawer, drawerOpened } = useUIStore();

  return (
    <>
      <div className="flex items-center justify-between lg:px-4 h-16 border-b border-gray-200 bg-white gap-3">
        <button className=" lg:hidden">
          <Hamburger size={18} toggled={drawerOpened} toggle={toggleDrawer} />
        </button>
        <AdminTitle title="Menu Management" />
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-48">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search Menu items..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <CategoryDropdown />
            <AvailabilityDropdown />
          </div>
        </div>
        <button
          aria-label="Open search"
          onClick={() => setOverlayOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Search size={20} />
        </button>
      </div>
      <div
        className={`fixed inset-0 z-50 bg-white p-4 flex flex-col gap-3 transition-opacity duration-300 ${
          overlayOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex justify-between items-center">
          <AdminTitle title="Filters" />
          <button
            aria-label="Close search filters"
            onClick={() => setOverlayOpen(false)}
            className="rounded-md hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>
        </div>
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Menu items..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <CategoryDropdown />
        <AvailabilityDropdown />
        <button
          onClick={() => setOverlayOpen(false)}
          className="mt-auto py-3 cursor-pointer text-sm bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 active:scale-95 transition-transform duration-150"
        >
          Search
        </button>
      </div>
    </>
  );
}
