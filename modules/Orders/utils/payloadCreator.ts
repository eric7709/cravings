import { Customer } from "@/modules/Customers/types/customer";
import { CreateOrder, OrderMenutItem } from "../types/orders";
import { Table } from "@/modules/Tables/types/table";
import { Employee } from "@/modules/Employees/types/employee";

type Props = {
  customer: Customer;
  table: Table;
  items: OrderMenutItem[];
  total: number;
  activeWaiters: (Employee | null | undefined)[];
};

export const orderPayloadCreator = ({
  customer,
  table,
  items,
  activeWaiters,
  total,
}: Props): CreateOrder | null => {
  // If the table already has an assigned waiter, use them.
  if (table.waiterId && table.waiter) {
    return {
      tableId: table.id,
      waiterId: table.waiterId,
      waiterName: table.waiter.firstName ?? null,
      customerId: customer?.id ?? null,
      customerName: customer?.name ?? null,
      customerTitle: customer?.title ?? "",
      items,
      status: "pending",
      tableName: table.name,
      total,
    };
  }

  // If there's no assigned waiter, select one randomly from the available waiters.
  if (activeWaiters.length === 0) {
    return null;
  }

  const random = Math.floor(Math.random() * activeWaiters.length);
  const selectedWaiter = activeWaiters[random];

  return {
    tableId: table.id,
    waiterId: selectedWaiter?.id ?? null,
    waiterName: selectedWaiter?.firstName ?? null,
    customerId: customer?.id ?? null,
    customerName: customer?.name ?? null,
    customerTitle: customer?.title ?? "",
    items,
    status: "pending",
    tableName: table.name,
    total,
  };
};