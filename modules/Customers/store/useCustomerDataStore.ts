import { create } from 'zustand';
import { UseCustomerDataStore } from '../types/customer';
import { CustomerService } from '../services/customerServices';

export const useCustomerDataStore = create<UseCustomerDataStore>((set) => ({
  customers: [],
  isLoading: false,
  isUpdating: false,
  error: null,
  setCustomers: (customers) => set({ customers, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setUpdating: (isUpdating) => set({ isUpdating }),
  setError: (error) => set({ error, isLoading: false, isUpdating: false }),
  clearError: () => set({ error: null }),
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
      error: null,
    })),
  updateCustomer: (id, updates) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updates } : customer
      ),
      error: null,
    })),

  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
      error: null,
    })),

  reset: () =>
    set({
      customers: [],
      isLoading: false,
      isUpdating: false,
      error: null,
    }),
}));