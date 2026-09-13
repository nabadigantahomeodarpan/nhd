"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { logoutAction } from "@/actions/auth-actions";
import { adminRoutes } from "@/components/layout/admin-sidebar";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sidebarContent = (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/50 lg:hidden transition-opacity backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sliding Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-[9999] w-72 bg-card border-r border-border/60 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-20 flex items-center justify-between px-8 shrink-0 border-b border-border/40">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary leading-none font-[family-name:--font-playfair] italic">
              Nabadiganta
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Homeo Darpan</p>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="grid gap-2 px-6">
            {adminRoutes.map((route) => {
              const isActive = pathname.startsWith(route.href);
              return (
                <Link href={route.href} key={route.href} className="w-full" onClick={toggleSidebar}>
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
    </>
  );

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden" 
        onClick={toggleSidebar}
        aria-label="Open sidebar menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {mounted && createPortal(sidebarContent, document.body)}
    </>
  );
}
