import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Low Stock Alert",
    message: "Eco Water Bottle stock is running low (5 units remaining)",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "info", 
    title: "New Store Registration",
    message: "GreenMart Downtown has completed registration and is pending approval",
    time: "4 hours ago", 
    read: false
  },
  {
    id: 3,
    type: "success",
    title: "Threshold Exceeded",
    message: "EcoShop Plaza exceeded daily collection threshold (65kg collected)",
    time: "6 hours ago",
    read: true
  }
];

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const { toast } = useToast();

  const handleMarkAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const handleDismissNotification = (id: number) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">System alerts and updates</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark All Read</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationsList.map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'warning' ? 'bg-warning/10 text-warning' :
                    notification.type === 'info' ? 'bg-info/10 text-info' :
                    'bg-success/10 text-success'
                  }`}>
                    {notification.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                     notification.type === 'info' ? <Info className="w-4 h-4" /> :
                     <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDismissNotification(notification.id)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}