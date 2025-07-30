import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Droplets, Plus, Minus, AlertTriangle, Calendar, TrendingDown, Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BloodStock {
  bloodType: string;
  units: number;
  expiryDate: string;
  status: 'normal' | 'low' | 'critical' | 'expired';
  lastUpdated: string;
}

const bloodStock: BloodStock[] = [
  { bloodType: 'A+', units: 25, expiryDate: '2024-02-15', status: 'normal', lastUpdated: '2024-01-20 10:30' },
  { bloodType: 'A-', units: 8, expiryDate: '2024-02-10', status: 'low', lastUpdated: '2024-01-20 09:15' },
  { bloodType: 'B+', units: 32, expiryDate: '2024-02-20', status: 'normal', lastUpdated: '2024-01-20 11:45' },
  { bloodType: 'B-', units: 5, expiryDate: '2024-02-08', status: 'critical', lastUpdated: '2024-01-20 08:20' },
  { bloodType: 'AB+', units: 15, expiryDate: '2024-02-18', status: 'normal', lastUpdated: '2024-01-20 12:10' },
  { bloodType: 'AB-', units: 3, expiryDate: '2024-02-12', status: 'critical', lastUpdated: '2024-01-20 07:55' },
  { bloodType: 'O+', units: 45, expiryDate: '2024-02-25', status: 'normal', lastUpdated: '2024-01-20 13:30' },
  { bloodType: 'O-', units: 12, expiryDate: '2024-02-14', status: 'low', lastUpdated: '2024-01-20 14:15' },
];

const BloodBank = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [unitsToAdd, setUnitsToAdd] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'status-available';
      case 'low':
        return 'bg-warning text-warning-foreground';
      case 'critical':
        return 'status-occupied';
      case 'expired':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
      case 'expired':
        return <AlertTriangle className="w-4 h-4" />;
      case 'low':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const totalUnits = bloodStock.reduce((sum, stock) => sum + stock.units, 0);
  const criticalStock = bloodStock.filter(stock => stock.status === 'critical' || stock.status === 'expired').length;
  const lowStock = bloodStock.filter(stock => stock.status === 'low').length;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-lg">
              <Droplets className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blood Bank Management</h1>
              <p className="text-muted-foreground">Real-time blood inventory and stock management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-success-light text-success border-success/20">
              {totalUnits} Total Units
            </Badge>
            {criticalStock > 0 && (
              <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/20">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {criticalStock} Critical
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success-light rounded-lg">
                  <Droplets className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalUnits}</p>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning-light rounded-lg">
                  <TrendingDown className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{lowStock}</p>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-destructive-light rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{criticalStock}</p>
                  <p className="text-sm text-muted-foreground">Critical/Expired</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-info-light rounded-lg">
                  <Calendar className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blood Units
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Blood Units</DialogTitle>
                    <DialogDescription>
                      Add new blood units to the inventory
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodStock.map((stock) => (
                            <SelectItem key={stock.bloodType} value={stock.bloodType}>
                              {stock.bloodType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="units">Number of Units</Label>
                      <Input
                        id="units"
                        type="number"
                        value={unitsToAdd}
                        onChange={(e) => setUnitsToAdd(e.target.value)}
                        placeholder="Enter number of units"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Units</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="transition-medical">
                <Bell className="w-4 h-4 mr-2" />
                Request Donation Drive
              </Button>

              <Button variant="outline" className="transition-medical">
                <Calendar className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blood Stock Grid */}
        <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle>Blood Inventory</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bloodStock.map((stock) => (
                <div
                  key={stock.bloodType}
                  className={cn(
                    "p-4 rounded-lg border transition-medical",
                    stock.status === 'normal' && "border-success/20 bg-success-light/30",
                    stock.status === 'low' && "border-warning/20 bg-warning-light/30",
                    (stock.status === 'critical' || stock.status === 'expired') && "border-destructive/20 bg-destructive-light/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-5 h-5 text-primary" />
                      <span className="text-xl font-bold text-foreground">{stock.bloodType}</span>
                    </div>
                    <Badge className={cn("flex items-center space-x-1", getStatusColor(stock.status))}>
                      {getStatusIcon(stock.status)}
                      <span>{stock.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Units Available:</span>
                      <span className="font-bold text-2xl text-foreground">{stock.units}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expiry Date:</span>
                      <span className="font-medium">{stock.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="font-medium text-xs">{stock.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1 transition-medical">
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 transition-medical">
                      <Minus className="w-3 h-3 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="medical-card">
          <CardHeader className="medical-card-header">
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { type: 'OUT', bloodType: 'O+', units: 2, purpose: 'Surgery - ICU Ward 1', time: '2024-01-20 14:30' },
                { type: 'IN', bloodType: 'A-', units: 5, purpose: 'Donation Drive', time: '2024-01-20 12:15' },
                { type: 'OUT', bloodType: 'B+', units: 1, purpose: 'Emergency Transfusion', time: '2024-01-20 11:45' },
                { type: 'IN', bloodType: 'O-', units: 3, purpose: 'Blood Bank Transfer', time: '2024-01-20 09:30' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={transaction.type === 'IN' ? 'status-available' : 'status-occupied'}>
                      {transaction.type}
                    </Badge>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.bloodType} - {transaction.units} unit{transaction.units > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.purpose}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{transaction.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BloodBank;