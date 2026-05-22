import React from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar"; // Adjust path to where you saved it

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex font-sans antialiased text-slate-800 py-5 px-6 sm:px-12 lg:px-18">
      {/* ================= LEFT SIDEBAR (Client Island) ================= */}
      <DashboardSidebar />

      {/* ================= MAIN CONTENT INJECTION ================= */}
      <main className="flex-1 flex flex-col min-w-0 md:pl-6">
        {children}
      </main>
    </div>
  );
}