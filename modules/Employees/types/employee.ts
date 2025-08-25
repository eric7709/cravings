// <--------------------------------- EMPLOYEE ---------------------------------> //

export type CreateEmployee = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
  registeredBy: string;
}

export type UpdateEmployee = Partial<Omit<Employee, "createdAt">>;


export type Employee = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  gender: string | null;
  role: Role | null;
  isActive: boolean;
  registeredBy: string;
  createdAt: string;
};

// <--------------------------------- EMPLOYEE ---------------------------------> //

export type Role =
  | "waiter"
  | "staff"
  | "kitchen"
  | "guest"
  | "cook"
  | "chef"
  | "manager"
  | "admin"
  | "cashier";

export type AuthStore = {
  user: Employee | null;
  
  loading: boolean;
  login: (user: Employee) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

export type Login = {
  email: string;
  password: string;
};



// <--------------------------------- STORE ---------------------------------> //

export type EmployeeSelectionStore = {
  activeModal: "update" | "delete" | "create" | null;
  setModal: (modal: "update" | "delete" | "create") => void;
  closeModal: () => void;
  selectedEmployee: Employee | null;
  selectEmployee: (employee: Employee) => void;
  clearEmployee: () => void;
};



export type EmployeeDataStore = {
  employees: Employee[];
  filteredEmployees: Employee[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  setEmployees: (employees: Employee[]) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  addStoreEmployee: (employee: Employee) => void;
  updateStoreEmployee: (id: string, updates: Partial<Employee>) => void;
  removeStoreEmployee: (id: string) => void;

  filterEmployees: (searchTerm: string) => void;

  reset: () => void;
};
