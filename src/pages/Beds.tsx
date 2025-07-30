import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Search, Filter, Eye, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface BedInfo {
  id: string;
  ward: string;
  bedNumber: string;
  floor: string;
  type: 'ICU' | 'General' | 'Emergency' | 'Isolation' | 'Private';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  patient?: string;
  department: string;
}

const beds: BedInfo[] = [
  { id: '1', ward: 'General Ward A', bedNumber: 'A-15', floor: '3rd', type: 'General', status: 'occupied', patient: 'Jane Smith', department: 'General Medicine' },
  { id: '2', ward: 'General Ward A', bedNumber: 'A-16', floor: '3rd', type: 'General', status: 'available', department: 'General Medicine' },
  { id: '3', ward: 'ICU Ward 1', bedNumber: 'I-01', floor: '2nd', type: 'ICU', status: 'occupied', patient: 'John Doe', department: 'ICU' },
  { id: '4', ward: 'ICU Ward 1', bedNumber: 'I-02', floor: '2nd', type: 'ICU', status: 'available', department: 'ICU' },
  { id: '5', ward: 'Emergency Ward', bedNumber: 'E-03', floor: '1st', type: 'Emergency', status: 'maintenance', department: 'Emergency' },
  { id: '6', ward: 'Pediatric Ward', bedNumber: 'P-08', floor: '3rd', type: 'General', status: 'available', department: 'Pediatric' },
  { id: '7', ward: 'Maternity Ward', bedNumber: 'M-12', floor: '4th', type: 'Private', status: 'occupied', patient: 'Sarah Johnson', department: 'Maternity' },
  { id: '8', ward: 'Surgical Ward', bedNumber: 'S-05', floor: '2nd', type: 'General', status: 'reserved', department: 'Surgical' },
  { id: '9', ward: 'Cardiac Unit', bedNumber: 'C-04', floor: '3rd', type: 'ICU', status: 'occupied', patient: 'Robert Lee', department: 'Cardiac' },
  { id: '10', ward: 'Neurology Ward', bedNumber: 'N-11', floor: '4th', type: 'General', status: 'available', department: 'Neurology' },
  { id: '11', ward: 'Orthopedic Ward', bedNumber: 'O-07', floor: '3rd', type: 'General', status: 'occupied', patient: 'Maria Garcia', department: 'Orthopedics' },
  { id: '12', ward: 'Pulmonology Unit', bedNumber: 'PU-03', floor: '4th', type: 'General', status: 'available', department: 'Pulmonology' },
  { id: '13', ward: 'Oncology Wing', bedNumber: 'ON-09', floor: '5th', type: 'Private', status: 'occupied', patient: 'David Wilson', department: 'Oncology' },
  { id: '14', ward: 'Burn Unit', bedNumber: 'B-02', floor: '2nd', type: 'ICU', status: 'maintenance', department: 'Burn/Plastic Surgery' },
  { id: '15', ward: 'Nephrology Ward', bedNumber: 'NE-06', floor: '4th', type: 'General', status: 'available', department: 'Nephrology' },
];

const Beds = () => {
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
              78 Available
            </Badge>
            <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/20">
              118 Occupied
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
                />
              </div>
              <Select>
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
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
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
                <Button variant="outline" className="w-full mt-4 transition-medical">
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
              {beds.map((bed) => (
                <div
                  key={bed.id}
                  className={cn(
                    "p-4 rounded-lg border transition-medical hover:shadow-md cursor-pointer",
                    bed.status === 'available' && "border-success/20 bg-success-light/30 hover:bg-success-light/50",
                    bed.status === 'occupied' && "border-destructive/20 bg-destructive-light/30 hover:bg-destructive-light/50",
                    bed.status === 'maintenance' && "border-warning/20 bg-warning-light/30 hover:bg-warning-light/50",
                    bed.status === 'reserved' && "border-info/20 bg-info-light/30 hover:bg-info-light/50"
                  )}
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
                    <Button size="sm" className="w-full mt-3 gradient-primary text-primary-foreground">
                      Assign Patient
                    </Button>
                  )}

                  {bed.status === 'occupied' && (
                    <Button variant="outline" size="sm" className="w-full mt-3 transition-medical">
                      View Patient
                    </Button>
                  )}

                  {bed.status === 'maintenance' && (
                    <Button variant="outline" size="sm" className="w-full mt-3 transition-medical">
                      Schedule Repair
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Beds;