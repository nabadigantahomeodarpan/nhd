import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  const user = {
    name: "Administrator",
    email: authUser?.email || "admin@nabadiganta.com",
    avatar: "",
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="print:!bg-white print:!border-none print:!rounded-none print:!shadow-none print:m-0 print:p-0">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b print:hidden">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4 my-auto" />
              <AdminBreadcrumb />
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 lg:p-10 print:p-0 print:m-0 print:overflow-visible">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
