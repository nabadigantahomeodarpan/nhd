"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logoutAction } from "@/actions/auth-actions";

export const adminRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Patients",
    icon: Users,
    href: "/admin/patients",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
      <div className="pt-10 pb-6 flex flex-col justify-center px-8 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-primary leading-none">
          Nabadiganta
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Homeo Darpan</p>
      </div>
      
      <div className="px-4">
        <Separator />
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="grid gap-2 px-6">
          {adminRoutes.map((route) => {
            const isActive = pathname.startsWith(route.href);
            return (
              <Link href={route.href} key={route.href} className="w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-4 h-11 text-base rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-sm font-medium"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary font-normal"
                  )}
                >
                  <route.icon className="h-5 w-5 shrink-0" />
                  <span>{route.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-6 shrink-0">
        <Separator className="bg-border/60" />
      </div>
      <div className="p-6 shrink-0">
        <form action={logoutAction}>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors h-11 text-base rounded-xl px-4" type="submit">
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Sign Out</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

