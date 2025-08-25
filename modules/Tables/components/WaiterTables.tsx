"use client";
import { Employee } from "@/modules/Employees/types/employee";
import { TableColumnsSplit } from "lucide-react";
import { useTableDataStore } from "../store/useTableDataStore";
import { TableService } from "../services/tableServices";

type Props = {
  loading: boolean;
  user: Employee | null;
};

export default function WaiterTables(props: Props) {
  const { user } = props;
  const { tables } = useTableDataStore();
  const myTables = TableService.getWaitersTables(tables, user);
  if (!user) {
    return (
      <div className="flex flex-1 justify-center items-center h-40 text-gray-500 text-sm">
        No user found.
      </div>
    );
  }
  if (myTables.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center h-40 text-gray-500">
        <TableColumnsSplit className="w-10 h-10 mb-2 opacity-50 text-gray-400" />
        <p className="text-sm">No tables assigned to you yet</p>
      </div>
    );
  }
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {myTables.map((table) => (
          <div
            key={table.id}
            className="rounded-xl shadow-md border  border-gray-100 p-10 flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-blue-100 hover:bg-gray-50"
          >
            <div className="flex flex-col items-center">
              <img src="/table.png" className="h-10 text-blue-600" alt="" />
              <p className="text-sm font-medium text-gray-600">{table.name}</p>
            </div>
            <div className="flex gap-3 items-center">
              <h3 className="font-semibold text-3xl text-gray-800">
                #{table.tableNumber}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
