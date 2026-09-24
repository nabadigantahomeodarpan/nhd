import { z } from "zod";
import { startOfDay } from "date-fns";

export const visitSchema = z.object({
  id: z.string().optional(),
  visitDate: z.coerce.date().refine((date) => {
    return startOfDay(date) <= startOfDay(new Date());
  }, "Future dates are not allowed."),
  medicines: z.string().optional(),
});

export const patientSchema = z.object({
  id: z.string().optional(),
  registrationDate: z.coerce.date().refine((date) => {
    return startOfDay(date) <= startOfDay(new Date());
  }, "Future dates are not allowed."),
  name: z.string().trim().min(1, "Patient name is required."),
  mobile: z.string().trim().refine((val) => val === "" || /^[0-9]{10}$/.test(val), {
    message: "Enter a valid 10-digit mobile number or leave empty.",
  }).optional(),
  age: z.string().trim().optional(),
  gender: z.string().trim().optional(),
  visits: z.array(visitSchema).min(1, "At least one visit is required."),
});

export const existingVisitSchema = z.object({
  patientId: z.string().min(1, "Patient must be selected."),
  visitDate: z.coerce.date().refine((date) => {
    return startOfDay(date) <= startOfDay(new Date());
  }, "Future dates are not allowed."),
  medicines: z.string().optional(),
});

export type VisitInput = z.infer<typeof visitSchema>;
export type PatientInput = z.infer<typeof patientSchema>;
export type ExistingVisitInput = z.infer<typeof existingVisitSchema>;
