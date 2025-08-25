"use client";

import { Role } from "@/modules/Employees/types/employee";
import { useUser } from "../modules/Employees/hooks/useUser";


export function useRole() {
  const { user, loading } = useUser();
  const hasRole = (role: Role) => {
    if (loading || !user) return false;
    return user.role === role;
  };
  const hasAnyRole = (roles: Role[]) => {
    if (loading || !user?.role) return false;
    return roles.includes(user.role);
  };
  const isAdmin = () => {
    if (loading || !user) return false;
    return user.role === 'admin';
  };
  return {
    user,
    loading,
    role: user?.role,
    hasRole,
    hasAnyRole,
    isAdmin
  };
}