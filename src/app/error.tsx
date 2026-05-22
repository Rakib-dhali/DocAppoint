"use client"; 

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Standard practice is to log the error to a monitoring service (like Sentry)
    console.error("Dashboard runtime boundary error caught:", error);
  }, [error]);

  return (
    <div className="py-12 px-4 max-w-xl w-full mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Icon Node */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full max-w-[180px] mx-auto transform -translate-y-2" />
        <div className="relative bg-white border border-red-100 rounded-3xl p-5 shadow-lg shadow-red-100/40 inline-flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
        </div>
      </div>

      {/* Messaging Text */}
      <div className="space-y-2">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          We encountered an unexpected error trying to load your registry configuration data. This might be a temporary network hiccup.
        </p>
        
        {/* Optional: Error Digest Badge for debugging */}
        {error.digest && (
          <div className="pt-2">
            <span className="inline-block bg-slate-100 text-slate-500 rounded-md px-2 py-0.5 text-[10px] font-mono tracking-tight">
              ID: {error.digest}
            </span>
          </div>
        )}
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xs sm:max-w-none mx-auto pt-2">
        <button
          onClick={() => reset()} // Next.js tries to re-render the segment segment tree
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#004ee6] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/10 transition-all cursor-pointer w-full sm:w-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>

        <Link
          href="/dashboard/my-booking"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer w-full sm:w-auto"
        >
          <Home className="w-3.5 h-3.5" />
          Return to Bookings
        </Link>
      </div>
    </div>
  );
}