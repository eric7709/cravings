"use client";
import { Plus } from "lucide-react";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { useEmployeeSelectionStore } from "../store/useEmployeeSelectionStore";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList() {
  const { filteredEmployees: employees, isLoading } = useEmployeeDataStore();
  const { setModal } = useEmployeeSelectionStore();
  return (
    <div>
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div
            onClick={() => setModal("create")}
            className="min-h-52 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-white text-blue-600 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transform transition-all duration-300 cursor-pointer active:scale-95"
          >
            <Plus size={48} strokeWidth={2.5} className="text-blue-500" />
            <span className="mt-3 text-lg font-semibold uppercase tracking-wide">
              Add Employee
            </span>
          </div>
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} {...employee} />
          ))}
        </div>
      )}
    </div>
  );
}
