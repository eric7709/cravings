"use client";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { useLogout } from "@/modules/Employees/hooks/useEmployeesServices";
import { useRouter } from "next/navigation";
import { useUser } from "@/modules/Employees/hooks/useUser";

export default function ProfileDropdown() {
  const [opened, setOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const ref = useClickOutside(() => setOpen(false));
  const { loading, user } = useUser();

  const handleToggle = () => {
    if (!loading && user) {
      setOpen((o) => !o);
    }
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <div
        onClick={handleToggle}
        className={`flex bg-blue-50 px-2 py-1 rounded-md shadow-sm border border-blue-100 cursor-pointer w-fit items-center
          ${loading ? "opacity-50 cursor-not-allowed" : ""}
        `}
        title={loading ? "Loading user..." : "Profile"}
      >
        <img src="/user.png" alt="" className="h-7" />
        <TiArrowSortedDown className="text-base text-blue-900" />
      </div>

      {/* Dropdown */}
      <div
        ref={ref}
        className={`border bg-white text-xs border-gray-200 cursor-auto duration-300 rounded-md shadow-md absolute top-[110%] w-36 right-0 ${
          opened ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="p-3">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <p className="font-semibold mb-1">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Guest User"}
              </p>
              <p className="capitalize">{user?.role || ""}</p>
            </>
          )}
        </div>

        {!loading && (
          <div className="border-t border-gray-200 p-3 space-y-2">
            <div
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
              className="flex cursor-pointer hover:text-red-700 duration-300 hover:font-medium text-red-500 items-center gap-2"
            >
              <LiaSignOutAltSolid size={18} />
              <p>Sign Out</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
