"use client";

import { MapPin, Building2 } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function TopRatedDoctors() {
  const [doctors, setTopDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/top-doctors`,
        );
        const data = await response.json();
        setTopDoctors(data);
      } catch (error) {
        console.error("Error retrieving doctor information:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="w-full bg-white mx-auto max-w-350 px-6 md:px-12 lg:px-18 xl:px-24 mt-20">
      <div className="mx-auto max-w-350">
        <div className="mb-8 flex items-center gap-2">
          <h2 className="text-2xl font-bold text-[#1d1d1f] md:text-3xl text-center">
            Our Top Rated Doctors
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-[22px] border border-[#dfe7f5] bg-[#f8fbff] p-3 shadow-[0_6px_20px_rgba(51,93,173,0.08)] transition hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-[200px] w-full object-cover"
                />

                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#fffaf1] px-3 py-1 shadow-sm">
                  <span className="text-[12px] text-yellow-500">★</span>
                  <span className="text-[11px] font-semibold text-[#4d5b7c]">
                    {doctor.rating}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block rounded-md bg-[#edf3ff] px-2 py-1 text-[10px] font-bold tracking-wide text-[#6f8fe8]">
                  {doctor.specialty}
                </span>

                <h3 className="mt-3 text-[18px] font-bold text-[#1c1d22]">
                  {doctor.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-[#7d8699]">
                  <Building2 size={14} />
                  <span>{doctor.hospital}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-[#7d8699]">
                  <MapPin size={14} />
                  <span>{doctor.location}</span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[24px] font-extrabold text-[#1f52ff]">
                    {doctor.fee}
                  </span>

                  <button className="rounded-full bg-linear-to-r bg-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-colors duration-200 ease-in-out">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
