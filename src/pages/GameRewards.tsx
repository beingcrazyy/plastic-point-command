import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Coins, 
  Award, 
  Gift, 
  Package, 
  Upload, 
  Plus, 
  Trash, 
  Save,
  ArrowRight,
  ArrowLeft,
  Eye,
  Star,
  Trophy
} from "lucide-react";
import { toast } from "sonner";

type RewardType = "points" | "badges" | "tiered" | "mystery";

interface Reward {
  id: string;
  type: RewardType;
  name: string;
  icon?: string;
  quantity?: number;
  threshold?: number;
  description?: string;
}

export default function GameRewards() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [selectedRewardType, setSelectedRewardType] = useState<RewardType>("points");
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentReward, setCurrentReward] = useState<Partial<Reward>>({
    type: "points",
    name: "",
    quantity: 10,
    threshold: 100
  });
  
  const iconUploadRef = useRef<HTMLInputElement>(null);

  const rewardTypes = [
    { 
      id: "points", 
      label: "Points", 
      icon: Coins, 
      description: "Virtual currency for achievements",
      color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20"
    },
    { 
      id: "badges", 
      label: "Badges", 
      icon: Award, 
      description: "Achievement badges and medals",
      color: "text-blue-600 bg-blue-500/10 border-blue-500/20"
    },
    { 
      id: "tiered", 
      label: "Tiered Prizes", 
      icon: Trophy, 
      description: "Rewards based on performance levels",
      color: "text-purple-600 bg-purple-500/10 border-purple-500/20"
    },
    { 
      id: "mystery", 
      label: "Mystery Boxes", 
      icon: Package, 
      description: "Random surprise rewards",
      color: "text-orange-600 bg-orange-500/10 border-orange-500/20"
    }
  ];

  const addReward = () => {
    if (!currentReward.name?.trim()) {
      toast.error("Please enter a reward name");
      return;
    }

    const newReward: Reward = {
      id: Date.now().toString(),
      type: selectedRewardType,
      name: currentReward.name!,
      icon: currentReward.icon,
      quantity: currentReward.quantity,
      threshold: currentReward.threshold,
      description: currentReward.description
    };

    setRewards([...rewards, newReward]);
    setCurrentReward({
      type: selectedRewardType,
      name: "",
      quantity: selectedRewardType === "points" ? 10 : 1,
      threshold: 100
    });
    toast.success("Reward added successfully");
  };

  const removeReward = (rewardId: string) => {
    setRewards(rewards.filter(r => r.id !== rewardId));
    toast.success("Reward removed");
  };

  const handleIconUpload = (files: FileList | null) => {
    if (files && files[0]) {
      // In a real app, you'd upload to your storage service
      const file = files[0];
      setCurrentReward(prev => ({ ...prev, icon: file.name }));
      toast.success("Icon uploaded successfully");
    }
  };

  const handleSave = () => {
    toast.success("Rewards configuration saved");
  };

  const handleNext = () => {
    navigate(`/games/${id}/schedule`);
  };

  const handleBack = () => {
    navigate(`/games/${id}/edit`);
  };

  const getRewardTypeConfig = (type: RewardType) => {
    return rewardTypes.find(rt => rt.id === type);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configure Rewards</h1>
            <p className="text-muted-foreground mt-2">Set up prizes and incentives for your game</p>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reward Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reward Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Reward Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewardTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedRewardType(type.id as RewardType);
                          setCurrentReward(prev => ({ ...prev, type: type.id as RewardType }));
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedRewardType === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`w-8 h-8 mb-2 ${
                          selectedRewardType === type.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <h3 className="font-medium text-sm">{type.label}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reward Details */}
            <Card>
              <CardHeader>
                <CardTitle>Reward Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reward-name">Reward Name</Label>
                  <Input
                    id="reward-name"
                    value={currentReward.name || ""}
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={`Enter ${getRewardTypeConfig(selectedRewardType)?.label.toLowerCase()} name...`}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Icon Upload</Label>
                  <div 
                    onClick={() => iconUploadRef.current?.click()}
                    className="mt-1 border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {currentReward.icon ? `Selected: ${currentReward.icon}` : "Click to upload icon"}
                    </p>
                  </div>
                  <input
                    ref={iconUploadRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleIconUpload(e.target.files)}
                    className="hidden"
                  />
                </div>

                {selectedRewardType === "points" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="points-quantity">Points Value</Label>
                      <Input
                        id="points-quantity"
                        type="number"
                        value={currentReward.quantity || 10}
                        onChange={(e) => setCurrentReward(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="points-threshold">Score Threshold</Label>
                      <Input
                        id="points-threshold"
                        type="number"
                        value={currentReward.threshold || 100}
                        onChange={(e) => setCurrentReward(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {selectedRewardType === "badges" && (
                  <div>
                    <Label htmlFor="badge-threshold">Achievement Threshold</Label>
                    <Select 
                      value={currentReward.threshold?.toString() || "100"} 
                      onValueChange={(v) => setCurrentReward(prev => ({ ...prev, threshold: parseInt(v) }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50% completion</SelectItem>
                        <SelectItem value="75">75% completion</SelectItem>
                        <SelectItem value="90">90% completion</SelectItem>
                        <SelectItem value="100">Perfect score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedRewardType === "tiered" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tier-level">Tier Level</Label>
                      <Select 
                        value={currentReward.threshold?.toString() || "1"} 
                        onValueChange={(v) => setCurrentReward(prev => ({ ...prev, threshold: parseInt(v) }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Bronze (1st tier)</SelectItem>
                          <SelectItem value="2">Silver (2nd tier)</SelectItem>
                          <SelectItem value="3">Gold (3rd tier)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tier-quantity">Quantity</Label>
                      <Input
                        id="tier-quantity"
                        type="number"
                        value={currentReward.quantity || 1}
                        onChange={(e) => setCurrentReward(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {selectedRewardType === "mystery" && (
                  <div>
                    <Label htmlFor="mystery-description">Box Contents Description</Label>
                    <Input
                      id="mystery-description"
                      value={currentReward.description || ""}
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what's inside the mystery box..."
                      className="mt-1"
                    />
                  </div>
                )}

                <Button onClick={addReward} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reward
                </Button>
              </CardContent>
            </Card>

            {/* Configured Rewards */}
            {rewards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Configured Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rewards.map((reward) => {
                      const config = getRewardTypeConfig(reward.type);
                      const Icon = config?.icon || Gift;
                      return (
                        <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">{reward.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {reward.type === "points" && `${reward.quantity} points at ${reward.threshold}% score`}
                                {reward.type === "badges" && `Unlocked at ${reward.threshold}% completion`}
                                {reward.type === "tiered" && `Tier ${reward.threshold} - ${reward.quantity} available`}
                                {reward.type === "mystery" && reward.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={config?.color}>
                              {config?.label}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeReward(reward.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Rewards Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="font-medium mb-3">How rewards will appear to users:</h3>
                  
                  {/* Sample reward display */}
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Coins className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium">+50 Points</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Great job! Perfect score!</p>
                    </div>
                    
                    <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Achievement Unlocked!</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Quiz Master Badge</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Rewards will be automatically distributed based on player performance and configured thresholds.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Rewards</span>
                    <span className="font-medium">{rewards.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reward Types</span>
                    <span className="font-medium">{new Set(rewards.map(r => r.type)).size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <span className="font-medium">
                      {rewards.filter(r => r.type === "points").reduce((sum, r) => sum + (r.quantity || 0), 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Rewards
          </Button>
          <Button onClick={handleNext}>
            Next: Scheduling
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}