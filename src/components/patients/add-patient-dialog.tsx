"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PatientForm } from "./patient-form";
import { createPatientAction } from "@/actions/patient-actions";
import { toast } from "sonner";
import { PatientInput } from "@/schemas/patient-schema";
import { useRouter } from "next/navigation";

export function AddPatientDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: PatientInput) => {
    setIsPending(true);
    try {
      const result = await createPatientAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success("Patient added successfully.");
        setOpen(false);
        if (result.patientId) {
          router.push(`/admin/patients/${result.patientId}`);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="gap-2" />}>
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline-block">Add Patient</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>
            Enter patient details and their initial visits.
          </DialogDescription>
        </DialogHeader>
        <PatientForm 
          onSubmit={handleSubmit} 
          isPending={isPending} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
