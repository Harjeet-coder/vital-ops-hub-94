import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BloodGroup {
  type: string;
  units: number;
  status: 'normal' | 'low' | 'critical';
  lastDonation: string;
}

const bloodGroups: BloodGroup[] = [
  { type: 'A+', units: 45, status: 'normal', lastDonation: '2 hours ago' },
  { type: 'A-', units: 12, status: 'low', lastDonation: '5 hours ago' },
  { type: 'B+', units: 38, status: 'normal', lastDonation: '1 hour ago' },
  { type: 'B-', units: 8, status: 'critical', lastDonation: '12 hours ago' },
  { type: 'AB+', units: 22, status: 'normal', lastDonation: '3 hours ago' },
  { type: 'AB-', units: 5, status: 'critical', lastDonation: '8 hours ago' },
  { type: 'O+', units: 52, status: 'normal', lastDonation: '30 mins ago' },
  { type: 'O-', units: 15, status: 'low', lastDonation: '4 hours ago' },
];

export function BloodStockChart() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-destructive bg-destructive-light border-destructive/20';
      case 'low':
        return 'text-warning bg-warning-light border-warning/20';
      default:
        return 'text-success bg-success-light border-success/20';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'critical' || status === 'low') {
      return <AlertTriangle className="w-3 h-3" />;
    }
    return <Droplets className="w-3 h-3" />;
  };

  return (
    <Card className="medical-card">
      <CardHeader className="medical-card-header">
        <CardTitle className="flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-primary" />
          <span>Blood Bank Status</span>
          <Badge variant="secondary" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bloodGroups.map((group) => (
            <div
              key={group.type}
              className={cn(
                "p-4 rounded-lg border transition-medical hover:shadow-md",
                getStatusColor(group.status),
                group.status === 'critical' && "animate-pulse-glow"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">{group.type}</span>
                {getStatusIcon(group.status)}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{group.units}</p>
                <p className="text-xs opacity-80">units available</p>
                <p className="text-xs opacity-70">Last: {group.lastDonation}</p>
              </div>
              {group.status !== 'normal' && (
                <div className="mt-2 pt-2 border-t border-current/20">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      group.status === 'critical' ? "border-destructive text-destructive" : "border-warning text-warning"
                    )}
                  >
                    {group.status === 'critical' ? 'Critical Low' : 'Low Stock'}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-accent rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next donation drive:</span>
            <span className="font-medium text-foreground">Tomorrow 9:00 AM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}