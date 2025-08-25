import { LucideIcon } from "lucide-react";
import { MostMeasurementAnalytics } from "../types/analytics";
import SalesCardGrid from "./SalesCardGrid";

type Props = {
  data: MostMeasurementAnalytics[] | undefined;
  icon: LucideIcon
  bgColor?: string;
  title: string;
  iconBg?: string; // icon wrapper bg
  iconColor?: string; // icon color
  iconSize?: string; 
};
export default function MostAnalytics(props: Props) {
  const { data, title, icon, bgColor, iconBg, iconColor, iconSize} = props;
  return <SalesCardGrid {...{icon, title, data, bgColor, iconBg, iconColor, iconSize}} />;
}
