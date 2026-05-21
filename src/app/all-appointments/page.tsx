import { Suspense } from "react";
import AllAppointmentsContent from "@/components/AllAppointmentsContent";

export default function AllAppointments() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen bg-[#f3f8ff]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </section>
      }
    >
      <AllAppointmentsContent />
    </Suspense>
  );
}