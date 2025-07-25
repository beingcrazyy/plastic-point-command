import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Store {
  id: number;
  name: string;
  image: string;
  address: string;
  contact: string;
  email: string;
  plasticCollected: string;
  threshold: string;
  status: string;
  lastSubmission: string;
  totalUsers: number;
}

interface StoreDetailsDialogProps {
  store: Store | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStoreUpdate: (updatedStore: Store) => void;
  onStoreDelete: (storeId: number) => void;
}

export function StoreDetailsDialog({ store, open, onOpenChange, onStoreUpdate, onStoreDelete }: StoreDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStore, setEditedStore] = useState<Store | null>(null);
  const { toast } = useToast();

  if (!store) return null;

  const handleEdit = () => {
    setEditedStore({ ...store });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedStore) {
      onStoreUpdate(editedStore);
      setIsEditing(false);
      toast({
        title: "Store Updated",
        description: "Store information has been successfully updated.",
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      onStoreDelete(store.id);
      onOpenChange(false);
      toast({
        title: "Store Deleted",
        description: "Store has been successfully deleted.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "inactive": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-info/10 text-info border-info/20";
      case "average": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div>
              <div className="text-xl font-semibold">{store.name}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className={getStatusColor(store.status)}>
                  {store.status}
                </Badge>
                <Badge variant="outline" className={getPerformanceColor(store.performance)}>
                  {store.performance}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Store Details</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Store Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedStore?.name || "" : store.name}
                    onChange={(e) => setEditedStore(prev => prev ? { ...prev, name: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={isEditing ? editedStore?.address || "" : store.address}
                    onChange={(e) => setEditedStore(prev => prev ? { ...prev, address: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    value={isEditing ? editedStore?.contact || "" : store.contact}
                    onChange={(e) => setEditedStore(prev => prev ? { ...prev, contact: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={isEditing ? editedStore?.email || "" : store.email}
                    onChange={(e) => setEditedStore(prev => prev ? { ...prev, email: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Store Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Registration Date:</span>
                      <span className="font-medium">{store.registrationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Collections:</span>
                      <span className="font-medium">{store.totalCollections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Target:</span>
                      <span className="font-medium">{store.monthlyTarget}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>This Month's Collections</span>
                    <span className="font-medium">{store.totalCollections}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Target Achievement</span>
                    <span className="font-medium text-success">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Daily Collections</span>
                    <span className="font-medium">15.6 kg</span>
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
                    Edit Store
                  </Button>
                  <Button onClick={handleDelete} variant="destructive" className="flex-1">
                    Delete Store
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