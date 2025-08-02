import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PatientAdmissionForm } from "@/components/admission/PatientAdmissionForm";
import { UserPlus, UserCheck, Clock, Calendar, AlertCircle, User, Plus, Activity, Users, Stethoscope } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useHospital } from "@/providers/HospitalProvider";
import admissionHero from "@/assets/admission-hero.jpg";

const Admission = () => {
  const { patients, addPatient } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  // Filter patients based on search and filters
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = searchTerm === '' || 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;
      
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
        {/* Hero Section */}
        <div 
          className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{ backgroundImage: `url(${admissionHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center justify-between p-8">
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-2">Patient Admission</h1>
                  <p className="text-xl text-white/90">Register new patients and manage admissions efficiently</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold">{totalAdmissions} Total Patients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold">{todayAdmissions} Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalAdmissions}</p>
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium">Total Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{todayAdmissions}</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Today's Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{pendingAdmissions}</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">Pending Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{emergencyAdmissions}</p>
                  <p className="text-sm text-red-700 dark:text-red-300 font-medium">Emergency Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filter Section */}
        <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search patients by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg focus:border-primary focus:shadow-xl transition-all duration-300"
                />
              </div>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-48 h-12 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2 shadow-2xl">
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
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

        {/* Enhanced Patients List */}
        <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="medical-card-header bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              <span>Patient Records</span>
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary/20">
                {filteredPatients.length} Patients
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredPatients.map((patient: any, index) => (
                <div 
                  key={patient.id} 
                  className="p-6 border border-border/20 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{patient.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">ID: {patient.id}</span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">Age: {patient.age}</span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">Gender: {patient.gender}</span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">Contact: {patient.contactNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={cn(
                          "px-3 py-2 text-sm font-semibold rounded-xl",
                          patient.bedId ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300" : "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300"
                        )}
                      >
                        {patient.bedId ? `Bed: ${patient.bedId}` : 'No Bed Assigned'}
                      </Badge>
                      <span className="text-sm text-muted-foreground px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">{patient.admissionDate || 'N/A'}</span>
                    </div>
                  </div>
                  {patient.medicalHistory && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                      <strong className="text-foreground flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-primary" />
                        <span>Medical History:</span>
                      </strong> 
                      <p className="text-sm text-muted-foreground mt-1">{patient.medicalHistory}</p>
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