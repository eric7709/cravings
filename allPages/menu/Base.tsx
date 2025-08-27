"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrderSelectionStore } from "@/modules/Orders/store/useOrderSelectionStore";
import { useSyncCategoryDataStore } from "@/modules/Category/hooks/useSyncCategoryDataStore";
import { useSyncTableDataStore } from "@/modules/Tables/hooks/useSyncTableDataStore";
import { useMenuItemsDataSyncAndSubscribe } from "@/modules/MenuItems/hooks/useMenuItemsDataSyncAndSubscribe";
import OrderSummaryModal from "@/modules/Orders/components/OrderSummaryModal";
import MenuPageHeader from "@/modules/Orders/components/MenuPageHeader";
import MenuPageSearch from "@/modules/Orders/components/MenuPageSearch";
import MenuDetailsModal from "@/modules/Orders/components/MenuDetailsModal";
import MenuPageCategories from "@/modules/Orders/components/MenuPageCategories";
import MenuItemList from "@/modules/Orders/components/MenuItemList";
import CreateOrderButton from "@/modules/Orders/components/CreateOrderButton";
import CreateCustomerModal from "@/modules/Orders/components/CreateCustomerModal";
import MenuCartPage from "@/modules/Orders/components/MenuCartPage";
import { Table } from "@/modules/Tables/types/table";
import { useMenuItemDataStore } from "@/modules/MenuItems/store/useMenuItemsDataStore";
import { motion } from "framer-motion";

type Props = {
  table: Table | null;
};

export default function Base(props: Props) {
  const { table } = props;
  const { isLoading } = useMenuItemDataStore();
  const router = useRouter();

  useEffect(() => {
    if (!table) router.push("/table-not-found");
  }, [table, router]);

  const { setAllocatedTableId } = useOrderSelectionStore();
  useSyncCategoryDataStore();
  useSyncTableDataStore();
  useMenuItemsDataSyncAndSubscribe();

  useEffect(() => {
    if (table) setAllocatedTableId(table.id);
  }, [table, setAllocatedTableId]);

  if (isLoading)
    return (
      <div className="h-screen grid place-content-center">
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-4 border-b-4 border-blue-500 mb-2"></div>
          <p className="text-gray-500 text-sm">Loading menu...</p>
        </div>
      </div>
    );

  return (
    <motion.div
      className="inset-0 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <MenuCartPage />
      <OrderSummaryModal />
      <div className="sticky bg-white z-30 top-0">
        <MenuPageHeader />
        <MenuPageSearch />
      </div>
      <MenuDetailsModal />
      <MenuPageCategories />
      <MenuItemList />
      <CreateCustomerModal />
    </motion.div>
  );
}
