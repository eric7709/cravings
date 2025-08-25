"use client";
 import { LogOut } from "lucide-react";
import { useLogout } from "@/modules/Employees/hooks/useEmployeesServices";
import { useRouter } from "next/navigation";
import { Active } from "@/allPages/waiter/Base";
import { Employee } from "@/modules/Employees/types/employee";

type Props = {
  active: Active;
  setActive: (e: any) => void;
  loading: boolean
  user: Employee | null
};

export default function Header(props: Props) {
  const { mutate: logout } = useLogout();
  const { active, setActive, loading, user } = props;
  const router = useRouter();

  return (
    <div className="">
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border p-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src="/avatar.png"
            alt="User avatar"
            className="w-12 h-12 rounded-full border border-gray-200"
          />
          <div>
            <p className="font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            router.push("/auth/login");
          }}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
      <div className="grid-cols-2 grid gap-3 grid-rows-[50px] text-sm mt-3 ">
        <button
          onClick={() => setActive("tables")}
          className={` rounded-lg shadow font-medium  cursor-pointer duration-300 active:scale-90 ${active == "tables" ? "bg-emerald-500 text-white" : "bg-gray-300"}`}
        >
          My Tables{" "}
        </button>
        <button
          onClick={() => setActive("orders")}
          className={` rounded-lg shadow font-medium  cursor-pointer duration-300 active:scale-90 ${active == "orders" ? "bg-emerald-500 text-white" : "bg-gray-300"}`}
        >
          My Orders{" "}
        </button>
      </div>
    </div>
  );
}
