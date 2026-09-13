"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewPatientForm } from "./new-patient-form";
import { createPatientAction } from "@/actions/patient-actions";
import { toast } from "sonner";
import { PatientInput } from "@/schemas/patient-schema";
import { SerialReceiptDialog } from "./serial-receipt-dialog";

interface NewPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewPatientDialog({ open, onOpenChange }: NewPatientDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    patientId: string;
    patientName: string;
    visitNumber: number;
    dailySerialNumber: number;
    visitDate: Date;
  } | null>(null);

  const handleSubmit = async (data: PatientInput) => {
    setIsPending(true);
    try {
      const result = await createPatientAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success && result.patient) {
        toast.success("Patient added successfully.");
        onOpenChange(false); // Close dialog

        // Show receipt
        const patientData = result.patient as any;
        const firstVisit = patientData.visits[0];
        setReceiptData({
          patientId: patientData.patientId,
          patientName: patientData.name,
          visitNumber: firstVisit.visitNumber,
          dailySerialNumber: firstVisit.dailySerialNumber,
          visitDate: firstVisit.visitDate,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Patient</DialogTitle>
            <DialogDescription>
              Create a new patient record and add their first visit.
            </DialogDescription>
          </DialogHeader>
          <NewPatientForm 
            onSubmit={handleSubmit} 
            isPending={isPending} 
            onCancel={() => onOpenChange(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Show receipt dialog on success */}
      {receiptData && (
        <SerialReceiptDialog 
          open={!!receiptData} 
          onOpenChange={(isOpen) => {
            if (!isOpen) setReceiptData(null);
          }}
          data={receiptData}
        />
      )}
    </>
  );
}
