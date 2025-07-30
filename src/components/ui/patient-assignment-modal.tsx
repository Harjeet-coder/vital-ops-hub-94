import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus } from 'lucide-react';
import { useHospital } from '@/providers/HospitalProvider';

interface PatientAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bedId: string;
  bedNumber: string;
}

export const PatientAssignmentModal: React.FC<PatientAssignmentModalProps> = ({ 
  isOpen, 
  onClose, 
  bedId, 
  bedNumber 
}) => {
  const { addPatient, assignPatientToBed } = useHospital();
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    emergencyContact: '',
    medicalHistory: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add patient to system
    const newPatient = {
      ...patientData,
      age: parseInt(patientData.age),
    };
    
    addPatient(newPatient);
    
    // Assign patient to bed (simplified - in real system would use proper patient ID)
    assignPatientToBed(bedId, Date.now().toString());
    
    // Reset form and close modal
    setPatientData({
      name: '',
      age: '',
      gender: '',
      contactNumber: '',
      emergencyContact: '',
      medicalHistory: '',
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-primary" />
            <span>Assign Patient to Bed {bedNumber}</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Patient Name</Label>
            <Input
              id="name"
              value={patientData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter patient name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={patientData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Age"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={patientData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              value={patientData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              placeholder="Phone number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergency">Emergency Contact</Label>
            <Input
              id="emergency"
              value={patientData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              placeholder="Emergency contact number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="history">Medical History</Label>
            <Textarea
              id="history"
              value={patientData.medicalHistory}
              onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
              placeholder="Brief medical history..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              Assign Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};