"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { PatientForm } from "./patient-form";
import { updatePatientAction } from "@/actions/patient-actions";
import { toast } from "sonner";
import { PatientInput } from "@/schemas/patient-schema";
import { useRouter } from "next/navigation";

interface EditPatientDialogProps {
  patientId: string;
  initialData: PatientInput;
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
}

export function EditPatientDialog({ patientId, initialData, trigger, defaultOpen = false }: EditPatientDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && defaultOpen) {
      const url = new URL(window.location.href);
      url.searchParams.delete('edit');
      router.replace(url.pathname + url.search);
    }
  };

  const handleSubmit = async (data: PatientInput) => {
    setIsPending(true);
    try {
      const result = await updatePatientAction(patientId, data);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success("Patient updated successfully.");
        handleOpenChange(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger render={trigger as React.ReactElement} />
      ) : (
        <DialogTrigger render={<Button variant="outline" className="gap-2 h-11 px-5 rounded-xl border-border/60 shadow-sm hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all" />}>
          <Pencil className="h-4 w-4" />
          <span className="hidden sm:inline-block">Edit Patient</span>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogDescription>
            Update patient details or manage visits.
          </DialogDescription>
        </DialogHeader>
        <PatientForm 
          initialData={initialData}
          onSubmit={handleSubmit} 
          isPending={isPending} 
          onCancel={() => handleOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
