import { Appointment } from "@/app/dashboard/page";

const BACKEND_URL = "http://localhost:4000";


// 1. Fetch all appointments from the backend
 async function getAppointments(patientEmail: string): Promise<Appointment[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/appointments/${patientEmail}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch records. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error reading appointments from server action:", error);
    return [];
  }
}
export const appointmentss = getAppointments("1@2.go");