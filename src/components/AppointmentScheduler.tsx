"use client";

import React, { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface SchedulerProps {
  availability: string[];
  fee: number;
  doctorId: string;
  doctorName?: string; 
  doctorImage?: string;
  clinicLocation?: string;
  clinicName?: string;
}

export default function AppointmentScheduler({
  availability,
  fee,
  doctorId,
  doctorName,
  doctorImage,
  clinicName,
  clinicLocation,
}: SchedulerProps) {
  const { data: session } = authClient.useSession();

  // Profile view states
  const [selectedSlot, setSelectedSlot] = useState<string>(availability[0] || "");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Modal form input states
  const [patientName, setPatientName] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");

  const derivedPatientEmail = session?.user?.email || "";

  // DUAL-LAYER SCROLL LOCK: Enforces rigid boundary contexts across both main nodes
useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // ← add this
  } else {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = ""; // ← add this
  }
  return () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = ""; // ← add this
  };
}, [isModalOpen]);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      doctorId,
      doctorName,
      doctorImage,
      clinicLocation,
      clinicName,
      patientName,
      patientEmail: derivedPatientEmail,
      gender,
      phoneNumber,
      appointmentDate,
      appointmentTime: selectedSlot,
      fee,
    };

    try {
      const res = await fetch(`http://localhost:4000/api/create-appointment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        alert("Failed to book appointment. Please try choosing another time slot.");
        return;
      }

      const data = await res.json();
      console.log("Success Response from DB:", data);
      alert("Appointment successfully booked!");

      setPatientName("");
      setPhoneNumber("");
      setAppointmentDate("");
      setIsModalOpen(false); 

    } catch (error) {
      console.error("Network or Client Error occurred:", error);
      alert("Could not connect to the booking server. Please check your network connection.");
    }
  };

  return (
    <>
      {/* Availability Slots Selector */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Select Availability
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availability.map((slot, i: number) => {
            const isActive = selectedSlot === slot;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-3 px-4 w-full border text-center font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#004ee6] border-[#004ee6] text-white shadow-md shadow-blue-600/10"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-100 my-2" />

      {/* Bottom Form Checkout Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-1">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Consultation Fee
          </span>
          <div className="text-2xl font-extrabold text-[#111827] flex items-baseline">
            <span className="text-xl font-sans mr-0.5">৳</span>
            {fee}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#2563eb] to-[#38bdf8] hover:from-[#1d4ed8] hover:to-[#0ea5e9] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>
      </div>

      {/* ================= MODAL DIALOG OVERLAY ================= */}
      {isModalOpen && (
        // FIXED: Added touch-none and overscroll-none behaviors on wrapper
        <div className="fixed inset-0 z-50 overscroll-contain flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-auto">
          {/* Backdrop wrapper dismiss anchor */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

          {/* Form Modal Frame Container */}
          <div className="bg-white w-full max-w-md h-[80vh] rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-slate-100 flex flex-col pointer-events-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Book Appointment
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            {/* FIXED: Added 'overscroll-contain' to intercept and drop background bounce chaining */}
            <form
              onSubmit={handleConfirmBooking}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{ WebkitOverflowScrolling: "touch" }}
              className="p-6 space-y-5 text-left overflow-y-auto flex-1 min-h-0"
            >
              {/* Assigned Doctor */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Assigned Doctor
                </label>
                <div className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm font-semibold flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[10px] font-bold">🩺</span>
                  </div>
                  {doctorName}
                </div>
              </div>

              {/* Clinic Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Clinic Name
                </label>
                <div className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-sm font-medium flex items-center gap-2.5">
                  <span className="text-blue-500 text-sm shrink-0">🏥</span>
                  <span className="truncate">{clinicName}</span>
                </div>
              </div>

              {/* Clinic Location */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Clinic Location
                </label>
                <div className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-sm font-medium flex items-center gap-2.5">
                  <span className="text-blue-500 text-sm shrink-0">📍</span>
                  <span className="truncate">{clinicLocation}</span>
                </div>
              </div>

              {/* Patient Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  readOnly
                  type="email"
                  required
                  placeholder="No authenticated email found"
                  value={derivedPatientEmail}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed outline-hidden"
                />
              </div>

              {/* Row Grid: Gender & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-700 font-medium appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1XXX-XXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Select Date Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-700 font-medium"
                />
              </div>

              {/* Dynamic Available Time Slots Row inside Form */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Available Time Slots
                </label>
                <div className="flex flex-wrap gap-2">
                  {availability.map((slot, idx) => {
                    const isFormActive = selectedSlot === slot;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-4 rounded-full text-xs font-bold transition-all border ${
                          isFormActive
                            ? "bg-[#004ee6] border-[#004ee6] text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-2 space-y-3 shrink-0">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#2563eb] to-[#38bdf8] hover:from-[#1d4ed8] hover:to-[#0ea5e9] text-white font-bold text-sm rounded-xl tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer text-center"
                >
                  Confirm Booking
                </button>
                <p className="text-[10px] text-slate-400 text-center leading-relaxed max-w-xs mx-auto">
                  By confirming, you agree to our{" "}
                  <a href="/terms" className="text-blue-500 hover:underline font-medium">
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}