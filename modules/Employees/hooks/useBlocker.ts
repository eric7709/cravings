"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./useUser";
import { Role } from "../types/employee";

interface UseRoleBlockerOptions {
  allowedRoles: Role | Role[];
  redirectTo?: string;
}

export function useRoleBlocker({ allowedRoles, redirectTo = "/unauthorized" }: UseRoleBlockerOptions) {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user?.role) {
      const hasAccess = Array.isArray(allowedRoles) 
        ? allowedRoles.includes(user.role)
        : user.role === allowedRoles;
      if (!hasAccess) {
        router.push(redirectTo);
      }
    }
  }, [user, loading, allowedRoles, redirectTo, router]);

  return { user, loading, isAuthorized: !loading && user?.role && (
    Array.isArray(allowedRoles) 
      ? allowedRoles.includes(user.role)
      : user.role === allowedRoles
  )};
}