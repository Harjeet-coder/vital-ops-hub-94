import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FloorPlanModal } from "@/components/ui/floor-plan-modal";
import { PatientAssignmentModal } from "@/components/ui/patient-assignment-modal";
import { Bed, Search, Filter, Eye, UserPlus, Settings, Activity, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHospital } from "@/providers/HospitalProvider";
import { useState, useMemo } from "react";
import hospitalHero from "@/assets/hospital-hero.jpg";

const Beds = () => {
  const { 
    beds, 
    searchTerm, 
    setSearchTerm, 
    wardFilter, 
    setWardFilter, 
    statusFilter, 
    setStatusFilter,
    updateBedStatus
  } = useHospital();
  
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<{ id: string; bedNumber: string } | null>(null);

  // Filter beds based on search and filters
  const filteredBeds = useMemo(() => {
    return beds.filter(bed => {
      const matchesSearch = searchTerm === '' || 
        bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bed.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bed.ward.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesWard = wardFilter === 'all' || 
        bed.ward.toLowerCase().includes(wardFilter.toLowerCase()) ||
        bed.department.toLowerCase().includes(wardFilter.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || bed.status === statusFilter;
      
      return matchesSearch && matchesWard && matchesStatus;
    });
  }, [beds, searchTerm, wardFilter, statusFilter]);


  const handleAssignPatient = (bedId: string, bedNumber: string) => {
    setSelectedBed({ id: bedId, bedNumber });
    setIsAssignmentOpen(true);
  };

  const handleMaintenanceSchedule = (bedId: string) => {
    updateBedStatus(bedId, 'maintenance');
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'occupied':
        return 'status-occupied';
      case 'maintenance':
        return 'status-maintenance';
      case 'reserved':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ICU':
        return 'bg-destructive text-destructive-foreground';
      case 'Emergency':
        return 'bg-warning text-warning-foreground';
      case 'Private':
        return 'bg-primary text-primary-foreground';
      case 'Isolation':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Hero Section with Background */}
        <div 
          className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{ backgroundImage: `url(${hospitalHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center justify-between p-8">
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Bed className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-2">Bed Management</h1>
                  <p className="text-xl text-white/90">Real-time bed availability and intelligent allocation</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold">{filteredBeds.filter(b => b.status === 'available').length} Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-red-400" />
                  <span className="text-lg font-semibold">{filteredBeds.filter(b => b.status === 'occupied').length} Occupied</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <Card className="medical-card">
          <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search by bed number, patient name, or ward..."
                className="pl-12 h-12 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-base shadow-lg focus:border-primary focus:shadow-xl transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={wardFilter} onValueChange={setWardFilter}>
              <SelectTrigger className="w-full md:w-56 h-12 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <SelectValue placeholder="Filter by ward" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 shadow-2xl">
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="general">General Wards</SelectItem>
                <SelectItem value="icu">ICU Wards</SelectItem>
                <SelectItem value="emergency">Emergency Ward</SelectItem>
                <SelectItem value="pediatric">Pediatric Ward</SelectItem>
                <SelectItem value="maternity">Maternity Ward</SelectItem>
                <SelectItem value="surgical">Surgical Ward</SelectItem>
                <SelectItem value="cardiac">Cardiac Unit</SelectItem>
                <SelectItem value="neurology">Neurology Ward</SelectItem>
                <SelectItem value="orthopedics">Orthopedic Ward</SelectItem>
                <SelectItem value="pulmonology">Pulmonology Unit</SelectItem>
                <SelectItem value="oncology">Oncology Wing</SelectItem>
                <SelectItem value="burn">Burn Unit</SelectItem>
                <SelectItem value="nephrology">Nephrology Ward</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-56 h-12 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 shadow-2xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Button className="btn-animated gradient-primary text-primary-foreground">
              <Filter className="w-5 h-5 mr-2" />
              Apply Filters
            </Button>
          </div>
          </CardContent>
        </Card>


        {/* Bed Grid - Custom Design */}
        <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle className="flex items-center justify-between">
              <span>Available Beds</span>
              <div className="text-sm text-muted-foreground font-normal">
                Showing {filteredBeds.length} of {beds.length} beds
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeds.map((bed, index) => (
              <div
                key={bed.id}
                className={cn(
                  "relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform cursor-pointer backdrop-blur-sm list-item",
                  bed.status === 'available' && "border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 hover:border-green-300",
                  bed.status === 'occupied' && "border-red-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 hover:border-red-300",
                  bed.status === 'maintenance' && "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 hover:border-yellow-300",
                  bed.status === 'reserved' && "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 hover:border-blue-300"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Status Indicator */}
                <div className={cn(
                  "absolute top-0 left-0 w-full h-2",
                  bed.status === 'available' && "bg-gradient-to-r from-green-400 to-green-500",
                  bed.status === 'occupied' && "bg-gradient-to-r from-red-400 to-red-500",
                  bed.status === 'maintenance' && "bg-gradient-to-r from-yellow-400 to-yellow-500",
                  bed.status === 'reserved' && "bg-gradient-to-r from-blue-400 to-blue-500"
                )} />
                
                <div className="p-6 pt-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        bed.status === 'available' && "bg-green-100 dark:bg-green-900/50",
                        bed.status === 'occupied' && "bg-red-100 dark:bg-red-900/50",
                        bed.status === 'maintenance' && "bg-yellow-100 dark:bg-yellow-900/50",
                        bed.status === 'reserved' && "bg-blue-100 dark:bg-blue-900/50"
                      )}>
                        <Bed className={cn(
                          "w-5 h-5",
                          bed.status === 'available' && "text-green-600",
                          bed.status === 'occupied' && "text-red-600",
                          bed.status === 'maintenance' && "text-yellow-600",
                          bed.status === 'reserved' && "text-blue-600"
                        )} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{bed.bedNumber}</h3>
                        <p className="text-sm text-muted-foreground">{bed.type}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                      bed.status === 'available' && "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
                      bed.status === 'occupied' && "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
                      bed.status === 'maintenance' && "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
                      bed.status === 'reserved' && "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                    )}>
                      {bed.status}
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <span className="text-sm font-medium text-muted-foreground">Ward</span>
                      <span className="text-sm font-semibold text-foreground">{bed.ward}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <span className="text-sm font-medium text-muted-foreground">Floor</span>
                      <span className="text-sm font-semibold text-foreground">{bed.floor}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <span className="text-sm font-medium text-muted-foreground">Department</span>
                      <span className="text-sm font-semibold text-foreground">{bed.department}</span>
                    </div>
                    {bed.patient && (
                      <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-medium text-muted-foreground">Patient</span>
                        <span className="text-sm font-semibold text-primary">{bed.patient}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {bed.status === 'available' && (
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                      onClick={() => handleAssignPatient(bed.id, bed.bedNumber)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign Patient
                    </Button>
                  )}

                  {bed.status === 'occupied' && bed.patient && (
                    <Button 
                      variant="outline" 
                      className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View {bed.patient}
                    </Button>
                  )}

                  {bed.status === 'maintenance' && (
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                      onClick={() => handleMaintenanceSchedule(bed.id)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Schedule Repair
                    </Button>
                  )}

                  {bed.status === 'reserved' && (
                    <Button 
                      variant="outline" 
                      className="w-full h-12 border-2 border-blue-300 dark:border-blue-600 bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Reservation
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>

        {/* Modals */}        
        {selectedBed && (
          <PatientAssignmentModal
            isOpen={isAssignmentOpen}
            onClose={() => {
              setIsAssignmentOpen(false);
              setSelectedBed(null);
            }}
            bedId={selectedBed.id}
            bedNumber={selectedBed.bedNumber}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Beds;