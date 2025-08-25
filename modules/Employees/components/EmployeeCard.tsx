"use client";
import { FaUserCircle } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { useEmployeeSelectionStore } from "../store/useEmployeeSelectionStore";
import { Employee } from "../types/employee";

export default function EmployeeCard(employee: Employee) {
  const { selectEmployee, setModal } = useEmployeeSelectionStore();
  return (
    <div
      onClick={() => {
        selectEmployee(employee);
        setModal("update");
      }}
      className="relative cursor-pointer bg-gradient-to-br border-2 border-blue-200 from-emerald-900 to-gray-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      <button
        onClick={(e) => {
          selectEmployee(employee);
          setModal("delete");
          e.stopPropagation();
        }}
        className="absolute top-3 right-3 cursor-pointer h-9 w-9 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors"
        title="Delete Employee"
      >
        <Trash2 size={18} className="text-red-400" />
      </button>
      <FaUserCircle className="text-7xl text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold capitalize text-center">
        {employee.firstName} {employee.lastName}
      </h3>
      {/* Role */}
      <p className="text-sm text-blue-300 mb-1 capitalize">{employee.role}</p>
      {/* Phone */}
      <a
        onClick={(e) => e.stopPropagation()}
        href={`tel:${employee.phoneNumber}`}
        className="text-sm hover:underline hover:text-blue-600 text-gray-400"
      >
        {employee.phoneNumber}
      </a>
      <a
        href={`mailto:${employee.email}`}
        onClick={(e) => e.stopPropagation()}
        className="text-sm mt-1 text-blue-400"
      >
        {employee.email}
      </a>
    </div>
  );
}