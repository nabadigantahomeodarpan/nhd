"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const activeTeam = teams[0]
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="hover:bg-transparent cursor-default h-10 px-4 group-data-[collapsible=icon]:!p-0.5"
        >
          <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            {activeTeam.logo}
          </div>
          <div className="grid flex-1 text-left leading-tight ml-1">
            <span className="truncate font-bold font-sans text-base">{activeTeam.name}</span>
            <span className="truncate text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
