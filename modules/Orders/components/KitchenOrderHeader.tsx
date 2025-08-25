"use client";
import BitePointLogo from "@/components/Logo";
import ProfileDropdown from "@/modules/Kitchen/components/ProfileDropdown";
import { useOrderDataStore } from "../store/useOrderDataStore";
export default function KitchenOrderHeader() {
  const { orders } = useOrderDataStore();
  const count = orders.filter((el) => el.status == "pending").length;
  return (
    <div className=" border-b border-gray-200 p-4">
      <div className="flex items-center justify-center lg:justify-between">
        <BitePointLogo />
        <div className="lg:flex hidden  items-center gap-3">
          <p className="font-semibold text-2xl uppercase">Kitchen Orders </p>
          {count > 0 && <p className="text-2xl px-6 font-bold text-white py-1 rounded-md shadow bg-amber-500">{count}</p>}
        </div>
        <div className="lg:block hidden">
          <ProfileDropdown />
        </div>
      </div>
      <div className="lg:hidden mt-2 justify-between flex items-center gap-3">
        <p className="font-semibold">Kitchen Orders </p>
        <ProfileDropdown />
      </div>
    </div>
  );
}
