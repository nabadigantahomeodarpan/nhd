"use client";

import { generatePrescriptionAction } from "@/actions/prescription-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Loader2 } from "lucide-react";

export default function GeneratePrescriptionPage({ params }: { params: Promise<{ patientId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const generate = async () => {
      try {
        const result = await generatePrescriptionAction(resolvedParams.patientId);
        if (isMounted) {
          if (result.success && result.prescriptionId) {
            router.replace(`/admin/patients/${resolvedParams.patientId}/prescription/${result.prescriptionId}`);
          } else {
            setError(result.error || "Failed to generate prescription");
          }
        }
      } catch (e) {
        if (isMounted) setError("Something went wrong");
      }
    };
    
    generate();
    
    return () => { isMounted = false; };
  }, [resolvedParams.patientId, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-xl font-medium text-destructive">Failed to generate prescription</div>
        <p className="text-muted-foreground">{error}</p>
        <button onClick={() => router.back()} className="text-primary hover:underline">Go Back</button>
      </div>
    );
  }

  // The loading UI is now rendered here directly since it's a client component handling the delay
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
      </div>
      <div className="flex items-center space-x-1 text-2xl font-semibold tracking-tight text-primary font-[family-name:--font-playfair] italic">
        <span>Generating Prescription</span>
        <span className="flex space-x-1">
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
        </span>
      </div>
      <p className="text-muted-foreground text-sm max-w-sm text-center">
        Please wait while we prepare the prescription document with the patient's visit history and details.
      </p>
    </div>
  );
}
