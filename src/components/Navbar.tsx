"use client";

import { useState } from "react";
import { redirect, usePathname } from "next/navigation"; // Hook to detect the current path
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const isLoggedIn = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current active URL path

  // Map nav item names to their respective app routing links
  const navItems = [
    { name: "Home", href: "/" },
    { name: "All Appointments", href: "/all-appointments" },
    { name: "Dashboard", href: "/dashboard" },
  ];
  const handleLogout = async () => {
    await authClient.signOut();
    redirect("/");
  };

  return (
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
      </style>
      <section className="w-full bg-white ">
      <nav className="mx-auto max-w-350 py-5 px-6 sm:px-12 lg:px-18 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo-c.png"} alt="logo" height={60} width={60} />
          <p className="text-blue-900 hidden lg:flex font-semibold text-3xl">
            Clini<span className="text-blue-600">qo</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-white border border-zinc-200 font-medium text-zinc-800 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Get Started CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
          {!isLoggedIn && (
            <>
            <Link href="/register" className="px-5  hidden md:block py-3 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
              <button className="">
                Register
              </button></Link>
              <Link href="/login" className="px-5 hidden md:flex py-3 bg-blue-600 text-white font-semibold rounded-xl  hover:bg-blue-700  transition-all duration-300  items-center justify-center gap-2 ">
              <button className="group">
                Login
              </button> </Link>
            </>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <Image
                src={session?.user?.image || "/man.png"}
                alt="user"
                width={50}
                height={50}
                className="rounded-full border to-blue-500"
              />
              <button
                onClick={handleLogout}
                className="px-5 hidden md:flex py-3 bg-blue-600 text-white font-semibold rounded-xl  hover:bg-blue-700  transition-all duration-300  items-center justify-center gap-2 group"
              >
                logout
              </button>
              {/* Mobile Hamburger Button */}
                <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 z-50 relative"
          >
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
               
            </div>
          )}

       {!isLoggedIn && <>
         {/* Mobile Hamburger Button */}
                <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 z-50 relative"
          >
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button></>}
        
        </div>
        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-1 md:hidden z-50 shadow-lg animate-fadeIn">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)} // Closes panel on navigation
                  className={`px-4 py-2.5 rounded-lg text-center text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-semibold"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              {!isLoggedIn && (
                <div className="flex flex-col gap-3">
                  <Link href="/register" className="px-5 md:hidden text-center  py-3 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                    <button onClick={() => setMenuOpen(false)} className="">
                      Register
                    </button>
                  </Link>
                  <Link href="/login" className="px-5 md:hidden text-center  py-3 bg-blue-600 text-white font-semibold rounded-xl  hover:bg-blue-700  transition-all duration-300  items-center justify-center gap-2">
                    <button onClick={() => setMenuOpen(false)} className="">
                      Login
                    </button>{" "}
                  </Link>
                </div>
              )}
              {isLoggedIn && (
                <>
                 
                  <button
                    onClick={() => handleLogout()}
                    className="px-5 md:hidden py-3 bg-red-400 text-white font-semibold rounded-xl  hover:bg-blue-700  transition-all duration-300  items-center justify-center gap-2 group"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      </section>
    </>
  );
};

export default Navbar;
