"use client";
import { useDashboard } from "@/modules/Analytics/hooks/useDashboard";
import AdminTitle from "@/modules/Orders/components/AdminTitle";
import { Divide as Hamburger } from "hamburger-react";
import DashboardCard from "./DashboardCard";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function Dashboard() {
  const { drawerOpened, toggleDrawer, dashboardData, loading } = useDashboard();
  const [localLoading, setLocalLoading] = useState(true);
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setLocalLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  if (localLoading) {
    return (
      <div className="h-screen grid place-content-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-4 border-b-4 border-blue-500 mb-2"></div>
          <p className="text-gray-500 text-sm sm:text-base">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-white bg-gray-50 h-screen">
      <header className="h-16 pr-3 lg:px-4 bg-white z-20 relative flex border-b items-center justify-between border-gray-300">
        <button className="lg:hidden">
          <Hamburger
            size={18}
            color="black"
            toggled={drawerOpened}
            toggle={toggleDrawer}
          />
        </button>
        <AdminTitle title="Dashboard" />
        <Search className="text-black" size={18} />
      </header>

      <main className="grid flex-1 overflow-y-auto p-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-2">
        {dashboardData.map((item, idx) => (
          <DashboardCard key={item.title} {...{ item, idx }} />
        ))}
      </main>
    </div>
  );
}
