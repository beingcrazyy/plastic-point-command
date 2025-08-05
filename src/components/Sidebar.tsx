import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Gift, 
  Settings,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  Recycle,
  LogOut,
  Gamepad2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Stores", href: "/stores", icon: Store },
  { name: "Rewards", href: "/rewards", icon: Gift },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "Plastic Rates", href: "/rates", icon: Recycle },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-gradient-to-b from-card to-muted/30 border-r border-border shadow-xl transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 -translate-x-full data-[state=open]:translate-x-0 flex flex-col" data-state={isMobileOpen ? "open" : "closed"}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border bg-card/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Plasty-Pesa</h1>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users, stores..."
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
}