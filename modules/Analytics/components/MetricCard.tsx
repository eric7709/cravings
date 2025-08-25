"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MetricValue } from "../types/analytics";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  metric: MetricValue;
  idx: number;
};

// 🎨 Solid top strip colors
const TOP_COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
];

export default function MetricCard({ metric, idx }: Props) {
  const { total, percentageChange, title } = metric;
  const strip = TOP_COLORS[idx % TOP_COLORS.length];

  // total formatting
  let formattedTotal: string;
  if (title.toLowerCase().includes("revenue") || title.toLowerCase().includes("value")) {
    formattedTotal = formatPrice(total);
  } else if (title.toLowerCase().includes("rate")) {
    formattedTotal = `${total.toFixed(1)}%`;
  } else {
    formattedTotal = total.toLocaleString();
  }

  const formattedPercentage = `${percentageChange > 0 ? "+" : ""}${percentageChange.toFixed(1)}%`;

  return (
    <motion.div
      key={title}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative flex flex-col p-6 rounded-lg shadow-md bg-white text-gray-900 border border-gray-200 transition-all duration-300 hover:shadow-lg"
    >
      {/* Colored top strip */}
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-lg ${strip}`} />

      {/* Content */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium capitalize text-gray-500">{title}</h3>
      </div>

      <div className="flex-grow">
        <AnimatePresence mode="popLayout">
          <motion.p
            key={formattedTotal}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-2xl font-bold"
          >
            {formattedTotal}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4">
        <span className="text-xs text-gray-400">vs Last Period</span>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-600">{formattedPercentage}</span>
        </div>
      </div>
    </motion.div>
  );
}
