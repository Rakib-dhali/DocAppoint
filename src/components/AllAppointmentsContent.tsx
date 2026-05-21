"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  Calendar,
  RefreshCcw,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface Doctor {
  _id: string;
  id: string;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  availability: string[];
  description: string;
  hospital: string;
  location: string;
  fee: number;
  rating: number;
}

export default function AllAppointmentsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Sync local search input with the initial URL param
  const currentQuery = searchParams.get("query") || "";
  const [localSearch, setLocalSearch] = useState<string>(currentQuery);

  const selectedRating = searchParams.get("rating") || "Any Rating";
  const selectedFee = searchParams.get("fee") || "Any Price";
  const selectedExperience = searchParams.get("experience") || "Any Experience";

  // Fetching data from API endpoint
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors`);
        const data: Doctor[] = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error retrieving doctor information:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Central utility function to update the URL parameters dynamically
  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (!value || value === "Any Rating" || value === "Any Price" || value === "Any Experience") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 2. Debounce the local typing input before updating the URL
useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    if (localSearch !== currentQuery) {
      updateSearchParam("query", localSearch);
    }
  }, 300);

  return () => clearTimeout(delayDebounceFn);
}, [localSearch, currentQuery]); // ✅ add currentQuery here


  // Filter processing logic
  const filteredDoctors = doctors.filter((doctor: Doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(localSearch.toLowerCase());

    let matchesRating = true;
    if (selectedRating !== "Any Rating") {
      const minRating = parseFloat(selectedRating.replace("+", ""));
      matchesRating = doctor.rating >= minRating;
    }

    let matchesFee = true;
    if (selectedFee !== "Any Price") {
      if (selectedFee === "Under 700") matchesFee = doctor.fee < 700;
      else if (selectedFee === "700 - 1000")
        matchesFee = doctor.fee >= 700 && doctor.fee <= 1000;
      else if (selectedFee === "Above 1000") matchesFee = doctor.fee > 1000;
    }

    let matchesExperience = true;
    if (selectedExperience !== "Any Experience") {
      const expYears = parseInt(doctor.experience);
      if (selectedExperience === "Under 5 Years")
        matchesExperience = expYears < 5;
      else if (selectedExperience === "5 - 10 Years")
        matchesExperience = expYears >= 5 && expYears <= 10;
      else if (selectedExperience === "10+ Years")
        matchesExperience = expYears > 10;
    }

    return matchesSearch && matchesRating && matchesFee && matchesExperience;
  });

  const handleResetFilters = () => {
    setLocalSearch("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <section className="min-h-screen bg-[#f3f8ff] py-5 px-6 sm:px-12 lg:px-18">
      <div className="max-w-350 mx-auto w-full">
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Your Doctor
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Access top-rated medical professionals and book your next
            appointment in seconds with our transparent scheduling system.
          </p>
        </div>

        {/* ================= SEARCH & FILTER CONTROL PANEL ================= */}
        <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-slate-200/60 p-4 sm:p-5 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Input Search Box */}
            <div className="lg:col-span-6 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Search By Name or Specialty
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah Johnson or Cardiology"
                  value={localSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLocalSearch(e.target.value)
                  }
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Dropdown 1: Rating Select */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateSearchParam("rating", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option>Any Rating</option>
                <option>4.8+</option>
                <option>4.9+</option>
              </select>
            </div>

            {/* Dropdown 2: Fee/Price Select */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Fee
              </label>
              <select
                value={selectedFee}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateSearchParam("fee", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option>Any Price</option>
                <option>Under 700</option>
                <option>700 - 1000</option>
                <option>Above 1000</option>
              </select>
            </div>

            {/* Dropdown 3: Experience Level Select */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Experience
              </label>
              <select
                value={selectedExperience}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateSearchParam("experience", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option>Any Experience</option>
                <option>Under 5 Years</option>
                <option>5 - 10 Years</option>
                <option>10+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= CONDITIONAL CONTENT VIEWS ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-4 items-start">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      height={72}
                      width={72}
                      className="aspect-square rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-wide">
                          {doctor.specialty}
                        </span>
                        <div className="flex items-center gap-1 text-blue-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {doctor.experience} Experience
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mt-4 line-clamp-2">
                    {doctor.description || `Specialized consulting at ${doctor.hospital}.`}
                  </p>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Next Available
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {doctor.availability?.[0]?.split(" - ")?.[0] || "Tomorrow, 9 AM"}
                    </span>
                  </div>
                  <Link href={`/all-appointments/${doctor._id}`}>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white text-xs font-bold rounded-xl transition duration-300 ease-in-out shadow-sm cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200/50 p-10 text-center shadow-[0_4px_30px_rgba(0,0,0,0.015)] mt-12">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              No doctors found
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto mt-2.5">
              We couldn&apos;t find any medical professionals matching your
              specific filters. Try adjusting your search criteria or resetting
              the filters.
            </p>

            <button
              onClick={handleResetFilters}
              className="mt-6 px-5 py-2.5 bg-white border border-blue-200 hover:border-blue-300 text-blue-600 text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer hover:bg-blue-50/50"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
