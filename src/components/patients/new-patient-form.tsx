"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema, PatientInput } from "@/schemas/patient-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "cn";

interface NewPatientFormProps {
  onSubmit: (data: PatientInput) => Promise<void>;
  isPending: boolean;
  onCancel: () => void;
}

export function NewPatientForm({ onSubmit, isPending, onCancel }: NewPatientFormProps) {
  const form = useForm<PatientInput>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      mobile: "",
      registrationDate: new Date(),
      visits: [
        {
          visitDate: new Date(),
          medicines: "",
        },
      ],
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form id="new-patient-form" onSubmit={handleSubmit} className="space-y-6">
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          {/* Patient Information Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-primary">Patient Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="registrationDate">Date</Label>
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
                {form.formState.errors.registrationDate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.registrationDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Rahul Kumar"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="mobile">Mobile Number (Optional)</Label>
                <Input
                  id="mobile"
                  placeholder="9876543210"
                  maxLength={10}
                  {...form.register("mobile")}
                />
                {form.formState.errors.mobile && (
                  <p className="text-sm text-destructive">{form.formState.errors.mobile.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* First Visit Section */}
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4 text-primary">Visit 1</h3>
            <div className="p-6 border border-border/60 rounded-2xl bg-muted/10 space-y-4 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="visitDate">Visit Date</Label>
                <Controller
                  control={form.control}
                  name="visits.0.visitDate"
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
                {form.formState.errors.visits?.[0]?.visitDate && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.visits[0]?.visitDate?.message}
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
                  {...form.register("visits.0.medicines")}
                />
                {form.formState.errors.visits?.[0]?.medicines && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.visits[0]?.medicines?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end gap-2 pt-6 border-t border-border/60">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending} className="h-11 px-6 rounded-xl">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="h-11 px-8 rounded-xl font-medium">
          {isPending ? "Creating patient..." : "Save Patient"}
        </Button>
      </div>
    </form>
  );
}
