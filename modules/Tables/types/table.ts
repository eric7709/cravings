import { Employee } from "@/modules/Employees/types/employee";

export type TableResult = {
  id: string;
  name: string;
  table_number: number;
  capacity: number;
  is_available: boolean;
  waiter_id: string | null;
  waiter?: Employee | null;
  url: string;
};

export type Table = {
  id: string;
  name: string;
  tableNumber: number;
  capacity: number;
  isAvailable: boolean;
  waiterId: string | null;
  waiter?: Employee | null;
  url: string;
};
export type TableFormInput = {
  name: string;
  tableNumber: string;
  capacity: string;
  isAvailable?: boolean;
  waiterId?: string | null;
};
export type TableFormData = {
  name: string;
  tableNumber: number;
  capacity: number;
  isAvailable?: boolean;
  url?: string;
  waiterId?: string | null;
};
export type TableFormError = {
  name: string;
  tableNumber: string;
  capacity: string;
  waiterId?: string;
};

export type TableAllocationHistory = {
  id: string;
  tableId: string;
  tableName: string;
  capacity?: number | null;
  waiterId: string | null;
  waiterName?: string;
  allocatedAt: string;
  deallocatedAt: string | null;
};

export type UseTableAllocationDataStore = {
  history: TableAllocationHistory[];
  isLoading: boolean;
  error: string | null;
  fetchHistory: (options?: {
    waiterId?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;
  clear: () => void;
};

export type AllocationFilter = "all" | "allocated" | "unallocated";

export type UseTableDataStore = {
  tables: Table[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  searchTerm: string;
  allocationFilter: AllocationFilter;
  sortBy: keyof Table;
  sortOrder: "asc" | "desc";

  /** Setters */
  setTables: (tables: Table[]) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  /** CRUD */
  updateTable: (id: string, updates: Partial<Table>) => void;
  addTable: (table: Table) => void;
  removeTable: (id: string) => void;
  reset: () => void;

  /** Search / Sort / Filter */
  setSearchTerm: (term: string) => void;
  setSortBy: (field: keyof Table) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setAllocationFilter: (filter: AllocationFilter) => void;
  filteredTables: () => Table[];
  fetchTables: () => void;
};

export type UseTableSelectionStore = {
  activeTable: null | Table;
  setActiveTable: (table: Table | null) => void;
  clearActiveTable: () => void;
  activeModal: string | null;
  setModal: (key: TableModalType) => void;
  closeModal: () => void;
};

export type TableModalType =
  | "update"
  | "qrcode"
  | "delete"
  | "allocate"
  | "create"
  | "deallocate"
  | null;
