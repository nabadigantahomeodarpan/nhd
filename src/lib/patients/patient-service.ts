import { prisma } from "@/lib/db/prisma";
import { PatientInput } from "@/schemas/patient-schema";
import { Prisma } from "@prisma/client";
import { getDateString, getTodayDateString, generateDailySerial } from "./queue-service";

export async function generatePatientId(): Promise<string> {
  const lastPatient = await prisma.patient.findFirst({
    orderBy: { patientId: 'desc' },
  });

  if (!lastPatient) {
    return "PT-000001";
  }

  const lastIdNumber = parseInt(lastPatient.patientId.replace("PT-", ""), 10);
  const nextIdNumber = lastIdNumber + 1;
  return `PT-${nextIdNumber.toString().padStart(6, "0")}`;
}

export async function createPatientWithVisits(data: PatientInput) {
  const newPatientId = await generatePatientId();

  return prisma.$transaction(async (tx) => {
    // Generate serial only if the first visit is today
    const firstVisitDate = data.visits[0]?.visitDate || new Date();
    const visitDateString = getDateString(firstVisitDate);
    const todayStr = getTodayDateString();
    
    let dailySerialNumber = null;
    let finalDateString = null;
    
    if (visitDateString === todayStr) {
      dailySerialNumber = await generateDailySerial(todayStr, tx);
      finalDateString = todayStr;
    }

    const patient = await tx.patient.create({
      data: {
        patientId: newPatientId,
        name: data.name,
        mobile: data.mobile || "",
        registrationDate: data.registrationDate,
        visits: {
          create: data.visits.map((visit, index) => ({
            visitNumber: index + 1,
            visitDate: visit.visitDate,
            medicines: visit.medicines || "",
            dailySerialNumber: index === 0 ? dailySerialNumber : null,
            dateString: index === 0 ? finalDateString : null,
          })),
        },
      },
      include: {
        visits: true,
      },
    });

    return patient;
  });
}

export async function updatePatientWithVisits(id: string, data: PatientInput) {
  return prisma.$transaction(async (tx) => {
    // 1. Update patient details
    const patient = await tx.patient.update({
      where: { id },
      data: {
        name: data.name,
        mobile: data.mobile || "",
        registrationDate: data.registrationDate,
      },
    });

    // 2. Fetch existing visits
    const existingVisits = await tx.visit.findMany({
      where: { patientId: id },
      orderBy: { visitNumber: "asc" },
    });

    // 3. Upsert or Add visits based on input array
    for (let i = 0; i < data.visits.length; i++) {
      const visitData = data.visits[i];
      const visitNumber = i + 1;

      if (visitData.id) {
        // Update existing
        await tx.visit.update({
          where: { id: visitData.id },
          data: {
            visitDate: visitData.visitDate,
            medicines: visitData.medicines || "",
            visitNumber: visitNumber, // Correct ordering just in case
          },
        });
      } else {
        // Create new
        await tx.visit.create({
          data: {
            patientId: id,
            visitNumber: visitNumber,
            visitDate: visitData.visitDate,
            medicines: visitData.medicines || "",
          },
        });
      }
    }

    // 4. If there were deleted visits from the UI, we should handle it
    const updatedVisitIds = data.visits.map((v) => v.id).filter(Boolean) as string[];
    const visitsToDelete = existingVisits.filter((v) => !updatedVisitIds.includes(v.id));
    
    if (visitsToDelete.length > 0) {
      await tx.visit.deleteMany({
        where: {
          id: { in: visitsToDelete.map((v) => v.id) },
        },
      });
    }

    return patient;
  });
}

export async function getPatients(query = "", skip = 0, take = 20) {
  const where: Prisma.PatientWhereInput = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { patientId: { contains: query, mode: "insensitive" } },
          { mobile: { contains: query } },
        ],
      }
    : {};

  const [patients, total] = await Promise.all([
    prisma.patient.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        visits: {
          orderBy: { visitDate: "desc" },
          take: 1,
        }
      }
    }),
    prisma.patient.count({ where }),
  ]);

  return { patients, total };
}

export async function getPatientById(id: string) {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      visits: {
        orderBy: { visitNumber: "asc" },
      },
    },
  });
}

export async function deletePatient(id: string) {
  // Cascades visits automatically because of onDelete: Cascade
  return prisma.patient.delete({
    where: { id },
  });
}

// ==========================================
// NEW WORKFLOW FUNCTIONS
// ==========================================

export async function searchPatientsForDropdown(query: string) {
  if (!query || query.length < 2) return [];

  const patients = await prisma.patient.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { patientId: { contains: query, mode: "insensitive" } },
        { mobile: { contains: query } },
      ],
    },
    include: {
      _count: {
        select: { visits: true }
      },
      visits: {
        orderBy: { visitDate: "desc" },
        take: 1,
      }
    },
    take: 10,
    orderBy: { createdAt: "desc" }
  });

  return patients;
}

export async function createVisitForExistingPatient(
  patientId: string, 
  visitDate: Date, 
  medicines: string
) {
  return prisma.$transaction(async (tx) => {
    // 1. Verify patient exists and get their last visit number
    const patient = await tx.patient.findUnique({
      where: { id: patientId },
      include: {
        visits: {
          orderBy: { visitNumber: "desc" },
          take: 1
        }
      }
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    const nextVisitNumber = patient.visits.length > 0 
      ? patient.visits[0].visitNumber + 1 
      : 1;

    // 2. Generate daily serial only if visit is today
    const visitDateString = getDateString(visitDate);
    const todayStr = getTodayDateString();
    
    let dailySerialNumber = null;
    let finalDateString = null;

    if (visitDateString === todayStr) {
      dailySerialNumber = await generateDailySerial(todayStr, tx);
      finalDateString = todayStr;
    }

    // 3. Create new visit
    const newVisit = await tx.visit.create({
      data: {
        patientId,
        visitNumber: nextVisitNumber,
        visitDate,
        medicines,
        dailySerialNumber,
        dateString: finalDateString,
      }
    });

    return { patient, visit: newVisit };
  });
}
