"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

export function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client to avoid hydration mismatch
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    // Return a placeholder with the same height to avoid layout shift during hydration
    return (
      <div className="flex h-9 w-full items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs sm:text-sm text-muted-foreground opacity-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-8 w-full items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs sm:text-sm text-foreground shadow-sm whitespace-nowrap">
      <span className="font-medium">{format(time, "dd MMMM yyyy")}</span>
      <span className="mx-2 text-muted-foreground">|</span>
      <span className="font-medium">{format(time, "hh:mm a")}</span>
    </div>
  );
}
