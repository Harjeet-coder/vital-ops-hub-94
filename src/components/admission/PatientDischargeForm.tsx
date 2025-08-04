import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UserMinus,
  User,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DischargeForm {
  admissionId: string;
  patientName: string;
  dob: string;
}

interface PatientDischargeFormProps {
  onSuccess?: () => void; // ✅ new prop
}

export function PatientDischargeForm({ onSuccess }: PatientDischargeFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DischargeForm>({
    admissionId: "",
    patientName: "",
    dob: "",
  });
  const [verifiedPatient, setVerifiedPatient] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (field: keyof DischargeForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (verifiedPatient) setVerifiedPatient(null);
  };

  const handleVerifyPatient = async () => {
    if (!formData.admissionId || !formData.patientName || !formData.dob) return;

    setIsVerifying(true);
    try {
      const res = await axios.get("/api/patients/search", {
        params: {
          admissionNumber: formData.admissionId,
          dob: formData.dob,
        },
      });

      const matched = res.data.find(
        (p: any) =>
          p.name.trim().toLowerCase().includes(formData.patientName.trim().toLowerCase())
      );

      if (matched) {
        setVerifiedPatient(matched);
        toast({
          title: "Patient Verified",
          description: `${matched.name} is ready for discharge.`,
        });
      } else {
        toast({
          title: "Verification Failed",
          description: "Patient not found or name mismatch.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Verification Error",
        description: "Could not search patient. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDischarge = async () => {
    if (!verifiedPatient) return;
    try {
      await axios.put(`/api/patients/discharge/${verifiedPatient._id}`);
      toast({
        title: "Patient Discharged",
        description: `${verifiedPatient.name} has been discharged.`,
      });
      setFormData({ admissionId: "", patientName: "", dob: "" });
      setVerifiedPatient(null);

      // ✅ trigger refresh in parent
      onSuccess?.();
    } catch (err) {
      toast({
        title: "Discharge Failed",
        description: "Could not discharge patient.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-red-500 rounded-lg">
          <UserMinus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Discharge</h1>
          <p className="text-muted-foreground">Verify patient details and discharge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Patient Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="admissionId">Admission ID *</Label>
                  <Input
                    id="admissionId"
                    value={formData.admissionId}
                    onChange={(e) => handleInputChange("admissionId", e.target.value)}
                    placeholder="e.g. ICU20250001"
                  />
                </div>
                <div>
                  <Label htmlFor="patientName">Patient Full Name *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                  />
                </div>

                <Button onClick={handleVerifyPatient} disabled={isVerifying} className="w-full">
                  {isVerifying ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" /> Verify Patient
                    </>
                  )}
                </Button>

                {verifiedPatient && (
                  <>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Patient Verified</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ID:</span>
                          <span className="font-medium">{verifiedPatient.admissionNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{verifiedPatient.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="outline" className="text-success">{verifiedPatient.status}</Badge>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleDischarge}
                      className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Discharge Patient
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Discharge Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Discharge Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discharge Time:</span>
                <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processed By:</span>
                <span className="font-medium">Dr. Admin</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
