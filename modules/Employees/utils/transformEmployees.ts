import { Employee } from "../types/employee";

export function transformEmployee(employee: any): Employee {
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

export function transformEmployees(employees: any[]): Employee[] {
  return employees.map(transformEmployee);
} 
