import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
interface BedInfo {
  id: string;
  ward: string;
  bedNumber: string;
  floor: string;
  type: 'ICU' | 'General' | 'Emergency' | 'Isolation' | 'Private';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  patient?: string;
  department: string;
  ddBeds: string; // Dedicated Discharge Beds
}

interface BloodStock {
  bloodType: string;
  units: number;
  expiryDate: string;
  status: 'normal' | 'low' | 'critical' | 'expired';
  lastUpdated: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  contactNumber: string;
  emergencyContact: string;
  medicalHistory: string;
  assignedBed?: string;
  bedId?: string;
}

interface HospitalContextType {
  beds: BedInfo[];
  patients: Patient[];
  bloodStock: BloodStock[];
  setBeds: React.Dispatch<React.SetStateAction<BedInfo[]>>;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  setBloodStock: React.Dispatch<React.SetStateAction<BloodStock[]>>;
  exportReport: (
    format: "pdf" | "excel",
    reportType: "beds" | "blood" | "analytics",
    options?: { dateRange?: string; includeCharts?: boolean; includeStats?: boolean }
  ) => Promise<void>;
}


const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};


export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [beds, setBeds] = useState<BedInfo[]>([]);
  const [bloodStock, setBloodStock] = useState<BloodStock[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wardFilter, setWardFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const assignPatientToBed = useCallback((bedId: string, patientId: string) => {
    setBeds(prev => prev.map(bed => 
      bed.id === bedId 
        ? { ...bed, status: 'occupied' as const, patient: patients.find(p => p.id === patientId)?.name }
        : bed
    ));
    toast({
      title: "Patient Assigned",
      description: "Patient has been successfully assigned to the bed.",
    });
  }, [patients, toast]);

  const updateBedStatus = useCallback((bedId: string, status: BedInfo['status']) => {
    setBeds(prev => prev.map(bed => 
      bed.id === bedId ? { ...bed, status } : bed
    ));
    toast({
      title: "Bed Status Updated",
      description: `Bed status has been updated to ${status}.`,
    });
  }, [toast]);

  const addBed = useCallback((bed: Omit<BedInfo, 'id'>) => {
    const newBed = { ...bed, id: Date.now().toString() };
    setBeds(prev => [...prev, newBed]);
    toast({
      title: "Bed Added Successfully",
      description: `Bed ${bed.bedNumber} has been added to ${bed.ward}.`,
    });
  }, [toast]);

  const addBloodUnits = useCallback((bloodType: string, units: number, expiryDate: string) => {
    setBloodStock(prev => prev.map(stock => 
      stock.bloodType === bloodType 
        ? { 
            ...stock, 
            units: stock.units + units,
            lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
          }
        : stock
    ));
    toast({
      title: "Blood Units Added",
      description: `${units} units of ${bloodType} have been added to inventory.`,
    });
  }, [toast]);

  const useBloodUnits = useCallback((bloodType: string, units: number) => {
    setBloodStock(prev => prev.map(stock => 
      stock.bloodType === bloodType 
        ? { 
            ...stock, 
            units: Math.max(0, stock.units - units),
            lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
          }
        : stock
    ));
    toast({
      title: "Blood Units Used",
      description: `${units} units of ${bloodType} have been used from inventory.`,
    });
  }, [toast]);

  const addPatient = useCallback((patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
    toast({
      title: "Patient Added",
      description: `${patient.name} has been registered successfully.`,
    });
  }, [toast]);

  const dischargePatient = useCallback((patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      // Remove patient from the list
      setPatients(prev => prev.filter(p => p.id !== patientId));
      
      // Free up the bed if patient was assigned to one
      if (patient.bedId) {
        setBeds(prev => prev.map(bed => 
          bed.bedNumber === patient.bedId 
            ? { ...bed, status: 'available' as const, patient: undefined }
            : bed
        ));
      }
      
      toast({
        title: "Patient Discharged",
        description: `${patient.name} has been successfully discharged.`,
      });
    }
  }, [patients, toast]);

const exportReport = useCallback(
  async (
    format: "pdf" | "excel",
    reportType: "beds" | "blood" | "analytics",
    options?: { dateRange?: string; includeCharts?: boolean; includeStats?: boolean }
  ) => {
    try {
      toast({
        title: `${format.toUpperCase()} Export Started`,
        description: "Your report is being generated...",
      });

      let url = "";

      if (reportType === "blood") {
        url = `/api/bloodbankexport/export/${format}`;
      } else if (reportType === "beds") {
        url = `/api/bedsexport/export/${format}`;
      } else if (reportType === "analytics") {
        const params = new URLSearchParams();
        if (options?.dateRange) params.append("dateRange", options.dateRange);
        if (options?.includeCharts) params.append("includeCharts", "true");
        if (options?.includeStats) params.append("includeStats", "true");
        url = `/api/analyticsexport/export/${format}?${params.toString()}`;
      }

      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `${reportType}-report-${Date.now()}.${format === "pdf" ? "pdf" : "xlsx"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(fileURL);

      toast({
        title: `${format.toUpperCase()} Export Ready`,
        description: "Your file has been downloaded.",
      });
    } catch (err) {
      console.error("Export error:", err);
      toast({
        title: "Export Failed",
        description: "Something went wrong while exporting.",
        variant: "destructive",
      });
    }
  },
  [toast]
);


  const value = useMemo(
    () => ({
      beds,
      patients,
      bloodStock,
      setBeds,
      setPatients,
      setBloodStock,
      exportReport,
    }),
    [beds, patients, bloodStock, exportReport]
  );

  return (
    <HospitalContext.Provider value={value}>{children}</HospitalContext.Provider>
  );
};