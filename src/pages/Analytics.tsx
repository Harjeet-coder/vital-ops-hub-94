import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, RefreshCw } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Bed Demand Prediction Data
const bedDemandData = [
  { day: 'Today', general: 85, icu: 12, emergency: 8, predicted: 105, actual: 105 },
  { day: 'Tomorrow', general: 88, icu: 14, emergency: 6, predicted: 108, actual: null },
  { day: 'Day 3', general: 92, icu: 13, emergency: 10, predicted: 115, actual: null },
  { day: 'Day 4', general: 87, icu: 15, emergency: 7, predicted: 109, actual: null },
  { day: 'Day 5', general: 90, icu: 16, emergency: 9, predicted: 115, actual: null },
  { day: 'Day 6', general: 94, icu: 14, emergency: 8, predicted: 116, actual: null },
  { day: 'Day 7', general: 89, icu: 13, emergency: 11, predicted: 113, actual: null },
];

// Blood Demand Prediction Data
const bloodDemandData = [
  { day: 'Today', 'O+': 8, 'O-': 3, 'A+': 5, 'A-': 2, 'B+': 4, 'B-': 1, 'AB+': 2, 'AB-': 1 },
  { day: 'Tomorrow', 'O+': 10, 'O-': 4, 'A+': 6, 'A-': 3, 'B+': 5, 'B-': 2, 'AB+': 3, 'AB-': 1 },
  { day: 'Day 3', 'O+': 12, 'O-': 5, 'A+': 7, 'A-': 3, 'B+': 6, 'B-': 2, 'AB+': 3, 'AB-': 2 },
  { day: 'Day 4', 'O+': 9, 'O-': 3, 'A+': 5, 'A-': 2, 'B+': 4, 'B-': 1, 'AB+': 2, 'AB-': 1 },
  { day: 'Day 5', 'O+': 11, 'O-': 4, 'A+': 6, 'A-': 3, 'B+': 5, 'B-': 2, 'AB+': 3, 'AB-': 1 },
  { day: 'Day 6', 'O+': 13, 'O-': 6, 'A+': 8, 'A-': 4, 'B+': 7, 'B-': 3, 'AB+': 4, 'AB-': 2 },
  { day: 'Day 7', 'O+': 10, 'O-': 4, 'A+': 6, 'A-': 3, 'B+': 5, 'B-': 2, 'AB+': 3, 'AB-': 1 },
];

// Department Utilization Data
const departmentData = [
  { name: 'General', value: 35, color: '#3b82f6' },
  { name: 'ICU', value: 25, color: '#ef4444' },
  { name: 'Emergency', value: 15, color: '#f59e0b' },
  { name: 'Surgical', value: 12, color: '#10b981' },
  { name: 'Pediatric', value: 8, color: '#8b5cf6' },
  { name: 'Maternity', value: 5, color: '#ec4899' },
];

// Admission Trends Data
const admissionTrends = [
  { month: 'Jan', admissions: 1200, discharges: 1150, occupancy: 85 },
  { month: 'Feb', admissions: 1350, discharges: 1280, occupancy: 88 },
  { month: 'Mar', admissions: 1400, discharges: 1320, occupancy: 92 },
  { month: 'Apr', admissions: 1250, discharges: 1200, occupancy: 87 },
  { month: 'May', admissions: 1380, discharges: 1340, occupancy: 89 },
  { month: 'Jun', admissions: 1450, discharges: 1400, occupancy: 94 },
];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Predictive Analytics</h1>
              <p className="text-muted-foreground">Data-driven insights for hospital operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="7">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="transition-medical">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              className="btn-animated"
              onClick={() => {
                // Simulate export functionality
                const blob = new Blob([JSON.stringify({ type: 'Analytics Report', data: 'sample' })], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'analytics-report.pdf';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success-light rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-light rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">7</p>
                  <p className="text-sm text-muted-foreground">Days Forecast</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning-light rounded-lg">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">+12%</p>
                  <p className="text-sm text-muted-foreground">Expected Increase</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-info-light rounded-lg">
                  <BarChart3 className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3.2</p>
                  <p className="text-sm text-muted-foreground">Avg Stay (Days)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="bed-demand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bed-demand">Bed Demand</TabsTrigger>
            <TabsTrigger value="blood-demand">Blood Demand</TabsTrigger>
            <TabsTrigger value="department">Department Analysis</TabsTrigger>
            <TabsTrigger value="trends">Admission Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="bed-demand" className="space-y-6">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="flex items-center justify-between">
                  7-Day Bed Demand Prediction
                  <Badge className="bg-success-light text-success border-success/20">
                    94% Accuracy
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={bedDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} name="Predicted Total" />
                    <Line type="monotone" dataKey="general" stroke="#10b981" strokeWidth={2} name="General Ward" />
                    <Line type="monotone" dataKey="icu" stroke="#ef4444" strokeWidth={2} name="ICU" />
                    <Line type="monotone" dataKey="emergency" stroke="#f59e0b" strokeWidth={2} name="Emergency" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle className="text-lg">Peak Hours</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Morning (6-12)</span>
                      <Badge className="bg-warning-light text-warning border-warning/20">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Afternoon (12-18)</span>
                      <Badge className="bg-success-light text-success border-success/20">Moderate</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Evening (18-24)</span>
                      <Badge className="bg-info-light text-info border-info/20">Low</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Night (0-6)</span>
                      <Badge className="bg-success-light text-success border-success/20">Moderate</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle className="text-lg">Seasonal Patterns</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Winter</span>
                      <Badge className="bg-destructive-light text-destructive border-destructive/20">+25%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Spring</span>
                      <Badge className="bg-success-light text-success border-success/20">Normal</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Summer</span>
                      <Badge className="bg-info-light text-info border-info/20">-10%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Fall</span>
                      <Badge className="bg-warning-light text-warning border-warning/20">+15%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="p-3 bg-warning-light/30 rounded-lg border border-warning/20">
                      <p className="text-sm font-medium text-warning">Schedule extra staff for Day 3-6</p>
                    </div>
                    <div className="p-3 bg-info-light/30 rounded-lg border border-info/20">
                      <p className="text-sm font-medium text-info">Consider discharge planning for Day 2</p>
                    </div>
                    <div className="p-3 bg-success-light/30 rounded-lg border border-success/20">
                      <p className="text-sm font-medium text-success">ICU capacity looks stable</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blood-demand" className="space-y-6">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle>7-Day Blood Demand Forecast</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={bloodDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="O+" fill="#ef4444" name="O+" />
                    <Bar dataKey="O-" fill="#dc2626" name="O-" />
                    <Bar dataKey="A+" fill="#3b82f6" name="A+" />
                    <Bar dataKey="A-" fill="#2563eb" name="A-" />
                    <Bar dataKey="B+" fill="#10b981" name="B+" />
                    <Bar dataKey="B-" fill="#059669" name="B-" />
                    <Bar dataKey="AB+" fill="#8b5cf6" name="AB+" />
                    <Bar dataKey="AB-" fill="#7c3aed" name="AB-" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle>Critical Alerts</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-destructive-light/30 rounded-lg border border-destructive/20">
                      <TrendingDown className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="font-medium text-destructive">O- Stock Critical</p>
                        <p className="text-sm text-muted-foreground">Expected to run out in 2 days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-warning-light/30 rounded-lg border border-warning/20">
                      <TrendingDown className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-medium text-warning">AB- Stock Low</p>
                        <p className="text-sm text-muted-foreground">Consider ordering soon</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle>Usage Patterns</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Surgery Peak Hours</span>
                      <Badge className="bg-primary-light text-primary border-primary/20">8AM - 2PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Emergency Usage</span>
                      <Badge className="bg-warning-light text-warning border-warning/20">24/7 Variable</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Most Requested</span>
                      <Badge className="bg-success-light text-success border-success/20">O+ (40%)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="department" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle>Department Utilization</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader className="medical-card-header">
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {departmentData.map((dept) => (
                      <div key={dept.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: dept.color }}
                          />
                          <span className="text-sm font-medium">{dept.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{dept.value}%</span>
                          <div className="w-20 h-2 bg-accent rounded-full">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${dept.value}%`,
                                backgroundColor: dept.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle>6-Month Admission Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={admissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="admissions" fill="#3b82f6" name="Admissions" />
                    <Bar dataKey="discharges" fill="#10b981" name="Discharges" />
                    <Line type="monotone" dataKey="occupancy" stroke="#ef4444" strokeWidth={3} name="Occupancy %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;