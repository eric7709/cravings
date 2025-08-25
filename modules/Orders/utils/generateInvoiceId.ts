export const generateInvoiceId = () => {
  const date = new Date();
  const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(100 + Math.random() * 900); // 3-digit random
  return `INV-${yyyymmdd}-${randomPart}`; // e.g., INV-20250727-384
};

