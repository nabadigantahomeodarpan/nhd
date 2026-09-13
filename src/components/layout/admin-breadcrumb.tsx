"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export function AdminBreadcrumb() {
  const pathname = usePathname();
  
  // Create path segments, e.g., "/admin/patients/123" -> ["admin", "patients", "123"]
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;

  return (
    <div className="flex items-center text-sm text-muted-foreground min-w-0 overflow-hidden">
      <span className="mx-1.5 shrink-0">/</span>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        return (
          <Fragment key={index}>
            <span className={cn(
              isLast ? "text-foreground font-medium" : "hidden sm:inline-block",
              "max-w-[100px] xs:max-w-[150px] sm:max-w-none truncate inline-block align-bottom shrink min-w-0"
            )}>
              {segment}
            </span>
            {!isLast && <span className="mx-1.5 hidden sm:inline-block shrink-0">/</span>}
          </Fragment>
        );
      })}
    </div>
  );
}
