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

// Change this configuration string if your Express backend runs on another port
const BACKEND_URL = "http://localhost:4000";

// ================= TYPES DEFINITION =================
export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string; 
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
  name: string;
  email: string;
  photoUrl: string;
}

interface MergedDashboardProps {
  initialAppointments?: Appointment[];
}

export default function MyBookingsDashboard({ initialAppointments = [] }: MergedDashboardProps) {
  // 1. User Profile Global State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "rakib@gmail.com",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  });

  // 2. Appointments State Layer
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  
  // 3. Status Handling States
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  
  // 4. Modal Visibility Toggles
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // 5. Temporary Mutation Form States
  const [profileForm, setProfileForm] = useState<UserProfile>({ ...userProfile });
  const [editDate, setEditDate] = useState<string>("");
  const [editTime, setEditTime] = useState<string>("");

  // ================= FETCH APPOINTMENTS DATA LAYER =================
  useEffect(() => {
    const fetchAppointments = async () => {
      setFetching(true);
      try {
        // Connected to: GET api/appointments/:emailId
        const res = await fetch(`${BACKEND_URL}/api/appointments/${userProfile.email}`);
        if (!res.ok) {
          throw new Error("Failed to pull appointment data records from database server.");
        }
        const data = await res.json();
        console.log(data);
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching patient appointments:", err);
      } finally {
        setFetching(false);
      }
    };

    if (userProfile.email) {
      fetchAppointments();
    }
  }, [userProfile.email]);

  // ================= PROFILES ROUTING OPERATIONS =================
  const handleOpenProfileUpdate = () => {
    setProfileForm({ ...userProfile });
    setIsProfileModalOpen(true);
  };

  const executeProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Opted for local synchronization update context wrapper
      // If you eventually implement a profile collection backend endpoint, uncomment below:
      /*
      const res = await fetch(`${BACKEND_URL}/api/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm)
      });
      if (!res.ok) throw new Error("Profile update sync failed");
      */
      
      setUserProfile({ ...profileForm });
      setIsProfileModalOpen(false);
    } catch (err) {
      console.error("Error updating user profile layout:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= APPOINTMENTS OPERATIONS HANDLERS =================
  const handleOpenUpdate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditDate(appointment.appointmentDate || "");
    setEditTime(appointment.appointmentTime || "");
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
    try {
      // Connected to: PATCH /appointments/:id
      const res = await fetch(`${BACKEND_URL}/appointments/${selectedAppointment._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentDate: editDate, appointmentTime: editTime })
      });

      if (!res.ok) {
        throw new Error("Could not patch update data parameters to destination database server.");
      }

      // Sync local component UI display arrays immediately upon success
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === selectedAppointment._id
            ? { ...item, appointmentDate: editDate, appointmentTime: editTime }
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
      // Connected to: DELETE /appointments/:id
      const res = await fetch(`${BACKEND_URL}/appointments/${selectedAppointment._id}`, { 
        method: "DELETE" 
      });

      if (!res.ok) {
        throw new Error("Could not perform removal sequence execution on server targets.");
      }

      // Filter out item safely from state engine array mapping layers
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
    <div className="min-h-screen bg-[#f8faff] flex font-sans antialiased text-slate-800">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col justify-between shrink-0">
        <div>
          <div className="px-6 py-6">
            <span className="text-xl font-black text-[#004ee6] tracking-tight">DocAppoint</span>
          </div>

          {/* User Account Frame Section */}
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
          
          {/* Mobile Profile Trigger Shortcut Avatar */}
          <button 
            onClick={handleOpenProfileUpdate}
            className="md:hidden w-9 h-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer"
          >
            <img src={userProfile.photoUrl} alt={userProfile.name} className="w-full h-full object-cover" />
          </button>
        </header>

        {/* Content Body Container */}
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
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-blue-50 text-[#004ee6] font-black flex items-center justify-center border border-blue-100 shrink-0 text-xl">
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

                  {/* Actions Buttons */}
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
              
              {/* Photo Input URL with Avatar preview */}
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border relative group shrink-0">
                  <img src={profileForm.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} className="w-full h-full object-cover" alt="Avatar input context preview" />
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
                  required
                  value={profileForm.email} 
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden text-slate-700 font-medium"
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

      {/* ================= RESCHEDULE UPDATE MODAL ================= */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => !loading && setIsUpdateModalOpen(false)} />
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden p-6 space-y-4 border border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Reschedule Session</h3>
            <form onSubmit={executeUpdateAction} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">New Date</label>
                <input type="date" required value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-hidden"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">New Time</label>
                <input type="text" required placeholder="e.g. 10:30 AM" value={editTime} onChange={(e) => setEditTime(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-hidden"/>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" disabled={loading} onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-2.5 bg-slate-50 text-slate-500 font-bold text-xs rounded-xl">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#004ee6] text-white font-bold text-xs rounded-xl disabled:opacity-50">{loading ? "Saving..." : "Save Changes"}</button>
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