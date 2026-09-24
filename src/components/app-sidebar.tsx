"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"

import { LayoutDashboard, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Define the clinic routes
const navItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    url: "/admin/patients",
    icon: Users,
  },
]

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: { name: string, email: string, avatar: string } }) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  
  // Pass the clinic branding as the team
  const clinicTeam = [
    {
      name: "Nabadiganta",
      plan: "Homeo Darpan",
      logo: <div className="h-4 w-4 rounded-full bg-white opacity-80" />
    }
  ]

  return (
    <Sidebar collapsible="icon" {...props} className="print:hidden">
      <SidebarHeader>
        <TeamSwitcher teams={clinicTeam} />
      </SidebarHeader>
      <SidebarContent>
        {/* Simplified Nav menu for flat routes */}
        <SidebarMenu className="px-2 mt-4 gap-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.url)
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  render={<Link href={item.url} onClick={() => setOpenMobile(false)} />} 
                  tooltip={item.title} 
                  isActive={isActive} 
                  className={`font-medium h-10 px-4 group-data-[collapsible=icon]:!p-1.5 transition-colors [&>svg]:size-5 ${
                    isActive 
                      ? "!bg-primary !text-primary-foreground hover:!bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="shrink-0" />
                  <span className="text-base">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mb-3">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
