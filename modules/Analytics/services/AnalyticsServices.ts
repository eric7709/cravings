import { supabase } from "@/lib/supabase";
import { PromiseNumber } from "@/types/shared";
import { formatPrice } from "@/utils/formatPrice";

export class AnalyticsServices {
  // ===== ORDERS =====
  static async fetchTodaysOrder() {
    const today = new Date();
    const start = new Date(today);
    start.setUTCHours(-1, 0, 0, 0);
    const end = new Date(today);
    end.setUTCHours(22, 59, 59, 999);
    const { data } = await supabase
      .from("orders")
      .select("total, status")
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString());

    return data || [];
  }
  static async getNumbersOfOrdersToday(): PromiseNumber {
    const orders = await this.fetchTodaysOrder();
    return orders.length || 0;
  }

  static getTotalNumbersOfCancelOrders(orders: any): number {
    return orders?.filter((o: any) => o.status === "cancelled").length || 0;
  }

  static getTotalNumbersOfPendingOrders(orders: any): number {
    return orders?.filter((o: any) => o.status === "pending").length || 0;
  }

  static async getTodaysRevenue() {
    const todaysOrders = await this.fetchTodaysOrder();
    const todaysRevenue =
      todaysOrders?.reduce(
        (sum, order) => sum + (order.status === "paid" ? order.total : 0),
        0
      ) || 0;
    return todaysRevenue;
  }

  // ===== COUNTS =====
  static async getTotalNumberOfEmployee(): PromiseNumber {
    const { count } = await supabase
      .from("employees")
      .select("*", { count: "exact", head: true });
    return count || 0;
  }

  static async getTotalNumberOfMenuItems(): PromiseNumber {
    const { count } = await supabase
      .from("menu_items")
      .select("*", { count: "exact", head: true });
    return count || 0;
  }

  static async getTotalNumberOfCategories(): PromiseNumber {
    const { count } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });
    return count || 0;
  }

  static async getTotalNumberOfTables(): PromiseNumber {
    const { count } = await supabase
      .from("tables")
      .select("*", { count: "exact", head: true });
    return count || 0;
  }

  static async getNumberOfActiveWaiters(): PromiseNumber {
    const { data: activeWaitersData } = await supabase
      .from("tables")
      .select("waiter_id")
      .not("waiter_id", "is", null);
    const count =
      [...new Set(activeWaitersData?.map((item) => item.waiter_id))].length ||
      0;
    return count || 0;
  }

  // ===== DASHBOARD AGGREGATES =====
  static async fetchDashboardData() {
    const todaysOrders = await this.fetchTodaysOrder();
    const ordersCount = todaysOrders.length;
    const todaysRevenue = await this.getTodaysRevenue();
    const totalEmployees = await this.getTotalNumberOfEmployee();
    const totalMenuItems = await this.getTotalNumberOfMenuItems();
    const totalCategories = await this.getTotalNumberOfCategories();
    const totalTables = await this.getTotalNumberOfTables();
    const activeWaiters = await this.getNumberOfActiveWaiters();
    const pendingOrders = this.getTotalNumbersOfPendingOrders(todaysOrders);
    const cancelledOrders = this.getTotalNumbersOfCancelOrders(todaysOrders);

    return [
      { title: "Total Employees", value: totalEmployees || 0, icon: "👥" },
      { title: "Orders Today", value: ordersCount, icon: "🛎" },
      {
        title: "Today's Revenue",
        value: formatPrice(todaysRevenue),
        icon: "💰",
      },
      { title: "Total Menu Items", value: totalMenuItems || 0, icon: "📦" },
      { title: "Total Categories", value: totalCategories || 0, icon: "🗂" },
      { title: "Total Tables", value: totalTables || 0, icon: "🪑" },
      { title: "Pending Orders", value: pendingOrders, icon: "⏳" },
      { title: "Active Waiters", value: activeWaiters, icon: "🧑‍🍳" },
      { title: "Cancelled Orders", value: cancelledOrders, icon: "❌" },
    ];
  }

  // ===== ANALYTICS (RPC FUNCTIONS) =====
  static async getAnalytics(start: Date, end: Date) {
    const startDate = start.toISOString().split("T")[0];
    const endDate = end.toISOString().split("T")[0];
    console.log("🔍 Calling get_restaurant_analytics with:", {
      startDate,
      endDate,
    });
    try {
      const result = await supabase.rpc("get_restaurant_analytics", {
        start_date: startDate,
        end_date: endDate,
      });
      console.log("📡 Supabase RPC response:", result);
      if (result.error && result.error.code === "42883") {
        throw new Error(
          "Function 'get_restaurant_analytics' does not exist. Make sure it's created in your database."
        );
      }
      if (result.error) {
        throw new Error(result.error.message || "Database error occurred");
      }
      return result;
    } catch (error) {
      console.error("💥 RPC call failed:", error);
      throw error;
    }
  }
}
