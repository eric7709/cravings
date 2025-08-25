import { MenuItem } from "@/modules/MenuItems/types/menuItems";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

export const checkAvailabilityOfItem = async (items: MenuItem[]) => {
  const { data: latestItems, error: stockError } = await supabase
    .from("menu_items")
    .select("id, name, is_available")
    .in(
      "id",
      items.map((i) => i.id)
    );

  let error;
  let ids;
  if (stockError) {
    console.error(stockError);
    toast.error("Could not verify item availability. Please try again.");
    error = stockError.message;
    return;
  }
  const unavailable = latestItems?.filter((i) => !i.is_available) || [];
  if (unavailable.length > 0) {
    const ids = unavailable.map((i) => i.id);
    toast.error(
      `These items are no longer available: ${unavailable
        .map((i) => i.name)
        .join(", ")}`
    );
  }
  return {
    error,
    ids,
  };
};
