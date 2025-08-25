"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Settings,
  Table,
  Utensils,
  Users,
  Tags,
  ClipboardList,
} from "lucide-react";
import { FaTimes } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import NavItem from "./NavItem";
import BitePointLogo from "./Logo";
import { useLogout } from "@/modules/Employees/hooks/useEmployeesServices";
import { useRouter } from "next/navigation";
import { useUser } from "@/modules/Employees/hooks/useUser";
import { useUIStore } from "@/store/useUIStore";

const menuConfig = [
  { icon: <Home size={18} />, label: "Dashboard", link: "/admin/dashboard" },
  { icon: <Users size={18} />, label: "Staff Management", link: "/admin/employees" },
  { icon: <Table size={18} />, label: "Table Management", link: "/admin/tables" },
  { icon: <Utensils size={18} />, label: "Menu Management", link: "/admin/menu" },
  { icon: <Tags size={18} />, label: "Category Management", link: "/admin/categories" },
  { icon: <ClipboardList size={18} />, label: "Orders", link: "/admin/orders" },
  { icon: <TbBrandGoogleAnalytics size={18} />, label: "Analytics", link: "/admin/analytics" },
];

export default function Sidebar() {
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const { user, loading } = useUser();
  const { drawerOpened, closeDrawer } = useUIStore();
  const [mounted, setMounted] = useState(false);

  // ⚡ enable animations only after mount
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Overlay for mobile */}
      {drawerOpened && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeDrawer}
        />
      )}

      <div
        className={`fixed lg:relative w-full lg:w-64 flex flex-col
          ${drawerOpened ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${mounted ? "transition-transform duration-300 ease-out" : ""} 
          top-0 z-50 lg:z-10
          h-screen bg-white border-r border-slate-200 shadow-xl lg:shadow-none`}
      >
        {/* Top: Logo + close button */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-200 bg-white">
          <BitePointLogo />
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeDrawer();
            }}
          >
            <FaTimes className="text-slate-500 hover:text-slate-700" size={16} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="flex flex-col gap-0.5">
            {menuConfig.map((item, i) => (
              <NavItem key={`${item.label}-${i}`} {...item} />
            ))}

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-red-500 hover:bg-red-50 transition-all font-medium text-sm cursor-pointer"
            >
              <RiLogoutCircleRLine size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
            <div className="relative">
              <img
                src="/avatar.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {loading ? (
                  <span className="animate-pulse bg-slate-200 rounded h-4 w-20 block"></span>
                ) : user?.firstName && user?.lastName ? (
                  `${user.firstName} ${user.lastName}`
                ) : (
                  "Guest User"
                )}
              </p>
              <p className="text-xs text-slate-500 font-medium">Admin</p>
            </div>
            <Settings size={16} className="text-slate-400" />
          </div>
        </div>
      </div>
    </>
  );
}
