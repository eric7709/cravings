export type Customer = {
  id?: string;
  name: string | null;
  email: string;
  phone: string | null;
  title: string;
  discount?: number
  createdAt?: string;
}

export interface CustomerFetch {
  id: string;
  name: string;
  title: string | null;
  email: string;
  phone: string | null;
  lastVisit: string | null;
  totalSpent: number;
}

export type CustomerUpdate = {
  id?: string;
  name: string | null;
  email: string;
  phone_number: string | null;
  title: string;
  discount?: number
  discount_type?: string | null
  discount_expiry?: string | null
  createdAt?: string;
}



export type CustomerResult = {
  id?: string;
  name: string | null;
  email: string;
  phone_number: string | null;
  title: string;
  discount: boolean
  created_at: string;
};
export interface CustomerForm {
  name: string;
  title: string;
  email: string;
  phoneNumber?: string;
  discount?: number
}

export interface UseCustomerDataStore {
  customers: Customer[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  setCustomers: (customers: Customer[]) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  removeCustomer: (id: string) => void;
  reset: () => void;
}

export type FormErrors = { [K in keyof CustomerForm]: string };
