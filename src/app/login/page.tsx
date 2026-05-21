"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit  = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    const { data, error } = await authClient.signIn.email({
    email,
    password, 
    callbackURL: "/"
});
    if (error) {
      toast.error(error.message!);
    }
    if (data) {
      toast.success("Logged in successfully!");
    }
  };
 const googleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) {
      toast.error(error.message!);
      return;
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white text-[#1e293b  max-w-350 mx-auto py-5 md:py-10 lg:py-15 px-6 md:px-12 lg:px-18 xl:px-24]">
      
      {/* LEFT SIDE: Marketing Banner */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] bg-linear-to-b from-[#0052cc] to-[#003d99] text-white p-8 lg:p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Shield Background Watermark */}
        <div className="absolute right-[-10%] bottom-[15%] opacity-10 pointer-events-none select-none">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        {/* Top Logo */}
        

        {/* Main Features Copy */}
        <div className="max-w-md my-auto px-2 space-y-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Your Health,<br />Our Priority
          </h1>
          
          <ul className="space-y-5 text-sm lg:text-base font-light text-blue-50/90">
            <li className="flex items-start gap-3.5">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              <span>Access to 5,000+ certified specialists across 20+ departments.</span>
            </li>
            <li className="flex items-start gap-3.5">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              <span>Instant booking with real-time availability and smart reminders.</span>
            </li>
            <li className="flex items-start gap-3.5">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              <span>Secure digital health records and encrypted tele-consultations.</span>
            </li>
          </ul>
        </div>

        {/* Social Proof Footer */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* Avatar Stack */}
            <div className="flex -space-x-2.5">
              <img className="w-7 h-7 rounded-full border-2 border-[#0052cc] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-[#0052cc] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-[#0052cc] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User" />
            </div>
            <p className="text-[11px] text-blue-100 font-medium tracking-wide">
              Join 20,000+ patients already using DocAppoint
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: Welcome Back Form */}
      <div className="w-full md:w-1/2 lg:w-[55%] border border-blue-500 bg-white px-6 py-12 sm:px-12 lg:px-24 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          
          {/* Header Text */}
          <div className="mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Welcome Back <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Please enter your details to access your dashboard.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Input: Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={18} strokeWidth={2.2} />
                </span>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800 transition-all placeholder:text-slate-300" 
                />
              </div>
            </div>

            {/* Input: Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <a href="#" className="text-[11px] font-bold text-blue-600 hover:underline tracking-tight">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={16} strokeWidth={2} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800 transition-all placeholder:text-slate-300" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center pt-1">
              <label className="relative flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-500 font-medium">
                <input 
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="peer appearance-none w-4 h-4 border border-slate-200 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                />
                <Check size={10} strokeWidth={4} className="absolute left-0.5 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 active:scale-[0.99] mt-2"
            >
              Login
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Or continue with
            </span>
          </div>

          {/* Google Button */}
          <button onClick={googleSignIn} type="button" className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs shadow-sm">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Registration Redirect */}
          <p className="text-xs text-center text-slate-500 mt-6 tracking-wide">
            New to DocAppoint? <Link href="/register" className="text-blue-600 font-bold hover:underline ml-0.5">Register Now</Link>
          </p>

        </div>
      </div>

    </div>
  );
}