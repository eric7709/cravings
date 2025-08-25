// lib/encryptString.ts
import CryptoJS from "crypto-js";

export function encryptTableId(text: string): string {
  const secretKey = process.env.NEXT_PUBLIC_URL_ENCODING_SECRET_KEY!;
  try {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    const urlEncoded = encodeURIComponent(encrypted);
    return urlEncoded;
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
}
