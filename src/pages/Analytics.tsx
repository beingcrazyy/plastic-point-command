import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";
import { Calendar, Download, TrendingUp, Users, Store, Gift } from "lucide-react";

const monthlyData = [
  { month: "Jan", plastic: 1240, points: 24800, redemptions: 156, users: 45 },
  { month: "Feb", plastic: 1380, points: 27600, redemptions: 189, users: 67 },
  { month: "Mar", plastic: 1567, points: 31340, redemptions: 203, users: 89 },
  { month: "Apr", plastic: 1423, points: 28460, redemptions: 178, users: 123 },
  { month: "May", plastic: 1789, points: 35780, redemptions: 234, users: 156 },
  { month: "Jun", plastic: 1923, points: 38460, redemptions: 267, users: 189 }
];

const tierData = [
  { name: "Tier 1 (Hard)", value: 45, color: "#10b981" },
  { name: "Tier 2 (Flexible)", value: 32, color: "#f59e0b" },
  { name: "Tier 3 (Low-value)", value: 23, color: "#3b82f6" }
];

const storePerformance = [
  { store: "GreenMart", plastic: 234, points: 4680 },
  { store: "EcoShop", plastic: 189, points: 3780 },
  { store: "FreshFoods", plastic: 156, points: 3120 },
  { store: "SuperSave", plastic: 134, points: 2680 },
  { store: "CleanMart", plastic: 98, points: 1960 }
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">Comprehensive platform performance insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">2,847 kg</div>
                  <p className="text-sm text-muted-foreground">Total Plastic Collected</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-success mr-1" />
                    <span className="text-xs text-success">+15.3%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-info/5 to-info/10 border-info/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">56,940</div>
                  <p className="text-sm text-muted-foreground">Points Distributed</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-info mr-1" />
                    <span className="text-xs text-info">+12.8%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">1,327</div>
                  <p className="text-sm text-muted-foreground">Total Redemptions</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-warning mr-1" />
                    <span className="text-xs text-warning">+8.7%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">669</div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-primary mr-1" />
                    <span className="text-xs text-primary">+23.4%</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="plastic" 
                    stroke="hsl(var(--success))" 
                    name="Plastic (kg)"
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="points" 
                    stroke="hsl(var(--info))" 
                    name="Points"
                    strokeWidth={3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--primary))" 
                    name="New Users"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Plastic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Plastic Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tierData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Store Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={storePerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="store" className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="plastic" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Daily Active Users</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Weekly Retention</span>
                <span className="font-medium">76%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Submissions/User</span>
                <span className="font-medium">4.2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Redemption Rate</span>
                <span className="font-medium">34%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">API Response Time</span>
                <span className="font-medium text-success">142ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">System Uptime</span>
                <span className="font-medium text-success">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Error Rate</span>
                <span className="font-medium text-success">0.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="font-medium">67%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}