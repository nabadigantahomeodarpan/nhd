"use server";

import { patientSchema } from "@/schemas/patient-schema";
import { 
  createPatientWithVisits, 
  updatePatientWithVisits, 
  deletePatient,
  createVisitForExistingPatient,
  searchPatientsForDropdown
} from "@/lib/patients/patient-service";
import { existingVisitSchema } from "@/schemas/patient-schema";
import { revalidatePath } from "next/cache";

export async function createPatientAction(formData: any) {
  try {
    const parsed = patientSchema.safeParse(formData);
    
    if (!parsed.success) {
      return { error: "Validation failed.", details: parsed.error.flatten() };
    }

    const patient = await createPatientWithVisits(parsed.data);
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/patients");
    return { success: true, patientId: patient.id, patient };
  } catch (error) {
    console.error("Failed to create patient:", error);
    return { error: "An unexpected error occurred while creating the patient." };
  }
}

export async function createExistingVisitAction(formData: any) {
  try {
    const parsed = existingVisitSchema.safeParse(formData);
    
    if (!parsed.success) {
      return { error: "Validation failed.", details: parsed.error.flatten() };
    }

    const { patientId, visitDate, medicines } = parsed.data;
    const result = await createVisitForExistingPatient(patientId, visitDate, medicines || "");
    
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/patients");
    revalidatePath(`/admin/patients/${patientId}`);
    
    return { success: true, ...result };
  } catch (error: any) {
    console.error("Failed to create existing visit:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}

export async function searchPatientsAction(query: string) {
  try {
    const patients = await searchPatientsForDropdown(query);
    return { success: true, patients };
  } catch (error) {
    console.error("Failed to search patients:", error);
    return { error: "Search failed." };
  }
}

export async function updatePatientAction(id: string, formData: any) {
  try {
    const parsed = patientSchema.safeParse(formData);
    
    if (!parsed.success) {
      return { error: "Validation failed.", details: parsed.error.flatten() };
    }

    await updatePatientWithVisits(id, parsed.data);
    revalidatePath("/admin/dashboard");
    revalidatePath(`/admin/patients/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update patient:", error);
    return { error: "An unexpected error occurred while updating the patient." };
  }
}

export async function deletePatientAction(id: string) {
  try {
    await deletePatient(id);
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete patient:", error);
    return { error: "An unexpected error occurred while deleting the patient." };
  }
}
