import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";

/**
 * Helper to get the standard date string for a given Date (YYYY-MM-DD)
 */
export function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Helper to get the standard date string for today (YYYY-MM-DD)
 */
export function getTodayDateString(): string {
  return getDateString(new Date());
}

/**
 * Atomically generates a unique daily serial number for the given date.
 * Uses a Prisma transaction if provided, otherwise uses the global prisma client.
 */
export async function generateDailySerial(
  dateString: string,
  tx?: Omit<Prisma.TransactionClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
): Promise<number> {
  const client = tx || prisma;
  
  const seq = await client.dailySequence.upsert({
    where: { date: dateString },
    update: { value: { increment: 1 } },
    create: { date: dateString, value: 1 },
  });

  return seq.value;
}

/**
 * Fetches all visits for today's queue
 */
export async function getTodayQueue() {
  const todayStr = getTodayDateString();

  const visits = await prisma.visit.findMany({
    where: { dateString: todayStr },
    include: {
      patient: true,
    },
    orderBy: {
      dailySerialNumber: "asc",
    },
  });

  return visits;
}
