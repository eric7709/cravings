import { OrderStatus } from "@/modules/Orders/types/orders";

export const getStyle = (status: OrderStatus) => {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        bg: "bg-amber-500 text-white", // Brightened amber for pending
        border: "border-amber-400",
        hover: "hover:bg-amber-600", // Darker amber on hover
      };
    case "preparing":
      return {
        bg: "bg-blue-500 text-white", // Brightened blue for preparing
        border: "border-blue-400",
        hover: "hover:bg-blue-600", // Darker blue on hover
      };
    case "ready":
      return {
        bg: "bg-green-500 text-white", // Brightened green for ready
        border: "border-green-400",
        hover: "hover:bg-green-600", // Darker green on hover
      };
    case "served":
      return {
        bg: "bg-emerald-600 text-white", // Slightly lighter emerald for served
        border: "border-emerald-500",
        hover: "hover:bg-emerald-700", // Darker emerald on hover
      };
    case "completed":
      return {
        bg: "bg-cyan-500 text-white", // Slightly lighter emerald for served
        border: "border-emerald-500",
        hover: "hover:bg-emerald-700", // Darker emerald on hover
      };
    case "cancelled":
      return {
        bg: "bg-red-300 text-white", // Brightened red for cancelled
        border: "border-red-200",
        hover: "hover:bg-red-400", // Darker red on hover
      };
    case "paid":
      return {
        bg: "bg-green-500 text-black", // Brightened teal for paid
        border: "border-teal-400",
        hover: "hover:bg-teal-600", // Darker teal on hover
      };
    default:
      return {
        bg: "bg-gray-500 text-white", // Neutral gray for unknown status
        border: "border-gray-400",
        hover: "hover:bg-gray-600", // Darker gray on hover
      };
  }
};