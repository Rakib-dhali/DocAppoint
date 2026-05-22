import {
  Search,
  Calendar,
  ShieldCheck,
  Shield,
  Clock,
  Star,
  Heart,
} from "lucide-react";

export default function ExtraSection() {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-5 h-5 text-blue-600" />,
      title: "Search Doctor",
      desc: "Find specialists based on symptoms, specialty, or location.",
    },
    {
      id: 2,
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      title: "Book Slot",
      desc: "Choose a convenient date and time that fits your busy schedule.",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: "Get Confirmed",
      desc: "Receive an instant confirmation and reminder for your visit.",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: "Verified Doctors",
      desc: "Every practitioner on our platform goes through a rigorous background and credentials check.",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Clock className="w-5 h-5 text-cyan-500" />,
      title: "24/7 Available",
      desc: "Access emergency booking and support at any time of the day or night from anywhere.",
      borderColor: "border-cyan-400",
      bgColor: "bg-cyan-50",
    },
    {
      icon: <Star className="w-5 h-5 text-emerald-600" fill="currentColor" />,
      title: "Top Rated",
      desc: "Connect with doctors based on real patient feedback and performance metrics.",
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <Heart className="w-5 h-5 text-indigo-600" />,
      title: "Patient First",
      desc: "Our entire interface and service are optimized for the comfort and ease of patients.",
      borderColor: "border-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="w-full bg-slate-50/50 font-sans antialiased selection:bg-blue-500/10 max-w-350 mx-auto px-6 md:px-12 lg:px-18 xl:px-24 mt-15">
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Simple Steps to Better Health
          </h2>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Getting professional medical advice has never been easier. Follow
            our simple process to book your slot.
          </p>
          <div className="mt-16 relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-blue-100 -z-0"></div>

            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center group z-10"
              >
                <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.08)] border border-slate-100 transition-transform duration-300 group-hover:-translate-y-1">
                  {step.icon}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm">
                    {step.id}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed max-w-xs px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase block">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pioneering Better Healthcare Access for Everyone
            </h2>
            <p className="text-slate-500 leading-relaxed max-w-xl text-sm sm:text-base">
              We bridge the gap between patients and medical professionals using
              advanced technology and a patient-first philosophy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className={`bg-white p-5 rounded-2xl border-l-4 ${benefit.borderColor} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300 flex flex-col items-start`}
                >
                  <div className={`p-2.5 rounded-xl ${benefit.bgColor} mb-4`}>
                    {benefit.icon}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
            {/* Aspect Wrapper for Image Block */}
            <div className="relative w-full max-w-135 aspect-[4/4.2] sm:aspect-[4/3.8] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="Modern clinical reception environment"
                className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            <div className="absolute -bottom-8 left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[260px] sm:max-w-[280px] transition-transform duration-300 hover:scale-[1.02]">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 block tracking-tight">
                98%
              </span>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                Satisfaction Rate
              </h5>
              <p className="text-[11px] leading-relaxed text-slate-400 mt-1.5 font-medium">
                Based on 10,000+ reviews from patients who booked through
                DocAppoint.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
