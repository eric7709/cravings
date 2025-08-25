import { TableService } from "@/modules/Tables/services/tableServices";
import Base from "@/allPages/menu/Base";
import { JSX } from "react";

type TParams = {
  params: {
    url: string;
  };
};
export default async function Page({
  params,
}: {
  params: Promise<TParams["params"]>;
}): Promise<JSX.Element> {
  const resolvedParams = await params;
  const url = resolvedParams.url;
  const table = await TableService.getTableByUrl(url);
  return <Base table={table} />;
}
