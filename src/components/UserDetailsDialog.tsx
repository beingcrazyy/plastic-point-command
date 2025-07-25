import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  signupDate: string;
  plasticSubmitted: string;
  pointsEarned: string;
  pointsBalance: string;
  pointsRedeemed: string;
  lastActive: string;
  status: string;
  redemptions: number;
}

interface UserDetailsDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdate: (updatedUser: User) => void;
  onUserDelete: (userId: number) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange, onUserUpdate, onUserDelete }: UserDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const { toast } = useToast();

  if (!user) return null;

  const handleEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedUser) {
      onUserUpdate(editedUser);
      setIsEditing(false);
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onUserDelete(user.id);
      onOpenChange(false);
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
        variant: "destructive",
      });
    }
  };

  const handleSuspend = () => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    const updatedUser = { ...user, status: newStatus };
    onUserUpdate(updatedUser);
    toast({
      title: `User ${newStatus === "suspended" ? "Suspended" : "Activated"}`,
      description: `User has been ${newStatus === "suspended" ? "suspended" : "activated"} successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "suspended": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`/api/placeholder/40/40`} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold">{user.name}</div>
              <Badge variant="outline" className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">User Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedUser?.name || "" : user.name}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={isEditing ? editedUser?.email || "" : user.email}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={isEditing ? editedUser?.phone || "" : user.phone}
                    onChange={(e) => setEditedUser(prev => prev ? { ...prev, phone: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Plastic Submitted:</span>
                      <span className="font-medium">{user.plasticSubmitted} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Points Earned:</span>
                      <span className="font-medium">{user.pointsEarned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Balance:</span>
                      <span className="font-medium">{user.pointsBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Points Redeemed:</span>
                      <span className="font-medium">{user.pointsRedeemed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Redemptions:</span>
                      <span className="font-medium">{user.redemptions}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Submitted 2.5kg plastic bottles</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Redeemed 150 points for Eco Water Bottle</span>
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Submitted 1.8kg plastic containers</span>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEdit} variant="outline" className="flex-1">
                    Edit User
                  </Button>
                  <Button 
                    onClick={handleSuspend} 
                    variant={user.status === "active" ? "destructive" : "default"}
                    className="flex-1"
                  >
                    {user.status === "active" ? "Suspend User" : "Activate User"}
                  </Button>
                  <Button onClick={handleDelete} variant="destructive" className="flex-1">
                    Delete User
                  </Button>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}