import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Bed, User, Stethoscope, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Props interface added
interface PatientAdmissionFormProps {
  onSuccess?: () => void;
}

interface PatientForm {
  name: string;
  age: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  disease: string;
  admissiontype: string;
  department: string;
  doctor: string;
  emergencyContact: string;
  medicalHistory: string;
  address: string;
}

export function PatientAdmissionForm({ onSuccess }: PatientAdmissionFormProps) {
  const { toast } = useToast();

  const [formData, setFormData] = useState<PatientForm>({
    name: '',
    age: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    disease: '',
    admissiontype: '',
    department: '',
    doctor: '',
    emergencyContact: '',
    medicalHistory: '',
    address: ''
  });

  const [allocatedInfo, setAllocatedInfo] = useState<{
    admissionNumber: string;
    bedNumber: string;
  } | null>(null);

  const departments = [
    'General', 'ICU', 'Emergency', 'Pediatric', 'Maternity',
    'Surgical', 'Cardiac', 'Neurology', 'Orthopedics',
    'Pulmonology', 'Oncology', 'Burn/Plastic Surgery', 'Nephrology'
  ];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];

  const handleInputChange = (field: keyof PatientForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.age || !formData.bloodGroup || !formData.department || !formData.admissiontype || !formData.dob) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await axios.post("/api/patients", {
        ...formData,
        ward: formData.department,
        primarymedicalcondititon: formData.disease,
        reasonForAdmitting: formData.disease,
        admissionDate: new Date().toISOString()
      });

      const { admissionNumber, bedAssigned } = response.data;

      toast({
        title: "Admission Successful",
        description: `Admission No: ${admissionNumber}, Bed: ${bedAssigned}`
      });

      setAllocatedInfo({ admissionNumber, bedNumber: bedAssigned });

      // ✅ Notify parent to refresh
      if (onSuccess) onSuccess();

      setFormData({
        name: '', age: '', dob: '', gender: '', bloodGroup: '', disease: '',
        admissiontype: '', department: '', doctor: '', emergencyContact: '',
        medicalHistory: '', address: ''
      });
    } catch (error: any) {
      toast({
        title: "Admission Failed",
        description: error?.response?.data?.error || "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary rounded-lg">
          <UserPlus className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Admission</h1>
          <p className="text-muted-foreground">Register new patient and auto-allocate bed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                  </div>
                  <div>
                    <Label>Age *</Label>
                    <Input type="number" value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} />
                  </div>
                  <div>
                    <Label>Date of Birth *</Label>
                    <Input type="date" value={formData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Gender *</Label>
                    <Select onValueChange={(val) => handleInputChange('gender', val)}>
                      <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Blood Group *</Label>
                    <Select onValueChange={(val) => handleInputChange('bloodGroup', val)}>
                      <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map(group => <SelectItem key={group} value={group}>{group}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Primary Diagnosis</Label>
                  <Input value={formData.disease} onChange={(e) => handleInputChange('disease', e.target.value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Admission Type *</Label>
                    <Select onValueChange={(val) => handleInputChange('admissiontype', val)}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                        <SelectItem value="Outpatient">Outpatient</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Department *</Label>
                    <Select onValueChange={(val) => handleInputChange('department', val)}>
                      <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Assigned Doctor</Label>
                    <Select onValueChange={(val) => handleInputChange('doctor', val)}>
                      <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                      <SelectContent>
                        {doctors.map(doc => <SelectItem key={doc} value={doc}>{doc}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Emergency Contact *</Label>
                    <Input value={formData.emergencyContact} onChange={(e) => handleInputChange('emergencyContact', e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  <Input value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                </div>

                <div>
                  <Label>Medical History</Label>
                  <Textarea value={formData.medicalHistory} onChange={(e) => handleInputChange('medicalHistory', e.target.value)} />
                </div>

                <Button type="submit" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" /> Admit Patient
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bed className="w-5 h-5 text-primary" />
                <span>Admission Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allocatedInfo ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Admission Number:</p>
                  <p className="font-medium">{allocatedInfo.admissionNumber}</p>
                  <p className="text-sm text-muted-foreground">Bed Allocated:</p>
                  <p className="font-medium">{allocatedInfo.bedNumber}</p>
                  <Badge className="mt-2" variant="secondary">Status: Admitted</Badge>
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Submit the form to allocate bed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
