// import { MainLayout } from "@/components/layout/MainLayout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { ExportModal } from "@/components/ui/export-modal";
// import { Label } from "@/components/ui/label";
// import { Droplets, Plus, Minus, AlertTriangle, Download, TrendingDown, Calendar, Activity, Users } from "lucide-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { useHospital } from "@/providers/HospitalProvider";
// import bloodbankHero from "@/assets/bloodbank-hero.jpg";

// const BloodBank = () => {
//   const[bloodStock, setBloodStock]  = useState([]);
//   const [selectedBloodType, setSelectedBloodType] = useState('');
//   const [unitsToAdd, setUnitsToAdd] = useState('');
//   //const [expiryDate, setExpiryDate] = useState('');
//   const [isExportOpen, setIsExportOpen] = useState(false);

//   const fetchBloodStock = async () => {
//      try {
//        const res = await axios.get('/api/bloodbank');
//       setBloodStock(res.data);
//      } catch (err) {
//        console.error("Failed to fetch blood stock:", err);
//      }
//    };

//   useEffect(() => {
//     fetchBloodStock();
//    }, []);


//   const handleAddUnits = async() => {
//     if (selectedBloodType && unitsToAdd) {
//       try{
//         await axios.post('/api/bloodbank/add', {
//           bloodType: selectedBloodType,
//           units: parseInt(unitsToAdd),
//         });
//         await fetchBloodStock();
//         setSelectedBloodType('');
//         setUnitsToAdd('');
//       }catch(err){
//         console.log("Failed to add units:",err);
//       }}
//   };

//   const handleUseUnits = (bloodType: string, units: number) => {
//     useBloodUnits(bloodType, units);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'normal':
//         return 'status-available';
//       case 'low':
//         return 'bg-warning text-warning-foreground';
//       case 'critical':
//         return 'status-occupied';
//       case 'expired':
//         return 'bg-destructive text-destructive-foreground';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'critical':
//       case 'expired':
//         return <AlertTriangle className="w-4 h-4" />;
//       case 'low':
//         return <TrendingDown className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   const totalUnits = bloodStock.reduce((sum, stock) => sum + stock.units, 0);
//   const criticalStock = bloodStock.filter(stock => stock.status === 'critical' || stock.status === 'expired').length;
//   const lowStock = bloodStock.filter(stock => stock.status === 'low').length;

//   return (
//     <MainLayout>
//       <div className="space-y-6 animate-fade-in-up">
//         {/* Hero Section */}
//         <div 
//           className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl"
//           style={{ backgroundImage: `url(${bloodbankHero})` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
//           <div className="relative z-10 h-full flex items-center justify-between p-8">
//             <div className="text-white">
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
//                   <Droplets className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-5xl font-bold mb-2">Blood Bank Management</h1>
//                   <p className="text-xl text-white/90">Real-time blood inventory and stock management</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6 mt-6">
//                 <div className="flex items-center space-x-2">
//                   <Activity className="w-5 h-5 text-green-400" />
//                   <span className="text-lg font-semibold">{totalUnits} Total Units</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Users className="w-5 h-5 text-red-400" />
//                   <span className="text-lg font-semibold">{criticalStock} Critical</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardContent className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-red-500 rounded-xl shadow-lg">
//                   <Droplets className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold text-red-600 dark:text-red-400">{totalUnits}</p>
//                   <p className="text-sm text-red-700 dark:text-red-300 font-medium">Total Units</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
//                   <TrendingDown className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{lowStock}</p>
//                   <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">Low Stock</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardContent className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-red-500 rounded-xl shadow-lg">
//                   <AlertTriangle className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold text-red-600 dark:text-red-400">{criticalStock}</p>
//                   <p className="text-sm text-red-700 dark:text-red-300 font-medium">Critical/Expired</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
//                   <Calendar className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</p>
//                   <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Expiring Soon</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Enhanced Actions */}
//         <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
//           <CardContent className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
//             <div className="flex flex-col md:flex-row gap-4">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Blood Units
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Add Blood Units</DialogTitle>
//                     <DialogDescription>
//                       Add new blood units to the inventory
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="bloodType">Blood Type</Label>
//                       <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select blood type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {bloodStock.map((stock) => (
//                             <SelectItem key={stock.bloodType} value={stock.bloodType}>
//                               {stock.bloodType}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="units">Number of Units</Label>
//                       <Input
//                         id="units"
//                         type="number"
//                         value={unitsToAdd}
//                         onChange={(e) => setUnitsToAdd(e.target.value)}
//                         placeholder="Enter number of units"
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="expiry">Expiry Date</Label>
//                       <Input
//                         id="expiry"
//                         type="date"
//                         value={expiryDate}
//                         onChange={(e) => setExpiryDate(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button type="button" onClick={handleAddUnits}>Add Units</Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>

//               <Button 
//                 variant="outline" 
//                 className="h-12 px-8 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
//                 onClick={() => setIsExportOpen(true)}
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Export Report
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Blood Stock Grid - Enhanced Like Bed Management */}
//         <Card className="medical-card">
//           <CardHeader className="medical-card-header">
//             <CardTitle className="flex items-center justify-between">
//               <span>Blood Inventory</span>
//               <div className="text-sm text-muted-foreground font-normal">
//                 {bloodStock.length} Blood Types Available
//               </div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {bloodStock.map((stock, index) => (
//                 <div
//                   key={stock.bloodType}
//                   className={cn(
//                     "relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform cursor-pointer backdrop-blur-sm list-item",
//                     stock.status === 'normal' && "border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 hover:border-green-300",
//                     stock.status === 'low' && "border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 hover:border-orange-300",
//                     (stock.status === 'critical' || stock.status === 'expired') && "border-red-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 hover:border-red-300"
//                   )}
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   {/* Status Indicator */}
//                   <div className={cn(
//                     "absolute top-0 left-0 w-full h-2",
//                     stock.status === 'normal' && "bg-gradient-to-r from-green-400 to-green-500",
//                     stock.status === 'low' && "bg-gradient-to-r from-orange-400 to-orange-500",
//                     (stock.status === 'critical' || stock.status === 'expired') && "bg-gradient-to-r from-red-400 to-red-500"
//                   )} />
                  
//                   <div className="p-6 pt-8">
//                     {/* Header */}
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className={cn(
//                           "p-2 rounded-full",
//                           stock.status === 'normal' && "bg-green-100 dark:bg-green-900/50",
//                           stock.status === 'low' && "bg-orange-100 dark:bg-orange-900/50",
//                           (stock.status === 'critical' || stock.status === 'expired') && "bg-red-100 dark:bg-red-900/50"
//                         )}>
//                           <Droplets className={cn(
//                             "w-5 h-5",
//                             stock.status === 'normal' && "text-green-600",
//                             stock.status === 'low' && "text-orange-600",
//                             (stock.status === 'critical' || stock.status === 'expired') && "text-red-600"
//                           )} />
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-lg text-foreground">{stock.bloodType}</h3>
//                           <p className="text-sm text-muted-foreground">Blood Type</p>
//                         </div>
//                       </div>
//                       <div className={cn(
//                         "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
//                         stock.status === 'normal' && "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
//                         stock.status === 'low' && "bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200",
//                         (stock.status === 'critical' || stock.status === 'expired') && "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
//                       )}>
//                         {stock.status}
//                       </div>
//                     </div>
                    
//                     {/* Details */}
//                     <div className="space-y-3 mb-6">
//                       <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
//                         <span className="text-sm font-medium text-muted-foreground">Units Available</span>
//                         <span className="text-xl font-bold text-foreground">{stock.units}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
//                         <span className="text-sm font-medium text-muted-foreground">Expiry Date</span>
//                         <span className="text-sm font-semibold text-foreground">{stock.expiryDate}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
//                         <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
//                         <span className="text-sm font-semibold text-foreground">{stock.lastUpdated}</span>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex space-x-2">
//                       <Button 
//                         className="flex-1 h-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
//                         onClick={() => {
//                           const units = prompt(`Add units for ${stock.bloodType}:`);
//                           if (units && !isNaN(parseInt(units))) {
//                             addBloodUnits(stock.bloodType, parseInt(units), new Date().toISOString().split('T')[0]);
//                           }
//                         }}
//                       >
//                         <Plus className="w-3 h-3 mr-1" />
//                         Add
//                       </Button>
//                       <Button 
//                         variant="outline"
//                         className="flex-1 h-10 border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
//                         onClick={() => {
//                           const units = prompt(`Use units for ${stock.bloodType}:`);
//                           if (units && !isNaN(parseInt(units))) {
//                             handleUseUnits(stock.bloodType, parseInt(units));
//                           }
//                         }}
//                       >
//                         <Minus className="w-3 h-3 mr-1" />
//                         Use
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExportModal } from "@/components/ui/export-modal";
import { Label } from "@/components/ui/label";
import { Droplets, Plus, Minus, AlertTriangle, Download, TrendingDown, Calendar, Activity, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useHospital } from "@/providers/HospitalProvider";
import bloodbankHero from "@/assets/bloodbank-hero.jpg";

const BloodBank = () => {
  const [bloodStock, setBloodStock] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [unitsToAdd, setUnitsToAdd] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);

  const fetchBloodStock = async () => {
    try {
      const res = await axios.get("/api/bloodbank");
      setBloodStock(res.data);
    } catch (err) {
      console.error("Failed to fetch blood stock:", err);
    }
  };

  useEffect(() => {
    fetchBloodStock();
  }, []);

  const handleAddUnits = async () => {
    if (selectedBloodType && unitsToAdd) {
      try {
        await axios.post("/api/bloodbank/add", {
          bloodType: selectedBloodType,
          units: parseInt(unitsToAdd),
        });
        await fetchBloodStock();
        setSelectedBloodType("");
        setUnitsToAdd("");
      } catch (err) {
        console.log("Failed to add units:", err);
      }
    }
  };

  const addBloodUnits = async (bloodType: string, units: number) => {
    try {
      await axios.post("/api/bloodbank/add", {
        bloodType,
        units,
      });
      await fetchBloodStock();
    } catch (err) {
      console.error("Failed to add units:", err);
    }
  };

  const handleUseUnits = async (bloodType: string, units: number) => {
    try {
      await axios.post("/api/bloodbank/use", {
        bloodType,
        units,
      });
      await fetchBloodStock();
    } catch (err) {
      console.error("Failed to use units:", err);
    }
  };

  const totalUnits = bloodStock.reduce((sum, stock) => sum + stock.units, 0);
  const criticalStock = bloodStock.filter(
    (stock) => stock.status === "critical" || stock.status === "expired"
  ).length;
  const lowStock = bloodStock.filter((stock) => stock.status === "low").length;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Hero Section */}
        <div
          className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{ backgroundImage: `url(${bloodbankHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center justify-between p-8">
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-2">
                    Blood Bank Management
                  </h1>
                  <p className="text-xl text-white/90">
                    Real-time blood inventory and stock management
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold">
                    {totalUnits} Total Units
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-red-400" />
                  <span className="text-lg font-semibold">
                    {criticalStock} Critical
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {totalUnits}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                    Total Units
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {lowStock}
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                    Low Stock
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {criticalStock}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                    Critical/Expired
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    3
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Expiring Soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
            <div className="flex flex-col md:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blood Units
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Blood Units</DialogTitle>
                    <DialogDescription>
                      Add new blood units to the inventory
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={selectedBloodType}
                        onValueChange={setSelectedBloodType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodStock.map((stock) => (
                            <SelectItem
                              key={stock.bloodType}
                              value={stock.bloodType}
                            >
                              {stock.bloodType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="units">Number of Units</Label>
                      <Input
                        id="units"
                        type="number"
                        value={unitsToAdd}
                        onChange={(e) => setUnitsToAdd(e.target.value)}
                        placeholder="Enter number of units"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleAddUnits}>
                      Add Units
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="h-12 px-8 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                onClick={() => setIsExportOpen(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Grid */}
        <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle className="flex items-center justify-between">
              <span>Blood Inventory</span>
              <div className="text-sm text-muted-foreground font-normal">
                {bloodStock.length} Blood Types Available
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bloodStock.map((stock, index) => (
                <div
                  key={stock.bloodType}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform cursor-pointer backdrop-blur-sm list-item",
                    stock.status === "normal" &&
                      "border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 hover:border-green-300",
                    stock.status === "low" &&
                      "border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 hover:border-orange-300",
                    (stock.status === "critical" ||
                      stock.status === "expired") &&
                      "border-red-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 hover:border-red-300"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Status Bar */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 w-full h-2",
                      stock.status === "normal" &&
                        "bg-gradient-to-r from-green-400 to-green-500",
                      stock.status === "low" &&
                        "bg-gradient-to-r from-orange-400 to-orange-500",
                      (stock.status === "critical" ||
                        stock.status === "expired") &&
                        "bg-gradient-to-r from-red-400 to-red-500"
                    )}
                  />

                  <div className="p-6 pt-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "p-2 rounded-full",
                            stock.status === "normal" &&
                              "bg-green-100 dark:bg-green-900/50",
                            stock.status === "low" &&
                              "bg-orange-100 dark:bg-orange-900/50",
                            (stock.status === "critical" ||
                              stock.status === "expired") &&
                              "bg-red-100 dark:bg-red-900/50"
                          )}
                        >
                          <Droplets
                            className={cn(
                              "w-5 h-5",
                              stock.status === "normal" && "text-green-600",
                              stock.status === "low" && "text-orange-600",
                              (stock.status === "critical" ||
                                stock.status === "expired") &&
                                "text-red-600"
                            )}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground">
                            {stock.bloodType}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Blood Type
                          </p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                          stock.status === "normal" &&
                            "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
                          stock.status === "low" &&
                            "bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200",
                          (stock.status === "critical" ||
                            stock.status === "expired") &&
                            "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                        )}
                      >
                        {stock.status}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-medium text-muted-foreground">
                          Units Available
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          {stock.units}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-medium text-muted-foreground">
                          Last Updated
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {stock.lastUpdated}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 h-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                        onClick={() => {
                          const units = prompt(
                            `Add units for ${stock.bloodType}:`
                          );
                          if (units && !isNaN(parseInt(units))) {
                            addBloodUnits(
                              stock.bloodType,
                              parseInt(units)
                            );
                          }
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-10 border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                        onClick={() => {
                          const units = prompt(
                            `Use units for ${stock.bloodType}:`
                          );
                          if (units && !isNaN(parseInt(units))) {
                            handleUseUnits(
                              stock.bloodType,
                              parseInt(units)
                            );
                          }
                        }}
                      >
                        <Minus className="w-3 h-3 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        {/* <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { type: 'OUT', bloodType: 'O+', units: 2, purpose: 'Surgery - ICU Ward 1', time: '2024-01-20 14:30' },
                { type: 'IN', bloodType: 'A-', units: 5, purpose: 'Donation Drive', time: '2024-01-20 12:15' },
                { type: 'OUT', bloodType: 'B+', units: 1, purpose: 'Emergency Transfusion', time: '2024-01-20 11:45' },
                { type: 'IN', bloodType: 'O-', units: 3, purpose: 'Blood Bank Transfer', time: '2024-01-20 09:30' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={transaction.type === 'IN' ? 'status-available' : 'status-occupied'}>
                      {transaction.type}
                    </Badge>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.bloodType} - {transaction.units} unit{transaction.units > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.purpose}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{transaction.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
        <Card className="medical-card">
  <CardHeader className="medical-card-header">
    <CardTitle>Recent Transactions</CardTitle>
  </CardHeader>
  <CardContent className="p-6">
    {recentTransactions.length === 0 ? (
      <p className="text-sm text-muted-foreground">No recent transactions found.</p>
    ) : (
      <div className="space-y-4">
        {recentTransactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-accent rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Badge
                className={
                  transaction.transactionType === "Added"
                    ? "status-available"
                    : "status-occupied"
                }
              >
                {transaction.transactionType === "Added" ? "IN" : "OUT"}
              </Badge>
              <div>
                <p className="font-medium text-foreground">
                  {transaction.bloodType} - {transaction.units} unit
                  {transaction.units > 1 ? "s" : ""}
                </p>
                {transaction.purpose && (
                  <p className="text-sm text-muted-foreground">
                    {transaction.purpose}
                  </p>
                )}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(transaction.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>


        {/* Export Modal */}
        <ExportModal 
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          dataType="blood"
        />
      </div>
    </MainLayout>
  );
};

export default BloodBank;










// import { useEffect, useState } from "react";
// import axios from "axios";
// import { MainLayout } from "@/components/layout/MainLayout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { ExportModal } from "@/components/ui/export-modal";
// import { Label } from "@/components/ui/label";
// import { Droplets, Plus, Minus, AlertTriangle, Download, TrendingDown, Calendar, Activity, Users } from "lucide-react";
// import { cn } from "@/lib/utils";
// import bloodbankHero from "@/assets/bloodbank-hero.jpg";

// const BloodBank = () => {
//   const [bloodStock, setBloodStock] = useState([]);
//   const [selectedBloodType, setSelectedBloodType] = useState('');
//   const [unitsToAdd, setUnitsToAdd] = useState('');
//   const [isExportOpen, setIsExportOpen] = useState(false);

//   const fetchBloodStock = async () => {
//     try {
//       const res = await axios.get('/api/bloodbank');
//       setBloodStock(res.data);
//     } catch (err) {
//       console.error("Failed to fetch blood stock:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBloodStock();
//   }, []);

  // const handleAddUnits = async () => {
  //   if (selectedBloodType && unitsToAdd) {
  //     try {
  //       await axios.post('/api/bloodbank/add', {
  //         bloodType: selectedBloodType,
  //         units: parseInt(unitsToAdd),
  //       });
  //       await fetchBloodStock();
  //       setSelectedBloodType('');
  //       setUnitsToAdd('');
  //     } catch (err) {
  //       console.error("Failed to add units:", err);
  //     }
  //   }
  // };

//   const handleUseUnits = async (bloodType: string, units: number) => {
//     try {
//       await axios.post('/api/bloodbank/use', {
//         bloodType,
//         units,
//       });
//       await fetchBloodStock();
//     } catch (err) {
//       console.error("Failed to use units:", err);
//     }
//   };

//   const totalUnits = bloodStock.reduce((sum, stock) => sum + stock.units, 0);
//   const criticalStock = bloodStock.filter(stock => stock.status === 'critical' || stock.status === 'expired').length;
//   const lowStock = bloodStock.filter(stock => stock.status === 'low').length;

//   return (
//     <MainLayout>
//       <div className="space-y-6 animate-fade-in-up">
//         {/* Hero Section */}
//         <div className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl" style={{ backgroundImage: `url(${bloodbankHero})` }}>
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
//           <div className="relative z-10 h-full flex items-center justify-between p-8">
//             <div className="text-white">
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
//                   <Droplets className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-5xl font-bold mb-2">Blood Bank Management</h1>
//                   <p className="text-xl text-white/90">Real-time blood inventory and stock management</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6 mt-6">
//                 <div className="flex items-center space-x-2">
//                   <Activity className="w-5 h-5 text-green-400" />
//                   <span className="text-lg font-semibold">{totalUnits} Total Units</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Users className="w-5 h-5 text-red-400" />
//                   <span className="text-lg font-semibold">{criticalStock} Critical</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><div className="p-3 bg-red-500 rounded-xl"><Droplets className="w-6 h-6 text-white" /></div><div><p className="text-3xl font-bold text-red-600">{totalUnits}</p><p className="text-sm text-red-700 font-medium">Total Units</p></div></div></CardContent></Card>
//           <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><div className="p-3 bg-orange-500 rounded-xl"><TrendingDown className="w-6 h-6 text-white" /></div><div><p className="text-3xl font-bold text-orange-600">{lowStock}</p><p className="text-sm text-orange-700 font-medium">Low Stock</p></div></div></CardContent></Card>
//           <Card><CardContent className="p-6"><div className="flex items-center space-x-4"><div className="p-3 bg-red-500 rounded-xl"><AlertTriangle className="w-6 h-6 text-white" /></div><div><p className="text-3xl font-bold text-red-600">{criticalStock}</p><p className="text-sm text-red-700 font-medium">Critical/Expired</p></div></div></CardContent></Card>
//         </div>

//         {/* Action Buttons */}
//         <Card><CardContent className="p-6"><div className="flex flex-col md:flex-row gap-4">
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl font-semibold">
//                 <Plus className="w-4 h-4 mr-2" /> Add Blood Units
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add Blood Units</DialogTitle>
//                 <DialogDescription>Add new blood units to the inventory</DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label>Blood Type</Label>
//                   <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
//                     <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
//                     <SelectContent>
//                       {bloodStock.map((stock) => (
//                         <SelectItem key={stock.bloodType} value={stock.bloodType}>{stock.bloodType}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label>Number of Units</Label>
//                   <Input type="number" value={unitsToAdd} onChange={(e) => setUnitsToAdd(e.target.value)} placeholder="Enter number of units" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="button" onClick={handleAddUnits}>Add Units</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//           <Button variant="outline" className="h-12 px-8" onClick={() => setIsExportOpen(true)}>
//             <Download className="w-4 h-4 mr-2" /> Export Report
//           </Button>
//         </div></CardContent></Card>

//         {/* Blood Inventory */}
//         <Card>
//           <CardHeader><CardTitle>Blood Inventory</CardTitle></CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {bloodStock.map((stock, index) => (
//                 <div key={stock.bloodType} className={cn("relative overflow-hidden rounded-3xl border-2 p-6", stock.status === 'normal' && "border-green-200", stock.status === 'low' && "border-orange-200", (stock.status === 'critical' || stock.status === 'expired') && "border-red-200")}>
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-gray-100 rounded-full">
//                         <Droplets className="w-5 h-5 text-red-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-lg">{stock.bloodType}</h3>
//                         <p className="text-sm text-muted-foreground">Blood Type</p>
//                       </div>
//                     </div>
//                     <div className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-muted">{stock.status}</div>
//                   </div>
//                   <div className="mb-4">
//                     <div className="flex justify-between items-center p-2 bg-gray-50 rounded-xl">
//                       <span className="text-sm">Units Available</span>
//                       <span className="text-xl font-bold">{stock.units}</span>
//                     </div>
//                   </div>
//                   <div className="flex space-x-2">
//                     <Button className="flex-1 h-10 bg-green-600 text-white" onClick={() => {
//                       const units = prompt(`Add units for ${stock.bloodType}:`);
//                       if (units && !isNaN(parseInt(units))) {
//                         axios.post('/api/bloodbank/add', {
//                           bloodType: stock.bloodType,
//                           units: parseInt(units),
//                         }).then(fetchBloodStock);
//                       }
//                     }}><Plus className="w-3 h-3 mr-1" /> Add</Button>
//                     <Button variant="outline" className="flex-1 h-10" onClick={() => {
//                       const units = prompt(`Use units for ${stock.bloodType}:`);
//                       if (units && !isNaN(parseInt(units))) {
//                         handleUseUnits(stock.bloodType, parseInt(units));
//                       }
//                     }}><Minus className="w-3 h-3 mr-1" /> Use</Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Export Modal */}
//         <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} dataType="blood" />
//       </div>
//     </MainLayout>
//   );
// };

// export default BloodBank;

