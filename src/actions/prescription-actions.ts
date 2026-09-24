"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function generatePrescriptionAction(patientId: string) {
  try {
    // Check if the patient already has a prescription
    const existingPrescription = await prisma.prescription.findUnique({
      where: { patientId },
    });

    if (existingPrescription) {
      return { success: true, prescriptionId: existingPrescription.id };
    }

    // Simulate generation time (for the dots animation)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create a new prescription
    const newPrescription = await prisma.prescription.create({
      data: {
        patientId,
      },
    });

    revalidatePath("/admin/patients");
    revalidatePath(`/admin/patients/${patientId}`);

    return { success: true, prescriptionId: newPrescription.id };
  } catch (error) {
    console.error("Error generating prescription:", error);
    return { error: "Failed to generate prescription." };
  }
}
