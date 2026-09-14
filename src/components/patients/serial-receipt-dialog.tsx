"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { useRef } from "react";

interface SerialReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    patientId: string;
    patientName: string;
    visitNumber: number;
    dailySerialNumber: number;
    visitDate: Date;
  };
}

export function SerialReceiptDialog({ open, onOpenChange, data }: SerialReceiptDialogProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // Basic print functionality
    // In a real application, you might use a library like react-to-print
    // or send raw commands to a thermal printer via an API.
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    
    // Create a temporary container for printing
    const printContainer = document.createElement('div');
    printContainer.innerHTML = printContent;
    
    // Add print styles
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        .print-area, .print-area * { visibility: visible; }
        .print-area { position: absolute; left: 0; top: 0; width: 100%; }
      }
    `;
    
    document.head.appendChild(style);
    printContainer.className = 'print-area';
    document.body.appendChild(printContainer);
    
    window.print();
    
    // Cleanup
    document.body.removeChild(printContainer);
    document.head.removeChild(style);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">Success</DialogTitle>
          <DialogDescription className="text-center">
            Patient visit created successfully.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center py-4">
          <div 
            ref={printRef}
            className="border-2 border-dashed border-border rounded-lg p-6 w-64 flex flex-col items-center bg-card text-card-foreground font-mono"
          >
            <h3 className="font-bold text-lg text-center leading-tight mb-4">
              NABADIGANTA
              <br />
              <span className="text-sm font-normal">HOMOEO DARPAN</span>
            </h3>
            
            <div className="w-full text-sm space-y-1 mb-4 border-b pb-4">
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{format(data.visitDate, "dd MMM yyyy")}</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm font-bold uppercase">SERIAL NO</p>
              <p className="text-5xl font-black">{data.dailySerialNumber}</p>
            </div>

            <div className="w-full text-sm space-y-2 border-t pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Patient ID</p>
                <p className="font-semibold">{data.patientId}</p>
              </div>
              <div>
                <p className="font-semibold">{data.patientName}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-muted-foreground">Visit:</span>
                <span className="font-bold">{data.visitNumber}</span>
              </div>
            </div>
            
            <div className="mt-6 text-center w-full border-t border-dashed pt-4">
              <p className="text-xs font-semibold">Please wait for your turn.</p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center flex-row gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="button" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print Serial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
