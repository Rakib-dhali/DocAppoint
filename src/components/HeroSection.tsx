"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function HeroBanner() {
  // Sample data for the slider
  const doctors = [
    {
      id: 1,
      name: "Dr. Ayesha",
      role: "Cardiologist",
      slot: "4:00 PM",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Dr. James Richardson",
      role: "Neurologist",
      slot: "2:30 PM",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Dr. Sarah Jenkins",
      role: "Pediatrician",
      slot: "11:00 AM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center  overflow-hidden mx-auto max-w-7xl bg-white px-6 md:px-12 lg:px-18 xl:px-24">
      {/* Background Subtle Grid Pattern Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Side */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            <span className="text-blue-600 block mb-2">Book Your Doctor</span>
            Appointment Instantly
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience the future of healthcare with DocAppoint. Connect with top-rated specialists, 
            book slots in seconds, and manage your health journey with ease.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 group">
              Book Appointment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
              Explore Doctors
            </button>
          </div>

          {/* Trust Badges / Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto lg:mx-0 border-t border-slate-200/80">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">500+</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Specialists</p>
            </div>
            <div className="border-x border-slate-200 px-4">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">15k+</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Patients</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">4.9/5</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Slider Side */}
        <div className="lg:col-span-6 relative w-full max-w-[500px] lg:max-w-none mx-auto aspect-square lg:aspect-auto lg:h-[550px] flex items-center justify-center">
          
          {/* Main Swiper Container */}
          <div className="w-full h-[85%] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white bg-white relative group">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect={'fade'}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-full"
              loop={true}
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id} className="relative w-full h-full">
                  {/* Doctor Image */}
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Subtle Gradient Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>

                  {/* Dynamic Floating Doctor Card Badge inside the slider view */}
                  <div className="absolute bottom-6 border-2 right-6 left-6 sm:left-auto sm:w-64 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 transform transition-all duration-300 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                      <img src={doctor.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{doctor.name}</h4>
                      <p className="text-xs text-blue-600 font-medium">{doctor.role}</p>
                      <div className="mt-1.5 flex items-center justify-between bg-blue-50 px-2 py-1 rounded-md">
                        <span className="text-[10px] font-semibold text-blue-700">Next Slot: {doctor.slot}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Static Top-Left Floating Badge ("Appointment Confirmed") */}
          <div className="absolute top-2 left-4 sm:-left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce-slow z-20">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 whitespace-nowrap">Appointment Confirmed</p>
              <p className="text-[10px] text-slate-400 font-medium">Today at 10:30 AM</p>
            </div>
          </div>

          {/* Background decorative design elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-300/20 rounded-full blur-3xl -z-10"></div>
        </div>

      </div>
    </section>
  );
}