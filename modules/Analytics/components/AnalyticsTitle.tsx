"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

type AnalyticsTitleProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  bgColor?: string; // outer container bg
  iconBg?: string; // icon wrapper bg
  iconColor?: string; // icon color
  iconSize?: string; // Tailwind size e.g. "w-6 h-6"
  iconWrapperSize?: string; // Tailwind size e.g. "w-12 h-12"
  iconWrapperRadius?: string; // Tailwind radius e.g. "rounded-lg"
};

export default function AnalyticsTitle({
  icon: Icon,
  title,
  subtitle,
  bgColor = "bg-white", // default card background
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  iconSize = "w-6 h-6",
  iconWrapperSize = "w-12 h-12",
  iconWrapperRadius = "rounded-xl",
}: AnalyticsTitleProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border border-gray-200/70 px-4 py-3 shadow-sm hover:shadow-md transition duration-300 ${bgColor} mb-3`}
    >
      {/* Icon wrapper */}
      <div
        className={`${iconWrapperSize} flex items-center justify-center shadow-sm border border-gray-200/50 ${iconWrapperRadius} ${iconBg}`}
      >
        <Icon className={`${iconSize} ${iconColor}`} />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
