"use client";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { Divide as Hamburger } from "hamburger-react";
import { useUIStore } from "@/store/useUIStore";
import AdminTitle from "@/modules/Orders/components/AdminTitle";

export default function EmployeeHeader() {
  const { filterEmployees } = useEmployeeDataStore();
  const [value, setValue] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { toggleDrawer, drawerOpened } = useUIStore();
  useEffect(() => {
    filterEmployees(value);
  }, [value, filterEmployees]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <header className="relative bg-white border-b border-gray-200">
        <div className="flex items-center justify-between pr-2 lg:px-6 h-16 mx-auto">
          <button className="lg:hidden">
            <Hamburger size={18} toggled={drawerOpened} toggle={toggleDrawer} />
          </button>
          <AdminTitle title="Staff Management" />
          <div className="lg:flex hidden items-center gap-4">
            <div className="relative w-[300px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                autoComplete="nope"
                autoCorrect="off"
                spellCheck={false}
                onChange={handleChange}
                placeholder="Name, Email or Role"
                value={value}
                className="w-full pl-10 h-10 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
          </div>
          <button
            aria-label="Open search"
            onClick={() => setOverlayOpen(true)}
            className="rounded-md hover:bg-gray-100 lg:hidden"
          >
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* Overlay for mobile search input */}
      <div
        className={`fixed inset-0 z-50 bg-white pr-2 pl-3 py-4 flex flex-col gap-5 transition-opacity duration-300 ${
          overlayOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex justify-between items-center">
          <AdminTitle title="Search Employees" />
          <button
            aria-label="Close search"
            onClick={() => setOverlayOpen(false)}
            className="rounded-md hover:bg-gray-100 transition"
          >
            <X />
          </button>
        </div>

        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            autoComplete="nope"
            autoCorrect="off"
            spellCheck={false}
            onChange={handleChange}
            placeholder="Name, Email or Role"
            value={value}
            className="w-full pl-10 h-10 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

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
