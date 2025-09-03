import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import{ useEffect, useState } from "react";
import axios from "axios";

interface BloodGroup {
  bloodType: string;
  units: number;
  status: string; // "Normal" | "Low Stock" | "Critical Low"
  color: string;  // backend gives "green" | "yellow" | "red"
  lastUpdated: string;
}



export function BloodStockChart() {
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bloodbank/summary");
        setBloodGroups(res.data.summary);
      } catch (err) {
        console.error("Error fetching blood bank data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
   if (status.toLowerCase().includes("critical")) {
      return "bg-red-50 border-red-200 text-red-600";
    }
    if (status.toLowerCase().includes("low")) {
      return "bg-yellow-50 border-yellow-200 text-yellow-600";
    }
    return "bg-green-50 border-green-200 text-green-600";
  };

  const getStatusIcon = (status: string) => {
    if (status.toLowerCase().includes("critical") || status.toLowerCase().includes("low")) {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <Droplets className="w-4 h-4" />;
  };
    const formatTimeAgo = (dateStr: string) => {
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now.getTime() - past.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return past.toLocaleDateString("en-IN", { dateStyle: "medium" });
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
        {/* Blood groups grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bloodGroups.map((group) => (
            <div
              key={group.bloodType}
              className={cn(
                "p-4 rounded-lg border transition-medical hover:shadow-md",
                getStatusColor(group.status),
                
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">{group.bloodType}</span>
                {getStatusIcon(group.status)}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{group.units}</p>
                <p className="text-xs opacity-80">units available</p>
                <p className="text-xs opacity-70">Last: {formatTimeAgo(group.lastUpdated)}</p>
              </div>
              {group.status.toLowerCase() !== 'normal' && (
                <div className="mt-2 pt-2 border-t border-current/20">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      group.status.toLowerCase().includes("critical")
                        ? "border-red-500 text-red-600"
                        : "border-yellow-500 text-yellow-600"
                    )}
                  >
                {group.status}               
                 </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
          {/* Footer */}
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