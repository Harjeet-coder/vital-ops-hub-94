import { StatCard } from "./StatCard";
import { BloodStockChart } from "./BloodStockChart";
import { BedOccupancyChart } from "./BedOccupancyChart";
import { Bed, Users, Activity, Heart, TrendingUp, Calendar, BarChart3, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Hero Section */}
      <div 
        className="relative h-80 rounded-2xl overflow-hidden mb-8 bg-cover bg-center bg-no-repeat shadow-2xl"
        style={{ backgroundImage: `url(${dashboardHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-between p-8">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">Hospital Dashboard</h1>
                <p className="text-xl text-white/90">Real-time overview of hospital operations</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-lg font-semibold">All Systems Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-semibold">Real-time Monitoring</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Beds"
          value="196"
          subtitle="Hospital Capacity"
          icon={<Bed className="w-5 h-5" />}
          trend={{ value: "+2 this week", isPositive: true }}
          status="normal"
        />
        <StatCard
          title="Occupied Beds"
          value="118"
          subtitle="60% Occupancy"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: "+8 today", isPositive: true }}
          status="warning"
        />
        <StatCard
          title="Available Beds"
          value="78"
          subtitle="Immediate Capacity"
          icon={<Activity className="w-5 h-5" />}
          trend={{ value: "-3 since morning", isPositive: false }}
          status="success"
        />
        <StatCard
          title="Critical Beds"
          value="5"
          subtitle="ICU Available"
          icon={<Heart className="w-5 h-5" />}
          status="critical"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BedOccupancyChart />
        <BloodStockChart />
      </div>

      {/* Predictive Analytics */}
      <Card className="medical-card">
        <CardHeader className="medical-card-header">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>7-Day Demand Prediction</span>
            <Badge variant="secondary" className="ml-auto">
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Bed Demand Forecast</h4>
              <div className="space-y-3">
                {[
                  { day: 'Today', demand: 85, color: 'bg-success' },
                  { day: 'Tomorrow', demand: 92, color: 'bg-warning' },
                  { day: 'Thu', demand: 78, color: 'bg-success' },
                  { day: 'Fri', demand: 95, color: 'bg-destructive' },
                  { day: 'Sat', demand: 70, color: 'bg-success' },
                  { day: 'Sun', demand: 65, color: 'bg-success' },
                  { day: 'Mon', demand: 88, color: 'bg-warning' },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground w-16">{item.day}</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.demand}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{item.demand}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Blood Usage Trends</h4>
              <div className="space-y-3">
                {[
                  { type: 'O+', usage: 75, units: '12 units' },
                  { type: 'A+', usage: 60, units: '8 units' },
                  { type: 'B+', usage: 45, units: '6 units' },
                  { type: 'AB+', usage: 30, units: '4 units' },
                  { type: 'O-', usage: 85, units: '14 units' },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-8">{item.type}</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${item.usage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground w-16 text-right">{item.units}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Emergency Alerts</h4>
              <div className="space-y-3">
                <div className="p-3 bg-destructive-light border border-destructive/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-destructive rounded-full pulse-indicator" />
                    <span className="text-sm font-medium text-destructive">Critical</span>
                  </div>
                  <p className="text-xs text-muted-foreground">B- blood critically low</p>
                </div>
                <div className="p-3 bg-warning-light border border-warning/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span className="text-sm font-medium text-warning">Warning</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ICU at 90% capacity</p>
                </div>
                <div className="p-3 bg-info-light border border-info/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 bg-info rounded-full" />
                    <span className="text-sm font-medium text-info">Info</span>
                  </div>
                  <p className="text-xs text-muted-foreground">3 discharges scheduled</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}