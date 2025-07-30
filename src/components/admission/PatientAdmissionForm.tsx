import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Bed, User, Stethoscope, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientForm {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  disease: string;
  admissionType: string;
  department: string;
  doctor: string;
  emergencyContact: string;
  medicalHistory: string;
}

export function PatientAdmissionForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PatientForm>({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    disease: '',
    admissionType: '',
    department: '',
    doctor: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  const [allocatedBed, setAllocatedBed] = useState<{
    ward: string;
    bedNumber: string;
    floor: string;
  } | null>(null);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const departments = ['General Medicine', 'ICU', 'Emergency', 'Pediatric', 'Maternity', 'Surgical', 'Cardiac', 'Neurology', 'Orthopedics', 'Pulmonology', 'Oncology', 'Burn/Plastic Surgery', 'Nephrology'];
  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];

  const handleInputChange = (field: keyof PatientForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-allocate bed when department is selected
    if (field === 'department' && value) {
      allocateBed(value);
    }
  };

  const allocateBed = (department: string) => {
    // Simulated bed allocation logic
    const bedAllocations = {
      'General Medicine': { ward: 'General Ward A', bedNumber: 'A-23', floor: '2nd Floor' },
      'ICU': { ward: 'ICU Ward 1', bedNumber: 'I-07', floor: '2nd Floor' },
      'Emergency': { ward: 'Emergency Ward', bedNumber: 'E-03', floor: '1st Floor' },
      'Pediatric': { ward: 'Pediatric Ward', bedNumber: 'P-12', floor: '3rd Floor' },
      'Maternity': { ward: 'Maternity Ward', bedNumber: 'M-08', floor: '4th Floor' },
      'Surgical': { ward: 'Surgical Ward', bedNumber: 'S-15', floor: '2nd Floor' },
      'Cardiac': { ward: 'Cardiac Unit', bedNumber: 'C-09', floor: '3rd Floor' },
      'Neurology': { ward: 'Neurology Ward', bedNumber: 'N-11', floor: '4th Floor' },
      'Orthopedics': { ward: 'Orthopedic Ward', bedNumber: 'O-14', floor: '3rd Floor' },
      'Pulmonology': { ward: 'Pulmonology Unit', bedNumber: 'PU-06', floor: '4th Floor' },
      'Oncology': { ward: 'Oncology Wing', bedNumber: 'ON-10', floor: '5th Floor' },
      'Burn/Plastic Surgery': { ward: 'Burn Unit', bedNumber: 'B-05', floor: '2nd Floor' },
      'Nephrology': { ward: 'Nephrology Ward', bedNumber: 'NE-07', floor: '4th Floor' },
    };

    setAllocatedBed(bedAllocations[department as keyof typeof bedAllocations] || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age || !formData.bloodGroup || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Patient Admitted Successfully",
      description: `${formData.name} has been admitted to ${allocatedBed?.ward}, Bed ${allocatedBed?.bedNumber}`,
    });

    // Reset form
    setFormData({
      name: '', age: '', gender: '', bloodGroup: '', disease: '', 
      admissionType: '', department: '', doctor: '', emergencyContact: '', medicalHistory: ''
    });
    setAllocatedBed(null);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary rounded-lg">
          <UserPlus className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Admission</h1>
          <p className="text-muted-foreground">Register new patient and allocate bed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter patient's full name"
                      className="transition-medical"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Age"
                      className="transition-medical"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Group *</Label>
                    <Select onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disease">Primary Diagnosis</Label>
                  <Input
                    id="disease"
                    value={formData.disease}
                    onChange={(e) => handleInputChange('disease', e.target.value)}
                    placeholder="Primary medical condition"
                    className="transition-medical"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Admission Type</Label>
                    <Select onValueChange={(value) => handleInputChange('admissionType', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select admission type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="outpatient">Outpatient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Department *</Label>
                    <Select onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Assigned Doctor</Label>
                    <Select onValueChange={(value) => handleInputChange('doctor', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Contact number"
                      className="transition-medical"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="history">Medical History</Label>
                  <Textarea
                    id="history"
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                    placeholder="Brief medical history and allergies"
                    className="min-h-24 transition-medical"
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Admit Patient
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bed Allocation Sidebar */}
        <div className="space-y-6">
          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <Bed className="w-5 h-5 text-primary" />
                <span>Bed Allocation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {allocatedBed ? (
                <div className="space-y-4">
                  <div className="p-4 bg-success-light border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bed className="w-4 h-4 text-success" />
                      <span className="font-medium text-success">Bed Allocated</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ward:</span>
                        <span className="font-medium">{allocatedBed.ward}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bed:</span>
                        <span className="font-medium">{allocatedBed.bedNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Floor:</span>
                        <span className="font-medium">{allocatedBed.floor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Bed Features</h4>
                    <div className="space-y-1">
                      <Badge variant="secondary">Private Room</Badge>
                      <Badge variant="secondary">Wi-Fi Available</Badge>
                      <Badge variant="secondary">Nurse Call System</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Select a department to auto-allocate bed</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-primary" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Today's Admissions</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Discharges</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Beds</span>
                  <Badge variant="outline" className="text-success border-success">78</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Critical Patients</span>
                  <Badge variant="outline" className="text-destructive border-destructive">12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}