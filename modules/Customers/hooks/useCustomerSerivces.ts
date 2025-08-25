"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomerMore, CustomerService } from "../services/customerServices";
import { Customer, CustomerForm } from "../types/customer";
import { toast } from "react-toastify";

export function useFetchCustomers(dateFrom?: string, dateTo?: string) {
  return useQuery<CustomerMore[]>({
    queryKey: ["customers", dateFrom, dateTo],
    queryFn: () => CustomerService.fetchCustomers(dateFrom, dateTo),
  });
}



export function useGetCustomerById(id?: string) {
  return useQuery<Customer | null, Error>({
    queryKey: ['customer', id],
    queryFn: () => {
      if (!id) throw new Error('Customer ID is required');
      return CustomerService.getById(id);
    },
    enabled: !!id,
  });
}

export function useGetOrCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation<Customer, Error, CustomerForm>({
    mutationFn: (customerData: CustomerForm) => CustomerService.getOrCreateCustomer(customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
    onError: (error: Error) => {
      console.error('Customer creation failed:', error);
      toast.error(`❌ Failed to create customer: ${error.message}`);
    },
  });
}


export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CustomerForm> }) =>
      CustomerService.updateCustomer(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('✅ Customer updated successfully!');
    },
    onError: (error: any) => {
      console.error('Customer update failed:', error);
      toast.error(`❌ Failed to update customer: ${error.message}`);
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CustomerService.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('✅ Customer deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Customer deletion failed:', error);
      toast.error(`❌ Failed to delete customer: ${error.message}`);
    },
  });
}