import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bed, Plus, CheckCircle, AlertCircle, Monitor, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHospital } from "@/providers/HospitalProvider";

interface BedForm {
  ward: string;
  bedNumber: string;
  floor: string;
  type: 'ICU' | 'General' | 'Emergency' | 'Isolation' | 'Private';
  department: string;
  ddBeds: string;
  oxygenSupport: boolean;
  monitoringEquipment: boolean;
  status: 'available' | 'occupied' | 'maintenance';
}

export function AddBedForm() {
  const { toast } = useToast();
  const { addBed } = useHospital();
  const [formData, setFormData] = useState<BedForm>({
    ward: '',
    bedNumber: '',
    floor: '',
    type: 'General',
    department: '',
    ddBeds: '',
    oxygenSupport: false,
    monitoringEquipment: false,
    status: 'available'
  });

  const validWards = [
    'General Ward A', 'General Ward B', 'ICU Ward 1', 'ICU Ward 2', 
    'Emergency Ward', 'Pediatric Ward', 'Maternity Ward', 'Surgical Ward',
    'Cardiac Unit', 'Neurology Ward', 'Orthopedic Ward', 'Pulmonology Unit',
    'Oncology Wing', 'Burn Unit', 'Nephrology Ward'
  ];

  const departments = [
    'General Medicine', 'ICU', 'Emergency', 'Pediatric', 'Maternity', 
    'Surgical', 'Cardiac', 'Neurology', 'Orthopedics', 'Pulmonology', 
    'Oncology', 'Burn/Plastic Surgery', 'Nephrology'
  ];

  const floors = ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];

  const handleInputChange = (field: keyof BedForm, value: string | boolean) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-generate DD Beds when bed number changes
      if (field === 'bedNumber' && typeof value === 'string') {
        newData.ddBeds = `DD-${value}`;
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.ward || !formData.bedNumber || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new bed object
    const newBed = {
      ...formData,
      id: Date.now().toString(),
      patient: undefined
    };

    // Add bed using the provider
    if (addBed) {
      addBed(newBed);
    }

    toast({
      title: "Bed Added Successfully",
      description: `Bed ${formData.bedNumber} has been added to ${formData.ward}`,
    });

    // Reset form
    setFormData({
      ward: '', bedNumber: '', floor: '', type: 'General', 
      department: '', ddBeds: '', oxygenSupport: false, 
      monitoringEquipment: false, status: 'available'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary rounded-lg">
          <Bed className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Bed</h1>
          <p className="text-muted-foreground">Configure and add a new bed to the hospital system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <Bed className="w-5 h-5 text-primary" />
                <span>Bed Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ward *</Label>
                    <Select onValueChange={(value) => handleInputChange('ward', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {validWards.map((ward) => (
                          <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedNumber">Bed Number *</Label>
                    <Input
                      id="bedNumber"
                      value={formData.bedNumber}
                      onChange={(e) => handleInputChange('bedNumber', e.target.value)}
                      placeholder="e.g., A-17, I-08"
                      className="transition-medical"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Floor *</Label>
                    <Select onValueChange={(value) => handleInputChange('floor', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select floor" />
                      </SelectTrigger>
                      <SelectContent>
                        {floors.map((floor) => (
                          <SelectItem key={floor} value={floor}>{floor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bed Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select bed type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="ICU">ICU</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Isolation">Isolation</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department *</Label>
                    <Select onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="transition-medical">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ddBeds">DD Beds ID</Label>
                    <Input
                      id="ddBeds"
                      value={formData.ddBeds}
                      onChange={(e) => handleInputChange('ddBeds', e.target.value)}
                      placeholder="Auto-generated from bed number"
                      className="transition-medical"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Initial Status</Label>
                  <Select onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="transition-medical">
                      <SelectValue placeholder="Select initial status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Equipment Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Equipment & Features</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Oxygen Support</p>
                          <p className="text-sm text-muted-foreground">Built-in oxygen supply system</p>
                        </div>
                      </div>
                      <Switch 
                        checked={formData.oxygenSupport}
                        onCheckedChange={(checked) => handleInputChange('oxygenSupport', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium text-foreground">Monitoring Equipment</p>
                          <p className="text-sm text-muted-foreground">Patient monitoring systems</p>
                        </div>
                      </div>
                      <Switch 
                        checked={formData.monitoringEquipment}
                        onCheckedChange={(checked) => handleInputChange('monitoringEquipment', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bed to System
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Preview Sidebar */}
        <div className="space-y-6">
          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Bed Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {formData.bedNumber ? (
                <div className="space-y-4">
                  <div className="p-4 bg-success-light border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bed className="w-4 h-4 text-success" />
                      <span className="font-medium text-success">Bed Configuration</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bed Number:</span>
                        <span className="font-medium">{formData.bedNumber || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ward:</span>
                        <span className="font-medium">{formData.ward || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Floor:</span>
                        <span className="font-medium">{formData.floor || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{formData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">DD Beds:</span>
                        <span className="font-medium">{formData.ddBeds || 'Auto-generated'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Equipment</h4>
                    <div className="space-y-1">
                      {formData.oxygenSupport && (
                        <Badge variant="secondary" className="flex items-center space-x-1 w-fit">
                          <Zap className="w-3 h-3" />
                          <span>Oxygen Support</span>
                        </Badge>
                      )}
                      {formData.monitoringEquipment && (
                        <Badge variant="secondary" className="flex items-center space-x-1 w-fit">
                          <Monitor className="w-3 h-3" />
                          <span>Monitoring Equipment</span>
                        </Badge>
                      )}
                      {!formData.oxygenSupport && !formData.monitoringEquipment && (
                        <Badge variant="outline">Basic Bed</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Enter bed details to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="medical-card-header">
              <CardTitle className="flex items-center space-x-2">
                <Bed className="w-5 h-5 text-primary" />
                <span>Hospital Capacity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Beds</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Beds</span>
                  <Badge variant="outline" className="text-success border-success">78</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Occupied Beds</span>
                  <Badge variant="outline" className="text-warning border-warning">65</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Under Maintenance</span>
                  <Badge variant="outline" className="text-destructive border-destructive">13</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}