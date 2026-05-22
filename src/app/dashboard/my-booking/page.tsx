"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, X, Info } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  clinicLocation: string;
  clinicName: string;
  patientName: string;
  patientEmail: string;
  gender: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
}

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email || "";

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [patientName, setPatientName] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const availability = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM"];

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userEmail) {
        setAppointments([]);
        setFetching(false);
        return;
      }
      setFetching(true);
      const { data, error } = await authClient.token();
      if (error) {
        toast.error(error.message!);
        return;
      }
      if (data) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/appointments/${userEmail}`, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
          if (!res.ok) throw new Error(`Status error: ${res.status}`);
          const resData = await res.json();
          setAppointments(Array.isArray(resData) ? resData : []);
        } catch (err) {
          console.error("Error fetching appointments:", err);
          setAppointments([]);
        } finally {
          setFetching(false);
        }
      }
    };
    fetchAppointments();
  }, [userEmail]);

  const handleOpenUpdate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setPatientName(appointment.patientName || "");
    setPatientEmail(appointment.patientEmail || "");
    setGender(appointment.gender || "Male");
    setPhoneNumber(appointment.phoneNumber || "");
    setAppointmentDate(appointment.appointmentDate || "");
    setSelectedSlot(appointment.appointmentTime || "");
    setIsUpdateModalOpen(true);
  };

  const handleOpenDelete = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const executeUpdateAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;
    setLoading(true);

    const updatedPayload = {
      patientName,
      gender,
      phoneNumber,
      appointmentDate,
      appointmentTime: selectedSlot,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments/${selectedAppointment._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });

      if (!res.ok) throw new Error("Could not patch data metrics.");
      toast.success("Appointment updated successfully!");
      setAppointments((prev) =>
        prev.map((item) => (item._id === selectedAppointment._id ? { ...item, ...updatedPayload } : item))
      );
      setIsUpdateModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error saving modification actions.");
    } finally {
      setLoading(false);
    }
  };

  const executeDeleteAction = async () => {
    if (!selectedAppointment) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments/${selectedAppointment._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Deletion target path fault.");
      toast.success("Appointment deleted successfully!");
      setAppointments((prev) => prev.filter((item) => item._id !== selectedAppointment._id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error dropping appointment document record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white py-5 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <span className="bg-blue-50 text-[#004ee6] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
            {appointments.length} Active
          </span>
        </div>
      </header>

      <div className="py-6 flex-1 flex flex-col justify-between max-w-4xl w-full mx-auto space-y-6">
        <div className="space-y-4">
          {fetching ? (
            <div className="bg-white border border-slate-100 p-12 rounded-3xl text-center">
              <span className="text-3xl block animate-spin mb-2">⏳</span>
              <h3 className="text-base font-bold text-slate-800">Synchronizing pipeline...</h3>
            </div>
          ) : appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xs">
                <div className="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
                  <Image height={80} width={80} src={appointment.doctorImage} alt={appointment.doctorName} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shrink-0" />
                  <div className="space-y-2.5 flex-1 min-w-0">
                    <div>
                      <span className="bg-blue-50 text-[#004ee6] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md border border-blue-100 uppercase inline-block mb-1">General Consultation</span>
                      <h3 className="text-base md:text-lg font-black text-slate-900 truncate">{appointment.doctorName}</h3>
                      <p className="text-xs text-slate-400 font-medium">Clinic: {appointment.clinicName}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500"><Calendar className="w-3.5 h-3.5 text-slate-400" /><span>{appointment.appointmentDate}</span></div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500"><Clock className="w-3.5 h-3.5 text-slate-400" /><span>{appointment.appointmentTime}</span></div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 sm:col-span-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span className="truncate">{appointment.clinicLocation}</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-50 shrink-0">
                  <button onClick={() => handleOpenUpdate(appointment)} className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer">Update</button>
                  <button onClick={() => handleOpenDelete(appointment)} className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-red-100 text-red-500 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-100 p-12 rounded-3xl text-center">
              <span className="text-3xl block mb-2">📅</span>
              <h3 className="text-base font-bold text-slate-800">No appointments scheduled</h3>
            </div>
          )}
        </div>

        <div className="bg-white border-l-4 border-l-[#004ee6] border border-slate-100 p-4 rounded-r-2xl shadow-xs flex items-start gap-3.5 max-w-xl self-end w-full">
          <div className="p-2 bg-blue-50 text-[#004ee6] rounded-xl shrink-0"><Info className="w-4 h-4" /></div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">Appointment Policy</h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">Modifications must be compiled 24 hours in advance.</p>
          </div>
        </div>
      </div>

      {/* ================= RESCHEDULE MODAL ================= */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden p-6 space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Modify Appointment Details</h3>
              <button onClick={() => setIsUpdateModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={executeUpdateAction} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Patient Full Name</label>
                <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full px-4 py-2.5 border rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-2.5 border rounded-xl text-sm bg-white">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Phone Number</label>
                  <input type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-4 py-2.5 border rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Select Date</label>
                <input type="date" required value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="w-full px-4 py-2.5 border rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Available Slots</label>
                <div className="flex flex-wrap gap-2">
                  {availability.map((slot, idx) => (
                    <button key={idx} type="button" onClick={() => setSelectedSlot(slot)} className={`py-1.5 px-3.5 rounded-full text-xs font-bold border ${selectedSlot === slot ? "bg-[#004ee6] text-white" : "bg-white text-slate-600"}`}>{slot}</button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#004ee6] text-white font-bold rounded-xl text-sm">{loading ? "Saving Changes..." : "Confirm Changes"}</button>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONFIRM DELETE MODAL ================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-4 text-center">
            <h3 className="font-bold text-slate-900 text-base">Cancel Appointment</h3>
            <p className="text-xs text-slate-500">Are you sure you want to completely remove this appointment record?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">No, Keep</button>
              <button onClick={executeDeleteAction} disabled={loading} className="flex-1 py-2 bg-red-600 rounded-xl text-xs font-bold text-white">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}