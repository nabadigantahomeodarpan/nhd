"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export function PrescriptionActionsHeader({ patientId, prescriptionId }: { patientId: string, prescriptionId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const generatePDF = async () => {
    const htmlToImage = await import('html-to-image');
    const element = document.getElementById('prescription-content');
    
    if (!element) {
      throw new Error("Content not found");
    }

    const dataUrl = await htmlToImage.toPng(element, { 
      quality: 1, 
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    });
    
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'cm',
      format: [14.8, 21]
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, 14.8, 21);
    return pdf;
  };

  const handlePrint = async () => {
    setIsProcessing(true);
    toast.info("Preparing Print...");
    try {
      const pdf = await generatePDF();
      pdf.autoPrint();
      
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      
      const printWindow = window.open(blobUrl, '_blank');
      if (!printWindow) {
        toast.warning("Please allow popups to print");
      }
    } catch (error) {
      console.error("Print generation failed:", error);
      toast.error("Failed to prepare print");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    toast.info("Generating PDF...");
    
    try {
      const pdf = await generatePDF();
      pdf.save(`Prescription_${patientId}.pdf`);
      toast.success("Prescription downloaded as PDF successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 print:hidden">
      <Link href="/admin/patients" className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground h-11 px-5 rounded-xl shadow-sm bg-background/50 backdrop-blur-sm border border-border/60 hover:bg-muted/50 transition-colors w-full sm:w-auto">
        <ArrowLeft className="h-4 w-4" />
        <span className="font-medium">Back to Patients</span>
      </Link>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Button 
          variant="outline" 
          onClick={handlePrint}
          disabled={isProcessing}
          className="h-11 px-5 rounded-xl gap-2 shadow-sm border-border/60 hover:bg-primary/5 hover:text-primary transition-all w-full sm:w-auto"
        >
          <Printer className="h-4 w-4" />
          <span>{isProcessing ? "Processing..." : "Print"}</span>
        </Button>
        <Button 
          onClick={handleDownload}
          disabled={isProcessing}
          className="h-11 px-5 rounded-xl gap-2 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground transition-all w-full sm:w-auto"
        >
          <ArrowDownToLine className="h-4 w-4" />
          <span>{isProcessing ? "Processing..." : "Download"}</span>
        </Button>
      </div>
    </div>
  );
}
