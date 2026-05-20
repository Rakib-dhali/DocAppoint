"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  LogOut, 
  MapPin, 
  Sliders,
  User
} from "lucide-react";
import { Appointment, updateAppointment, deleteAppointment } from "@/app/dashboard/action";

interface DashboardProps {
  initialAppointments: Appointment[];
}

export default function MyBookingsDashboard({ initialAppointments }: DashboardProps) {
  // Live sync from server data action layer
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  
  // Operational processing states
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Form Mutations
  const [editDate, setEditDate] = useState<string>("");
  const [editTime, setEditTime] = useState<string>("");

  const handleOpenUpdate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    // Sync old strings or provide current system default fallback
    setEditDate(appointment.appointmentDate || "");
    setEditTime(appointment.appointmentTime || "10:30");
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
    const result = await updateAppointment(selectedAppointment._id, {
      appointmentDate: editDate,
      appointmentTime: editTime,
    });
    setLoading(false);

    if (result.success) {
      // Optimistically update frontend view layer array cleanly matching key models
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === selectedAppointment._id
            ? { ...item, appointmentDate: editDate, appointmentTime: editTime }
            : item
        )
      );
      setIsUpdateModalOpen(false);
      setSelectedAppointment(null);
    } else {
      alert(`Update Error: ${result.error}`);
    }
  };

  const executeDeleteAction = async () => {
    if (!selectedAppointment) return;

    setLoading(true);
    const result = await deleteAppointment(selectedAppointment._id);
    setLoading(false);

    if (result.success) {
      setAppointments((prev) => prev.filter((item) => item._id !== selectedAppointment._id));
      setIsDeleteModalOpen(false);
      setSelectedAppointment(null);
    } else {
      alert(`Deletion Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex font-sans antialiased text-slate-800">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col justify-between shrink-0">
        <div>
          <div className="px-6 py-6">
            <span className="text-xl font-black text-[#004ee6] tracking-tight">DocAppoint</span>
          </div>

          <div className="px-6 py-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
              {appointments[0]?.patientName?.charAt(0) || "U"}
            </div>
            <div className="truncate">
              <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                {appointments[0]?.patientName || "User Account"}
              </h4>
              <span className="text-xs text-slate-400 truncate block">
                {appointments[0]?.patientEmail || "patient@health.com"}
              </span>
            </div>
          </div>

          <nav className="px-4 space-y-1">
            <a href="#bookings" className="flex items-center gap-3 px-4 py-3 bg-[#e0ecff] text-[#004ee6] font-bold text-sm rounded-xl transition-all">
              <Calendar className="w-4 h-4" />
              My Bookings
            </a>
            <a href="#profile" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all">
              <User className="w-4 h-4" />
              My Profile
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-50">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 font-bold text-sm rounded-xl transition-all cursor-pointer">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN PANEL ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-6 md:px-10 py-5 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">My Bookings</h1>
            <span className="bg-blue-50 text-[#004ee6] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
              {appointments.length} Active
            </span>
          </div>
        </header>

        <div className="p-6 md:p-10 flex-1 flex flex-col justify-between max-w-4xl w-full mx-auto space-y-6">
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div 
                  key={appointment._id} // Changed from item.id to item._id to match schema
                  className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
                >
                  <div className="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
                    {/* Placeholder doctor profile frame setup */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-100 font-black text-slate-400 flex items-center justify-center border border-slate-200 shrink-0 text-xl">
                      🩺
                    </div>

                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div>
                        <span className="bg-blue-50 text-[#004ee6] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md border border-blue-100 uppercase inline-block mb-1">
                          General Consultation
                        </span>
                        <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug truncate">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">Clinic: {appointment.clinicName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{appointment.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{appointment.appointmentTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium col-span-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{appointment.clinicLocation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-50 shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5 justify-end mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-emerald-600 font-bold">Confirmed</span>
                    </div>

                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => handleOpenUpdate(appointment)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold text-xs tracking-wider uppercase rounded-xl cursor-pointer text-center disabled:opacity-40"
                    >
                      Update
                    </button>
                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => handleOpenDelete(appointment)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-white hover:bg-red-50 text-red-500 border border-red-100 font-bold text-xs tracking-wider uppercase rounded-xl cursor-pointer text-center disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-100 p-12 rounded-3xl text-center shadow-xs">
                <span className="text-3xl block mb-2">📅</span>
                <h3 className="text-base font-bold text-slate-800">No appointments scheduled</h3>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ================= MODALS REMAIN THE SAME BUT MAP SUBMISSIONS TO EXECUTE FUNCTIONS ================= */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => !loading && setIsUpdateModalOpen(false)} />
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Reschedule Session</h3>
            <form onSubmit={executeUpdateAction} className="space-y-4">
              <input 
                type="date" 
                required 
                value={editDate} 
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
              />
              <input 
                type="text" 
                required 
                placeholder="e.g. 10:30 AM"
                value={editTime} 
                onChange={(e) => setEditTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
              />
              <div className="flex gap-3 pt-2">
                <button type="button" disabled={loading} onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 text-slate-500 font-bold text-xs rounded-xl">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#004ee6] text-white font-bold text-xs rounded-xl disabled:opacity-50">{loading ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => !loading && setIsDeleteModalOpen(false)} />
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto"><Sliders className="w-5 h-5" /></div>
            <h3 className="text-base font-black text-slate-900">Cancel Appointment?</h3>
            <div className="flex gap-3 pt-2">
              <button type="button" disabled={loading} onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 text-slate-500 font-bold text-xs rounded-xl">Keep</button>
              <button type="button" disabled={loading} onClick={executeDeleteAction} className="flex-1 py-2.5 bg-red-500 text-white font-bold text-xs rounded-xl disabled:opacity-50">{loading ? "Removing..." : "Confirm Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}