import { supabase } from "@/lib/supabase";
import { Customer, CustomerForm, CustomerResult } from "../types/customer";
import { formatDistanceToNow } from "date-fns";

export interface CustomerMore {
  id: string;
  name: string;
  title: string | null;
  email: string;
  phone: string | null;
  lastVisit: string | null;
  totalSpent: number;
}

export class CustomerService {
  static async fetchCustomers(
    dateFrom?: string,
    dateTo?: string
  ): Promise<CustomerMore[]> {
    let query = supabase.from("customers").select(`
        id,
        name,
        title,
        email,
        phone_number,
        orders${dateFrom || dateTo ? "!inner" : ""} (
          created_at,
          total
        )
      `);

    if (dateFrom) query = query.gte("orders.created_at", dateFrom);
    if (dateTo) query = query.lte("orders.created_at", dateTo);

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    return data.map((customer) => {
      const orders = customer.orders || [];
      const lastVisit =
        orders.length > 0
          ? formatDistanceToNow(new Date(orders[0].created_at), {
              addSuffix: true,
            })
          : null;
      const totalSpent = orders.reduce(
        (sum: number, order: { total: number }) => sum + (order.total || 0),
        0
      );

      return {
        id: customer.id,
        name: customer.name,
        title: customer.title,
        email: customer.email,
        phone: customer.phone_number,
        lastVisit,
        totalSpent,
      };
    });
  }

  static async getById(id: string): Promise<Customer | null> {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return {
        id: data.id,
        name: data.name,
        title: data.title,
        email: data.email,
        phone: data.phone,
        createdAt: data.created_at,
      };
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
      throw error;
    }
  }

  static async getOrCreateCustomer(customer: CustomerForm): Promise<Customer> {
    try {
      // 1️⃣ Check if exists
      const { data: existing, error: fetchError } = await supabase
        .from("customers")
        .select("*")
        .eq("email", customer.email)
        .single();
      if (fetchError && fetchError.code !== "PGRST116") throw fetchError;
      if (existing) return this.transformCustomer(existing);
      // 2️⃣ Insert new
      const { data, error } = await supabase
        .from("customers")
        .insert({
          name: customer.name,
          title: customer.title,
          email: customer.email,
          phone_number: customer.phoneNumber ?? "",
        })
        .select("*")
        .single();
      if (error) throw error;
      return this.transformCustomer(data);
    } catch (error) {
      console.error("Error getting or creating customer:", error);
      throw error;
    }
  }

  static async updateCustomer(
    id: string,
    updates: Partial<CustomerForm>
  ): Promise<Customer> {
    try {
      const updateData: Partial<CustomerResult> = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.phoneNumber !== undefined)
        updateData.phone_number = updates.phoneNumber;
      const { data, error } = await supabase
        .from("customers")
        .update(updateData)
        .eq("id", id)
        .select("*")
        .single();
      if (error) throw error;
      return this.transformCustomer(data);
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  }

  static async deleteCustomer(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  }

  static async transformCustomer(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      title: customer.title,
      phone: customer?.phone ?? "",
      createdAt: customer.createdAt,
    };
  }
}
