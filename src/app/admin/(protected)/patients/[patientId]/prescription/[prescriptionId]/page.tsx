import { getPatientById } from "@/lib/patients/patient-service";
import { notFound } from "next/navigation";
import { PrescriptionActionsHeader } from "@/components/patients/prescription-actions-header";
import { format } from "date-fns";
import { prisma } from "@/lib/db/prisma";
import { PrescriptionDocumentScaler } from "@/components/patients/prescription-document-scaler";

export const metadata = {
  title: "Prescription | Nabadiganta Homeo Darpan",
};

interface PrescriptionPageProps {
  params: Promise<{ patientId: string, prescriptionId: string }>;
}

export default async function PrescriptionPage({ params }: PrescriptionPageProps) {
  const resolvedParams = await params;
  
  // Verify the prescription exists
  const prescription = await prisma.prescription.findUnique({
    where: { id: resolvedParams.prescriptionId },
  });

  if (!prescription) {
    notFound();
  }

  const patient = await getPatientById(resolvedParams.patientId);

  if (!patient) {
    notFound();
  }

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-6 min-h-screen print:p-0 print:m-0 print:min-h-0">
      <PrescriptionActionsHeader 
        patientId={patient.patientId} 
        prescriptionId={resolvedParams.prescriptionId} 
      />

      <PrescriptionDocumentScaler>
        
        {/* Visual Frame for Screen */}
        <div className="bg-white shadow-xl overflow-hidden print:shadow-none border border-gray-200 print:border-none relative">
          
          {/* Custom Size Content */}
          <div 
            id="prescription-content"
            className="flex flex-col"
            style={{
              width: '14.8cm',
              height: '21cm',
              paddingTop: '4cm',
              paddingBottom: '2cm',
              paddingLeft: '1cm',
              paddingRight: '1cm',
              backgroundColor: '#ffffff', // Background color, will be overlaid by image if added
              backgroundImage: "url('/prescription-bg.png')", // Ready for user's uploaded background
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              boxSizing: 'border-box'
            }}
          >
            {/* First Row: Name, Age, Sex */}
            <div className="grid grid-cols-[1fr_auto_100px] gap-2 mb-4 text-[13px]">
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-800 whitespace-nowrap">Name :</span>
                <span className="border-b border-black w-full text-gray-900 pb-0.5">{patient.name}</span>
              </div>
              <div className="flex items-end gap-2 w-[100px]">
                <span className="font-bold text-gray-800 whitespace-nowrap">Age :</span>
                <span className="border-b border-black w-full text-center text-gray-900 pb-0.5">{patient.age || ""}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-800 whitespace-nowrap">Sex :</span>
                <span className="border-b border-black w-full text-center text-gray-900 pb-0.5">{patient.gender || ""}</span>
              </div>
            </div>

            {/* Second Row: Mobile No, Patient Id, Date */}
            <div className="grid grid-cols-[1fr_auto_120px] gap-2 mb-4 text-[13px]">
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-800 whitespace-nowrap">Mobile No. :</span>
                <span className="border-b border-black w-full text-gray-900 pb-0.5">{patient.mobile || ""}</span>
              </div>
              <div className="flex items-end gap-2 w-[160px]">
                <span className="font-bold text-gray-800 whitespace-nowrap">Patient Id :</span>
                <span className="border-b border-black w-full text-center text-gray-900 pb-0.5">{patient.patientId}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-800 whitespace-nowrap">Date :</span>
                <span className="border-b border-black w-full text-center text-gray-900 pb-0.5">{format(new Date(), "dd/MM/yyyy")}</span>
              </div>
            </div>

            {/* Horizontal Lines */}
            <div className="w-full border-b-[3px] border-black mb-[2px] mt-2 shrink-0"></div>
            <div className="w-full border-b border-black shrink-0"></div>

            {/* Prescription Body Area */}
            <div className="flex-1 relative w-full">
              {/* Vertical Line */}
              {/* 6cm from page left edge = 5cm from content left edge (since padding-left is 1cm) */}
              <div className="absolute top-0 bottom-0 w-[1px] bg-black" style={{ left: '5cm' }}></div>

              {/* Left Side Short Horizontal Line (5.5cm down) */}
              <div className="absolute h-[1px] bg-black" style={{ top: '5.5cm', left: 0, width: '5cm' }}></div>

              {/* Left Side Content (Advice and Signs & Symptoms) */}
              <div className="absolute top-0 left-0 bottom-0" style={{ width: '5cm' }}>
                {/* Top Left Container (Above 5.5cm line) */}
                <div className="p-2 pt-4" style={{ height: '5.5cm' }}>
                  <span className="font-bold text-[14px] text-gray-800 whitespace-nowrap">Advice :-</span>
                </div>
                {/* Bottom Left Container (Below 5.5cm line) */}
                <div className="p-2 pt-4">
                  <span className="font-bold text-[14px] text-gray-800 whitespace-nowrap">Signs & Symptoms :-</span>
                </div>
              </div>

              {/* Rx and Medicines placed on the right side of the vertical line */}
              <div className="absolute top-0 right-0 bottom-0 overflow-hidden" style={{ left: '5.2cm' }}>
                <div className="px-2 pt-4 pb-2">
                  <h2 className="text-2xl font-bold font-[family-name:--font-playfair] italic mb-4" style={{ color: '#1f2937' }}>Rx</h2>
                  
                  {/* Content left intentionally blank for manual handwriting by admin/doctor */}
                </div>
              </div>
            </div>
            </div>
          </div>
        </PrescriptionDocumentScaler>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          @page {
            size: 14.8cm 21cm;
            margin: 0;
          }
        }
      `}} />
    </main>
  );
}
// Forced recompile to clear Turbopack cache
