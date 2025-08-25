"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export function useUser() {
  const { user, fetchUser, loading } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading };
}
