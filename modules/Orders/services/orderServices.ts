import { supabase } from "@/lib/supabase";
import {
  CreateOrder,
  Order,
  OrderStatus,
  PaymentMethod,
  UpdateOrder,
} from "../types/orders";
import { generateInvoiceId } from "../utils/generateInvoiceId";
import { Employee } from "@/modules/Employees/types/employee";

type GetAllOrdersParams = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: keyof Order;
  sortOrder?: "asc" | "desc";
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  paymentMethod?: PaymentMethod;
};

// Manual snake_case to camelCase conversion for Order objects
function convertOrderFromSnakeCase(order: any): Order {
  return {
    id: order.id,
    tableId: order.table_id,
    waiterId: order.waiter_id,
    items: order.items || [],
    total: order.total,
    status: order.status,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    customerName: order.customer_name,
    customerId: order.customer_id,
    customerTitle: order.customer_title,
    invoiceId: order.invoice_id,
    tableName: order.table_name,
    waiterName: order.waiter_name,
    paymentMethod: order.payment_method,
  };
}

// Helper function to convert array of orders
function convertOrdersArray(orders: any[]): Order[] {
  if (!Array.isArray(orders)) return [];
  return orders.map((order) => convertOrderFromSnakeCase(order));
}

// Manual camelCase to snake_case conversion for sortBy field
function convertSortByToSnakeCase(sortBy: keyof Order): string {
  const sortByMap: Record<keyof Order, string> = {
    id: "id",
    tableId: "table_id",
    waiterId: "waiter_id",
    items: "items",
    total: "total",
    status: "status",
    createdAt: "created_at",
    updatedAt: "updated_at",
    customerName: "customer_name",
    customerId: "customer_id",
    customerTitle: "customer_title",
    invoiceId: "invoice_id",
    tableName: "table_name",
    discount: "discount",
    waiterName: "waiter_name",
    paymentMethod: "payment_method",
  };

  return sortByMap[sortBy] || (sortBy as string);
}
export class OrderService {
  // Get waiters pending Orders
  static getWaitersPendingOrders(
    orders: Order[],
    user: Employee | null
  ): Order[] | [] {
    const today = new Date().toISOString().split("T")[0];
    const waiterOrders = orders.filter((order) => {
      if (!order.createdAt) return false;
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      return (
        order.waiterId === user?.id &&
        orderDate === today &&
        order.status === "pending"
      );
    });
    return waiterOrders;
  }

  static getNextOrderStatus(order: Order): OrderStatus {
    if (order.status === "cancelled") return "cancelled";
    const sequence: OrderStatus[] = ["pending", "completed", "paid"];
    const index = sequence.indexOf(order.status);
    return index < sequence.length - 1 ? sequence[index + 1] : order.status;
  }

  static getOrderButtonText(order: Order): string {
    switch (order.status) {
      case "pending":
        return "Start Preparing";
      case "completed":
        return "Complete";
      case "paid":
        return "Paid";
      case "cancelled":
        return "Cancelled";
      default:
        return "Mark Complete";
    }
  }

  static getCurrentDateTime(): string {
    return new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  static getOrderTotal(orders: Order[]) {
    const total = orders.reduce((acc, order) => {
      const orderTotal = order.items?.reduce((sum, item) => {
        return sum + (item.price || 0) * (item.quantity || 0);
      }, 0);
      return acc + orderTotal;
    }, 0);
    return total;
  }

  static async getAllOrders(params: GetAllOrdersParams) {
    const {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      status,
      dateFrom,
      dateTo,
      paymentMethod,
    } = params;

    const buildQuery = () => {
      let q = supabase
        .from("orders")
        .select("*", { count: "exact", head: false });
      if (search) {
        const searchTerm = `%${search}%`;
        q = q.or(
          `customer_name.ilike.${searchTerm},waiter_name.ilike.${searchTerm},invoice_id.ilike.${searchTerm},table_name.ilike.${searchTerm},payment_method.ilike.${searchTerm}`
        );
      }
      if (dateFrom) q = q.gte("created_at", dateFrom);
      if (dateTo) q = q.lte("created_at", dateTo);
      if (paymentMethod && paymentMethod !== "all") {
        q = q.eq("payment_method", paymentMethod);
      }
      return q;
    };
    // Main paginated query
    let query = buildQuery().range((page - 1) * limit, page * limit - 1);
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (sortBy) {
      const column =
        sortBy === "paymentMethod"
          ? "payment_method"
          : convertSortByToSnakeCase(sortBy);
      query = query.order(column, { ascending: sortOrder === "asc" });
    }
    const { data, count, error } = await query;
    if (error) throw new Error(error.message);
    // Count helper
    const countOnly = async (status?: string, paymentMethodFilter?: string) => {
      let q = buildQuery();
      if (status) {
        q = q.eq("status", status);
      }
      if (paymentMethodFilter && paymentMethodFilter !== "all") {
        q = q.eq("payment_method", paymentMethodFilter);
      }
      const { count } = await (q as any).select("*", {
        count: "exact",
        head: true,
      });
      return count ?? 0;
    };

    // Total price helper
    const totalOnly = async (status?: string, paymentMethodFilter?: string) => {
      let q = supabase.from("orders").select("total", { head: false });
      if (dateFrom) q = q.gte("created_at", dateFrom);
      if (dateTo) q = q.lte("created_at", dateTo);
      if (status) {
        q = q.eq("status", status);
      }
      if (paymentMethodFilter && paymentMethodFilter !== "all") {
        q = q.eq("payment_method", paymentMethodFilter);
      }
      const { data, error } = await q;
      if (error) return 0;
      return data?.reduce((sum, row) => sum + (row.total ?? 0), 0) ?? 0;
    };

    // Parallel counts and totals
    const [
      pendingCount,
      completedCount,
      cancelledCount,
      paidCount,
      allCount,
      pendingTotal,
      completedTotal,
      cancelledTotal,
      paidTotal,
      allTotal,
    ] = await Promise.all([
      countOnly("pending", paymentMethod),
      countOnly("completed", paymentMethod),
      countOnly("cancelled", paymentMethod),
      countOnly("paid", paymentMethod),
      countOnly(undefined, paymentMethod),
      totalOnly("pending", paymentMethod),
      totalOnly("completed", paymentMethod),
      totalOnly("cancelled", paymentMethod),
      totalOnly("paid", paymentMethod),
      totalOnly(undefined, paymentMethod),
    ]);
    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);
    return {
      orders: convertOrdersArray(data ?? []),
      total,
      totalPages,
      counts: {
        pending: pendingCount,
        completed: completedCount,
        cancelled: cancelledCount,
        paid: paidCount,
        all: allCount,
      },
      totals: {
        pending: pendingTotal,
        completed: completedTotal,
        cancelled: cancelledTotal,
        paid: paidTotal,
        all: allTotal,
      },
    };
  }

  static async getOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(`Fetch failed: ${error.message}`);
    return data ? convertOrderFromSnakeCase(data) : null;
  }

  static generateInvoiceId() {
    const date = new Date();
    const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(100 + Math.random() * 900);
    return `INV-${yyyymmdd}-${randomPart}`;
  }

  static async createOrder(payload: CreateOrder): Promise<Order> {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        table_id: payload.tableId ?? null,
        table_name: payload.tableName ?? null,
        waiter_id: payload.waiterId ?? null,
        waiter_name: payload.waiterName ?? null,
        items: payload.items ?? [],
        total: payload.total ?? 0,
        status: payload.status ?? "pending",
        customer_name: payload.customerName ?? null,
        customer_id: payload.customerId ?? null,
        customer_title: payload.customerTitle ?? null,
        invoice_id: this.generateInvoiceId() ?? null,
      })
      .select("*")
      .single();

    if (error) throw new Error(`Create failed: ${error.message}`);
    return convertOrderFromSnakeCase(data);
  }

  static async updateOrderStatus(
    id: string,
    status: Order["status"]
  ): Promise<Order | null> {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error)
      throw new Error(`Failed to update order status: ${error.message}`);
    return data ? convertOrderFromSnakeCase(data) : null;
  }

  static async updateOrder(
    id: string,
    updates: Partial<UpdateOrder>
  ): Promise<Order | null> {
    // Filter out undefined values and empty strings
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );
    const updateData: any = {};
    if (filteredUpdates.items !== undefined)
      updateData.items = filteredUpdates.items;
    if (filteredUpdates.total !== undefined)
      updateData.total = filteredUpdates.total;
    if (filteredUpdates.status !== undefined)
      updateData.status = filteredUpdates.status;
    if (filteredUpdates.customerName !== undefined)
      updateData.customer_name = filteredUpdates.customerName;
    if (filteredUpdates.customerId !== undefined)
      updateData.customer_id = filteredUpdates.customerId;
    if (filteredUpdates.customerTitle !== undefined)
      updateData.customer_title = filteredUpdates.customerTitle;
    if (filteredUpdates.paymentMethod !== undefined)
      updateData.payment_method = filteredUpdates.paymentMethod;
    if (filteredUpdates.updatedAt !== undefined)
      updateData.updated_at = filteredUpdates.updatedAt;
    if (filteredUpdates.invoiceId !== undefined)
      updateData.invoice_id = filteredUpdates.invoiceId;
    const { data, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(`Update failed: ${error.message}`);
    return data ? convertOrderFromSnakeCase(data) : null;
  }

  static async deleteOrder(id: string): Promise<void> {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw new Error(`Delete failed: ${error.message}`);
  }

  static async getPendingCountFiltered(
    dateFrom?: string,
    dateTo?: string
  ): Promise<number> {
    let query = supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending");
    if (dateFrom) query = query.gte("created_at", dateFrom);
    if (dateTo) query = query.lte("created_at", dateTo);
    const { count, error } = await query;
    if (error) throw new Error(error.message);
    return count ?? 0;
  }

  static async getPendingCountAllTime(): Promise<number> {
    const { count, error } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending");
    if (error) throw new Error(error.message);
    return count ?? 0;
  }
  static async getActiveCountFiltered(
    dateFrom?: string,
    dateTo?: string
  ): Promise<number> {
    let query = supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .not("status", "in", "(served,paid,cancelled)");

    if (dateFrom) query = query.gte("created_at", dateFrom);
    if (dateTo) query = query.lte("created_at", dateTo);

    const { count, error } = await query;
    if (error) throw new Error(error.message);
    return count ?? 0;
  }
  static async getActiveCountAllTime(): Promise<number> {
    const { count, error } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .not("status", "in", "(paid,cancelled)");

    if (error) throw new Error(error.message);
    return count ?? 0;
  }
}
