"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

function formatSegment(segment: string, index: number, segments: string[]) {
  const knownSegments: Record<string, string> = {
    "admin": "Admin",
    "patients": "Patients",
    "prescription": "Prescription",
    "generate": "Generate",
    "settings": "Settings",
    "appointments": "Appointments",
    "dashboard": "Dashboard"
  };

  if (knownSegments[segment]) {
    return knownSegments[segment];
  }

  // If it looks like a CUID or UUID (long auto-generated ID)
  if (segment.length > 20) {
    if (segments[index - 1] === "patients") {
      return "Patient Details";
    }
    if (segments[index - 1] === "prescription") {
      return "View";
    }
    return `ID: ...${segment.slice(-5)}`;
  }

  // Fallback
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
}

export function AdminBreadcrumb() {
  const pathname = usePathname();
  
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-sm text-muted-foreground w-full">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const formattedSegment = formatSegment(segment, index, segments);
        
        return (
          <Fragment key={index}>
            <span className={cn(
              isLast ? "text-foreground font-medium" : "hover:text-foreground transition-colors",
              "truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none"
            )}>
              {formattedSegment}
            </span>
            {!isLast && <span className="shrink-0 text-muted-foreground/60">/</span>}
          </Fragment>
        );
      })}
    </div>
  );
}
