export const TABLE_FORM_FIELDS = [
  { name: "tableName", label: "Table Name", type: "text" },
  { name: "tableNumber", label: "Table Number", type: "number" },
  { name: "capacity", label: "Capacity", type: "number" },
];
 
export const TABLE_FORM_VALUE_CREATE = {
  name: "",
  tableNumber: "",
  capacity: "3",
  waiterId: "",
};

export const FILTER_TABLE_DATA = [
    { label: "All Tables", value: "all" },
    { label: "Allocated Tables", value: "allocated" },
    { label: "Unallocated Tables", value: "unallocated" },
  ] as const;


export const ACTIONS = [
  {
    label: "Edit",
    backdropKey: "update",
    bg: "bg-blue-500",
  },
  {
    label: "Allocate Waiter",
    backdropKey: "allocate",
    bg: "bg-yellow-500",
  },
  {
    label: "Deallocate Waiter",
    backdropKey: "deallocate",
    bg: "bg-yellow-500",
  },
  {
    label: "QR Code",
    backdropKey: "qrcode",
    bg: "bg-purple-500",
  },
  {
    label: "Delete",
    backdropKey: "delete",
    bg: "bg-red-500",
  },
];
