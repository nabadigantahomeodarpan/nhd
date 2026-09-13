"use client";

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
import { cn } from "cn";

interface PatientFormProps {
  initialData?: Partial<PatientInput>;
  onSubmit: (data: PatientInput) => Promise<void>;
  isPending: boolean;
  onCancel: () => void;
}

export function PatientForm({ initialData, onSubmit, isPending, onCancel }: PatientFormProps) {
  const form = useForm<PatientInput>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData || {
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
                placeholder="9876543210"
                maxLength={10}
                {...form.register("mobile")}
              />
              {form.formState.errors.mobile && (
                <p className="text-sm text-destructive">{form.formState.errors.mobile.message}</p>
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
                        onClick={() => remove(index)}
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
    </form>
  );
}
