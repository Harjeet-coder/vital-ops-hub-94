import { useState, useMemo, useEffect } from "react";
import axios from "axios";

import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PatientAdmissionForm } from "@/components/admission/PatientAdmissionForm";
import { PatientDischargeForm } from "@/components/admission/PatientDischargeForm";

import {
  UserPlus,
  UserCheck,
  Clock,
  Calendar,
  AlertCircle,
  User,
  Plus,
  Activity,
  Users,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import admissionHero from "@/assets/admission-hero.jpg";

const Admission = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    }
  };

  const fetchPatientDetails = async (id) => {
    try {
      setPatientDetails(null); // reset before fetching
      const res = await axios.get(`/api/patients/${id}`);
      setPatientDetails(res.data);
      setOpenDetails(true);
    } catch (err) {
      console.error("Failed to fetch patient details", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on search and filters
const filteredPatients = useMemo(() => {
  return patients.filter((patient) => {
    const matchesSearch =
      searchTerm === "" ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      genderFilter === "all" || patient.gender?.toLowerCase() === genderFilter;

    const notDischarged = patient.status?.toLowerCase() !== 'discharged';

    return matchesSearch && matchesGender && notDischarged;
  });
}, [patients, searchTerm, genderFilter]);


  // Stats
  const totalAdmissions = patients.length;
  const todayAdmissions = patients.filter((p) => {
    const date = new Date(p.admissionDate);
    return date.toDateString() === new Date().toDateString();
  }).length;
  const pendingAdmissions = patients.filter((p) => !p.bed).length;
  const emergencyAdmissions = patients.filter((p) =>
    p.medicalHistory?.toLowerCase().includes("emergency")
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
                  <p className="text-xl text-white/90">
                    Register new patients and manage admissions efficiently
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold">
                    {totalAdmissions} Total Patients
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold">
                    {todayAdmissions} Today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Repeat similar Cards for totalAdmissions, todayAdmissions, etc. */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    {totalAdmissions}
                  </p>
                  <p className="text-sm text-green-700">Total Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">
                    {todayAdmissions}
                  </p>
                  <p className="text-sm text-blue-700">Today's Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">
                    {pendingAdmissions}
                  </p>
                  <p className="text-sm text-orange-700">Pending Admissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-red-50 to-red-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500 rounded-xl shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">
                    {emergencyAdmissions}
                  </p>
                  <p className="text-sm text-red-700">Emergency Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search, Filter & Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 w-4 h-8" />
                      Add New Patient
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ScrollArea className="h-[80vh] pr-4">
                      <PatientAdmissionForm onSuccess={fetchPatients} />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="danger">
                      <UserPlus className="mr-2 w-4 h-4" />
                      Patient Discharge
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ScrollArea className="h-[80vh] pr-4">
                      <PatientDischargeForm />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              <span>Patient Records</span>
              <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">
                {filteredPatients.length} Patients
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPatients.length === 0 && (
              <p className="text-center text-muted-foreground py-6">
                No matching patients found.
              </p>
            )}
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient._id}
                  onClick={()=>fetchPatientDetails(patient._id)}
                  className="p-6 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{patient.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {patient.admissionNumber} | Age: {patient.age} | Gender:{" "}
                        {patient.gender}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={cn(
                          "rounded-xl text-sm px-3 py-1",
                          patient.bed
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        )}
                      >
                        {patient.bed ? `Bed: ${patient.bed.bedNumber}` : "No Bed"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(patient.admissionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {patient.medicalHistory && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <strong>History:</strong> {patient.medicalHistory}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Patient Details Dialog */}
        <Dialog open={openDetails} onOpenChange={setOpenDetails}>
          <DialogContent className="max-w-lg">
            {patientDetails ? (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{patientDetails.name}</h2>
                <p><strong>Admission Number:</strong> {patientDetails.admissionNumber}</p>
                <p><strong>Age:</strong> {patientDetails.age}</p>
                <p><strong>DOB:</strong>{patientDetails.dob}</p>
                <p><strong>Gender:</strong> {patientDetails.gender}</p>
                <p><strong>Status:</strong> {patientDetails.status}</p>
                <p><strong>Contact No</strong>{patientDetails.emergencyContact}</p>
                <p><strong>Doctor Name</strong>{patientDetails.doctor}</p>
                <p><strong>Admission Date:</strong> {new Date(patientDetails.admissionDate).toLocaleDateString()}</p>
                {patientDetails.dischargedAt && (
                  <p><strong>Discharged At:</strong> {new Date(patientDetails.dischargedAt).toLocaleDateString()}</p>
                )}
                {patientDetails.bed && (
                  <p><strong>Bed Assigned:</strong> {patientDetails.bed.bedNumber} ({patientDetails.bed.ward})</p>
                )}
                {patientDetails.medicalHistory && (
                  <p><strong>Medical History:</strong> {patientDetails.medicalHistory}</p>
                )}
              </div>
            ) : (
              <p>Loading patient details...</p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Admission;
