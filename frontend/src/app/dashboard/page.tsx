"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4169E1]"></div>
      </div>
    );
  }

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-[#4169E1]">
                Business of One
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name || user.email}</span>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#4169E1]/10 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Profile</h2>
                  <p className="text-gray-600">
                    <strong>Name:</strong> {user.name || "Not set"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Role:</strong> {user.role}
                  </p>
                </div>

                <div className="bg-[#16A085]/10 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Consultations</h2>
                  <p className="text-gray-600 mb-4">Schedule your free strategy session</p>
                  <Link
                    href="/dashboard/consultations"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A085] hover:bg-[#16A085]/90"
                  >
                    Book Consultation
                  </Link>
                </div>

                <div className="bg-gray-100 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Resources</h2>
                  <p className="text-gray-600 mb-4">Access exclusive business resources</p>
                  <Link
                    href="/dashboard/resources"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                  >
                    View Resources
                  </Link>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/dashboard/profile"
                    className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-[#4169E1] transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">Update Profile</h3>
                    <p className="text-gray-600 text-sm mt-1">Manage your account settings</p>
                  </Link>
                  <Link
                    href="/dashboard/billing"
                    className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-[#4169E1] transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">Billing & Plans</h3>
                    <p className="text-gray-600 text-sm mt-1">View and manage your subscription</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}