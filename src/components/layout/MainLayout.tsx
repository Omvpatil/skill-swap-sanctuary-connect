
import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  Trophy, 
  Users, 
  Search,
  User,
  Settings
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  
  const menuItems = [
    { title: "Home", icon: Home, path: "/", notifications: 0 },
    { title: "Skills", icon: GraduationCap, path: "/skills", notifications: 0 },
    { title: "Messages", icon: MessageSquare, path: "/messages", notifications: 5 },
    { title: "Calendar", icon: Calendar, path: "/calendar", notifications: 2 },
    { title: "Community", icon: Users, path: "/community", notifications: 0 },
    { title: "Achievements", icon: Trophy, path: "/achievements", notifications: 0 },
  ];

  const utilityItems = [
    { title: "Search", icon: Search, path: "/search", notifications: 0 },
    { title: "Profile", icon: User, path: "/profile", notifications: 0 },
    { title: "Settings", icon: Settings, path: "/settings", notifications: 0 },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        className={location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <Link to={item.path} className="relative">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                          {item.notifications > 0 && (
                            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent p-0 text-[10px]">
                              {item.notifications}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {utilityItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        className={location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="flex items-center gap-2 p-2 text-xs text-sidebar-foreground/60">
              <div className="avatar-anonymous rounded-full h-8 w-8 flex items-center justify-center">
                <span>AS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Anonymous Student</span>
                <span>Campus ID: #42069</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Skill Swap Sanctuary</h1>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
