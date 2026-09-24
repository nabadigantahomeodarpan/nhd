"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema, PatientInput } from "@/schemas/patient-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Plus, Trash2, CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PatientFormProps {
  initialData?: Partial<PatientInput>;
  onSubmit: (data: PatientInput) => Promise<void>;
  isPending: boolean;
  onCancel: () => void;
}

export function PatientForm({ initialData, onSubmit, isPending, onCancel }: PatientFormProps) {
  const [visitToDelete, setVisitToDelete] = useState<number | null>(null);

  const form = useForm<PatientInput>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData || {
      name: "",
      mobile: "",
      age: "",
      gender: "",
      registrationDate: new Date(),
      visits: [
        {
          visitDate: new Date(),
          medicines: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "visits",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form id="patient-form" onSubmit={handleSubmit} className="space-y-6">
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Registration Date</Label>
              <Controller
                control={form.control}
                name="registrationDate"
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
                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                      </Button>
                    } />
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {form.formState.errors.registrationDate && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.registrationDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input
                id="name"
                placeholder="Rahul Kumar"
                autoComplete="name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="9876543210"
                maxLength={10}
                {...form.register("mobile")}
              />
              {form.formState.errors.mobile && (
                <p className="text-sm text-destructive">{form.formState.errors.mobile.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (Optional)</Label>
              <Input
                id="age"
                placeholder="e.g. 35 or 10 months"
                {...form.register("age")}
              />
              {form.formState.errors.age && (
                <p className="text-sm text-destructive">{form.formState.errors.age.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Sex (Optional)</Label>
              <Controller
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <SelectTrigger className="w-full !h-11 rounded-xl px-4 bg-background border-input hover:bg-muted/50 transition-colors">
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl p-1 border-border/60 shadow-lg">
                      <SelectItem value="Male" className="py-2.5 px-3 rounded-lg cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
                        <div className="flex items-center gap-2.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="10" cy="14" r="5"/><line x1="13.54" y1="10.46" x2="21" y2="3"/><line x1="16" y1="3" x2="21" y2="3"/><line x1="21" y1="8" x2="21" y2="3"/></svg>
                          <span className="font-medium text-foreground">Male</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Female" className="py-2.5 px-3 rounded-lg cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
                        <div className="flex items-center gap-2.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><circle cx="12" cy="10" r="5"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="9" y1="19" x2="15" y2="19"/></svg>
                          <span className="font-medium text-foreground">Female</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.gender && (
                <p className="text-sm text-destructive">{form.formState.errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Visits</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ visitDate: new Date(), medicines: "" })}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Visit
              </Button>
            </div>

            {form.formState.errors.visits?.root && (
              <p className="text-sm text-destructive">
                {form.formState.errors.visits.root.message}
              </p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-6 border border-border/60 rounded-2xl bg-muted/10 space-y-4 relative shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm text-primary">Visit {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setVisitToDelete(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {/* Hidden ID field for existing visits */}
                  <input type="hidden" {...form.register(`visits.${index}.id`)} />

                  <div className="space-y-2">
                    <Label htmlFor={`visits.${index}.visitDate`}>Visit Date</Label>
                    <Controller
                      control={form.control}
                      name={`visits.${index}.visitDate`}
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
                              {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                            </Button>
                          } />
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {form.formState.errors.visits?.[index]?.visitDate && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.visits[index]?.visitDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`visits.${index}.medicines`}>Medicines / Treatment Notes</Label>
                    <Textarea
                      id={`visits.${index}.medicines`}
                      placeholder="Enter medicines given or treatment notes..."
                      rows={3}
                      className="resize-none rounded-xl p-4 min-h-[120px]"
                      {...form.register(`visits.${index}.medicines`)}
                    />
                    {form.formState.errors.visits?.[index]?.medicines && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.visits[index]?.medicines?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end gap-2 pt-6 border-t border-border/60">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending} className="h-11 px-6 rounded-xl">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="h-11 px-8 rounded-xl font-medium">
          {isPending ? "Saving..." : "Save Patient"}
        </Button>
      </div>

      <Dialog open={visitToDelete !== null} onOpenChange={(open) => !open && setVisitToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Visit</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this visit from the patient record? This action cannot be undone once saved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setVisitToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              if (visitToDelete !== null) {
                remove(visitToDelete);
                setVisitToDelete(null);
              }
            }}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
