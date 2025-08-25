import CryptoJS from "crypto-js";
import { setCookie } from "cookies-next";
import { Customer } from "@/modules/Customers/types/customer";
const SECRET_KEY = process.env.NEXT_PUBLIC_URL_ENCODING_SECRET_KEY!;
export function saveCustomerToCookie(customer: Customer) {
  try {
    const serialized = JSON.stringify(customer);
    const encrypted = CryptoJS.AES.encrypt(serialized, SECRET_KEY).toString();
    const encoded = encodeURIComponent(encrypted);
    setCookie("customer", encoded, {
  path: "/",
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
});

  } catch (error) {
    console.error("Failed to encrypt and save customer:", error);
  }
}
