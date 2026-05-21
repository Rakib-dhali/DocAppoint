import React from "react";

export default function DoctorProfileLoading() {
  return (
    <div className="min-h-screen mx-auto max-w-350 px-6 md:px-12 lg:px-18 xl:px-24 py-10 md:py-15 lg:py-20 font-sans antialiased animate-pulse">
      <div className="space-y-8">
        
        {/* ================= STAGE 1: TOP PROFILE GRID SKELETON ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Block: Profile Image Frame Placeholder */}
          <div className="lg:col-span-5 bg-white border border-slate-100 p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex justify-center items-center">
            <div className="w-full h-[320px] sm:h-[380px] bg-slate-200 rounded-2xl" />
          </div>

          {/* Right Block: Core Actions Booking Panel Placeholder */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-3 w-full">
                {/* Specialty tag */}
                <div className="h-5 w-24 bg-slate-200 rounded-md" />
                {/* Doctor Name */}
                <div className="h-8 w-3/4 sm:w-1/2 bg-slate-200 rounded-lg" />
                {/* Hospital and Location */}
                <div className="h-4 w-2/3 bg-slate-200 rounded-md" />
              </div>

              {/* Rating Component Box */}
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl text-center shrink-0 min-w-[80px] space-y-1.5">
                <div className="h-4 w-10 bg-slate-200 rounded-sm mx-auto" />
                <div className="h-3 w-12 bg-slate-200 rounded-xs mx-auto" />
              </div>
            </div>

            {/* AppointmentScheduler Placeholder (Availability Slots Grid & Checkout Panel) */}
            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <div className="h-3 w-28 bg-slate-200 rounded-sm" />
                {/* Time Slots Grid (4 items mimicking standard scheduler layout) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-11 bg-slate-100 rounded-xl" />
                  ))}
                </div>
              </div>
              
              <hr className="border-slate-100 my-2" />
              
              {/* Bottom Checkout Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-1">
                <div className="space-y-1.5 w-24">
                  <div className="h-3 w-20 bg-slate-200 rounded-sm" />
                  <div className="h-7 w-16 bg-slate-200 rounded-md" />
                </div>
                <div className="h-12 w-full sm:w-44 bg-slate-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= STAGE 2: MIDDLE INFO GRID SKELETON ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Profile Bio Context Wrapper */}
          <div className="lg:col-span-8 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
            <div className="space-y-3">
              <div className="h-5 w-36 bg-slate-200 rounded-md" />
              {/* Fake multiline bio blocks */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded-sm" />
                <div className="h-4 w-full bg-slate-200 rounded-sm" />
                <div className="h-4 w-4/5 bg-slate-200 rounded-sm" />
              </div>
            </div>

            {/* Meta Professional Attributes Grid Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education Block */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-3 w-16 bg-slate-200 rounded-sm" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded-sm" />
                </div>
              </div>

              {/* Languages Block */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-3 w-16 bg-slate-200 rounded-sm" />
                  <div className="h-4 w-2/3 bg-slate-200 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Area Sidebar Segment */}
          <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
            <div className="h-5 w-28 bg-slate-200 rounded-md" />
            {/* Map Frame Placeholder */}
            <div className="w-full h-40 rounded-xl bg-slate-200" />
            {/* Text details line */}
            <div className="h-4 w-1/2 bg-slate-200 rounded-sm" />
          </div>
        </div>

        {/* ================= STAGE 3: BOTTOM REVIEWS & SUPPORT GRID SKELETON ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reviews List Placeholder (Mimics 2 comment frames loading dynamically) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="h-5 w-32 bg-slate-200 rounded-md mx-1" />
            
            <div className="space-y-3">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                      <div className="space-y-1.5 w-1/3">
                        <div className="h-3.5 w-full bg-slate-200 rounded-sm" />
                        <div className="h-2.5 w-16 bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                    <div className="h-3 w-16 bg-slate-200 rounded-sm shrink-0" />
                  </div>
                  <div className="h-3 w-5/6 bg-slate-200 rounded-sm pl-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Help Desk Card Placeholder */}
          <div className="lg:col-span-4">
            <div className="bg-slate-200 rounded-3xl p-6 h-full min-h-[220px] flex flex-col justify-between" />
          </div>
        </div>

      </div>
    </div>
  );
}