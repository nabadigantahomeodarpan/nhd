"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NewPatientDialog } from "./new-patient-dialog";
import { ExistingPatientDialog } from "./existing-patient-dialog";

export function AddPatientMenu() {
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isExistingPatientOpen, setIsExistingPatientOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button className="h-10 px-6 gap-2 shrink-0 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline-block">Add Patient</span>
          </Button>
        } />
        <DropdownMenuContent align="end" className="w-64" sideOffset={8}>
          <div className="px-2 py-2 text-sm font-semibold text-primary">Add Patient</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer py-3" 
            onClick={() => setIsNewPatientOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">New Patient</span>
              <span className="text-xs text-muted-foreground whitespace-normal">
                Add a new patient record and their first visit
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer py-3" 
            onClick={() => setIsExistingPatientOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">Existing Patient</span>
              <span className="text-xs text-muted-foreground whitespace-normal">
                Add a new visit for a returning patient
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NewPatientDialog 
        open={isNewPatientOpen} 
        onOpenChange={setIsNewPatientOpen} 
      />
      <ExistingPatientDialog 
        open={isExistingPatientOpen} 
        onOpenChange={setIsExistingPatientOpen} 
      />
    </>
  );
}
