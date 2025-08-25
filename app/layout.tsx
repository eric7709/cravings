import { ClientWrapper } from "@/provider/ClientWrapper";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Children } from "@/types/shared";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Cravings | Smart Restaurant Management",
  description:
    "Cravings is a modern restaurant management platform that helps you streamline orders, manage tables, track sales, and deliver an exceptional dining experience.",
  keywords: [
    "restaurant management system",
    "food ordering",
    "POS system",
    "restaurant app",
    "table management",
    "order tracking",
    "kitchen display system",
    "restaurant analytics",
  ],
  openGraph: {
    title: "Cravings | Smart Restaurant Management",
    description:
      "Manage orders, tables, staff, and sales seamlessly with Cravings. A modern restaurant management solution built for efficiency and growth.",
    type: "website",
    url: "https://yourdomain.com",
    siteName: "Cravings",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cravings | Smart Restaurant Management",
    description:
      "Streamline restaurant operations with Cravings — manage orders, tables, and sales effortlessly.",
  },
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}