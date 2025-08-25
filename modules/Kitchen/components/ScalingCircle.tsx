"use client";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import React from "react";

type Props = {
  section?: "kitchen" | "cashier" | "admin";
  removemargin?: boolean
};

export default function ScalingCircle({ section, removemargin }: Props) {
  const { counts } = useOrderDataStore();

  const circles = [
    { value: counts.pending, color: "bg-amber-500", type: "pending" },
    { value: counts.completed, color: "bg-cyan-500", type: "completed" },
  ];

  const filteredCircles =
    section === "kitchen"
      ? circles.filter((c) => c.type === "pending")
      : circles;

  return (
    <>
      <style>{`
        @keyframes scaleUpDown {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      <div className={`flex  gap-3 sm:gap-3 ${removemargin ? "" : "ml-auto"}`}>
        {filteredCircles.map((item, i) => (
          <div
            key={i}
            className={`${item.color} text-white rounded-full flex justify-center items-center font-bold select-none`}
            style={{
              width: "clamp(28px, 5vw, 40px)",
              height: "clamp(28px, 5vw, 40px)",
              fontSize: "clamp(14px, 2.5vw, 18px)",
              animation: "scaleUpDown 4s ease-in-out infinite",
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </>
  );
}
