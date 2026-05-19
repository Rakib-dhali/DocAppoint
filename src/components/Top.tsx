"use client";

import { MapPin, Building2 } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "CARDIOLOGY",
    clinic: "City Heart Center",
    location: "Manhattan, NY",
    rating: "4.9",
    price: "$800",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "NEUROLOGY",
    clinic: "Neuro Health Institute",
    location: "Brooklyn, NY",
    rating: "4.8",
    price: "$800",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "PEDIATRICS",
    clinic: "Children First Care",
    location: "Queens, NY",
    rating: "5.0",
    price: "$800",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function TopRatedDoctors() {
  return (
    <section className="w-full bg-[#eef4fc] mx-auto max-w-7xl bg-white px-6 md:px-12 lg:px-18 xl:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8ca2d2]">
            Specialists
          </span>
          <h2 className="text-2xl font-bold text-[#1d1d1f] md:text-3xl">
            Our Top Rated Doctors
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-[22px] border border-[#dfe7f5] bg-[#f8fbff] p-3 shadow-[0_6px_20px_rgba(51,93,173,0.08)] transition hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-[200px] w-full object-cover"
                />

                {/* Rating Badge */}
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#fffaf1] px-3 py-1 shadow-sm">
                  <span className="text-[12px] text-yellow-500">★</span>
                  <span className="text-[11px] font-semibold text-[#4d5b7c]">
                    {doctor.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mt-4">
                {/* Specialty */}
                <span className="inline-block rounded-md bg-[#edf3ff] px-2 py-[4px] text-[10px] font-bold tracking-wide text-[#6f8fe8]">
                  {doctor.specialty}
                </span>

                {/* Name */}
                <h3 className="mt-3 text-[18px] font-bold text-[#1c1d22]">
                  {doctor.name}
                </h3>

                {/* Clinic */}
                <div className="mt-3 flex items-center gap-2 text-sm text-[#7d8699]">
                  <Building2 size={14} />
                  <span>{doctor.clinic}</span>
                </div>

                {/* Location */}
                <div className="mt-2 flex items-center gap-2 text-sm text-[#7d8699]">
                  <MapPin size={14} />
                  <span>{doctor.location}</span>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[24px] font-extrabold text-[#1f52ff]">
                    {doctor.price}
                  </span>

                  <button className="rounded-full bg-[#2f7dff] px-5 py-2 text-sm font-medium text-white shadow-md transition hover:scale-105 hover:bg-[#256eff]">
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