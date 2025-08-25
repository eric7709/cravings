"use client";
import CreateEmployeeModal from "@/modules/Employees/components/CreateUpdateEmployeeModal";
import DeleteEmployee from "@/modules/Employees/components/DeleteEmployee";
import EmployeeHeader from "@/modules/Employees/components/EmployeeHeader";
import EmployeeList from "@/modules/Employees/components/EmployeeList";
import { useSyncEmployeesDataStore } from "@/modules/Employees/hooks/useSyncEmployeesDataStore";

export default function Base() {
  useSyncEmployeesDataStore();
  return (
      <div className="h-screen flex flex-col">
        <EmployeeHeader />
        <div className="overflow-y-auto flex-1">
          <EmployeeList />
          <CreateEmployeeModal />
          <DeleteEmployee />
        </div>
      </div>
  );
}
