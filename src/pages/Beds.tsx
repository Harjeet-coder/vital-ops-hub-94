import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FloorPlanModal } from "@/components/ui/floor-plan-modal";
import { PatientAssignmentModal } from "@/components/ui/patient-assignment-modal";
import { Bed, Search, Filter, Eye, MapPin, UserPlus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHospital } from "@/providers/HospitalProvider";
import { useState, useMemo } from "react";

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
  
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
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

  const handleFloorPlanView = (floor: string) => {
    setSelectedFloor(floor);
    setIsFloorPlanOpen(true);
  };

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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-lg">
              <Bed className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bed Management</h1>
              <p className="text-muted-foreground">Real-time bed availability and management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-success-light text-success border-success/20">
              {filteredBeds.filter(b => b.status === 'available').length} Available
            </Badge>
            <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/20">
              {filteredBeds.filter(b => b.status === 'occupied').length} Occupied
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by bed number, patient name, or ward..."
                  className="pl-10 transition-medical"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={wardFilter} onValueChange={setWardFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by ward" />
                </SelectTrigger>
                <SelectContent>
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
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="transition-medical">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Floor Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['1st Floor', '2nd Floor', '3rd Floor'].map((floor) => (
            <Card key={floor} className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{floor}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Beds</span>
                    <span className="font-medium">65</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <Badge className="status-available">26</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Occupied</span>
                    <Badge className="status-occupied">35</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Maintenance</span>
                    <Badge className="status-maintenance">4</Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 btn-animated"
                  onClick={() => handleFloorPlanView(floor)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Floor Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bed Grid */}
        <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle>Bed Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBeds.map((bed, index) => (
                <div
                  key={bed.id}
                  className={cn(
                    "p-4 rounded-lg border card-interactive list-item",
                    bed.status === 'available' && "border-success/20 bg-success-light/30 hover:bg-success-light/50",
                    bed.status === 'occupied' && "border-destructive/20 bg-destructive-light/30 hover:bg-destructive-light/50",
                    bed.status === 'maintenance' && "border-warning/20 bg-warning-light/30 hover:bg-warning-light/50",
                    bed.status === 'reserved' && "border-info/20 bg-info-light/30 hover:bg-info-light/50"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{bed.bedNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(bed.type)}>
                        {bed.type}
                      </Badge>
                      <Badge className={getStatusColor(bed.status)}>
                        {bed.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ward:</span>
                      <span className="font-medium">{bed.ward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor:</span>
                      <span className="font-medium">{bed.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">{bed.department}</span>
                    </div>
                    {bed.patient && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patient:</span>
                        <span className="font-medium text-primary">{bed.patient}</span>
                      </div>
                    )}
                  </div>

                  {bed.status === 'available' && (
                    <Button 
                      size="sm" 
                      className="w-full mt-3 btn-animated gradient-primary text-primary-foreground"
                      onClick={() => handleAssignPatient(bed.id, bed.bedNumber)}
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Assign Patient
                    </Button>
                  )}

                  {bed.status === 'occupied' && bed.patient && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 btn-animated"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View {bed.patient}
                    </Button>
                  )}

                  {bed.status === 'maintenance' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 btn-animated"
                      onClick={() => handleMaintenanceSchedule(bed.id)}
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Schedule Repair
                    </Button>
                  )}

                  {bed.status === 'reserved' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 btn-animated"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Reservation
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <FloorPlanModal 
          isOpen={isFloorPlanOpen}
          onClose={() => setIsFloorPlanOpen(false)}
          floor={selectedFloor}
        />
        
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