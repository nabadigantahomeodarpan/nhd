import Link from "next/link";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PatientBasic {
  id: string;
  patientId: string;
  name: string;
  mobile: string;
  registrationDate: Date;
}

interface VisitBasic {
  id: string;
  dailySerialNumber: number | null;
  patient: {
    id: string;
    patientId: string;
    name: string;
    mobile: string;
  };
}

interface DashboardTablesProps {
  recentPatients: PatientBasic[];
  todayQueue: VisitBasic[];
}

export function DashboardTables({ recentPatients, todayQueue }: DashboardTablesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
      
      {/* All Patients List (Recent) */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Recently <span className="font-[family-name:--font-playfair] italic text-primary">Registered</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Latest patients added to the system</p>
          </div>
          <div className="shrink-0">
            <Link href="/admin/patients" className="flex items-center text-xs text-primary hover:text-primary hover:underline px-3 py-1.5 rounded-md hover:bg-accent transition-colors">
              View All <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        
        <div className="rounded-xl border border-border/60 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-1/3 text-xs font-semibold">Patient ID</TableHead>
                <TableHead className="w-1/3 text-xs font-semibold">Name</TableHead>
                <TableHead className="w-1/3 text-xs font-semibold">Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPatients.length > 0 ? (
                recentPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-muted/10">
                    <TableCell className="font-medium text-xs w-1/3">
                      <Link href={`/admin/patients/${patient.id}`} className="hover:underline text-primary">
                        {patient.patientId}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs truncate w-1/3">
                      <Link href={`/admin/patients/${patient.id}`} className="hover:underline">
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground w-1/3">
                      {patient.mobile || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-sm text-muted-foreground">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Today's <span className="font-[family-name:--font-playfair] italic text-primary">Appointments</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">Live queue for today's visits</p>
          </div>
          <div className="shrink-0">
            <Link href="/admin/patients?tab=queue" className="flex items-center text-xs text-primary hover:text-primary hover:underline px-3 py-1.5 rounded-md hover:bg-accent transition-colors">
              View Queue <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        
        <div className="rounded-xl border border-border/60 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-1/3 text-xs font-semibold text-center">Token No.</TableHead>
                <TableHead className="w-1/3 text-xs font-semibold">Name</TableHead>
                <TableHead className="w-1/3 text-xs font-semibold">Mobile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayQueue.length > 0 ? (
                todayQueue.map((visit) => (
                  <TableRow key={visit.id} className="hover:bg-muted/10">
                    <TableCell className="w-1/3 font-bold text-xs text-center text-muted-foreground">
                      {visit.dailySerialNumber || "-"}
                    </TableCell>
                    <TableCell className="w-1/3 text-xs font-medium truncate">
                      <Link href={`/admin/patients/${visit.patient.id}`} className="hover:underline">
                        {visit.patient.name}
                      </Link>
                    </TableCell>
                    <TableCell className="w-1/3 text-xs text-muted-foreground">
                      {visit.patient.mobile || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-sm text-muted-foreground">
                    No appointments scheduled for today.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
}
