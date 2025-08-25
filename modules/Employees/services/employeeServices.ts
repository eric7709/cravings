import { supabase } from "@/lib/supabase";
import { CreateEmployee, Employee, UpdateEmployee } from "../types/employee";


export class EmployeeService {
  static transformEmployee(employee: any): Employee {
    return {
      id: employee.id,
      firstName: employee.firstname,
      lastName: employee.lastname,
      email: employee.email,
      phoneNumber: employee.phone_number,
      gender: employee.gender,
      role: employee.role,
      isActive: employee.isactive ?? true,
      createdAt: employee.created_at,
      registeredBy: employee.registered_by,
    };
  }

  static transformEmployees(employees: any[]): Employee[] {
    return employees.map(EmployeeService.transformEmployee);
  }

  static async getAllEmployees(): Promise<Employee[]> {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message || "Failed to fetch employees");
      }

      return EmployeeService.transformEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  }

  static async registerEmployee(form: CreateEmployee): Promise<Employee> {
    try {
      const response = await fetch("/api/admin/register-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register employee");
      }

      const newEmployee = await response.json();
      return EmployeeService.transformEmployee(newEmployee);
    } catch (error) {
      console.error("Error registering employee:", error);
      throw error;
    }
  }

  static async deleteEmployee(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/admin/delete-employee/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }

  static async updateEmployee(
    id: string,
    updates: UpdateEmployee
  ): Promise<Employee> {
    try {
      const response = await fetch("/api/admin/update-employee", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          firstName: updates.firstName,
          lastname: updates.lastName,
          email: updates.email,
          phoneNumber: updates.phoneNumber,
          gender: updates.gender,
          role: updates.role,
          isActive: updates.isActive,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update employee");
      }

      const updatedEmployee = await response.json();
      return {
        id: updatedEmployee.id,
        firstName: updatedEmployee.firstName,
        lastName: updatedEmployee.lastName,
        email: updatedEmployee.email,
        phoneNumber: updatedEmployee.phoneNumber,
        gender: updatedEmployee.gender,
        role: updatedEmployee.role,
        isActive: updatedEmployee.isActive,
        createdAt: updatedEmployee.createdAt,
        registeredBy: updatedEmployee.registeredBy,
      };
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  }
}
