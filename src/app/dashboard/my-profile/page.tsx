"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface UserProfile {
  name: string;
  email: string;
  photoUrl: string;
}

// 1. Separate the form into its own clean component
function ProfileForm({ initialData }: { initialData: UserProfile }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileForm, setProfileForm] = useState<UserProfile>(initialData);

  const executeProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: profileForm.name,
        image: profileForm.photoUrl,
      });

      if (error) {
        toast.error(error.message!);
        return;
      }
      if (data) {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to submit profile updates.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={executeProfileUpdate} className="space-y-5">
      {/* Avatar Row */}
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border relative group shrink-0">
          <img
            src={profileForm.photoUrl || "/man.png"}
            className="w-full h-full object-cover"
            alt="Avatar preview"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="space-y-1 w-full">
          <label className="text-[10px] font-bold text-slate-400 uppercase block">
            Profile Image URL
          </label>
          <input
            type="url"
            required
            value={profileForm.photoUrl}
            onChange={(e) => setProfileForm({ ...profileForm, photoUrl: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden text-slate-700"
            placeholder="https://example.com/photo.jpg"
          />
        </div>
      </div>

      {/* Form Inputs */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase block">
          Full Name
        </label>
        <input
          type="text"
          required
          value={profileForm.name}
          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden text-slate-700 font-medium"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase block">
          Email Address
        </label>
        <input
          type="email"
          disabled
          readOnly
          value={profileForm.email}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-400 cursor-not-allowed font-medium"
          />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#004ee6] text-white font-bold text-sm rounded-xl cursor-pointer shadow-md shadow-blue-600/10 transition-all hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving Changes..." : "Save Profile Settings"}
        </button>
      </div>
    </form>
  );
}

// 2. The Main Page component handles loading states and provides a dynamic key
export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session?.user) {
    return (
      <div className="py-8 max-w-xl w-full mx-auto text-center">
        <p className="text-sm text-slate-500">Loading user configuration profile...</p>
      </div>
    );
  }

  const initialData: UserProfile = {
    name: session.user.name || "",
    email: session.user.email || "",
    photoUrl: session.user.image || "/man.png",
  };

  return (
    <>
      <header className="bg-white py-5 border-b border-slate-100">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Profile Settings
        </h1>
      </header>

      <div className="py-8 max-w-xl w-full mx-auto">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          {/* 
            By assigning the email as a key, React completely resets the internal form state 
            safely whenever a new user session registers, without ever using an effect!
          */}
          <ProfileForm key={initialData.email} initialData={initialData} />
        </div>
      </div>
    </>
  );
}