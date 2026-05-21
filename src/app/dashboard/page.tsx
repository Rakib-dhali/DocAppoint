"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User,   
  LogOut, 
  X, 
  Info,
  Sliders,
  Edit2,
  Camera
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

// Change this configuration string if your Express backend runs on another port
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL 

// ================= TYPES DEFINITION =================
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

interface UserProfile {
  name?: string;
  email?: string;
  photoUrl: string;
}

interface MergedDashboardProps {
  initialAppointments?: Appointment[];
}

export default function MyBookingsDashboard({ initialAppointments = [] }: MergedDashboardProps) {

const { data: session } = authClient.useSession();

// ================= COMPUTE USER PROFILE FROM SESSION =================
// Instead of an extra state + useEffect cascade, compute directly from the active session hook.
const userProfile: UserProfile = {
  name: session?.user?.name || "",
  email: session?.user?.email || "",
  photoUrl: session?.user?.image || "/man.png",
};

// 1. Appointments State Layer
const [appointments, setAppointments] =
  useState<Appointment[]>(initialAppointments);

// 2. Status Handling States
const [loading, setLoading] = useState<boolean>(false);
const [fetching, setFetching] = useState<boolean>(true);

// 3. Modal Visibility Toggles
const [isProfileModalOpen, setIsProfileModalOpen] =
  useState<boolean>(false);
const [isUpdateModalOpen, setIsUpdateModalOpen] =
  useState<boolean>(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] =
  useState<boolean>(false);
const [selectedAppointment, setSelectedAppointment] =
  useState<Appointment | null>(null);

// 4. Temporary Mutation Form States (Profile modal)
const [profileForm, setProfileForm] = useState<UserProfile>({
  name: "",
  email: "",
  photoUrl: "/man.png",
});

// 5. Detailed Appointment Form States
const [patientName, setPatientName] = useState<string>("");
const [patientEmail, setPatientEmail] = useState<string>("");
const [gender, setGender] = useState<string>("Male");
const [phoneNumber, setPhoneNumber] = useState<string>("");
const [appointmentDate, setAppointmentDate] =
  useState<string>("");
const [selectedSlot, setSelectedSlot] =
  useState<string>("");

// Static availability slots array mock for form options
const availability = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "03:30 PM",
  "06:00 PM",
];

// ================= FETCH APPOINTMENTS DATA LAYER =================
useEffect(() => {
  const fetchAppointments = async () => {
    if (!userProfile.email) {
      setAppointments([]);
      setFetching(false);
      return;
    }

    setFetching(true);

      try {
      const res = await fetch(
        `${BACKEND_URL}/api/appointments/${userProfile.email}`
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "<no body>");
        console.error("Appointments fetch failed:", res.status, text);
        throw new Error(`Failed to fetch appointments: ${res.status}`);
      }

      const data = await res.json();

      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    } finally {
      setFetching(false);
    }
  };

  fetchAppointments();
}, [userProfile.email]);

  // ================= PROFILES ROUTING OPERATIONS =================
  const handleOpenProfileUpdate = () => {
    // Populate form snapshot with computed values when modal opens
    setProfileForm({ ...userProfile });
    setIsProfileModalOpen(true);
  };

  const executeProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Execute database update via authClient
      await authClient.updateUser({
        name: profileForm.name,
        image: profileForm.photoUrl,
      });

      setIsProfileModalOpen(false);
    } catch (err) {
      console.error("Error updating user profile layout:", err);
      alert("Failed to update profile setting parameters.");
    } finally {
      setLoading(false);
    }
  };

  // ================= APPOINTMENTS OPERATIONS HANDLERS =================
  const handleOpenUpdate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    
    // Prefilling form states with existing appointment details
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
      appointmentTime: selectedSlot
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments/${selectedAppointment._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload)
      });

      if (!res.ok) {
        throw new Error("Could not patch update data parameters to destination database server.");
      }

      // Sync updated data directly inside local state UI context
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === selectedAppointment._id
            ? { ...item, ...updatedPayload }
            : item
        )
      );
      
      setIsUpdateModalOpen(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Error saving your modifications to the database.");
    } finally {
      setLoading(false);
    }
  };

  const executeDeleteAction = async () => {
    if (!selectedAppointment) return;

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments/${selectedAppointment._id}`, { 
        method: "DELETE" 
      });

      if (!res.ok) {
        throw new Error("Could not perform removal sequence execution on server targets.");
      }

      setAppointments((prev) => prev.filter((item) => item._id !== selectedAppointment._id));
      setIsDeleteModalOpen(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      alert("Error deleting appointment from database records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-350 mx-auto  flex font-sans antialiased text-slate-800 py-5 px-6 sm:px-12 lg:px-18">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col justify-between shrink-0">
        <div>
          <div className="px-6 py-6">
            <span className="text-xl font-black text-[#004ee6] tracking-tight">DocAppoint</span>
          </div>

          <div className="px-6 py-4 flex items-center gap-3 mb-4 group relative">
            <div className="relative">
              <img 
                src={userProfile.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} 
                alt={userProfile.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20 ring-offset-2"
              />
              <button 
                onClick={handleOpenProfileUpdate}
                className="absolute -bottom-1 -right-1 bg-[#004ee6] text-white p-1 rounded-full border border-white hover:scale-110 transition-transform cursor-pointer"
              >
                <Edit2 className="w-2 h-2" />
              </button>
            </div>
            <div className="truncate flex-1">
              <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">{userProfile.name}</h4>
              <span className="text-xs text-slate-400 truncate block">{userProfile.email}</span>
            </div>
          </div>

          <nav className="px-4 space-y-1">
            <a href="#bookings" className="flex items-center gap-3 px-4 py-3 bg-[#e0ecff] text-[#004ee6] font-bold text-sm rounded-xl transition-all">
              <Calendar className="w-4 h-4" />
              My Bookings
            </a>
            <button 
              onClick={handleOpenProfileUpdate}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              Update Profile
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-50">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 font-bold text-sm rounded-xl transition-all cursor-pointer">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN DISPLAY PANEL ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-6 md:px-10 py-5 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">My Bookings</h1>
            <span className="bg-blue-50 text-[#004ee6] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
              {appointments.length} Active
            </span>
          </div>
          
          <button 
            onClick={handleOpenProfileUpdate}
            className="md:hidden w-9 h-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer"
          >
            <img src={userProfile.photoUrl} alt={userProfile.name} className="w-full h-full object-cover" />
          </button>
        </header>

        <div className="p-6 md:p-10 flex-1 flex flex-col justify-between max-w-4xl w-full mx-auto space-y-6">
          <div className="space-y-4">
            {fetching ? (
              <div className="bg-white border border-slate-100 p-12 rounded-3xl text-center shadow-xs">
                <span className="text-3xl block animate-spin mb-2">⏳</span>
                <h3 className="text-base font-bold text-slate-800">Synchronizing pipeline...</h3>
                <p className="text-xs text-slate-400 mt-1">Fetching your scheduled items from database.</p>
              </div>
            ) : appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div 
                  key={appointment._id} 
                  className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
                >
                  <div className="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
                    <Image height={80} width={80} src={appointment.doctorImage} alt={appointment.doctorName} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-blue-50 text-[#004ee6] font-black flex items-center justify-center border border-blue-100 shrink-0 text-xl" />
                    
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{appointment.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{appointment.appointmentTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium sm:col-span-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{appointment.clinicLocation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-50 shrink-0">
                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => handleOpenUpdate(appointment)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer text-center disabled:opacity-40"
                    >
                      Update
                    </button>
                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => handleOpenDelete(appointment)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-white hover:bg-red-50 text-red-500 border border-red-100 font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer text-center disabled:opacity-40"
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
                <p className="text-xs text-slate-400 mt-1">Your data loading pipeline is active but empty.</p>
              </div>
            )}
          </div>

          <div className="bg-white border-l-4 border-l-[#004ee6] border border-slate-100 p-4 rounded-r-2xl shadow-xs flex items-start gap-3.5 max-w-xl self-end w-full">
            <div className="p-2 bg-blue-50 text-[#004ee6] rounded-xl shrink-0 mt-0.5"><Info className="w-4 h-4" /></div>
            <div className="space-y-0.5">
              <h5 className="text-xs font-bold text-slate-900">Appointment Policy</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">Modifications must be compiled 24 hours in advance.</p>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* ================= USER PROFILE MODAL ==================== */}
      {/* ========================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => !loading && setIsProfileModalOpen(false)} />
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Edit Profile Information</h3>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 p-1 hover:bg-slate-50 rounded-full cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={executeProfileUpdate} className="p-6 space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border relative group shrink-0">
                  <img src={profileForm.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} className="w-full h-full object-cover" alt="Avatar preview" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="w-4 h-4 text-white" /></div>
                </div>
                <div className="space-y-1 w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Profile Image URL</label>
                  <input 
                    type="url" 
                    required
                    value={profileForm.photoUrl} 
                    onChange={(e) => setProfileForm({...profileForm, photoUrl: e.target.value})}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden text-slate-700"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={profileForm.name} 
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden text-slate-700 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</label>
                <input 
                  type="email" 
                  disabled
                  readOnly
                  value={profileForm.email} 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-400 focus:outline-hidden font-medium cursor-not-allowed"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" disabled={loading} onClick={() => setIsProfileModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 text-slate-500 font-bold text-xs rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#004ee6] text-white font-bold text-xs rounded-xl cursor-pointer shadow-md shadow-blue-600/10">{loading ? "Updating..." : "Save Profile"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODERNIZED PREFILLED RESCHEDULE MODAL ================= */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => !loading && setIsUpdateModalOpen(false)} />
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-slate-100 flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Modify Appointment Details</h3>
              <button 
                onClick={() => setIsUpdateModalOpen(false)} 
                className="text-slate-400 p-1 hover:bg-slate-50 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Injected Detailed Custom Form Layout */}
            <form
              onSubmit={executeUpdateAction}
              className="p-6 space-y-5 text-left overflow-y-auto max-h-[80vh]"
            >
              {/* Assigned Doctor (Read Only Layout Look) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Assigned Doctor
                </label>
                <div className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm font-semibold flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[10px] font-bold">🩺</span>
                  </div>
                  {selectedAppointment.doctorName}
                </div>
              </div>

              {/* Clinic Name (Read Only Layout Look) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Clinic Name
                </label>
                <div className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-sm font-medium flex items-center gap-2.5">
                  <span className="text-blue-500 text-sm shrink-0">🏥</span>
                  <span className="truncate">{selectedAppointment.clinicName}</span>
                </div>
              </div>

              {/* Clinic Location (Read Only Layout Look) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Clinic Location
                </label>
                <div className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 text-sm font-medium flex items-center gap-2.5">
                  <span className="text-blue-500 text-sm shrink-0">📍</span>
                  <span className="truncate">{selectedAppointment.clinicLocation}</span>
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

              {/* Email Address Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  readOnly
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={patientEmail}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-500 cursor-not-allowed focus:outline-hidden"
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

              {/* Modal Footer / Confirmation Trigger Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#2563eb] to-[#38bdf8] hover:from-[#1d4ed8] hover:to-[#0ea5e9] text-white font-bold text-sm rounded-xl tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer text-center disabled:opacity-50"
                >
                  {loading ? "Saving Changes..." : "Confirm Booking"}
                </button>
                <p className="text-[10px] text-slate-400 text-center leading-relaxed max-w-xs mx-auto">
                  By confirming, you agree to our{" "}
                  <a href="#" className="text-blue-500 hover:underline font-medium">
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CANCEL DELETE MODAL ================= */}
      {isDeleteModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => !loading && setIsDeleteModalOpen(false)} />
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 p-6 text-center space-y-4 border border-slate-100">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto"><Sliders className="w-5 h-5" /></div>
            <h3 className="text-base font-black text-slate-900">Cancel Appointment?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Are you sure you want to remove your session with {selectedAppointment.doctorName}?</p>
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