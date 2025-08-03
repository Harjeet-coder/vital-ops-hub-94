import React, { createContext, useContext, useState, useCallback } from 'react';
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
  gender: string;
  contactNumber: string;
  emergencyContact: string;
  medicalHistory: string;
  assignedBed?: string;
}

interface HospitalContextType {
  // Bed Management
  beds: BedInfo[];
  assignPatientToBed: (bedId: string, patientId: string) => void;
  updateBedStatus: (bedId: string, status: BedInfo['status']) => void;
  
  // Blood Bank Management
  bloodStock: BloodStock[];
  addBloodUnits: (bloodType: string, units: number, expiryDate: string) => void;
  useBloodUnits: (bloodType: string, units: number) => void;
  
  // Patient Management
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  
  // Filters and Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  wardFilter: string;
  setWardFilter: (ward: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  
  // Export functionality
  exportReport: (type: 'pdf' | 'excel', data: any) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};

const initialBeds: BedInfo[] = [
  { id: '1', ward: 'General Ward A', bedNumber: 'A-15', floor: '3rd', type: 'General', status: 'occupied', patient: 'Jane Smith', department: 'General Medicine', ddBeds: 'DD-A15' },
  { id: '2', ward: 'General Ward A', bedNumber: 'A-16', floor: '3rd', type: 'General', status: 'available', department: 'General Medicine', ddBeds: 'DD-A16' },
  { id: '3', ward: 'ICU Ward 1', bedNumber: 'I-01', floor: '2nd', type: 'ICU', status: 'occupied', patient: 'John Doe', department: 'ICU', ddBeds: 'DD-I01' },
  { id: '4', ward: 'ICU Ward 1', bedNumber: 'I-02', floor: '2nd', type: 'ICU', status: 'available', department: 'ICU', ddBeds: 'DD-I02' },
  { id: '5', ward: 'Emergency Ward', bedNumber: 'E-03', floor: '1st', type: 'Emergency', status: 'maintenance', department: 'Emergency', ddBeds: 'DD-E03' },
  { id: '6', ward: 'Pediatric Ward', bedNumber: 'P-08', floor: '3rd', type: 'General', status: 'available', department: 'Pediatric', ddBeds: 'DD-P08' },
  { id: '7', ward: 'Maternity Ward', bedNumber: 'M-12', floor: '4th', type: 'Private', status: 'occupied', patient: 'Sarah Johnson', department: 'Maternity', ddBeds: 'DD-M12' },
  { id: '8', ward: 'Surgical Ward', bedNumber: 'S-05', floor: '2nd', type: 'General', status: 'reserved', department: 'Surgical', ddBeds: 'DD-S05' },
  { id: '9', ward: 'Cardiac Unit', bedNumber: 'C-04', floor: '3rd', type: 'ICU', status: 'occupied', patient: 'Robert Lee', department: 'Cardiac', ddBeds: 'DD-C04' },
  { id: '10', ward: 'Neurology Ward', bedNumber: 'N-11', floor: '4th', type: 'General', status: 'available', department: 'Neurology', ddBeds: 'DD-N11' },
  { id: '11', ward: 'Orthopedic Ward', bedNumber: 'O-07', floor: '3rd', type: 'General', status: 'occupied', patient: 'Maria Garcia', department: 'Orthopedics', ddBeds: 'DD-O07' },
  { id: '12', ward: 'Pulmonology Unit', bedNumber: 'PU-03', floor: '4th', type: 'General', status: 'available', department: 'Pulmonology', ddBeds: 'DD-PU03' },
  { id: '13', ward: 'Oncology Wing', bedNumber: 'ON-09', floor: '5th', type: 'Private', status: 'occupied', patient: 'David Wilson', department: 'Oncology', ddBeds: 'DD-ON09' },
  { id: '14', ward: 'Burn Unit', bedNumber: 'B-02', floor: '2nd', type: 'ICU', status: 'maintenance', department: 'Burn/Plastic Surgery', ddBeds: 'DD-B02' },
  { id: '15', ward: 'Nephrology Ward', bedNumber: 'NE-06', floor: '4th', type: 'General', status: 'available', department: 'Nephrology', ddBeds: 'DD-NE06' },
];

const initialBloodStock: BloodStock[] = [
  { bloodType: 'A+', units: 25, expiryDate: '2024-02-15', status: 'normal', lastUpdated: '2024-01-20 10:30' },
  { bloodType: 'A-', units: 8, expiryDate: '2024-02-10', status: 'low', lastUpdated: '2024-01-20 09:15' },
  { bloodType: 'B+', units: 32, expiryDate: '2024-02-20', status: 'normal', lastUpdated: '2024-01-20 11:45' },
  { bloodType: 'B-', units: 5, expiryDate: '2024-02-08', status: 'critical', lastUpdated: '2024-01-20 08:20' },
  { bloodType: 'AB+', units: 15, expiryDate: '2024-02-18', status: 'normal', lastUpdated: '2024-01-20 12:10' },
  { bloodType: 'AB-', units: 3, expiryDate: '2024-02-12', status: 'critical', lastUpdated: '2024-01-20 07:55' },
  { bloodType: 'O+', units: 45, expiryDate: '2024-02-25', status: 'normal', lastUpdated: '2024-01-20 13:30' },
  { bloodType: 'O-', units: 12, expiryDate: '2024-02-14', status: 'low', lastUpdated: '2024-01-20 14:15' },
];

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [beds, setBeds] = useState<BedInfo[]>(initialBeds);
  const [bloodStock, setBloodStock] = useState<BloodStock[]>(initialBloodStock);
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

  const exportReport = useCallback((type: 'pdf' | 'excel', data: any) => {
    // Simulate export functionality
    toast({
      title: `${type.toUpperCase()} Export Started`,
      description: "Your report is being generated and will download shortly.",
    });
    
    // Create a blob URL for download simulation
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hospital-report-${Date.now()}.${type === 'pdf' ? 'json' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [toast]);

  const value: HospitalContextType = {
    beds,
    assignPatientToBed,
    updateBedStatus,
    bloodStock,
    addBloodUnits,
    useBloodUnits,
    patients,
    addPatient,
    searchTerm,
    setSearchTerm,
    wardFilter,
    setWardFilter,
    statusFilter,
    setStatusFilter,
    exportReport,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};