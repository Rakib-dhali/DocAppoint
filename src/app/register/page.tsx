"use client";

import { authClient } from "@/lib/auth-client";
import {
  FileImage,
  Image,
  Mail,
  User,
  Lock,
  CheckCircle2,
  Circle,
  EyeOff,
  Eye,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Track if the password field has been blurred or if form attempted submission
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Live Validation Checks
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const isLongEnough = formData.password.length >= 6;

  // Calculate standard criteria fulfilled score (0 to 3)
  const strengthScore = [hasUppercase, hasLowercase, isLongEnough].filter(
    Boolean,
  ).length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordTouched(true);

    // Stop execution if requirements are not fulfilled
    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      return;
    }
    const { fullName, email, photoUrl, password } = formData;
    const { data, error } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      image:photoUrl,
    });
    if (error) {
      console.log("Error signing up:", error);
    }
    console.log("Signed up:", data);
  };

  // Helper utility to control strength UI variables dynamically
  const getStrengthMeta = () => {
    if (formData.password.length === 0)
      return { label: "None", color: "bg-slate-100" };
    if (strengthScore === 1) return { label: "Weak", color: "bg-rose-500" };
    if (strengthScore === 2)
      return { label: "Moderate", color: "bg-amber-500" };
    return { label: "Strong", color: "bg-emerald-600" };
  };

  const strengthMeta = getStrengthMeta();

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white text-[#1e293b] max-w-350 mx-auto py-5 md:py-10 lg:py-15 px-6 md:px-12 lg:px-18 xl:px-24">
      {/* LEFT SIDE: Marketing Banner (Hidden on mobile/tablet, visible on md and up) */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] bg-linear-to-b from-[#3b82f6] to-[#1d4ed8] text-white p-8 lg:p-12 flex-col justify-between items-center relative overflow-hidden">
        {/* Main Copy */}
        <div className="text-center max-w-md my-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Revolutionizing healthcare access.
          </h1>
          <p className="text-blue-100 text-base lg:text-lg leading-relaxed font-light">
            Join thousands of patients and practitioners in a modern medical
            ecosystem designed for clarity, speed, and trust.
          </p>
        </div>

        {/* Mockup Image Preview Display mimicking dashboard UI inside the screenshot */}
        <div className="w-full max-w-85 lg:max-w-95 aspect-square bg-[#0c1322] border-4 border-white/20 rounded-xl p-4 shadow-2xl mb-4 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="w-full h-full opacity-80 flex flex-col justify-between text-[10px] text-slate-400 font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span>DASHBOARD</span>
              <div className="w-3 h-3 rounded-full bg-cyan-400/30"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 my-2">
              <div className="bg-slate-900 p-2 rounded border border-slate-800 text-center">
                <span className="block text-white font-bold text-xs">0</span>{" "}
                Slots
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800 text-center">
                <span className="block text-white font-bold text-xs">0</span>{" "}
                Active
              </div>
              <div className="bg-slate-900 p-2 rounded border border-blue-500/40 text-center">
                <span className="block text-cyan-400 font-bold text-xs">+</span>{" "}
                New
              </div>
            </div>
            <div className="bg-gradient-to-t from-slate-900 to-slate-950 flex-1 rounded border border-slate-800 p-2 flex flex-col justify-end">
              <div className="w-full h-12 flex items-end gap-[2px]">
                <div className="bg-cyan-500 w-1/6 h-[30%] rounded-t-sm"></div>
                <div className="bg-blue-500 w-1/6 h-[50%] rounded-t-sm"></div>
                <div className="bg-cyan-400 w-1/6 h-[80%] rounded-t-sm"></div>
                <div className="bg-blue-600 w-1/6 h-[45%] rounded-t-sm"></div>
                <div className="bg-indigo-500 w-1/6 h-[65%] rounded-t-sm"></div>
                <div className="bg-cyan-500 w-1/6 h-[95%] rounded-t-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Create Account Form */}
      <div className="w-full md:w-1/2 lg:w-[55%] border border-blue-500 bg-white px-6 py-12 sm:px-12 lg:px-20 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Header Text */}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Start your journey to better health management today.
          </p>

          {/* Form Elements */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Input: Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <User size={18} strokeWidth={2.2} />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Input: Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={18} strokeWidth={2.2} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Input: Photo URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Photo URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <FileImage size={18} strokeWidth={2.2} />
                </span>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="https://image-link.com/photo.jpg"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Input: Password (Modified with Live Validation UI) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={18} strokeWidth={2.2} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all placeholder:text-slate-400 ${
                    passwordTouched && strengthScore < 3
                      ? "border-rose-300 focus:border-rose-500 ring-rose-500/5"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Dynamic Progress Strength Indicator Bars */}
              <div className="mt-2.5">
                <div className="grid grid-cols-3 gap-1.5">
                  <div
                    className={`h-1 rounded-full transition-colors duration-300 ${strengthScore >= 1 ? strengthMeta.color : "bg-slate-100"}`}
                  ></div>
                  <div
                    className={`h-1 rounded-full transition-colors duration-300 ${strengthScore >= 2 ? strengthMeta.color : "bg-slate-100"}`}
                  ></div>
                  <div
                    className={`h-1 rounded-full transition-colors duration-300 ${strengthScore === 3 ? strengthMeta.color : "bg-slate-100"}`}
                  ></div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                  <span>
                    Password strength:{" "}
                    <strong className="font-semibold text-slate-700">
                      {strengthMeta.label}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Requirement Rule Checks Checklist */}
              <ul className="mt-3 space-y-1.5 text-xs border-t border-slate-100 pt-2.5">
                <li
                  className={`flex items-center gap-2 transition-colors duration-200 ${isLongEnough ? "text-emerald-600 font-medium" : "text-slate-400"}`}
                >
                  {isLongEnough ? (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  ) : (
                    <Circle size={14} className="text-slate-300" />
                  )}
                  Minimum length of 6 characters
                </li>
                <li
                  className={`flex items-center gap-2 transition-colors duration-200 ${hasUppercase ? "text-emerald-600 font-medium" : "text-slate-400"}`}
                >
                  {hasUppercase ? (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  ) : (
                    <Circle size={14} className="text-slate-300" />
                  )}
                  At least 1 uppercase letter (A-Z)
                </li>
                <li
                  className={`flex items-center gap-2 transition-colors duration-200 ${hasLowercase ? "text-emerald-600 font-medium" : "text-slate-400"}`}
                >
                  {hasLowercase ? (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  ) : (
                    <Circle size={14} className="text-slate-300" />
                  )}
                  At least 1 lowercase letter (a-z)
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3ba2f6] to-[#3b82f6] hover:from-[#2563eb] hover:to-[#3b82f6] text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.99]"
            >
              <span>Register</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-medium">
              Or continue with
            </span>
          </div>

          {/* Google Social OAuth Button */}
          <button
            type="button"
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-all text-sm shadow-sm"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          {/* Login Link Redirect */}
          <p className="text-sm text-center text-slate-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Bottom Policy Terms text */}
          <p className="text-[11px] text-center text-slate-400 mt-10 leading-relaxed px-4">
            By registering, you agree to DocAppoint&#39;s{" "}
            <a href="#terms" className="underline hover:text-slate-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" className="underline hover:text-slate-600">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
