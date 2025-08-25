"use client";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md text-center space-y-6">
        <ShieldAlert className="mx-auto text-red-500" size={64} />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-gray-300">
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
