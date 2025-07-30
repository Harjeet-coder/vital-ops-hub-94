import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  status?: 'normal' | 'warning' | 'critical' | 'success';
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  status = 'normal',
  className 
}: StatCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-success/20 bg-success-light';
      case 'warning':
        return 'border-warning/20 bg-warning-light';
      case 'critical':
        return 'border-destructive/20 bg-destructive-light';
      default:
        return 'border-border bg-card';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={cn(
      "medical-card transition-medical hover:shadow-glow",
      getStatusColor(),
      status === 'critical' && "animate-pulse-glow",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "p-2 rounded-lg bg-white/80",
          getIconColor()
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {trend && (
              <p className={cn(
                "text-xs font-medium flex items-center mt-1",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                <span className={cn(
                  "mr-1",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "↗" : "↘"}
                </span>
                {trend.value}
              </p>
            )}
          </div>
          {status === 'critical' && (
            <div className="w-3 h-3 bg-destructive rounded-full pulse-indicator animate-pulse-glow" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}