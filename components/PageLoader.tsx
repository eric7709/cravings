"use client";

import { useUIStore } from "@/store/useUIStore";

export default function PageLoader() {
  const { isPageLoading } = useUIStore();

  return (
    <div
      className={`fixed inset-0 z-[999999] flex lg:left-64 items-center justify-center bg-white transition-opacity duration-300
        ${isPageLoading ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div className="mb-6 sm:mb-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-4 border-b-4 border-blue-500 mb-2"></div>
      </div>
    </div>
  );
}
