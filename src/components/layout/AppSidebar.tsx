// AppSidebar.tsx
import { NavLink, useLocation } from "react-router-dom";
import { Activity, Bed, Droplets, Users, BarChart3, Home, UserPlus, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patient Admission", url: "/admission", icon: UserPlus },
  { title: "Bed Management", url: "/beds", icon: Bed },
  { title: "Blood Bank", url: "/blood-bank", icon: Droplets },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function AppSidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen transition-all duration-500 flex flex-col overflow-hidden",
        "bg-gradient-to-b from-white/95 via-white/90 to-mint-50/95",
        "backdrop-blur-xl border-r border-white/20 shadow-2xl",
        isCollapsed ? "w-21" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20 flex items-center justify-between backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                SHBMS
              </h2>
              <p className="text-xs text-gray-500 font-medium">Smart Hospital Management</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-emerald-100/50 rounded-xl p-2"
        >
          {isCollapsed ? <Menu className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-emerald-600" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">
        {navigationItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={cn(
              "flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 relative",
              isActive(item.url)
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "text-gray-600 hover:text-emerald-700 hover:bg-white/70"
            )}
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/20">
        {!isCollapsed ? (
          <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">Dr. Admin</p>
              <p className="text-xs text-gray-500 truncate">System Administrator</p>
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4 text-emerald-600" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" className="w-full p-3">
            <Users className="w-5 h-5 text-emerald-600" />
          </Button>
        )}
      </div>
    </div>
  );
}
