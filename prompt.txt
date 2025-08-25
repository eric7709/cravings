# Restaurant Analytics PostgreSQL Function - Complete Specification

## Function Signature
```sql
CREATE OR REPLACE FUNCTION get_restaurant_analytics(
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
)
RETURNS JSON
```

## Database Schema

### Tables Structure
```sql
-- Tables
CREATE TABLE tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    table_number INTEGER UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,
    is_available BOOLEAN DEFAULT true,
    waiter_id UUID REFERENCES employees(id),
    url TEXT UNIQUE
);

-- Orders (with JSONB items structure)
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID REFERENCES tables(id),
    waiter_id UUID REFERENCES employees(id),
    customer_id UUID REFERENCES customers(id),
    items JSONB NOT NULL, -- Array of OrderMenuItem objects
    total DOUBLE PRECISION NOT NULL,
    status VARCHAR DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    customer_name TEXT,
    customer_title VARCHAR,
    invoice_id TEXT UNIQUE,
    table_name TEXT,
    waiter_name TEXT,
    discount BOOLEAN DEFAULT false,
    payment_method TEXT -- 'cash', 'transfer', 'card', etc.
);

-- Menu Items
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    category_id UUID REFERENCES categories(id),
    ingredients TEXT[] DEFAULT '{}'
);

-- Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Employees (Waiters)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    gender VARCHAR(10),
    role VARCHAR(50), -- 'waiter', etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    registered_by TEXT
);

-- Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone_number TEXT,
    email TEXT UNIQUE NOT NULL,
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    discount BIGINT DEFAULT 0,
    discount_type TEXT DEFAULT 'null',
    discount_expiry DATE
);
```

### JSONB Items Structure
```typescript
type OrderMenuItem = {
    id: string;        // menu_item.id
    takeHome: boolean;
    name: string;      // menu_item.name
    price: number;     // menu_item.price
    quantity: number;  // ordered quantity
};
```

## Return Type Structure (TypeScript Interface)

```typescript
interface MetricValue {
    title: string;
    total: number;
    percentageChange: number; // compared to previous period
}

interface TableAnalytics {
    tableId: string;
    tableName: string;
    tableNumber: number;
    totalRevenue: number;
    totalOrders: number;
    averageSpend: number;
}

interface CategoryAnalytics {
    categoryId: string;
    categoryName: string;
    totalRevenue: number;
    itemsSold: number;
    averageRevenuePerOrder: number;
}

interface WaiterAnalytics {
    waiterId: string;
    waiterName: string;
    totalRevenue: number;
    totalOrders: number;
    averageRevenuePerOrder: number;
    averageOrdersPerDay: number;
    averageRevenuePerDay: number;
}

interface CustomerAnalytics {
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

interface MenuItemAnalytics {
    menuItemId: string;
    itemName: string;
    totalRevenue: number;
    quantitySold: number;
    averageRevenuePerOrder: number;
}

interface PeriodAnalytics {
    title: string; // Actual day name, time period, or payment method
    totalRevenue: number;
    totalOrders: number;
    averageOrders: number;
}

type AnalyticsData = {
    metrics: MetricValue[];
    topTables: TableAnalytics[];
    topCategories: CategoryAnalytics[];
    topWaiters: WaiterAnalytics[];
    topCustomers: CustomerAnalytics[];
    topMenuItems: MenuItemAnalytics[];
    mostSellingTimesOfDay: PeriodAnalytics[];
    mostSellingDaysOfWeek: PeriodAnalytics[];
    mostUsedPaymentMethods: PeriodAnalytics[];
};

type AnalyticStoreStates = {
    analytics: AnalyticsData | null;
    isLoading: boolean;
    error: string | null;
    startDate: Date;
    endDate: Date;
    label: string;
};

type AnalyticsStoreActions = {
    fetchAnalytics: () => Promise<void>;
    setDateRange: (start: Date, end: Date, label?: string) => Promise<void>;
};

type AnalyticsDataStore = AnalyticStoreStates & AnalyticsStoreActions;
```

## Function Requirements

### Date Range Logic
- **Default Behavior**: If no dates provided, use current week (Monday to Sunday)
- **Custom Range**: Accept any start_date and end_date
- **Previous Period**: Automatically calculate previous period of same duration for comparisons

### Metrics (Current vs Previous Period)
Calculate percentage change for each metric:

1. **Total Revenue** 
   - title: "total revenue", subTitle: "this week"
   
2. **Total Orders** 
   - title: "total orders", subTitle: "this week"
   
3. **Average Order Value** 
   - title: "average order value", subTitle: "per order"
   
4. **Table Turnover Rate** 
   - title: "table turnover rate", subTitle: "per day average"
   - Formula: unique tables used per day average

### Rankings with Limits
All rankings must exclude records with totalRevenue = 0:

1. **Top Tables** (limit: 10)
   - Sort by: totalRevenue DESC, totalOrders DESC
   
2. **Top Categories** (limit: 10)
   - Sort by: totalRevenue DESC, itemsSold DESC
   
3. **Top Waiters** (limit: 10)
   - Sort by: totalRevenue DESC, totalOrders DESC
   - waiterName: firstname + lastname OR email if names null
   
4. **Top Customers** (limit: 50)
   - Sort by: totalRevenue DESC, totalOrders DESC, totalVisits DESC
   
5. **Top Menu Items** (limit: 10)
   - Sort by: totalRevenue DESC, quantitySold DESC

### Customer Visit Analytics
**Visit Definition**: Any gap > 6 hours between orders = new visit
- Use sessionization logic to group orders into visits
- Calculate totalVisits, lastVisit for each customer

### Time-based Analytics (limit: 3 each)

1. **Most Selling Times of Day**
   - Categories: "morning" (6-11), "midday" (12-17), "night" (18+)
   - title field contains actual time: "morning", "midday", "night"
   - Sort by: totalRevenue DESC

2. **Most Selling Days of Week**
   - title field contains actual day: "Monday", "Tuesday", etc.
   - Sort by: totalRevenue DESC

3. **Most Used Payment Methods**
   - title field contains actual payment method: "cash", "transfer", "card"
   - Sort by: totalOrders DESC, totalRevenue DESC

### Critical Requirements

#### Data Processing
- Extract items from JSONB using `jsonb_array_elements(orders.items)`
- Handle NULL values gracefully with COALESCE
- Exclude cancelled orders (`status != 'cancelled'`)
- Use proper JOINs to connect related tables

#### JSON Output
- **ALL keys must use camelCase** (use explicit `AS "camelCase"`)
- Return single JSON object with all analytics
- Exclude any records with totalRevenue = 0 using HAVING clauses

#### Performance
- Use CTEs (Common Table Expressions) for complex calculations
- Minimize subqueries where possible
- Index recommendations: created_at, table_id, waiter_id, customer_id

## Usage Examples

```sql
-- Current week analytics
SELECT get_restaurant_analytics();

-- Custom date range
SELECT get_restaurant_analytics('2024-01-01', '2024-01-31');

-- Previous month
SELECT get_restaurant_analytics(
    date_trunc('month', CURRENT_DATE - INTERVAL '1 month'),
    date_trunc('month', CURRENT_DATE) - INTERVAL '1 day'
);
```

## Expected Output Structure

```json
{
  "metrics": [
    {
      "title": "total revenue",
      "subTitle": "this week",
      "current": 45000.00,
      "percentageChange": 12.50
    }
    // ... 3 more metrics
  ],
  "topTables": [
    {
      "tableId": "uuid",
      "tableName": "VIP Table",
      "tableNumber": 1,
      "totalRevenue": 5000.00,
      "totalOrders": 15,
      "averageSpend": 333.33
    }
    // ... up to 9 more
  ],
  "mostSellingTimesOfDay": [
    {
      "title": "midday",
      "totalRevenue": 15000.00,
      "totalOrders": 45,
      "averageOrders": 333.33
    }
    // ... up to 2 more
  ],
  "mostSellingDaysOfWeek": [
    {
      "title": "Friday",
      "totalRevenue": 12000.00,
      "totalOrders": 35,
      "averageOrders": 342.86
    }
    // ... up to 2 more
  ]
  // ... other analytics arrays
}
```

## Notes
- Function should be robust and handle edge cases (no data, NULL relationships)
- All monetary values rounded to 2 decimal places
- All percentages rounded to 2 decimal places
- Date calculations should handle timezone considerations
- Customer visit logic must properly sessionize orders based on 6-hour gaps