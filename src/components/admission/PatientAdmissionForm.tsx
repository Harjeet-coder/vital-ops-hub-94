import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Bed, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

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
  const [searchParams] = useSearchParams();
  const preSelectedBedId = searchParams.get("bedId");
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
        admissionDate: new Date().toISOString(),
        bedId: preSelectedBedId || null
      });

      const { admissionNumber, bedAssigned } = response.data;

      toast({
        title: "Admission Successful",
        description: `Admission No: ${admissionNumber}, Bed: ${bedAssigned}`
      });

      setAllocatedInfo({ admissionNumber, bedNumber: bedAssigned });
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
    {/* Left Side: Patient Form */}
    <div className="lg:col-span-2">
      <Card className="w-full shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <User className="w-5 h-5 text-primary" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Full Name *</Label>
                <Input
                  className="h-12 w-full rounded-xl bg-muted px-4"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Age *</Label>
                <Input
                  type="number"
                  className="h-12 w-full rounded-xl bg-muted px-4"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="e.g. 32"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Date of Birth *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 w-full justify-start rounded-xl bg-muted px-4 text-left font-normal"
                    >
                      {formData.dob ? (
                        format(new Date(formData.dob), "PPP") // e.g. Jan 5, 2001
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dob ? new Date(formData.dob) : undefined}
                      onSelect={(date) =>
                        handleInputChange("dob", date ? date.toISOString().split("T")[0] : "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Gender *</Label>
                <Select onValueChange={(val) => handleInputChange("gender", val)}>
                  <SelectTrigger className="h-12 w-full rounded-xl bg-muted px-4">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Blood Group *</Label>
                <Select onValueChange={(val) => handleInputChange("bloodGroup", val)}>
                  <SelectTrigger className="h-12 w-full rounded-xl bg-muted px-4">
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

            {/* Row 3 */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Primary Diagnosis</Label>
              <Input
                className="h-12 w-full rounded-xl bg-muted px-4"
                value={formData.disease}
                onChange={(e) => handleInputChange("disease", e.target.value)}
                placeholder="e.g. Diabetes, Asthma"
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Admission Type *</Label>
                <Select onValueChange={(val) => handleInputChange("admissiontype", val)}>
                  <SelectTrigger className="h-12 w-full rounded-xl bg-muted px-4">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="Outpatient">Outpatient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Department *</Label>
                <Select onValueChange={(val) => handleInputChange("department", val)}>
                  <SelectTrigger className="h-12 w-full rounded-xl bg-muted px-4">
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

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Assigned Doctor</Label>
                <Input
                  className="h-12 w-full rounded-xl bg-muted px-4"
                  value={formData.doctor}
                  onChange={(e) => handleInputChange("doctor", e.target.value)}
                  placeholder="Enter assigned doctor name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Emergency Contact *</Label>
                <Input
                  className="h-12 w-full rounded-xl bg-muted px-4"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Address</Label>
              <Input
                className="h-12 w-full rounded-xl bg-muted px-4"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter patient address"
              />
            </div>

            {/* Row 7 */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Medical History</Label>
              <Textarea
                className="min-h-[120px] w-full rounded-xl bg-muted px-4 py-3"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                placeholder="Enter past medical conditions"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-14 text-lg rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Admit Patient
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    {/* Right Side: Admission Details */}
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-md">
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
