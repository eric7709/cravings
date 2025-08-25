"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";

export function usePageLoading() {
  const pathname = usePathname();
  const { stopLoading } = useUIStore();
  useEffect(() => {
    stopLoading();
  }, [pathname, stopLoading]);
}
