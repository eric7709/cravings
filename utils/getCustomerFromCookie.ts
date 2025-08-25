import CryptoJS from "crypto-js";
import { Customer } from "@/modules/Customers/types/customer";
import { getCookie } from "cookies-next";

const SECRET_KEY = process.env.NEXT_PUBLIC_URL_ENCODING_SECRET_KEY!;

function isValidCustomer(obj: any): obj is Customer {
  return obj && typeof obj === "object" && "email" in obj;
}

export function getCustomerFromCookie(): Customer | null {
  try {
    const encoded = getCookie("customer");
    if (!encoded || typeof encoded !== "string") return null;
    const decoded = decodeURIComponent(encoded);
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) return null;
    const parsed = JSON.parse(decrypted);
    return isValidCustomer(parsed) ? parsed : null;
  } catch (error) {
    console.error("Failed to decrypt or parse customer:", error);
    return null;
  }
}
