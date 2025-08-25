"use client";
import Sidebar from "@/components/Sidebar";
import PageLoader from "./PageLoader";
import { usePageLoading } from "@/hooks/usePageLoading";
import { Children } from "@/types/shared";
export default function Layout({ children }: Children) {
  usePageLoading();
  return (
    <div className="h-screen flex">
      <Sidebar />
      <PageLoader />
      <div className="h-screen flex-1 overflow-y-auto relative">{children}</div>
    </div>
  );
}
