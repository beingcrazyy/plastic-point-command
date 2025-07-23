import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "user_signup",
    user: "John Doe",
    email: "john@example.com",
    time: "2 hours ago",
    details: "New user registration",
    status: "new"
  },
  {
    id: 2,
    type: "plastic_submission",
    user: "Sarah Chen",
    email: "sarah@example.com",
    time: "4 hours ago",
    details: "Submitted 15kg Tier 1 plastic",
    status: "completed"
  },
  {
    id: 3,
    type: "store_onboard",
    user: "GreenMart Store",
    email: "store@greenmart.com",
    time: "6 hours ago",
    details: "New partner store registered",
    status: "pending"
  },
  {
    id: 4,
    type: "redemption",
    user: "Mike Johnson",
    email: "mike@example.com",
    time: "8 hours ago",
    details: "Redeemed eco-friendly water bottle",
    status: "processed"
  },
  {
    id: 5,
    type: "rate_change",
    user: "Admin",
    email: "admin@plasty-pesa.com",
    time: "1 day ago",
    details: "Updated Tier 2 plastic rate to 8 points/kg",
    status: "system"
  }
];

const getActivityIcon = (type: string) => {
  const colors = {
    user_signup: "bg-success/10 text-success",
    plastic_submission: "bg-primary/10 text-primary",
    store_onboard: "bg-info/10 text-info",
    redemption: "bg-warning/10 text-warning",
    rate_change: "bg-muted text-muted-foreground"
  };
  return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
};

const getStatusBadge = (status: string) => {
  const variants = {
    new: "bg-success/10 text-success border-success/20",
    completed: "bg-primary/10 text-primary border-primary/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    processed: "bg-info/10 text-info border-info/20",
    system: "bg-muted text-muted-foreground border-border"
  };
  return variants[status as keyof typeof variants] || variants.system;
};

export function RecentActivity() {
  return (
    <Card className="bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50">
            <div className="flex items-center space-x-3">
              <Avatar className={`w-10 h-10 ${getActivityIcon(activity.type)}`}>
                <AvatarFallback className="text-xs font-medium">
                  {activity.user.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground">{activity.user}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusBadge(activity.status)}`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}