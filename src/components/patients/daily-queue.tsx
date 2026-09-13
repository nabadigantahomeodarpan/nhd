import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { DeletePatientDialog } from "./delete-patient-dialog";

interface DailyQueueProps {
  queue: {
    id: string;
    patientId: string;
    visitNumber: number;
    visitDate: Date;
    dailySerialNumber: number | null;
    patient: {
      id: string;
      patientId: string;
      name: string;
      mobile: string;
      registrationDate: Date;
    };
  }[];
}

export function DailyQueue({ queue }: DailyQueueProps) {
  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card h-64 border border-border/60 shadow-sm rounded-xl">
        <h3 className="text-lg font-semibold text-primary mb-2">Queue is empty</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          No patients have been added to today's queue yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 shadow-sm overflow-hidden">
      <Table className="w-full min-w-[600px] text-xs md:text-sm">
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6 text-center">Token Number</TableHead>
            <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Patient ID</TableHead>
            <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Name</TableHead>
            <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Mobile Number</TableHead>
            <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Registered</TableHead>
            <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queue.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell className="font-bold text-muted-foreground text-center">
                {visit.dailySerialNumber || "-"}
              </TableCell>
              <TableCell className="font-medium text-primary truncate">
                <Link href={`/admin/patients/${visit.patient.id}`} className="hover:underline">
                  {visit.patient.patientId}
                </Link>
              </TableCell>
              <TableCell className="truncate">
                <Link href={`/admin/patients/${visit.patient.id}`} className="hover:underline">
                  {visit.patient.name}
                </Link>
              </TableCell>
              <TableCell className="truncate">
                {visit.patient.mobile || "-"}
              </TableCell>
              <TableCell className="truncate">
                {/* @ts-ignore */}
                {visit.patient.registrationDate ? new Date(visit.patient.registrationDate).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2 h-8">
                  <Link 
                    href={`/admin/patients?edit=${visit.patient.id}`}
                    className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8 px-3 gap-1.5 text-primary hover:bg-primary/10 hover:text-primary flex items-center justify-center border`}
                  >
                     <Pencil className="h-3.5 w-3.5" />
                     <span className="leading-none mt-[1px]">Edit</span>
                  </Link>
                  <Separator orientation="vertical" className="h-full" />
                  <DeletePatientDialog 
                    patientId={visit.patient.id} 
                    trigger={
                      <Button variant="outline" size="sm" className="h-8 px-3 gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center justify-center">
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="leading-none mt-[1px]">Delete</span>
                      </Button>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
