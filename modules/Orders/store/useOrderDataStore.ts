import { create } from "zustand";
import {
  OrderDataStore,
  OrderDataStoreState,
  Order,
  PaymentMethod,
} from "../types/orders"; 
import { OrderService } from "../services/orderServices";
import { createRealtimeSubscription } from "@/utils/createRealTimeSubscription";

export const useOrderDataStore = create<OrderDataStore>((set, get) => {
  let unsubscribe: () => void;
  const updateState = (
    updates:
      | Partial<OrderDataStoreState>
      | ((state: OrderDataStoreState) => Partial<OrderDataStoreState>)
  ) => set(updates);

  const initializeSubscription = () => {
    unsubscribe = createRealtimeSubscription("orders", {
      onInsert: (row: Order) => {
        updateState((state) => {
          const exists = state.orders.some((o) => o.id === row.id);
          if (!exists) {
            const statusKey = row.status as keyof typeof state.counts;
            return {
              orders: [row, ...state.orders],
              counts: {
                ...state.counts,
                [statusKey]: (state.counts[statusKey] ?? 0) + 1,
                all: state.counts.all + 1,
              },
            };
          }
          return {};
        });
      },
      onUpdate: (row: Order) => {
        updateState((state) => {
          let newCounts = { ...state.counts };
          const updatedOrders = state.orders.map((o) => {
            if (o.id === row.id) {
              if (row.status && row.status !== o.status) {
                const oldStatusKey = o.status as keyof typeof newCounts;
                const newStatusKey = row.status as keyof typeof newCounts;
                newCounts[oldStatusKey] = Math.max(
                  0,
                  newCounts[oldStatusKey] - 1
                );
                newCounts[newStatusKey] = (newCounts[newStatusKey] ?? 0) + 1;
              }
              return { ...o, ...row };
            }
            return o;
          });
          return { orders: updatedOrders, counts: newCounts };
        });
      },
      onDelete: (id: Order["id"]) => {
        updateState((state) => {
          const orderToRemove = state.orders.find((o) => o.id === id);
          if (!orderToRemove) return {};
          const statusKey = orderToRemove.status as keyof typeof state.counts;
          return {
            orders: state.orders.filter((o) => o.id !== id),
            counts: {
              ...state.counts,
              [statusKey]: Math.max(0, state.counts[statusKey] - 1),
              all: Math.max(0, state.counts.all - 1),
            },
          };
        });
      },
    });
  };

  // Cleanup on unmount
  if (typeof window !== "undefined") {
    initializeSubscription();
  }

  return {
    orders: [],
    total: 0,
    totalPages: 1,
    paymentMethod: null,
    page: 1,
    limit: 50,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    status: "",
    isLoading: false,
    counts: { pending: 0, completed: 0, cancelled: 0, paid: 0, all: 0 },
    totals: { pending: 0, completed: 0, cancelled: 0, paid: 0, all: 0 },
    dateFrom: undefined,
    dateTo: undefined,
    setPage: (page: number) => {
      updateState({ page });
      get().fetchOrders();
    },
    setSearch: (search: string) => {
      updateState({ search, page: 1 });
      get().fetchOrders();
    },
    setSort: (sortBy: keyof Order, sortOrder: "asc" | "desc") => {
      updateState({ sortBy, sortOrder, page: 1 });
      get().fetchOrders();
    },
    setStatus: (status: string) => {
      updateState({ status, page: 1 });
      get().fetchOrders();
    },
    setDateRange: (from?: string, to?: string) => {
      updateState({ dateFrom: from, dateTo: to, page: 1 });
      get().fetchOrders();
    },
    fetchOrders: async () => {
      updateState({ isLoading: true });
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
      } = get();
      try {
        const { orders, total, totalPages, counts, totals } =
          await OrderService.getAllOrders({
            page,
            limit,
            search,
            sortBy,
            sortOrder,
            status,
            dateFrom,
            dateTo,
            paymentMethod: paymentMethod!,
          });
        updateState({
          orders,
          total,
          totalPages,
          counts,
          totals,
          isLoading: false,
        });
      } catch (error) {
        console.error("Fetch orders failed:", error);
        updateState({ isLoading: false });
      }
    },
    refetchOrders: async () => {
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
      } = get();
      try {
        const { orders, total, totalPages, counts, totals } =
          await OrderService.getAllOrders({
            page,
            limit,
            search,
            sortBy,
            sortOrder,
            status,
            dateFrom,
            dateTo,
            paymentMethod: paymentMethod!,
          });
        // Update state without changing isLoading
        updateState({
          orders,
          total,
          totalPages,
          counts,
          totals,
        });
      } catch (error) {
        console.error("Refetch orders failed:", error);
      }
    },

    addOrder: (order: Order) => {
      updateState((state) => {
        const exists = state.orders.some((o) => o.id === order.id);
        if (!exists) {
          const statusKey = order.status as keyof typeof state.counts;
          return {
            orders: [order, ...state.orders],
            counts: {
              ...state.counts,
              [statusKey]: (state.counts[statusKey] ?? 0) + 1,
              all: state.counts.all + 1,
            },
          };
        }
        return {};
      });
    },
    updateOrder: (id: string, updates: Partial<Order>) => {
      updateState((state) => {
        let newCounts = { ...state.counts };
        const updatedOrders = state.orders.map((o) => {
          if (o.id === id) {
            if (updates.status && updates.status !== o.status) {
              const oldStatusKey = o.status as keyof typeof newCounts;
              const newStatusKey = updates.status as keyof typeof newCounts;
              newCounts[oldStatusKey] = Math.max(
                0,
                newCounts[oldStatusKey] - 1
              );
              newCounts[newStatusKey] = (newCounts[newStatusKey] ?? 0) + 1;
            }
            return { ...o, ...updates };
          }
          return o;
        });
        return { orders: updatedOrders, counts: newCounts };
      });
    },
    setPaymentMethod: (value: PaymentMethod) => {
      updateState({ paymentMethod: value });
      get().fetchOrders();
    },
    clearPaymentMethod: () => {
      updateState({ paymentMethod: null });
      get().fetchOrders();
    },
    removeOrder: (id: string) => {
      updateState((state) => {
        const orderToRemove = state.orders.find((o) => o.id === id);
        if (!orderToRemove) return {};
        const statusKey = orderToRemove.status as keyof typeof state.counts;
        return {
          orders: state.orders.filter((o) => o.id !== id),
          counts: {
            ...state.counts,
            [statusKey]: Math.max(0, state.counts[statusKey] - 1),
            all: Math.max(0, state.counts.all - 1),
          },
        };
      });
    },
  };
});
