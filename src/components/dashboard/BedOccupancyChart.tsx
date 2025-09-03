// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Bed, Users, Activity } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface Ward {
//   name: string;
//   total: number;
//   occupied: number;
//   department: string;
//   type: 'ICU' | 'General' | 'Emergency' | 'Isolation' | 'Private';
// }

// const wards: Ward[] = [
//   { name: 'General Ward A', total: 50, occupied: 35, department: 'General Medicine', type: 'General' },
//   { name: 'ICU Ward 1', total: 20, occupied: 18, department: 'ICU', type: 'ICU' },
//   { name: 'Emergency Ward', total: 25, occupied: 22, department: 'Emergency', type: 'Emergency' },
//   { name: 'Pediatric Ward', total: 30, occupied: 20, department: 'Pediatric', type: 'General' },
//   { name: 'Maternity Ward', total: 25, occupied: 18, department: 'Maternity', type: 'Private' },
//   { name: 'Surgical Ward', total: 40, occupied: 32, department: 'Surgical', type: 'General' },
//   { name: 'Cardiac Unit', total: 18, occupied: 14, department: 'Cardiac', type: 'ICU' },
//   { name: 'Neurology Ward', total: 22, occupied: 16, department: 'Neurology', type: 'General' },
//   { name: 'Orthopedic Ward', total: 28, occupied: 21, department: 'Orthopedics', type: 'General' },
//   { name: 'Pulmonology Unit', total: 16, occupied: 11, department: 'Pulmonology', type: 'General' },
//   { name: 'Oncology Wing', total: 24, occupied: 19, department: 'Oncology', type: 'Private' },
//   { name: 'Burn Unit', total: 12, occupied: 8, department: 'Burn/Plastic Surgery', type: 'ICU' },
//   { name: 'Nephrology Ward', total: 20, occupied: 14, department: 'Nephrology', type: 'General' },
// ];

// export function BedOccupancyChart() {
//   const getOccupancyRate = (occupied: number, total: number) => {
//     return Math.round((occupied / total) * 100);
//   };

//   const getOccupancyStatus = (rate: number) => {
//     if (rate >= 90) return 'critical';
//     if (rate >= 75) return 'warning';
//     return 'normal';
//   };

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'ICU':
//         return 'bg-destructive text-destructive-foreground';
//       case 'Emergency':
//         return 'bg-warning text-warning-foreground';
//       case 'Private':
//         return 'bg-primary text-primary-foreground';
//       case 'Isolation':
//         return 'bg-info text-info-foreground';
//       default:
//         return 'bg-secondary text-secondary-foreground';
//     }
//   };

//   return (
//     <Card className="medical-card">
//       <CardHeader className="medical-card-header">
//         <CardTitle className="flex items-center space-x-2">
//           <Bed className="w-5 h-5 text-primary" />
//           <span>Bed Occupancy by Ward</span>
//           <Badge variant="secondary" className="ml-auto">
//             <Activity className="w-3 h-3 mr-1" />
//             Real-time
//           </Badge>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="space-y-4">
//           {wards.map((ward) => {
//             const occupancyRate = getOccupancyRate(ward.occupied, ward.total);
//             const status = getOccupancyStatus(occupancyRate);
            
//             return (
//               <div
//                 key={ward.name}
//                 className={cn(
//                   "p-4 rounded-lg border bg-card transition-medical hover:shadow-md",
//                   status === 'critical' && "border-destructive/20 bg-destructive-light/50",
//                   status === 'warning' && "border-warning/20 bg-warning-light/50"
//                 )}
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center space-x-3">
//                     <Badge className={getTypeColor(ward.type)}>
//                       {ward.type}
//                     </Badge>
//                     <div>
//                       <h4 className="font-medium text-foreground">{ward.name}</h4>
//                       <p className="text-xs text-muted-foreground">{ward.department}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center space-x-2">
//                       <span className={cn(
//                         "text-lg font-bold",
//                         status === 'critical' ? "text-destructive" : 
//                         status === 'warning' ? "text-warning" : "text-success"
//                       )}>
//                         {occupancyRate}%
//                       </span>
//                       {status === 'critical' && (
//                         <div className="w-2 h-2 bg-destructive rounded-full pulse-indicator animate-pulse-glow" />
//                       )}
//                     </div>
//                     <p className="text-xs text-muted-foreground">
//                       {ward.occupied}/{ward.total} beds
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="relative">
//                   <div className="w-full bg-muted rounded-full h-2">
//                     <div
//                       className={cn(
//                         "h-2 rounded-full transition-all duration-500",
//                         status === 'critical' ? "bg-destructive" :
//                         status === 'warning' ? "bg-warning" : "bg-success"
//                       )}
//                       style={{ width: `${occupancyRate}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between mt-2 text-xs text-muted-foreground">
//                     <span>Available: {ward.total - ward.occupied}</span>
//                     <span>Occupied: {ward.occupied}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="mt-6 grid grid-cols-3 gap-4 text-center">
//           <div className="p-3 bg-success-light rounded-lg">
//             <div className="text-lg font-bold text-success">78</div>
//             <div className="text-xs text-muted-foreground">Available Beds</div>
//           </div>
//           <div className="p-3 bg-warning-light rounded-lg">
//             <div className="text-lg font-bold text-warning">118</div>
//             <div className="text-xs text-muted-foreground">Occupied Beds</div>
//           </div>
//           <div className="p-3 bg-accent rounded-lg">
//             <div className="text-lg font-bold text-foreground">196</div>
//             <div className="text-xs text-muted-foreground">Total Capacity</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Ward {
  _id: string;       // ward name from backend
  total: number;
  occupied: number;
  available: number;
  maintenance: number;
}

interface Summary {
  totalBeds: number;
  availableBeds: number;
  occupiedBeds: number;
  maintenanceBeds: number;
}

export function BedOccupancyChart() {
  const [wards, setWards] = useState<Ward[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
    maintenanceBeds: 0,
  });

  // ✅ Fetch ward + overall summary
  useEffect(() => {
    const fetchData = async () => {
      try {
       const res = await axios.get("http://localhost:5000/api/beds/ward-summary");
         const wardData: Ward[] = res.data.wards.map((w: any) => ({
          _id: w.ward,
          total: w.totalCapacity,
          occupied: w.occupiedBeds,
          available: w.availableBeds,
          maintenance: 0, // backend not provided
        }));

        const summaryData: Summary = {
          totalBeds: res.data.overall.totalCapacity,
          availableBeds: res.data.overall.availableBeds,
          occupiedBeds: res.data.overall.occupiedBeds,
          maintenanceBeds: 0, // backend not provided
        };

        setWards(wardData);
        setSummary(summaryData);
      } catch (err) {
        console.error("Error fetching bed data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const getOccupancyRate = (occupied: number, total: number) =>
    total > 0 ? Math.round((occupied / total) * 100) : 0;

  const getOccupancyStatus = (rate: number) => {
    if (rate >= 90) return "critical";
    if (rate >= 75) return "warning";
    return "normal";
  };

  return (
    <Card className="medical-card">
      <CardHeader className="medical-card-header">
        <CardTitle className="flex items-center space-x-2">
          <Bed className="w-5 h-5 text-primary" />
          <span>Bed Occupancy by Ward</span>
          <Badge variant="secondary" className="ml-auto">
            <Activity className="w-3 h-3 mr-1" />
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {wards.map((ward) => {
            const occupancyRate = getOccupancyRate(ward.occupied, ward.total);
            const status = getOccupancyStatus(occupancyRate);

            return (
              <div
                key={ward._id}
                className={cn(
                  "p-4 rounded-lg border bg-card transition-medical hover:shadow-md",
                  status === "critical" && "border-destructive/20 bg-destructive-light/50",
                  status === "warning" && "border-warning/20 bg-warning-light/50"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge>{ward._id}</Badge>
                    <div>
                      <h4 className="font-medium text-foreground">{ward._id}</h4>
                      <p className="text-xs text-muted-foreground">Ward</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn(
                          "text-lg font-bold",
                          status === "critical"
                            ? "text-destructive"
                            : status === "warning"
                            ? "text-warning"
                            : "text-success"
                        )}
                      >
                        {occupancyRate}%
                      </span>
                      {status === "critical" && (
                        <div className="w-2 h-2 bg-destructive rounded-full pulse-indicator animate-pulse-glow" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {ward.occupied}/{ward.total} beds
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        status === "critical"
                          ? "bg-destructive"
                          : status === "warning"
                          ? "bg-warning"
                          : "bg-success"
                      )}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Available: {ward.available}</span>
                    <span>Occupied: {ward.occupied}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Overall Summary Cards */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-success-light rounded-lg">
            <div className="text-lg font-bold text-success">{summary.availableBeds}</div>
            <div className="text-xs text-muted-foreground">Available Beds</div>
          </div>
          <div className="p-3 bg-warning-light rounded-lg">
            <div className="text-lg font-bold text-warning">{summary.occupiedBeds}</div>
            <div className="text-xs text-muted-foreground">Occupied Beds</div>
          </div>
          <div className="p-3 bg-accent rounded-lg">
            <div className="text-lg font-bold text-foreground">{summary.totalBeds}</div>
            <div className="text-xs text-muted-foreground">Total Capacity</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
