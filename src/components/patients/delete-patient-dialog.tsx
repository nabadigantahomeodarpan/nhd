"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePatientAction } from "@/actions/patient-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeletePatientDialogProps {
  patientId: string;
  trigger?: React.ReactNode;
  onDeleted?: () => void;
}

export function DeletePatientDialog({ patientId, trigger, onDeleted }: DeletePatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsPending(true);
    try {
      const result = await deletePatientAction(patientId);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success("Patient deleted successfully.");
        setOpen(false);
        if (onDeleted) {
          onDeleted();
        } else {
          router.push("/admin/patients");
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
      {trigger ? (
        <DialogTrigger render={trigger as React.ReactElement} />
      ) : (
        <DialogTrigger render={<Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive shadow-sm transition-all flex items-center justify-center" />}>
          <Trash2 className="h-4 w-4" />
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Patient?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this patient and their visit history? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete Patient"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
