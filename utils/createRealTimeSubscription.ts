import { supabase } from "@/lib/supabase";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { Order } from "@/modules/Orders/types/orders"; // Import your Order type

type Handlers<T extends Order> = {
  onInsert?: (row: T) => void;
  onUpdate?: (row: T) => void;
  onDelete?: (id: T["id"]) => void;
};

export function createRealtimeSubscription<T extends Order>(
  table: string,
  { onInsert, onUpdate, onDelete }: Handlers<T>
) {
  let channel: ReturnType<typeof supabase.channel> | null = null;

  const subscribe = () => {
    if (channel) supabase.removeChannel(channel);

    channel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        ({ eventType, new: newRow, old }: RealtimePostgresChangesPayload<T>) => {
          if (eventType === "INSERT" && newRow) onInsert?.(newRow);
          else if (eventType === "UPDATE" && newRow) onUpdate?.(newRow);
          else if (eventType === "DELETE" && old?.id) onDelete?.(old.id);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log(`✅ Subscribed to ${table} changes`);
        } else if (["CLOSED", "CHANNEL_ERROR"].includes(status)) {
          console.warn(`⚠️ ${table} channel closed — retrying in 2s...`);
          setTimeout(subscribe, 2000);
        }
      });
  };

  const handleOnline = () => {
    console.log("🌐 Network reconnected — resubscribing...");
    subscribe();
  };

  const handleOffline = () => {
    console.warn("📴 Network offline — waiting to reconnect...");
  };

  // Init subscription
  subscribe();

  // Network status listeners
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // Smarter heartbeat check
  const heartbeat = setInterval(() => {
    if (!channel) {
      console.warn(`💔 ${table} channel missing — reconnecting...`);
      subscribe();
      return;
    }
    if (["CLOSED", "CHANNEL_ERROR"].includes(channel.state)) {
      console.warn(`💔 ${table} heartbeat detected bad state (${channel.state}) — reconnecting...`);
      subscribe();
    }
  }, 20000);

  // Cleanup
  return () => {
    clearInterval(heartbeat);
    if (channel) supabase.removeChannel(channel);
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}