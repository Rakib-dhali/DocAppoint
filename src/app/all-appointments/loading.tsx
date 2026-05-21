import React from "react";

export default function DoctorCardsSkeleton() {
  return (
    /* Matching your parent responsive layout configuration:
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
    */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {/* Rendering 6 mock skeletons to cleanly fill up the layout grid view */}
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between"
        >
          <div>
            <div className="flex gap-4 items-start">
              {/* Doctor Avatar Image Wrapper */}
              <div className="w-[72px] h-[72px] rounded-xl bg-slate-200 shrink-0" />
              
              <div className="space-y-2 min-w-0 w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Specialty Badge tag placeholder */}
                  <div className="h-4 w-16 bg-slate-200 rounded-md" />
                  {/* Rating placeholder */}
                  <div className="h-3.5 w-10 bg-slate-200 rounded-sm" />
                </div>
                {/* Doctor Full Name heading mock */}
                <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                {/* Experience Meta item layout info */}
                <div className="h-3 w-1/2 bg-slate-200 rounded-sm" />
              </div>
            </div>

            {/* Description Paragraph Text Box mimic rows */}
            <div className="space-y-2 mt-5">
              <div className="h-3 w-full bg-slate-200 rounded-sm" />
              <div className="h-3 w-5/6 bg-slate-200 rounded-sm" />
            </div>
          </div>

          {/* Card Action Row Footer Block */}
          <div className="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between gap-2">
            <div className="space-y-1.5">
              {/* Availability tag line info context */}
              <div className="h-2.5 w-20 bg-slate-200 rounded-xs" />
              <div className="h-3.5 w-28 bg-slate-200 rounded-sm" />
            </div>
            {/* View Details Profile Redirect Button */}
            <div className="h-8 w-24 bg-slate-200 rounded-xl shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}