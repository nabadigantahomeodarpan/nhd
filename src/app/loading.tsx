import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-5 p-8 rounded-3xl bg-card/50 border border-border/40 shadow-2xl backdrop-blur-md">
        {/* Custom Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full border-4 border-primary/20" />
          <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          <Loader2 className="absolute w-5 h-5 text-primary animate-pulse" />
        </div>
        
        {/* Loading Text with Dots */}
        <div className="text-xl font-semibold text-primary font-[family-name:--font-playfair] italic flex items-end">
          Loading
          <span className="flex items-end mb-[2px] ml-1 gap-[2px]">
            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }} />
            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }} />
            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
