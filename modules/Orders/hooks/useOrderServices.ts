"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../services/orderServices";
import {  CreateOrder, Order, UpdateOrder } from "../types/orders";


export function useUpdateOrderStatus() {
  return useMutation<Order | null, Error, { id: string; status: Order["status"] }>({
    mutationFn: ({ id, status }) => OrderService.updateOrderStatus(id, status),
  });
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: CreateOrder) => OrderService.createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateOrder }) =>
      OrderService.updateOrder(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => OrderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
