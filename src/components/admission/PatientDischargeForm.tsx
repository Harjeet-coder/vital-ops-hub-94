import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserMinus, User, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHospital } from "@/providers/HospitalProvider";

interface DischargeForm {
  admissionId: string;
  patientName: string;
  dob: string;
}

export function PatientDischargeForm() {
  const { toast } = useToast();
  const { patients, dischargePatient } = useHospital();
  const [formData, setFormData] = useState<DischargeForm>({
    admissionId: '',
    patientName: '',
    dob: ''
  });
  const [verifiedPatient, setVerifiedPatient] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (field: keyof DischargeForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear verification when form changes
    if (verifiedPatient) {
      setVerifiedPatient(null);
    }
  };

  const handleVerifyPatient = async () => {
    setIsVerifying(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find patient matching all criteria
    const patient = patients.find(p => 
      p.id === formData.admissionId && 
      p.name.toLowerCase() === formData.patientName.toLowerCase() &&
      p.dob === formData.dob
    );

    if (patient) {
      setVerifiedPatient(patient);
      toast({
        title: "Patient Verified",
        description: `${patient.name} is ready for discharge.`,
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "Patient details do not match our records. Please check the information.",
        variant: "destructive"
      });
    }
    
    setIsVerifying(false);
  };

  const handleDischarge = () => {
    if (!verifiedPatient) return;

    dischargePatient(verifiedPatient.id);
    
    toast({
      title: "Patient Discharged Successfully",
      description: `${verifiedPatient.name} has been discharged from the hospital.`,
    });

    // Reset form
    setFormData({ admissionId: '', patientName: '', dob: '' });
    setVerifiedPatient(null);
  };

  const canVerify = formData.admissionId && formData.patientName && formData.dob;
  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-red-500 rounded-lg">
          <UserMinus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Discharge</h1>
          <p className="text-muted-foreground">Verify patient details and process discharge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Form */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Patient Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admissionId">Admission ID *</Label>
                  <Input
                    id="admissionId"
                    value={formData.admissionId}
                    onChange={(e) => handleInputChange('admissionId', e.target.value)}
                    placeholder="Enter patient admission ID (e.g., P1642445678901)"
                    className="transition-medical"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Full Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    placeholder="Enter patient's full name"
                    className="transition-medical"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="transition-medical"
                  />
                </div>

                <Button 
                  onClick={handleVerifyPatient}
                  disabled={!canVerify || isVerifying}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  {isVerifying ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Patient
                    </>
                  )}
                </Button>

                {/* Verification Result */}
                {verifiedPatient && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl dark:bg-green-900/20 dark:border-green-800/50">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-300">Patient Verified Successfully</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patient ID:</span>
                        <span className="font-medium">{verifiedPatient.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{verifiedPatient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span className="font-medium">{verifiedPatient.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gender:</span>
                        <span className="font-medium">{verifiedPatient.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assigned Bed:</span>
                        <span className="font-medium">{verifiedPatient.bedId || 'No bed assigned'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Discharge Button */}
                {verifiedPatient && (
                  <Button 
                    onClick={handleDischarge}
                    className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Discharge Patient
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Sidebar */}
        <div className="space-y-6">
          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Discharge Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-300">Required Information</span>
                  </div>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Valid Admission ID</li>
                    <li>• Patient's Full Name</li>
                    <li>• Date of Birth</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Discharge Date:</span>
                    <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Discharge Time:</span>
                    <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processed By:</span>
                    <span className="text-sm font-medium">Dr. Admin</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Today's Discharges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Discharges</span>
                  <Badge variant="outline" className="text-success border-success">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Discharges</span>
                  <Badge variant="outline" className="text-warning border-warning">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Readmissions</span>
                  <Badge variant="outline" className="text-destructive border-destructive">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}