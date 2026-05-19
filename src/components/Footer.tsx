"use client";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-slate-400 text-sm font-sans antialiased">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16">
        
        {/* Column 1: Brand Profile & Socials */}
        <div className="md:col-span-4 space-y-5">
          <h3 className="text-xl font-bold text-white tracking-tight">
            DocAppoint
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
            Simplifying healthcare access through technology. Connect with the right specialists instantly and manage your appointments with ease.
          </p>
          
          {/* Social Media Circular Links */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="#" 
              className="w-9 h-9 rounded-full border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter  className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 rounded-full border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram  className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links (Split Sub-grid Layout) */}
        <div className="md:col-span-4 space-y-5">
          <h3 className="text-base font-semibold text-white tracking-wider uppercase md:normal-case md:text-lg md:font-bold">
            Quick Links
          </h3>
          
          <div className="grid grid-cols-2 gap-y-3.5 gap-x-4">
            <a href="#" className="hover:text-white transition-colors duration-200 block">
              About Us
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 block">
              Find a Doctor
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 block">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 block">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 block">
              Contact Support
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 block">
              Careers
            </a>
          </div>
        </div>

        {/* Column 3: Newsletter Box */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-base font-semibold text-white tracking-wider uppercase md:normal-case md:text-lg md:font-bold">
            Newsletter
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            Stay updated with the latest medical advice and platform updates.
          </p>
          
          {/* Newsletter Input Elements */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3 pt-1">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-3 bg-[#1f2937] text-white placeholder-slate-500 rounded-xl border border-transparent focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-sm"
              required
            />
            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 active:scale-[0.99] cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copyright Bottom Bar Area */}
      <div className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 tracking-wide">
        &copy; {currentYear} DocAppoint. All rights reserved.
      </div>
    </footer>
  );
}