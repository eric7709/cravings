import Layout from "@/components/Layout";
import { Children } from "@/types/shared";

export default function layout({ children }: Children) {
  return <Layout>{children}</Layout>;
}
