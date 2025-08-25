import CryptoJS from "crypto-js";

export function decryptTableId(encryptedText: string): string {
  const secretKey = process.env.NEXT_PUBLIC_URL_ENCODING_SECRET_KEY!;
  try {
    const decoded = decodeURIComponent(encryptedText);
    const bytes = CryptoJS.AES.decrypt(decoded, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Invalid decryption");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}
