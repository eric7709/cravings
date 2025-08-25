import { supabase } from "@/lib/supabase";
import { Table, TableFormData, TableFormError, TableFormInput, TableResult } from "../types/table";
import { Employee } from "@/modules/Employees/types/employee";
import { EmployeeService } from "@/modules/Employees/services/employeeServices";

export class TableService {
  static containerClass(isActive: boolean) {
    return isActive
      ? "opacity-100 pointer-events-auto scale-100"
      : "opacity-0 pointer-events-none scale-95";
  }

  static transformTables(tables: TableResult[]): Table[] {
    return tables.map(this.transformTable);
  }

  static getTable(tables: Table[], tableId: string): Table | null {
    return tables.find((el) => el.id === tableId) || null;
  }

  static getWaitersTables(tables: Table[], user: Employee | null) {
    const myTables = tables.filter((el) => el.waiterId === user?.id);
    return myTables;
  }

  static createPayload(form: TableFormInput) {
    return {
      name: form.name.trim(),
      capacity: Number(form.capacity),
      tableNumber: Number(form.tableNumber),
      waiterId: form.waiterId || null,
      url: Math.random().toString(36).substring(2, 10),
    };
  }
  static setUpFormForUpdate(activeTable: Table) {
    return {
      name: activeTable?.name || "",
      tableNumber: activeTable?.tableNumber?.toString() || "",
      capacity: activeTable?.capacity?.toString() || "",
      waiterId: activeTable?.waiterId || "",
    };
  }

  static validate(form: TableFormInput) {
    const errors: Partial<TableFormError> = {};
    if (!form.name.trim()) {
      errors.name = "Table name is required";
    }
    if (!form.tableNumber.trim()) {
      errors.tableNumber = "Table number is required";
    } else if (isNaN(Number(form.tableNumber))) {
      errors.tableNumber = "Table number must be a number";
    }
    if (!form.capacity.trim()) {
      errors.capacity = "Capacity is required";
    } else if (isNaN(Number(form.capacity))) {
      errors.capacity = "Capacity must be a number";
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static transformTable(table: TableResult): Table {
    return {
      id: table.id,
      name: table.name,
      tableNumber: table.table_number,
      capacity: table.capacity,
      isAvailable: table.is_available,
      waiterId: table.waiter_id,
      waiter: table.waiter
        ? EmployeeService.transformEmployee(table.waiter)
        : undefined,
      url: table.url,
    };
  }

  static async getAllTables(): Promise<Table[]> {
    const { data, error } = await supabase
      .from("tables")
      .select(
        `
        *,
        waiter:employees(*)
      `
      )
      .order("table_number");
    if (error) throw error;
    return this.transformTables(data as any);
  }

  // 🔹 Get single table
  static async getTableById(id: string): Promise<Table | null> {
    const { data, error } = await supabase
      .from("tables")
      .select(
        `
        *,
        waiter:employees(*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data ? this.transformTable(data as any) : null;
  }
  static async getTableByUrl(url: string): Promise<Table | null> {
    const { data, error } = await supabase
      .from("tables")
      .select(
        `
        *,
        waiter:employees(*)
      `
      )
      .eq("url", url)
      .maybeSingle();
    if (error) return null;
    return data ? this.transformTable(data as any) : null;
  }

  // 🔹 Create
  static async createTable(payload: TableFormData): Promise<Table> {
    // 1️⃣ Insert table and return with waiter relation
    const { data, error } = await supabase
      .from("tables")
      .insert({
        name: payload.name,
        table_number: payload.tableNumber,
        capacity: payload.capacity,
        is_available: payload.isAvailable ?? true,
        waiter_id: payload.waiterId ?? null,
        url: payload.url,
      })
      .select(
        `
      *,
      waiter:employees(*)
    `
      )
      .single();

    if (error) throw error;

    // 2️⃣ If a waiter is assigned, insert allocation history
    if (payload.waiterId) {
      const { error: historyError } = await supabase
        .from("table_allocation_history")
        .insert({
          table_id: data.id,
          waiter_id: payload.waiterId,
          allocated_at: new Date().toISOString(),
        });

      if (historyError) {
        console.error("Failed to insert allocation history", historyError);
      }
    }

    // ✅ Transform before returning
    return this.transformTable(data as any);
  }

  // 🔹 Update
  static async updateTable(
    id: string,
    updates: Partial<TableFormData>
  ): Promise<Table> {
    const { data, error } = await supabase
      .from("tables")
      .update({
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.tableNumber !== undefined && {
          table_number: updates.tableNumber,
        }),
        ...(updates.capacity !== undefined && { capacity: updates.capacity }),
        ...(updates.isAvailable !== undefined && {
          is_available: updates.isAvailable,
        }),
        ...(updates.waiterId !== undefined && { waiter_id: updates.waiterId }),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return this.transformTable(data as any);
  }

  // 🔹 Delete
  static async deleteTable(id: string): Promise<void> {
    const { error } = await supabase.from("tables").delete().eq("id", id);
    if (error) throw error;
  }

  static async allocateWaiter(
    tableId: string,
    waiterId: string
  ): Promise<Table | null> {
    // 1️⃣ Find current waiter
    const { data: table } = await supabase
      .from("tables")
      .select("waiter_id")
      .eq("id", tableId)
      .single();

    // 2️⃣ If existing waiter, close history
    if (table?.waiter_id) {
      await supabase
        .from("table_allocation_history")
        .update({ deallocated_at: new Date().toISOString() })
        .eq("table_id", tableId)
        .is("deallocated_at", null);
    }

    // 3️⃣ Update current table
    await supabase
      .from("tables")
      .update({ waiter_id: waiterId })
      .eq("id", tableId);

    // 4️⃣ Add new allocation history
    await supabase.from("table_allocation_history").insert({
      table_id: tableId,
      waiter_id: waiterId,
      allocated_at: new Date().toISOString(),
    });

    // 5️⃣ Fetch and return updated table with full waiter details
    const { data: updatedTable, error } = await supabase
      .from("tables")
      .select(
        `
      *,
      waiter:employees(*)
    `
      )
      .eq("id", tableId)
      .single();
    if (error) throw error;
    return updatedTable ? this.transformTable(updatedTable as any) : null;
  }

  // 🔹 Deallocate current waiter
  static async deallocateWaiter(tableId: string) {
    await supabase.from("tables").update({ waiter_id: null }).eq("id", tableId);
    await supabase
      .from("table_allocation_history")
      .update({ deallocated_at: new Date().toISOString() })
      .eq("table_id", tableId)
      .is("deallocated_at", null);
    const { data: updatedTable, error } = await supabase
      .from("tables")
      .select(
        `
      *,
      waiter:employees(*)
    `
      )
      .eq("id", tableId)
      .single();
    if (error) throw error;
    return updatedTable ? this.transformTable(updatedTable as any) : null;
  }
}
