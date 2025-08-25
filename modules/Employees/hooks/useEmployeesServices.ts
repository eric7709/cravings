"use client";
import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { CreateEmployee, Employee, Login, UpdateEmployee } from "../types/employee";
import { EmployeeService } from "../services/employeeServices";

type Variables = { id: string; updates: UpdateEmployee};
export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: EmployeeService.getAllEmployees,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateEmployee = (
  options?: UseMutationOptions<Employee, Error, Variables> // types for options
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: Variables) =>
      EmployeeService.updateEmployee(id, updates),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<{ message: string }> => {
      const res = await fetch(`/api/admin/delete-employee`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete employee");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export function useEmployeeRegister(
  options?: MutationOptions<Employee, Error, CreateEmployee>
) {
  return useMutation({
    mutationFn: async (form: CreateEmployee) => {
      const res = await fetch("/api/admin/register-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("❌ Failed to parse server response");
      }
      if (!res.ok) {
        throw new Error(data.error || "❌ Failed to register employee");
      }
      return data;
    },
    ...options,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: Login) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const { data: employee, error: empError } = await supabase
        .from("employees")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      if (empError || !employee) throw new Error("Could not fetch user role");
      return { session: data.session, role: employee.role };
    },
  });
}

export function useCreateEmployee(
  options?: UseMutationOptions<Employee, Error, Employee>
) {
  return useMutation<Employee, Error, Employee>({
    mutationFn: async (payload: Employee) => {
      const response = await fetch("/api/admin/create-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create employee");
      }
      return data;
    },
    ...options,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true; // success indicator
    },
  });
}
