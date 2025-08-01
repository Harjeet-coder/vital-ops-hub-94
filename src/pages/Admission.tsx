import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PatientAdmissionForm } from "@/components/admission/PatientAdmissionForm";
import { UserPlus, UserCheck, Clock, Calendar, AlertCircle, User, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useHospital } from "@/providers/HospitalProvider";

const Admission = () => {
  const { patients, addPatient } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Filter patients based on search and filters
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = searchTerm === '' || 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGender = genderFilter === '' || patient.gender === genderFilter;
      
      return matchesSearch && matchesGender;
    });
  }, [patients, searchTerm, genderFilter]);

  const handleAddPatient = (patientData: any) => {
    const newPatient = {
      ...patientData,
      id: `P${Date.now()}`,
      admissionDate: new Date().toLocaleDateString(),
    };
    addPatient(newPatient);
  };

  // Calculate stats
  const totalAdmissions = patients.length;
  const todayAdmissions = patients.filter((p: any) => 
    new Date(p.admissionDate || new Date()).toDateString() === new Date().toDateString()
  ).length;
  const pendingAdmissions = patients.filter((p: any) => !p.bedId).length;
  const emergencyAdmissions = patients.filter((p: any) => 
    p.medicalHistory?.toLowerCase().includes('emergency')
  ).length;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-lg">
              <UserPlus className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patient Admission</h1>
              <p className="text-muted-foreground">Register new patients and manage admissions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-success-light text-success border-success/20">
              {patients.length} Total Patients
            </Badge>
            <Badge variant="outline" className="bg-info-light text-info border-info/20">
              {filteredPatients.length} Filtered
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success-light rounded-lg">
                  <UserCheck className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalAdmissions}</p>
                  <p className="text-sm text-muted-foreground">Total Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-info-light rounded-lg">
                  <Clock className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{todayAdmissions}</p>
                  <p className="text-sm text-muted-foreground">Today's Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning-light rounded-lg">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingAdmissions}</p>
                  <p className="text-sm text-muted-foreground">Pending Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-destructive-light rounded-lg">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{emergencyAdmissions}</p>
                  <p className="text-sm text-muted-foreground">Emergency Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search patients by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-animated gradient-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Patient
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <PatientAdmissionForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle>Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient: any) => (
                <div key={patient.id} className="p-4 border border-border/20 rounded-lg hover:bg-accent/50 transition-medical">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>ID: {patient.id}</span>
                          <span>Age: {patient.age}</span>
                          <span>Gender: {patient.gender}</span>
                          <span>Contact: {patient.contactNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={cn(
                          "px-2 py-1",
                          patient.bedId ? "status-available" : "bg-warning-light text-warning border-warning/20"
                        )}
                      >
                        {patient.bedId ? `Bed: ${patient.bedId}` : 'No Bed Assigned'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{patient.admissionDate || 'N/A'}</span>
                    </div>
                  </div>
                  {patient.medicalHistory && (
                    <div className="mt-2 p-2 bg-accent rounded text-sm text-muted-foreground">
                      <strong className="text-foreground">Medical History:</strong> {patient.medicalHistory}
                    </div>
                  )}
                </div>
              ))}
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No patients found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Admission;