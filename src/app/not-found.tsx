import React from "react";
import Link from "next/link";
import { FileSearch, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-800 selection:bg-blue-100">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated Visual Core */}
        <div className="relative flex justify-center">
          {/* Soft background glow */}
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full max-w-[240px] mx-auto transform -translate-y-4" />
          
          {/* Medical/Search Icon Group */}
          <div className="relative bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-200/50 inline-flex items-center justify-center group hover:scale-105 transition-transform duration-300">
            <FileSearch className="w-16 h-16 text-[#004ee6]" strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md shadow-red-500/20 uppercase tracking-wider animate-pulse">
              404
            </span>
          </div>
        </div>

        {/* Messaging Text block */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Appointment Misplaced
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm mx-auto">
            The page or record you are looking for has been moved, archived, or doesn&apos;t exist in our clinic registry.
          </p>
        </div>

        {/* Action Button Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto pt-2">
          <Link
            href="/dashboard/my-booking"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#004ee6] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/10 transition-all cursor-pointer w-full group"
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            Go to Bookings
          </Link>
          
          {/* Since we don't assume a browser history layout stack, a direct fallback link works reliably */}
          <Link
            href="/dashboard/my-profile"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            View Profile
          </Link>
        </div>

        {/* Decorative subtle footer note */}
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pt-4">
          DocAppoint Registry System
        </p>
      </div>
    </div>
  );
}