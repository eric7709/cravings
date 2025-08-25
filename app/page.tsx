"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ShieldCheck,
  ClipboardList,
  Utensils,
  CreditCard,
} from "lucide-react";
import { useUser } from "@/modules/Employees/hooks/useUser";
import { ADMIN_REDIRECT_LINK, CASHIER_REDIRECT_LINK, KITCHEN_REDIRECT_LINK, LOGIN_LINK, WAITER_REDIRECT_LINK } from "@/constants/redirectUrls";

export default function HomePage() {
  const { loading, user } = useUser();

  // Debug logs
  useEffect(() => {
    console.log("HomePage - loading:", loading);
    console.log("HomePage - user:", user);
    console.log("HomePage - user exists:", !!user);
  }, [loading, user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 py-12">
      <div className=" max-w-[1300px] w-full px-5 mx-auto text-center">
        {/* Hero Section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4">
          Streamline Your Restaurant Operations
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Manage staff, tables, orders, and more with our powerful and intuitive
          restaurant management solution.
        </p>

        {loading && (
          <div className="mb-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mb-2"></div>
            <p className="text-blue-500">Loading user data...</p>
          </div>
        )}

        {!loading && !user && (
          <Link
            href={LOGIN_LINK}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started &rarr;
          </Link>
        )}
        {!loading && user && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Welcome Back, {user.firstName}! 👋
            </h2>
            <Link
              href={getDashboardLink(user.role)}
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Go to Your Dashboard
            </Link>
          </>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Card 1: Staff Management */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
              <ShieldCheck size={28} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Role-Based Access
            </h3>
            <p className="text-sm text-gray-600">
              Securely manage staff with roles for admin, chef, cashier, and
              waiter.
            </p>
          </div>

          {/* Card 2: Order Management */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="p-3 bg-purple-100 rounded-full w-fit mb-4">
              <ClipboardList size={28} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Order Tracking
            </h3>
            <p className="text-sm text-gray-600">
              Track orders from table to kitchen, ensuring seamless service and
              customer satisfaction.
            </p>
          </div>

          {/* Card 3: Menu & Tables */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="p-3 bg-red-100 rounded-full w-fit mb-4">
              <Utensils size={28} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Menu & Table
            </h3>
            <p className="text-sm text-gray-600">
              Create and update menus in real-time and manage your restaurant's
              floor plan.
            </p>
          </div>

          {/* Card 4: Payments */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="p-3 bg-green-100 rounded-full w-fit mb-4">
              <CreditCard size={28} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Secure Payments
            </h3>
            <p className="text-sm text-gray-600">
              A dedicated cashier interface for processing payments quickly and
              securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDashboardLink(role: string | null) {
  switch (role) {
    case "admin":
      return ADMIN_REDIRECT_LINK;
    case "cashier":
      return CASHIER_REDIRECT_LINK;
    case "cook":
    case "chef":
      return KITCHEN_REDIRECT_LINK;
    case "waiter":
      return WAITER_REDIRECT_LINK;
    default:
      return "/unauthorized";
  }
}