import React from "react";
import { Star, MapPin, GraduationCap, Globe2 } from "lucide-react";
import AppointmentScheduler from "@/components/AppointmentScheduler";

// Match your API payload structure
interface Review {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  rating: number;
  comment: string;
}

interface DoctorDetailsData {
  _id: string;
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  rating: number;
  image: string;
  availability: string[];
  fee: number;
}

// Next.js 13+ Page Parameter Interface
interface PageProps {
  params: Promise<{ id: string }>;
}

// Async Data Fetcher function
async function getDoctorDetails(id: string): Promise<DoctorDetailsData> {
  const res = await fetch(`http://localhost:4000/api/doctors/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch doctor details profiles.");
  }

  return res.json();
}

export default async function DoctorProfilePage({ params }: PageProps) {
  // Await the dynamic URL parameter safely
  const { id } = await params;

  // Server-side fetch execution
  const doctorData: DoctorDetailsData = await getDoctorDetails(id);
  console.log(doctorData)

  return (
    <div className="min-h-screen bg-[#f8faff] mx-auto max-w-7xl px-6 md:px-12 lg:px-18 xl:px-24 py-10 md:py-15 lg:py-20 font-sans antialiased text-slate-800">
      <div className="space-y-8">
        
        {/* ================= STAGE 1: TOP PROFILE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Block: Profile Image Frame */}
          <div className="lg:col-span-5 bg-white border border-slate-100 p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex justify-center items-center">
            <img 
              src={doctorData.image} 
              alt={doctorData.name} 
              className="w-full h-[320px] sm:h-[380px] object-cover rounded-2xl" 
            />
          </div>

          {/* Right Block: Core Actions Booking Panel (Hydrated by Client Bundle) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-sky-50 text-[#3b82f6] text-[11px] font-bold rounded-md uppercase tracking-wider">
                  {doctorData.specialty}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                  {doctorData.name}
                </h1>
                <p className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{doctorData.hospital}, {doctorData.location}</span>
                </p>
              </div>

              {/* Rating Component */}
              <div className="bg-[#f0f5ff] border border-slate-100 p-2.5 rounded-2xl text-center shrink-0 min-w-[80px]">
                <div className="flex items-center justify-center gap-1 text-[#2563eb] font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{doctorData.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  (250+ Reviews)
                </span>
              </div>
            </div>

            {/* Passing only interactive dynamic items downstream to Client layer */}
            <AppointmentScheduler 
              doctorName={doctorData.name}
              clinicLocation={doctorData.location}
              clinicName={doctorData.hospital}
              availability={doctorData.availability} 
              fee={doctorData.fee} 
              doctorId={doctorData._id}
            />
          </div>
        </div>

        {/* ================= STAGE 2: MIDDLE INFO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Profile Bio Context Wrapper */}
          <div className="lg:col-span-8 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2563eb] rounded-full block"></span>
                About {doctorData.name.split(" ")[1] || "Doctor"}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                bio
              </p>
            </div>

            {/* Meta Professional Attributes Grid Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education</h4>
                  <p className="text-sm font-semibold text-slate-700">degreee detaikls</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Languages</h4>
                  <p className="text-sm font-semibold text-slate-700">Namgla ,  english ,  hindi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Area Sidebar Segment */}
          <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
            <h2 className="text-base font-bold text-[#111827]">Location Map</h2>
            
            <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-100 bg-slate-900 relative group">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-950/20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-slate-400 flex items-start gap-2 leading-relaxed">
              <span className="text-[#2563eb] font-bold text-sm select-none">A</span>
              <span>Dhanmndi, dhaka</span>
            </p>
          </div>
        </div>

        {/* ================= STAGE 3: BOTTOM REVIEWS & SUPPORT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2 px-1">
              <span className="w-1 h-5 bg-[#2563eb] rounded-full block"></span>
              Patient Reviews
            </h2>

            {/* <div className="space-y-3">
              {doctorData.reviews.map((review) => (
                <div key={review.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={review.avatar} 
                        alt={review.author} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-100 bg-slate-50"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#111827]">{review.author}</h4>
                        <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{review.timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#2563eb]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-relaxed pl-1">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

          {/* Help Desk Element */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-3xl p-6 shadow-lg shadow-blue-500/10 text-white space-y-5 flex flex-col justify-between h-full min-h-[220px]">
              <div className="space-y-2">
                <h3 className="text-lg font-bold tracking-tight">Need Help?</h3>
                <p className="text-xs text-blue-50/80 leading-relaxed">
                  Our support team is available 24/7 for any appointment related queries.
                </p>
              </div>
              <button className="w-full py-3 px-4 bg-white/20 hover:bg-white/25 border border-white/20 font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                Contact Support
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}