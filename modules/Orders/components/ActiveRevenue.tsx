"use client";

import { useEffect } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { useOrderDataStore } from "../store/useOrderDataStore";

export default function ActiveRevenue() {
  const { totals, refetchOrders } = useOrderDataStore();

  useEffect(() => {
    refetchOrders();
    const intervalId = setInterval(() => {
      refetchOrders();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [refetchOrders]);

  return (
    <p className="text-xl font-bold">
      <span className="text-green-600">{formatPrice(totals.paid)}</span>
    </p>
  );
}