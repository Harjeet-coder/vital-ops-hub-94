import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, RefreshCw, Activity, Users } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import analyticsHero from "@/assets/analytics-hero.jpg";



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
        {/* Hero Section */}
        <div 
          className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{ backgroundImage: `url(${analyticsHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center justify-between p-8">
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-2">Predictive Analytics</h1>
                  <p className="text-xl text-white/90">Data-driven insights for hospital operations</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold">Real-time Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold">94% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">94%</p>
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium">Prediction Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">7</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Days Forecast</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">+12%</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">Expected Increase</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">3.2</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Avg Stay (Days)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Analytics Tabs */}
        <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-900/20 dark:to-blue-900/20">
            <Tabs defaultValue="bed-demand" className="w-full">
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
                <ResponsiveContainer width="100%" height={450}>
                  <LineChart data={bedDemandData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorGeneral" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#3b82f6" 
                      strokeWidth={4} 
                      name="Predicted Total"
                      fill="url(#colorPredicted)"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#1d4ed8' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="general" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      name="General Ward"
                      fill="url(#colorGeneral)"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, fill: '#059669' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="icu" 
                      stroke="#ef4444" 
                      strokeWidth={3} 
                      name="ICU"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, fill: '#dc2626' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="emergency" 
                      stroke="#f59e0b" 
                      strokeWidth={3} 
                      name="Emergency"
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, fill: '#d97706' }}
                    />
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
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={bloodDemandData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorO+" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorA+" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorB+" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="O+" fill="url(#colorO+)" name="O+" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="O-" fill="#dc2626" name="O-" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="A+" fill="url(#colorA+)" name="A+" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="A-" fill="#2563eb" name="A-" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="B+" fill="url(#colorB+)" name="B+" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="B-" fill="#059669" name="B-" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="AB+" fill="#8b5cf6" name="AB+" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="AB-" fill="#7c3aed" name="AB-" radius={[4, 4, 0, 0]} />
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
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <defs>
                        <linearGradient id="colorGeneral" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="colorICU" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px', 
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Legend />
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
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={admissionTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorDischarges" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="admissions" 
                      fill="url(#colorAdmissions)" 
                      name="Admissions" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="discharges" 
                      fill="url(#colorDischarges)" 
                      name="Discharges" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="occupancy" 
                      stroke="#ef4444" 
                      strokeWidth={4} 
                      name="Occupancy %"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#dc2626' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Analytics;