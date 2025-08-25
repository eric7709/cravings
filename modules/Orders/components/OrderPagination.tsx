"use client";
import React, { useState, useRef, useEffect } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useOrderDataStore } from "../store/useOrderDataStore";


type Props = {
  zIndex?: string
}

export default function OrderPagination(props: Props) {
  const { page, totalPages, setPage, fetchOrders, isLoading } =
    useOrderDataStore();
  const [opened, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickPage = (pageNumber: number) => {
    if (pageNumber !== page && !isLoading) {
      setPage(pageNumber);
      fetchOrders();
      setOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (opened) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [opened]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div
      ref={containerRef}
    className={`relative ${props.zIndex} w-full inline-block text-center select-none`}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer inline-flex w-full items-center gap-1 px-2 h-10 rounded-md border border-gray-200 bg-white text-gray-800
          text-[13px] font-medium hover:bg-gray-100 transition-colors duration-200
          "
        aria-expanded={opened}
        aria-haspopup="listbox"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        Page {page}
        <TiArrowSortedDown
          className={`absolute right-2 text-base top-1/2 -translate-y-1/2 duration-300 ${opened && "rotate-180"}`}
        />
      </div>

      {opened && (
        <div
          className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2
            flex flex-wrap gap-2 w-[max-content] justify-center max-w-xs"
          role="listbox"
          aria-label="Page selector"
        >
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handleClickPage(p)}
              disabled={isLoading}
              className={`w-7 h-7 cursor-pointer duration-300 active:scale-90 flex items-center text-sm font-medium justify-center rounded-full border
                ${
                  p === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-200"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
                 duration-150
              `}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Go to page ${p}`}
              type="button"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
