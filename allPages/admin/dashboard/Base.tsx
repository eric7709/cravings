"use client";
import { Search } from "lucide-react";
import AdminTitle from "@/modules/Orders/components/AdminTitle";
import { Divide as Hamburger } from "hamburger-react";
import { useDashboard } from "@/modules/Analytics/hooks/useDashboard";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
  const { drawerOpened, toggleDrawer, dashboardData } = useDashboard();

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
