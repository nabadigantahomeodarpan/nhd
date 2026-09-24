"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronsUpDownIcon, SparklesIcon, BadgeCheckIcon, CreditCardIcon, BellIcon, LogOutIcon } from "lucide-react"
import { logoutAction } from "@/actions/auth-actions"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : "AD"
  
  return (
    <SidebarMenu className="bg-muted p-2 rounded-md">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton className="h-10 px-4 group-data-[collapsible=icon]:!p-0.5 hover:bg-muted transition-colors aria-expanded:bg-muted" />
            }
          >
            <Avatar className="h-7 w-7 rounded-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-md">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight ml-1">
              <span className="truncate font-medium text-base">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<form action={logoutAction} className="w-full cursor-pointer" />}>
              <button type="submit" className="flex w-full items-center text-red-600 font-medium">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
