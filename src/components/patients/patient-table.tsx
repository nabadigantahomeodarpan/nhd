import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { DeletePatientDialog } from "./delete-patient-dialog";

interface PatientTableProps {
  patients: {
    id: string;
    patientId: string;
    name: string;
    mobile: string;
    registrationDate: Date;
    visits: { dailySerialNumber: number | null }[];
  }[];
  total: number;
}

export function PatientTable({ patients, total }: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card h-64 border border-border/60 shadow-sm rounded-xl">
        <h3 className="text-lg font-semibold text-primary mb-2">No patients found</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Add your first patient to start managing records, or try searching with a different term.
        </p>
      </div>
    );
  }

  return (
    <Table className="w-full min-w-[700px] text-xs md:text-sm">
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6 text-center">Sl No.</TableHead>
          <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Patient ID</TableHead>
          <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Name</TableHead>
          <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Mobile Number</TableHead>
          <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6">Registered</TableHead>
          <TableHead className="font-semibold text-foreground/80 whitespace-nowrap w-1/6 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
        <TableBody>
          {patients.map((patient, index) => (
            <TableRow key={patient.id}>
              <TableCell className="font-bold text-muted-foreground text-center">
                {total - index}
              </TableCell>
              <TableCell className="font-medium text-primary truncate">
                <Link href={`/admin/patients/${patient.id}`} className="hover:underline">
                  {patient.patientId}
                </Link>
              </TableCell>
              <TableCell className="truncate">
                <Link href={`/admin/patients/${patient.id}`} className="hover:underline">
                  {patient.name}
                </Link>
              </TableCell>
              <TableCell className="truncate">{patient.mobile}</TableCell>
              <TableCell className="truncate">
                {new Date(patient.registrationDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2 h-8">
                  <Link 
                    href={`/admin/patients?edit=${patient.id}`}
                    className={`${buttonVariants({ variant: "outline", size: "sm" })} h-8 px-3 gap-1.5 text-primary hover:bg-primary/10 hover:text-primary flex items-center justify-center border`}
                  >
                     <Pencil className="h-3.5 w-3.5" />
                     <span className="leading-none mt-[1px]">Edit</span>
                  </Link>
                  <Separator orientation="vertical" className="h-full" />
                  <DeletePatientDialog 
                    patientId={patient.id} 
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
  );
}
