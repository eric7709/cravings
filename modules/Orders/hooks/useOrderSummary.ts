"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { useCreateOrder } from "./useOrderServices";
import { Customer } from "@/modules/Customers/types/customer";
import { supabase } from "@/lib/supabase";
import { useMenuItemDataStore } from "@/modules/MenuItems/store/useMenuItemsDataStore";
import {
  useGetCustomerById,
  useGetOrCreateCustomer,
} from "@/modules/Customers/hooks/useCustomerSerivces";
import { orderPayloadCreator } from "../utils/payloadCreator";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { getCustomerFromCookie } from "@/utils/getCustomerFromCookie";

export function useOrderSummary() {
  const {
    items,
    getTotal,
    resetItems,
    allocatedTableId,
    checkSuccessful,
    clearSuccess,
    success,
    activeModal,
    setModal,
    closeModal,
    removeMenuItem,
  } = useOrderSelectionStore();

  const { menuItems } = useMenuItemDataStore();
  const { fetchTables, tables } = useTableDataStore();
  const fetchedCustomer = getCustomerFromCookie();
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { data: ensuredCustomer, error: customerError, isLoading: isLoadingCustomer } =
    useGetCustomerById(fetchedCustomer?.id ?? "");
  const { mutateAsync: createCustomer, error: creationError, isPending: isCreatingCustomer } =
    useGetOrCreateCustomer();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [unavailableIds, setUnavailableIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (activeModal === "summary") return;
    const unavailableOrderedItems = items.filter((orderItem) => {
      const menuItem = menuItems.find((m) => m.id === orderItem.id);
      return menuItem && !menuItem.isAvailable;
    });
    unavailableOrderedItems.forEach((item) => removeMenuItem(item.id));
  }, [menuItems, items, removeMenuItem, activeModal]);
  useEffect(() => {
    if (activeModal === "summary") setUnavailableIds([]);
  }, [activeModal]);
  const handleRemoveItem = (id: string) => removeMenuItem(id);
  const handleClick = () => {
    closeModal();
    if (success) {
      clearSuccess();
      resetItems();
    }
  };

  /** Ensure we have a valid customer */
  const ensureCustomer = async (): Promise<Customer | null> => {
    if (isLoadingCustomer || isCreatingCustomer) {
      toast.info("Please wait, verifying customer information...");
      return null;
    }

    if (!fetchedCustomer) {
      setModal("create");
      return null;
    }

    if (ensuredCustomer && !customerError) return ensuredCustomer;

    const created = await createCustomer({
      email: fetchedCustomer.email,
      name: String(fetchedCustomer.name),
      phoneNumber: String(fetchedCustomer.phone),
      title: fetchedCustomer.title ?? "",
    });

    if (creationError || !created) {
      toast.error("Failed to create customer.");
      return null;
    }

    return created;
  };

  /** Verify stock availability */
  const checkAvailability = async () => {
    const { data: latestItems, error: stockError } = await supabase
      .from("menu_items")
      .select("id, name, is_available")
      .in(
        "id",
        items.map((i) => i.id)
      );

    if (stockError) {
      console.error(stockError);
      toast.error("Could not verify item availability. Please try again.");
      return false;
    }

    const unavailable = latestItems?.filter((i) => !i.is_available) ?? [];
    if (unavailable.length > 0) {
      setUnavailableIds(unavailable.map((i) => i.id));
      toast.error(
        `Unavailable: ${unavailable.map((i) => i.name).join(", ")}`
      );
      return false;
    }

    return true;
  };

  /** Confirm and place the order */
  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      fetchTables();

      if (!items.length) {
        toast.error("You must add at least one item.");
        return;
      }

      if (!allocatedTableId) {
        toast.error("Please select a table before placing the order.");
        return;
      }

      const table = tables.find((el) => el.id === allocatedTableId);
      if (!table) {
        toast.error("Selected table not found.");
        return;
      }

      const finalCustomer = await ensureCustomer();
      if (!finalCustomer) return;
      setCustomer(finalCustomer);

      const available = await checkAvailability();
      if (!available) return;

      const activeWaiters = tables
        .filter((el) => el.waiter)
        .map((el) => el.waiter);

      const payload = orderPayloadCreator({
        customer: finalCustomer,
        activeWaiters,
        table,
        items,
        total: getTotal(),
      });

      if (!payload) {
        toast.error("Sorry, no waiter available at the moment.");
        return;
      }

      createOrder(payload, {
        onSettled: () => setIsSubmitting(false),
      });

      checkSuccessful();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items,
    customer,
    unavailableIds,
    success,
    total: getTotal(),
    isSubmitting: isSubmitting || isCreatingOrder || isCreatingCustomer,
    activeModal,
    handleClick,
    handleConfirm,
    handleRemoveItem,
    closeModal,
    resetItems,
  };
}
