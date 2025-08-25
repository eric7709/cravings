import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { ChangeEvent } from "react";

export type ModalStates = "summary" | "success" | "create" | "details" | null;
export type OrderStatus =
  | "all"
  | "pending"
  | "completed"
  | "paid"
  | "cancelled";

export type OrderMenutItem = {
  id: string;
  takeHome: boolean
  name: string;
  price: number;
  quantity: number;
};


export type CreateOrder = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "invoiceId" 
>;

export type UpdateOrder = Partial<
  Omit<
    Order,
    "id" | "createdAt" | "tableName" | "waiterName" | "waiterId" | "tableId"
  >
>;

export type Order = {
  id: string;
  tableId: string | null;
  waiterId: string | null;
  items: OrderMenutItem[];
  total: number;
  status: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
  customerName: string | null;
  customerId: string | null;
  customerTitle: string | null;
  discount?: boolean
  invoiceId: string | null;
  tableName: string | null;
  waiterName: string | null;
  paymentMethod?: string
};

export type OrderResult = {
  id: string;
  table_id: string | null;
  waiter_id: string | null;
  items: OrderMenutItem[];
  total: number;
  created_at?: string;
  updated_at?: string;
  status: OrderStatus;
  discount: boolean
  customer_name: string | null;
  customer_title: string | null;
  customer_id: string | null;
  invoice_id: string | null;
  table_name: string | null;
  waiter_name: string | null;
};

 export type PaymentMethod = "all" | "cash" | "transfer" | "card" | "online"


export interface OrderDataStoreState {
  orders: Order[];
  total: number;
  totalPages: number;
  paymentMethod: PaymentMethod | null;
  page: number;
  limit: number;
  search: string;
  sortBy: keyof Order;
  sortOrder: "asc" | "desc";
  status: string;
  isLoading: boolean;
  counts: {
    pending: number;
    completed: number;
    cancelled: number;
    paid: number;
    all: number;
  };
  totals: {
    pending: number;
    completed: number;
    cancelled: number;
    paid: number;
    all: number;
  };
  dateFrom?: string; // ISO start date
  dateTo?: string;   // ISO end date
}

// Define actions separately
export interface OrderDataStoreActions {
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSort: (sortBy: keyof Order, sortOrder: "asc" | "desc") => void;
  setStatus: (status: string) => void;
  setDateRange: (from?: string, to?: string) => void;
  fetchOrders: () => Promise<void>;
  refetchOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  setPaymentMethod: (value: PaymentMethod) => void;
  clearPaymentMethod: () => void;
  
  removeOrder: (id: string) => void;
}

// Combine state and actions into the full store type
export type OrderDataStore = OrderDataStoreState & OrderDataStoreActions;




export interface UseOrderSelectionStore {
  // Search & filtering
  searchTerm: string;
  cartModalOpened: boolean
  toggleCartModal: () => void
  closeCartModal: () => void
  selectedCategory: string;
  changeSelectedCategory: (category: string) => void;
  changeSearchTerm: (e: ChangeEvent<HTMLInputElement>) => void;
  clearSearchTerm: () => void;
  resetFields: () => void;
  filterMenuItems: (menuItems: MenuItem[]) => MenuItem[];

  // Modal state
  activeModal: string | null;
  setModal: (value: string | null) => void;
  closeModal: () => void;

  // Success state
  success: boolean;
  checkSuccessful: () => void;
  clearSuccess: () => void;

  // Customer
  customerDetails: any | null; // Replace with your customer type
  setCustomerDetails: (customer: any) => void;
  clearCustomerDetails: () => void;

  // Selected menu items for the order
  items: OrderMenutItem[];
  itemDetails: MenuItem | null;
  setItemDetails: (itemDetails: MenuItem) => void;
  clearItemDetails: () => void;
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  resetItems: () => void;
  isSelected: (id: string) => boolean;
  toggleTakeHome: (id: string) => void
  getTotal: () => number;

  // Allocated table
  allocatedTableId: string | null; // Replace with your table type
  setAllocatedTableId: (id: string) => void;
  clearAllocatedTableId: () => void;
}
