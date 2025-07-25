import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  id: number;
  name: string;
  description: string;
  pointsRequired: number;
  category: string;
  stock: number;
  redeemed: number;
  status: string;
  image: string;
  realPrice: string;
}

interface RewardDetailsDialogProps {
  reward: Reward | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRewardUpdate: (updatedReward: Reward) => void;
  onRewardDelete: (rewardId: number) => void;
}

export function RewardDetailsDialog({ reward, open, onOpenChange, onRewardUpdate, onRewardDelete }: RewardDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReward, setEditedReward] = useState<Reward | null>(null);
  const { toast } = useToast();

  if (!reward) return null;

  const handleEdit = () => {
    setEditedReward({ ...reward });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedReward) {
      onRewardUpdate(editedReward);
      setIsEditing(false);
      toast({
        title: "Reward Updated",
        description: "Reward information has been successfully updated.",
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this reward?")) {
      onRewardDelete(reward.id);
      onOpenChange(false);
      toast({
        title: "Reward Deleted",
        description: "Reward has been successfully deleted.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "inactive": return "bg-destructive/10 text-destructive border-destructive/20";
      case "out-of-stock": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "eco-products": return "bg-success/10 text-success border-success/20";
      case "vouchers": return "bg-info/10 text-info border-info/20";
      case "electronics": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <img src={reward.image} alt={reward.name} className="w-12 h-12 object-cover rounded" />
            </div>
            <div>
              <div className="text-xl font-semibold">{reward.name}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className={getStatusColor(reward.status)}>
                  {reward.status}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(reward.category)}>
                  {reward.category}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Reward Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Reward Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedReward?.name || "" : reward.name}
                    onChange={(e) => setEditedReward(prev => prev ? { ...prev, name: e.target.value } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={isEditing ? editedReward?.description || "" : reward.description}
                    onChange={(e) => setEditedReward(prev => prev ? { ...prev, description: e.target.value } : null)}
                    readOnly={!isEditing}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="points">Points Required</Label>
                  <Input
                    id="points"
                    type="number"
                    value={isEditing ? editedReward?.pointsRequired || 0 : reward.pointsRequired}
                    onChange={(e) => setEditedReward(prev => prev ? { ...prev, pointsRequired: parseInt(e.target.value) } : null)}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={isEditing ? editedReward?.stock || 0 : reward.stock}
                    onChange={(e) => setEditedReward(prev => prev ? { ...prev, stock: parseInt(e.target.value) } : null)}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Reward Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Stock:</span>
                      <span className="font-medium">{reward.stock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Redemptions:</span>
                      <span className="font-medium">{reward.redeemed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Points Required:</span>
                      <span className="font-medium">{reward.pointsRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="font-medium">{reward.category}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Redemption Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>This Month's Redemptions</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Daily Redemptions</span>
                    <span className="font-medium">1.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Popularity Ranking</span>
                    <span className="font-medium text-success">#3</span>
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
                    Edit Reward
                  </Button>
                  <Button onClick={handleDelete} variant="destructive" className="flex-1">
                    Delete Reward
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