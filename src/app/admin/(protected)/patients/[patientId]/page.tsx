import { getPatientById } from "@/lib/patients/patient-service";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Phone, User } from "lucide-react";
import Link from "next/link";
import { EditPatientDialog } from "@/components/patients/edit-patient-dialog";
import { DeletePatientDialog } from "@/components/patients/delete-patient-dialog";

export const metadata = {
  title: "Patient Profile | Nabadiganta Homeo Darpan",
};

interface PatientProfilePageProps {
  params: Promise<{ patientId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PatientProfilePage({ params, searchParams }: PatientProfilePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const patient = await getPatientById(resolvedParams.patientId);

  if (!patient) {
    notFound();
  }

  const isEditMode = resolvedSearchParams.edit === "true";

  // Prepare initial data for the edit form
  const initialData = {
    id: patient.id,
    name: patient.name,
    mobile: patient.mobile,
    registrationDate: patient.registrationDate,
    visits: patient.visits.map(v => ({
      id: v.id,
      visitDate: v.visitDate,
      medicines: v.medicines,
    })),
  };

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4 md:space-y-6">
      <div className="flex items-center mb-6 md:mb-8">
        <Link href="/admin/patients" className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground h-11 px-5 rounded-xl shadow-sm bg-background/50 backdrop-blur-sm border border-border/60 hover:bg-muted/50 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Patients</span>
        </Link>
      </div>

      <div className="bg-card rounded-2xl border border-border/60 shadow-sm flex flex-col p-6 md:p-8 space-y-6 md:space-y-8">
        {/* Patient Details Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-primary font-[family-name:--font-playfair] italic">
                {patient.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1.5">
                Patient Profile & Details
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm md:text-base text-muted-foreground mt-2">
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                <User className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{patient.patientId}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/60">
                <Phone className="h-4 w-4 text-foreground/70" />
                <span className="font-medium text-foreground">{patient.mobile || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border/60">
                <Calendar className="h-4 w-4 text-foreground/70" />
                <span className="font-medium text-foreground">{format(patient.registrationDate, "dd MMMM yyyy")}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <EditPatientDialog 
              patientId={patient.id} 
              initialData={initialData} 
              defaultOpen={isEditMode}
            />
            <DeletePatientDialog patientId={patient.id} />
          </div>
        </div>

        <hr className="border-border/60" />

        {/* Visit History */}
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-xl md:text-2xl font-semibold text-primary tracking-tight font-[family-name:--font-playfair] italic">
            Visit History
          </h2>
          
          <div className="space-y-6 md:space-y-8">
            {patient.visits.map((visit, index) => (
              <div key={visit.id} className="relative flex gap-4 md:gap-6 group">
                {/* Timeline Tree Line & Dot */}
                <div className="relative flex flex-col items-center">
                  <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-primary rounded-full ring-4 ring-background shadow-sm z-10 mt-6 group-hover:scale-125 transition-transform duration-300" />
                  {index !== patient.visits.length - 1 && (
                    <div className="absolute top-10 bottom-[-24px] md:bottom-[-32px] w-[2px] bg-primary/20" />
                  )}
                </div>
                
                {/* Content Card */}
                <div className="flex-1 bg-background rounded-2xl p-4 sm:p-6 border border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-primary font-[family-name:--font-playfair] italic">
                      Visit {visit.visitNumber}
                    </h3>
                    <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                      {format(visit.visitDate, "dd MMMM yyyy")}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base text-foreground whitespace-pre-wrap leading-relaxed">
                    {visit.medicines || <span className="text-muted-foreground italic">No medicines or treatment notes recorded.</span>}
                  </div>
                </div>
              </div>
            ))}
            
            {patient.visits.length === 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground italic">
                No visits recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
