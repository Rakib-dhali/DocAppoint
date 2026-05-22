"use client";

import { Calendar, User, LogOut, Edit2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface UserProfile {
  name?: string;
  email?: string;
  photoUrl: string;
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const userProfile: UserProfile = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    photoUrl: session?.user?.image || "/man.png",
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <>
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col justify-between shrink-0 pr-4">
        <div>
          <div className="px-6 py-4 flex items-center gap-3 mb-4 group relative">
            <div className="relative">
              <Image
                width={40}
                height={40}
                src={userProfile.photoUrl}
                alt={userProfile.name || "User Avatar"}
                className="rounded-full object-cover ring-2 ring-blue-500/20 ring-offset-2"
              />
              <Link
                href="/dashboard/my-profile"
                className="absolute -bottom-1 -right-1 bg-[#004ee6] text-white p-1 rounded-full border border-white hover:scale-110 transition-transform cursor-pointer"
              >
                <Edit2 className="w-2 h-2" />
              </Link>
            </div>
            <div className="truncate flex-1">
              <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                {userProfile.name || "Loading..."}
              </h4>
              <span className="text-xs text-slate-400 truncate block">
                {userProfile.email}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard/my-booking"
              className={`flex items-center gap-3 px-4 py-3 font-bold text-sm rounded-xl transition-all ${
                pathname === "/dashboard/my-booking"
                  ? "bg-[#e0ecff] text-[#004ee6]"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              My Bookings
            </Link>
            <Link
              href="/dashboard/my-profile"
              className={`flex items-center gap-3 px-4 py-3 font-bold text-sm rounded-xl transition-all ${
                pathname === "/dashboard/my-profile"
                  ? "bg-[#e0ecff] text-[#004ee6]"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <User className="w-4 h-4" />
              Update Profile
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 font-bold text-sm rounded-xl transition-all cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200/80 shadow-lg px-6 py-2 flex items-center justify-around md:hidden pb-safe">
        <Link
          href="/dashboard/my-booking"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            pathname === "/dashboard/my-booking"
              ? "text-[#004ee6]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">Bookings</span>
        </Link>

        <Link
          href="/dashboard/my-profile"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            pathname === "/dashboard/my-profile"
              ? "text-[#004ee6]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-red-500 hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">Logout</span>
        </button>
      </nav>
    </>
  );
}
