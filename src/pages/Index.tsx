import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { ActivityChart } from "@/components/ActivityChart";
import { RecentActivity } from "@/components/RecentActivity";
import { 
  Users, 
  Store, 
  Gift, 
  Recycle,
  TrendingUp,
  Calendar,
  Award,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const metrics = [
    {
      title: "Plastic Collected Today",
      value: "287 kg",
      change: { value: 12, trend: "up" as const },
      icon: Recycle,
      color: "success" as const
    },
    {
      title: "Points Distributed",
      value: "5,740",
      change: { value: 8, trend: "up" as const },
      icon: Award,
      color: "info" as const
    },
    {
      title: "Gifts Redeemed",
      value: "34",
      change: { value: 5, trend: "down" as const },
      icon: Gift,
      color: "warning" as const
    },
    {
      title: "New Users",
      value: "12",
      change: { value: 15, trend: "up" as const },
      icon: Users,
      color: "default" as const
    },
    {
      title: "Active Stores",
      value: "156",
      change: { value: 3, trend: "up" as const },
      icon: Store,
      color: "default" as const
    },
    {
      title: "Collection Target",
      value: "89%",
      change: { value: 4, trend: "up" as const },
      icon: Target,
      color: "success" as const
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground">Monitor your platform's performance and activity</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 7 days
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <ActivityChart />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Plastic by Tier (This Week)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Tier 1 (Hard)</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  145 kg
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Tier 2 (Flexible)</span>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  89 kg
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Tier 3 (Low-value)</span>
                <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                  53 kg
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Performing Stores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">GreenMart Central</span>
                <span className="text-sm font-medium text-primary">45 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">EcoShop Downtown</span>
                <span className="text-sm font-medium text-primary">38 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Fresh Foods Plaza</span>
                <span className="text-sm font-medium text-primary">32 kg</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Popular Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Eco Water Bottle</span>
                <span className="text-sm font-medium text-warning">24 redeemed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Reusable Tote Bag</span>
                <span className="text-sm font-medium text-warning">18 redeemed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Plant Seedlings</span>
                <span className="text-sm font-medium text-warning">15 redeemed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
