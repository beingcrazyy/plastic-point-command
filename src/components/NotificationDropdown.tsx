import { useState } from "react";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

export function NotificationDropdown() {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const { toast } = useToast();

  const unreadCount = notificationsList.filter(n => !n.read).length;

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

  const handleMarkAsRead = (id: number) => {
    setNotificationsList(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" sideOffset={5}>
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
              Mark all read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-96">
          <div className="space-y-1 p-2">
            {notificationsList.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notificationsList.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent/50 ${
                    !notification.read ? 'bg-accent/20 border-primary/20' : 'border-border'
                  }`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-1.5 rounded-md flex-shrink-0 ${
                        notification.type === 'warning' ? 'bg-warning/10 text-warning' :
                        notification.type === 'info' ? 'bg-info/10 text-info' :
                        'bg-success/10 text-success'
                      }`}>
                        {notification.type === 'warning' ? <AlertTriangle className="w-3 h-3" /> :
                         notification.type === 'info' ? <Info className="w-3 h-3" /> :
                         <CheckCircle className="w-3 h-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm truncate">{notification.title}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismissNotification(notification.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}