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

type Props = {
  table: Table | null;
};
export default function Base(props: Props) {
  const { table } = props;
  const router = useRouter();
  useEffect(() => {
    if (!table) router.push("/table-not-found");
  }, []);
  const { setAllocatedTableId } = useOrderSelectionStore();
  useSyncCategoryDataStore();
  useSyncTableDataStore();
  useMenuItemsDataSyncAndSubscribe();
  useEffect(() => {
    if (table) setAllocatedTableId(table.id);
  }, []);
  return (
    <div className="h-screen fixed inset-0 flex flex-col ">
      <MenuCartPage />
      <OrderSummaryModal />
      <MenuPageHeader />
      <MenuPageSearch />
      <MenuDetailsModal />
      <MenuPageCategories />
      <MenuItemList />
      <CreateOrderButton />
      <CreateCustomerModal />
    </div>
  );
}
