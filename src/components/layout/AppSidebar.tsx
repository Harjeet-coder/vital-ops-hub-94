import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  Bed,
  Droplets,
  Users,
  BarChart3,
  Settings,
  Home,
  UserPlus,
  Bell,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patient Admission", url: "/admission", icon: UserPlus },
  { title: "Bed Management", url: "/beds", icon: Bed },
  { title: "Blood Bank", url: "/blood-bank", icon: Droplets },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">SHBMS</h2>
              <p className="text-xs text-muted-foreground">Hospital Management</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-accent"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-medical group",
              isActive(item.url)
                ? "bg-primary text-primary-foreground shadow-medical"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              isActive(item.url) ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
            )} />
            {!isCollapsed && (
              <span className="truncate">{item.title}</span>
            )}
            {isActive(item.url) && !isCollapsed && (
              <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full pulse-indicator" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Dr. Admin</p>
              <p className="text-xs text-muted-foreground truncate">System Administrator</p>
            </div>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </div>
        ) : (
          <Button variant="ghost" size="sm" className="w-full">
            <Users className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}