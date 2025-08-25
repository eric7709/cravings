"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ClipboardList,
  Utensils,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/modules/Employees/hooks/useUser";
import {
  ADMIN_REDIRECT_LINK,
  CASHIER_REDIRECT_LINK,
  KITCHEN_REDIRECT_LINK,
  LOGIN_LINK,
  WAITER_REDIRECT_LINK,
} from "@/constants/redirectUrls";
import Logo from "@/components/Logo";

export default function HomePage() {
  const { loading, user } = useUser();
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("HomePage - loading:", loading);
    console.log("HomePage - user:", user);
    console.log("HomePage - user exists:", !!user);
  }, [loading, user]);

  const handleRedirect = () => {
    if (!user) return;
    setRedirecting(true);
    router.push(getDashboardLink(user.role));
  };

  return (
    <div className="lg:h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 py-8 sm:py-12 relative">
      {/* 🔄 Fullscreen cover spinner */}
      {redirecting && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 border-t-4 border-blue-500 border-solid mb-4"></div>
          <p className="text-blue-700 font-semibold">Redirecting...</p>
        </div>
      )}

      <div className="max-w-[1300px] w-full mx-auto text-center">
        {/* ✅ Logo at the top */}
        <div className="mb-6 flex justify-center">
          <Logo className="h-10 sm:h-14 w-auto" />
        </div>

        {/* Hero Section */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 leading-tight">
          Streamline Your Restaurant Operations
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Manage staff, tables, orders, and more with our powerful and intuitive
          restaurant management solution.
        </p>

        {/* Loading Spinner */}
        {loading && (
          <div className="mb-6 sm:mb-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-4 border-b-4 border-blue-500 mb-2"></div>
            <p className="text-blue-500 text-sm sm:text-base">
              Loading user data...
            </p>
          </div>
        )}

        {/* No user → Login CTA */}
        {!loading && !user && (
          <Link
            href={LOGIN_LINK}
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started &rarr;
          </Link>
        )}

        {/* Logged in user → Dashboard CTA */}
        {!loading && user && (
          <>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Welcome Back, {user.firstName}! 👋
            </h2>
            <button
              onClick={handleRedirect}
              className="inline-block bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Go to Your Dashboard
            </button>
          </>
        )}

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
          <FeatureCard
            icon={<ShieldCheck size={24} className="text-blue-600" />}
            iconBg="bg-blue-100"
            title="Role-Based Access"
            desc="Securely manage staff with roles for admin, chef, cashier, and waiter."
          />
          <FeatureCard
            icon={<ClipboardList size={24} className="text-purple-600" />}
            iconBg="bg-purple-100"
            title="Order Tracking"
            desc="Track orders from table to kitchen, ensuring seamless service and customer satisfaction."
          />
          <FeatureCard
            icon={<Utensils size={24} className="text-red-600" />}
            iconBg="bg-red-100"
            title="Menu & Table"
            desc="Create and update menus in real-time and manage your restaurant's floor plan."
          />
          <FeatureCard
            icon={<CreditCard size={24} className="text-green-600" />}
            iconBg="bg-green-100"
            title="Secure Payments"
            desc="A dedicated cashier interface for processing payments quickly and securely."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  desc,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border border-gray-200">
      <div className={`p-2.5 sm:p-3 ${iconBg} rounded-full w-fit mb-3 sm:mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600">{desc}</p>
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
