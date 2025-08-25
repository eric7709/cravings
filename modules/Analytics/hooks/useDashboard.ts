import { AnalyticsServices } from "@/modules/Analytics/services/AnalyticsServices";
import { useEffect, useState } from "react";
import { DAHSBOARD_INITIAL_STATES } from "../constants/data";
import { useUIStore } from "@/store/useUIStore";

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(DAHSBOARD_INITIAL_STATES);
  const { toggleDrawer, drawerOpened } = useUIStore();
  const [loading, setLoading] = useState(true);
  const fetchDashboardData = async () => {
    setLoading(true);
    const dashboardData = await AnalyticsServices.fetchDashboardData();
    setDashboardData(dashboardData);
    setLoading(false);
  };
  useEffect(() => {
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return {
    toggleDrawer,
    drawerOpened,
    dashboardData,
    loading,
  };
};
