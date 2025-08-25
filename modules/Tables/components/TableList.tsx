"use client";
import { useEffect, useState } from "react";
import NoResultFound from "@/components/NoResultFound";
import TableCard from "./TableCard";
import { Plus } from "lucide-react";
import { useTableDataStore } from "../store/useTableDataStore";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import PageLoader from "@/components/PageLoader";

export default function TableList() {
  const { filteredTables, isLoading } = useTableDataStore();
  const { setModal } = useTableSelectionStore();
  const tables = filteredTables();
  const [localLoading, setLocalLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setLocalLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setLocalLoading(true);
    }
  }, [isLoading]);

  if (localLoading) {
    return <PageLoader />;
  }

  if (tables.length === 0) {
    return <NoResultFound />;
  }

  return (
    <div className="z-20 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          onClick={() => setModal("create")}
          className="min-h-52 flex flex-col items-center justify-center 
               border-2 border-dashed border-blue-300 rounded-xl 
               bg-gradient-to-br from-blue-50 to-white 
               text-blue-600 hover:bg-blue-100 hover:border-blue-400 
               hover:shadow-lg transform transition-all duration-300 
               cursor-pointer active:scale-95"
        >
          <Plus size={48} strokeWidth={2.5} className="text-blue-500" />
          <span className="mt-3 text-lg font-semibold uppercase tracking-wide">
            Add Table
          </span>
        </div>
        {tables.map((table) => (
          <TableCard key={table.id} {...table} />
        ))}
      </div>
    </div>
  );
}
