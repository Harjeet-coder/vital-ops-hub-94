import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FloorPlanModal } from "@/components/ui/floor-plan-modal";
import { PatientAssignmentModal } from "@/components/ui/patient-assignment-modal";
import { AddBedForm } from "@/components/admission/AddBedForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bed, Search, Filter, Eye, UserPlus, Settings, Activity, Users, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
//import { useHospital } from "@/providers/HospitalProvider";
import { useEffect, useState, useMemo } from "react";
import hospitalHero from "@/assets/hospital-hero.jpg";

interface BedType {
  _id: string;
  ward: string;
  bedNumber: string;
  status: "available" | "occupied" | "maintenance" | "reserved";
  floor?: string;
  department?: string;
  ddBeds?: number;
  assignedTo?: PatientType; // ✅ instead of patient:string
}

interface PatientType {
  _id: string;
  name: string;
  age: number;
  gender: string;
  admissionNumber: string;
  admissionDate: string;
  reasonForAdmitting?: string;
  doctor?: string;
}
const Beds = () => {
  // ✅ Local State (replaces useHospital())
  const [beds, setBeds] = useState<BedType[]>([]);
  const [summary, setSummary] = useState<{ totalBeds: number; availableBeds: number; occupiedBeds: number; maintenanceBeds: number }>({
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
    maintenanceBeds: 0
  });
const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [wardFilter, setWardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<{ id: string; bedNumber: string } | null>(null);
  const [patientDetails, setPatientDetails]=useState<PatientType |null>(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
const navigate = useNavigate();
  // ✅ Fetch beds from backend
const fetchBeds = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/beds");
      setBeds(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching beds:", error);
      setLoading(false);
    }
  };

  // ✅ Fetch summary from backend
  const fetchSummary = async () => {
    try {
      const res = await axios.get("/api/beds/summary");
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  // ✅ Update bed status (maintenance, etc.)
  const updateBedStatus = async (bedId: string, newStatus: string) => {
    try {
      await axios.put(`/api/beds/${bedId}`, { status: newStatus });
      fetchBeds(); // refresh after update
      fetchSummary();
    } catch (error) {
      console.error("Error updating bed:", error);
    }
  };

  const handleViewPatient = async (bedId: string) => {
    try {
      const res = await axios.get(`/api/beds/${bedId}`);
      if (res.data.assignedTo) {
        setPatientDetails(res.data.assignedTo);
        setIsPatientModalOpen(true);
      } else {
        alert("No patient assigned to this bed.");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

   // ✅ Assign patient
  const handleAssignPatient = (bedId: string, bedNumber: string) => {
    setSelectedBed({ id: bedId, bedNumber });
    setIsAssignmentOpen(true);
  };

  const handleMaintenanceSchedule = (bedId: string) => {
    updateBedStatus(bedId, "maintenance");
  };

  useEffect(() => {
    fetchBeds();
    fetchSummary();
  }, []);
  // Filter beds based on search and filters
const filteredBeds = useMemo(() => {
  return beds.filter(bed => {
    const bedNumber = bed?.bedNumber || "";
    const patient = bed?.assignedTo?.name || "";
    const ward = bed?.ward || "";
    const department = bed?.department || "";
    const status = bed?.status || "";

    const matchesSearch =
      searchTerm === "" ||
      bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ward.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWard =
      wardFilter === "all" ||
      ward.toLowerCase().includes(wardFilter.toLowerCase()) ||
      department.toLowerCase().includes(wardFilter.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || status === statusFilter;

    return matchesSearch && matchesWard && matchesStatus;
  });
}, [beds, searchTerm, wardFilter, statusFilter]);
 


  // const handleAssignPatient = (bedId: string, bedNumber: string) => {
  //   setSelectedBed({ id: bedId, bedNumber });
  //   setIsAssignmentOpen(true);
  // };

  // const handleMaintenanceSchedule = (bedId: string) => {
  //   updateBedStatus(bedId, 'maintenance');
  // };
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
                  <span className="text-lg font-semibold">{summary.availableBeds} Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-red-400" />
                  <span className="text-lg font-semibold">{summary.occupiedBeds} Occupied</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wrench className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold">{summary.maintenanceBeds} Maintenance</span>
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
              </SelectContent>
            </Select>
            <Button className="btn-animated gradient-primary text-primary-foreground">
              <Filter className="w-5 h-5 mr-2" />
              Apply Filters
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-animated bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  <Bed className="w-5 h-5 mr-2" />
                  Add Bed
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <ScrollArea className="h-[80vh] pr-4">
                  <AddBedForm onBedAdded={() => { fetchBeds(); fetchSummary(); }}/>
                </ScrollArea>
              </DialogContent>
            </Dialog>
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
                key={bed._id}
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
              <span className="text-sm font-medium text-muted-foreground">Bed Number</span>
              <span className="text-sm font-semibold text-foreground">{bed.bedNumber}</span>
            </div>
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
                    <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <span className="text-sm font-medium text-muted-foreground">DD Beds</span>
                      <span className="text-sm font-semibold text-primary">{bed.ddBeds}</span>
                    </div>
                    {bed.assignedTo && (
                      <div className="flex justify-between items-center p-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                        <span className="text-sm font-medium text-muted-foreground">Patient</span>
                        <span className="text-sm font-semibold text-primary">{bed.assignedTo.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {bed.status === 'available' && (
                    <Button 
                        className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                      onClick={() => navigate(`/admission?bedId=${bed._id}`)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign Patient
                    </Button>
                  )}

                  {bed.status === 'occupied' && bed.assignedTo && (
                    <Button 
                        className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                      onClick={() => navigate(`/patients/${bed.assignedTo._id}`)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      View Patient
                    </Button>
                  )}

                  {bed.status === 'maintenance' && (
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                      onClick={() => handleMaintenanceSchedule(bed._id)}
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
              fetchBeds();
              fetchSummary();
            }}
            bedId={selectedBed.id}
            bedNumber={selectedBed.bedNumber}
          />
        )}
        {/* Patient Details Modal */}
        {isPatientModalOpen && patientDetails && (
          <Dialog open={isPatientModalOpen} onOpenChange={setIsPatientModalOpen}>
            <DialogContent className="max-w-md">
              <h2 className="text-xl font-bold mb-4">Patient Details</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {patientDetails.name}</p>
                <p><strong>Age:</strong> {patientDetails.age}</p>
                <p><strong>Gender:</strong> {patientDetails.gender}</p>
                <p><strong>Admission No:</strong> {patientDetails.admissionNumber}</p>
                <p><strong>Admission Date:</strong> {new Date(patientDetails.admissionDate).toLocaleDateString()}</p>
                <p><strong>Reason:</strong> {patientDetails.reasonForAdmitting}</p>
                <p><strong>Doctor:</strong> {patientDetails.doctor}</p>
              </div>
              <Button className="mt-4 w-full" onClick={() => setIsPatientModalOpen(false)}>Close</Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default Beds;