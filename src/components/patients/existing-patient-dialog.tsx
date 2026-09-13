"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, ChevronLeft, CheckCircle2 } from "lucide-react";
import { searchPatientsAction, createExistingVisitAction } from "@/actions/patient-actions";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { existingVisitSchema, ExistingVisitInput } from "@/schemas/patient-schema";
import { SerialReceiptDialog } from "./serial-receipt-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "cn";

interface ExistingPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExistingPatientDialog({ open, onOpenChange }: ExistingPatientDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  
  const [isPending, setIsPending] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);

  const form = useForm<ExistingVisitInput>({
    resolver: zodResolver(existingVisitSchema),
    defaultValues: {
      patientId: "",
      visitDate: new Date(),
      medicines: "",
    },
  });

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedPatient(null);
      form.reset({
        patientId: "",
        visitDate: new Date(),
        medicines: "",
      });
    }
  }, [open, form]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const result = await searchPatientsAction(searchQuery);
        if (result.success && result.patients) {
          setSearchResults(result.patients);
        } else {
          setSearchResults([]);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    form.setValue("patientId", patient.id);
  };

  const handleBackToSearch = () => {
    setSelectedPatient(null);
    form.setValue("patientId", "");
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);
    try {
      const result = await createExistingVisitAction(data) as any;
      if (result.error) {
        toast.error(result.error);
      } else if (result.success && result.visit) {
        toast.success("Visit added successfully.");
        onOpenChange(false);
        
        setReceiptData({
          patientId: result.patient.patientId,
          patientName: result.patient.name,
          visitNumber: result.visit.visitNumber,
          dailySerialNumber: result.visit.dailySerialNumber,
          visitDate: result.visit.visitDate,
        });
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsPending(false);
    }
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90dvh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Existing Patient</DialogTitle>
            <DialogDescription>
              Find an existing patient and add a new visit.
            </DialogDescription>
          </DialogHeader>

          {!selectedPatient ? (
            <div className="flex flex-col flex-1 gap-4 mt-4">
              <div className="relative shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by patient ID, name or mobile number..." 
                  className="pl-12 h-12 rounded-xl text-base shadow-sm bg-background border-border/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex-1 border-t pt-4">
                {isSearching ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map((patient) => {
                      const lastVisit = patient.visits?.[0];
                      return (
                        <div 
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient)}
                          className="p-5 border border-border/60 rounded-xl bg-card hover:border-primary/40 hover:shadow-md hover:bg-primary/5 transition-all cursor-pointer shadow-sm group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-primary text-lg group-hover:text-primary/80 transition-colors">{patient.patientId}</h4>
                              <p className="font-medium text-foreground text-base mt-0.5">{patient.name}</p>
                            </div>
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold">
                              Total Visits: {patient._count?.visits || 0}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t border-border/60">
                            <div className="bg-muted/30 p-2.5 rounded-lg">
                              <span className="font-semibold text-foreground text-xs uppercase tracking-wider block mb-1">Mobile</span>
                              <span className="font-medium">{patient.mobile || "Not provided"}</span>
                            </div>
                            <div className="bg-muted/30 p-2.5 rounded-lg">
                              <span className="font-semibold text-foreground text-xs uppercase tracking-wider block mb-1">Last Visit</span>
                              <span className="font-medium">{lastVisit ? format(new Date(lastVisit.visitDate), "dd MMM yyyy") : "None"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No patients found matching "{searchQuery}"
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Enter at least 2 characters to search.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToSearch}
                className="self-start -ml-2 mb-4 text-muted-foreground hover:text-foreground shrink-0"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Search
              </Button>

              <div className="space-y-6">
                {/* Selected Patient Summary */}
                <div className="bg-primary/5 border border-primary/30 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                  <CheckCircle2 className="absolute -top-4 -right-4 h-24 w-24 text-primary opacity-10" />
                  <h3 className="font-semibold text-xl text-primary mb-5 font-[family-name:--font-playfair] italic">Selected Patient</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm relative z-10">
                    <div className="bg-background/60 p-3 rounded-xl border border-primary/10 shadow-sm">
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1.5">Patient ID</p>
                      <p className="font-semibold text-base text-foreground">{selectedPatient.patientId}</p>
                    </div>
                    <div className="bg-background/60 p-3 rounded-xl border border-primary/10 shadow-sm">
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1.5">Name</p>
                      <p className="font-semibold text-base text-foreground truncate" title={selectedPatient.name}>{selectedPatient.name}</p>
                    </div>
                    <div className="bg-background/60 p-3 rounded-xl border border-primary/10 shadow-sm">
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1.5">Mobile</p>
                      <p className="font-semibold text-base text-foreground">{selectedPatient.mobile || "N/A"}</p>
                    </div>
                    <div className="bg-background/60 p-3 rounded-xl border border-primary/10 shadow-sm">
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1.5">Total Visits</p>
                      <p className="font-semibold text-base text-foreground">{selectedPatient._count?.visits || 0}</p>
                    </div>
                  </div>
                </div>

                {/* New Visit Form */}
                <form id="existing-visit-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="visitDate">Visit Date</Label>
                    <Controller
                        control={form.control}
                        name="visitDate"
                        render={({ field }) => (
                          <Popover>
                          <PopoverTrigger render={
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal h-11 rounded-xl px-4",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            } />
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {form.formState.errors.visitDate && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.visitDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicines">Medicine / Treatment Notes</Label>
                      <Textarea
                        id="medicines"
                        placeholder="Enter medicines given or treatment notes..."
                        rows={4}
                        className="resize-none rounded-xl p-4 min-h-[120px]"
                        {...form.register("medicines")}
                      />
                      {form.formState.errors.medicines && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.medicines.message}
                        </p>
                      )}
                    </div>
                  </form>
                </div>

              <div className="flex items-center justify-end gap-2 pt-6 border-t border-border/60 mt-auto">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending} className="h-11 px-6 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" form="existing-visit-form" disabled={isPending} className="h-11 px-8 rounded-xl font-medium">
                  {isPending ? "Adding visit..." : "Add Visit"}
                </Button>
              </div>
            </div>
          )}
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
