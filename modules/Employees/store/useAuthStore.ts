import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { transformEmployee } from "../utils/transformEmployees";
import { AuthStore } from "../types/employee";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  login: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  fetchUser: async () => {
    set({ loading: true });
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      set({ user: null, loading: false });
      return;
    }
    const email = authData.user.email;
    if (!email) {
      set({ user: null, loading: false });
      return;
    }
    const { data: employee, error: dbError } = await supabase
      .from("employees")
      .select("*")
      .eq("email", email)
      .single();

    if (dbError || !employee) {
      console.error("Error fetching employee details:", dbError?.message);
      set({ user: null, loading: false });
      return;
    }
    const transformed = transformEmployee(employee);
    set({ user: transformed, loading: false });
  },
}));
