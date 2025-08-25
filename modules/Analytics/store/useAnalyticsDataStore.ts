import { create } from "zustand";
import { AnalyticsServices } from "../services/AnalyticsServices";
import { AnalyticsData, AnalyticsDataStore } from "../types/analytics";

export const useAnalyticsDataStore = create<AnalyticsDataStore>()(
  (set, get) => ({
    analytics: null,
    isLoading: true,
    error: null,
    startDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    })(),
    endDate: new Date(),
    label: "Last 7 Days",
    setDateRange: async (start, end, label = "Custom Range") => {
      set({ startDate: start, endDate: end, label });
      await get().fetchAnalytics();
    },
    fetchAnalytics: async () => {
      console.log("🔄 Starting analytics fetch...");
      set({ isLoading: true, error: null });
      try {
        const { startDate, endDate } = get();
        console.log("📅 Date range:", {
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        });
        const { data, error } = await AnalyticsServices.getAnalytics(
          startDate,
          endDate
        );
        console.log("📊 Analytics response:", { data, error });
        if (error) {
          console.error("❌ Analytics error:", error);
          const errorMessage = typeof error === 'string' 
            ? error 
            : (error as any)?.message || "Failed to fetch analytics";
          throw new Error(errorMessage);
        }
        
        if (!data) {
          throw new Error("No data returned from analytics");
        }
        
        console.log("✅ Analytics fetched successfully:", data);
        set({ analytics: data as AnalyticsData, isLoading: false });
      } catch (err) {
        console.error("💥 Analytics fetch failed:", err);
        // Fix: Proper error message extraction
        const errorMessage = err instanceof Error 
          ? err.message 
          : typeof err === 'string' 
          ? err 
          : "Unknown error occurred";
        set({ error: errorMessage, isLoading: false });
      }
    }
  })
);