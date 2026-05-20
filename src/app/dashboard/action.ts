"use server";

import { revalidatePath } from "next/cache";

export interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string; 
  clinicLocation: string;
  clinicName: string;
  patientName: string;
  patientEmail: string;
  gender: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
}

const BACKEND_URL = "http://localhost:4000/api";

// 1. Fetch all appointments from the backend
export async function getAppointments(patientEmail: string): Promise<Appointment[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/appointments/${patientEmail}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch records. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error reading appointments from server action:", error);
    return [];
  }
}

// 2. Update an existing appointment slot
export async function updateAppointment(id: string, updateData: { appointmentDate: string; appointmentTime: string }) {
  try {
    const res = await fetch(`${BACKEND_URL}/update-appointment/${id}`, {
      method: "PATCH", // Using PATCH or PUT depending on your backend router setup
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to patch update parameters");
    }
    return { success: true };
  } catch (error) {
    console.error("Server update action failed:", error);
    return { success: false, error: error };
  }
}

// 3. Remove/Cancel an appointment
export async function deleteAppointment(id: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/delete-appointment/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to delete record");
    }
    return { success: true };
  } catch (error) {
    console.error("Server delete action failed:", error);
    return { success: false, error: error };
  }
}