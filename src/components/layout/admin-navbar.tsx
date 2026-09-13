import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/actions/auth-actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export async function AdminNavbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const email = user?.email || "admin@nabadiganta.com";
  const initials = email.substring(0, 2).toUpperCase();

  return (
    <header className="flex h-[88px] shrink-0 items-center justify-between px-6 lg:px-8 bg-background/90 backdrop-blur-md border-b border-border/60 sticky top-0 z-30">
      <div className="flex items-center gap-2 md:gap-4">
        <MobileSidebar />
        <AdminBreadcrumb />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        
        <div className="h-8 w-px bg-border/60 mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="outline" className="relative h-11 rounded-full pl-1.5 pr-4 flex items-center gap-2.5 border-border/60 hover:bg-primary/5 hover:border-primary/20 transition-all shadow-sm bg-background">
              <Avatar className="h-8 w-8 border-none shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-foreground">Admin</span>
            </Button>
          } />
          <DropdownMenuContent className="w-56 rounded-2xl p-2 border-border/60 shadow-lg mt-2" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Administrator</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<form action={logoutAction} className="w-full cursor-pointer" />} className="rounded-xl p-3 focus:bg-red-50 focus:text-red-600 transition-colors">
                <button type="submit" className="flex w-full items-center text-red-600 font-medium">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


