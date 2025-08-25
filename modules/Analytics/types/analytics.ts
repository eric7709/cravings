export type MetricValue = {
    title: string;
    total: number;
    percentageChange: number; 
}

export type TableAnalytics = {
    tableId: string;
    tableName: string;
    tableNumber: number;
    totalRevenue: number;
    totalOrders: number;
    averageSpend: number;
}

export type CategoryAnalytics = {
    categoryId: string;
    categoryName: string;
    totalRevenue: number;
    itemsSold: number;
    averageRevenuePerOrder: number;
}

export type WaiterAnalytics = {
    waiterId: string;
    waiterName: string;
    totalRevenue: number;
    totalOrders: number;
    averageRevenuePerOrder: number;
    averageOrdersPerDay: number;
    averageRevenuePerDay: number;
}

export type CustomerAnalytics = {
    customerId: string;
    customerName: string;
    totalRevenue: number;
    totalOrders: number;
    totalVisits: number;
    lastVisit: string;
    averageRevenuePerOrder: number;
    averageRevenuePerVisit: number;
    averageOrdersPerVisit: number;
}

export type MenuItemAnalytics = {
    menuItemId: string;
    itemName: string;
    totalRevenue: number;
    quantitySold: number;
    averageRevenuePerOrder: number;
}

export type MostMeasurementAnalytics = {
    title: string; 
    totalRevenue: number;
    totalOrders: number;
    averageOrders: number;
}

export type AnalyticsData = {
    metrics: MetricValue[];
    topTables: TableAnalytics[];
    topCategories: CategoryAnalytics[];
    topWaiters: WaiterAnalytics[];
    topCustomers: CustomerAnalytics[];
    topMenuItems: MenuItemAnalytics[];
    mostSellingTimesOfDay: MostMeasurementAnalytics[];
    mostSellingDaysOfWeek: MostMeasurementAnalytics[];
    mostUsedPaymentMethods: MostMeasurementAnalytics[];
};

export type AnalyticStoreStates = {
    analytics: AnalyticsData | null;
    isLoading: boolean;
    error: string | null;
    startDate: Date;
    endDate: Date;
    label: string;
};

export type AnalyticsStoreActions = {
    fetchAnalytics: () => Promise<void>;
    setDateRange: (start: Date, end: Date, label?: string) => Promise<void>;
};

export type AnalyticsDataStore = AnalyticStoreStates & AnalyticsStoreActions;