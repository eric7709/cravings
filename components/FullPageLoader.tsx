"use client";

import { useUIStore } from "@/store/useUIStore";


export default function FullPageLoader() {
  const { isPageLoading } = useUIStore();

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-white transition-opacity duration-300
        ${isPageLoading ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div className="loader"></div>
    </div>
  );
}
