import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminNavbar } from "@/components/layout/admin-navbar";
import { Separator } from "@/components/ui/separator";
import { FadeIn, SlideLeft } from "@/components/animations/motion-wrapper";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-muted/30 p-0 md:p-4 gap-0 md:gap-4">
      <SlideLeft delay={0.1} className="hidden lg:block h-full w-64 shrink-0">
        <AdminSidebar />
      </SlideLeft>
      <FadeIn delay={0.2} className="flex-1 flex flex-col min-w-0 bg-background md:rounded-2xl border-none md:border md:border-border/60 shadow-none md:shadow-sm overflow-hidden">
        <AdminNavbar />

        <main className="flex-1 overflow-auto p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </FadeIn>
    </div>
  );
}
