"use client"
import NotificationDropdown from "@/modules/Kitchen/components/NotificationDropdown";
import ActiveRevenue from "./ActiveRevenue";
import ProfileDropdown from "@/modules/Kitchen/components/ProfileDropdown";
import SearchText from "@/modules/Kitchen/components/SearchText";
import StatusDropdown from "@/modules/Kitchen/components/StatusDropdown";
import ScalingCircle from "@/modules/Kitchen/components/ScalingCircle";
import AdminTitle from "@/modules/Orders/components/AdminTitle";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function CashierOrderHeader() {
  const [isOpened, setOpen] = useState(false);
  return (
    <div className=" z-30 relative ">
      <div className="hidden lg:block">
        <div className="flex px-3 items-center justify-between h-16 border-b border-gray-300">
          <AdminTitle title="Orders" />
          <div className="flex justify-end flex-1 items-center gap-5">
            <div className="w-64">
              <SearchText />
            </div>
            <div className="w-64">
              <StatusDropdown />
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <ActiveRevenue />
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex pl-3 h-16 items-center pr-3 justify-between">
          <AdminTitle title="Orders" />
          <Filter onClick={() => setOpen(!isOpened)} />
        </div>
        <div
          className={`grid ${isOpened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} duration-300`}
        >
          <div
            className={`grid  border-b duration-300 border-gray-300 ${isOpened ? "p-3 gap-3" : "overflow-hidden"} `}
          >
            <SearchText zIndex="z-[20]" />
            <StatusDropdown zIndex="z-[18]" />
            <div className="flex items-center justify-center">
              <ScalingCircle removemargin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
