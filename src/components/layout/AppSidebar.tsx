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
      "h-screen transition-all duration-500 flex flex-col relative overflow-hidden",
      "bg-gradient-to-b from-white/95 via-white/90 to-mint-50/95",
      "backdrop-blur-xl border-r border-white/20 shadow-2xl",
      isCollapsed ? "w-20" : "w-72"
    )}>
      {/* Glassmorphism Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-mint-100/20 to-teal-50/30 -z-10" />
      
      {/* Header with Enhanced Styling */}
      <div className="p-6 border-b border-white/20 flex items-center justify-between backdrop-blur-sm">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
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
          className="btn-glassmorphism hover:bg-emerald-100/50 rounded-xl p-2 group"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-emerald-600 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <X className="w-5 h-5 text-emerald-600 group-hover:rotate-90 transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 p-6 space-y-3">
        {navigationItems.map((item, index) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={cn(
              "flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden",
              "hover:shadow-lg hover:scale-105 transform",
              isActive(item.url)
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/25"
                : "text-gray-600 hover:text-emerald-700 hover:bg-white/70 backdrop-blur-sm border border-white/30"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Glow effect for active item */}
            {isActive(item.url) && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 animate-pulse rounded-2xl" />
            )}
            
            <item.icon className={cn(
              "w-6 h-6 flex-shrink-0 relative z-10 transition-all duration-300",
              isActive(item.url) 
                ? "text-white drop-shadow-lg" 
                : "text-gray-500 group-hover:text-emerald-600 group-hover:scale-110"
            )} />
            
            {!isCollapsed && (
              <span className="truncate relative z-10">{item.title}</span>
            )}
            
            {isActive(item.url) && !isCollapsed && (
              <div className="ml-auto relative z-10">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            )}
            
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" />
          </NavLink>
        ))}
      </nav>

      {/* Enhanced Footer with Glassmorphism */}
      <div className="p-6 border-t border-white/20 backdrop-blur-sm">
        {!isCollapsed ? (
          <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">Dr. Admin</p>
              <p className="text-xs text-gray-500 truncate">System Administrator</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="btn-glassmorphism hover:bg-emerald-100/50 rounded-lg p-2"
            >
              <Bell className="w-4 h-4 text-emerald-600" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full btn-glassmorphism hover:bg-emerald-100/50 rounded-xl p-3"
          >
            <Users className="w-5 h-5 text-emerald-600" />
          </Button>
        )}
      </div>
    </div>
  );
}