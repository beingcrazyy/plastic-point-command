import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Edit, 
  Save,
  History,
  Image as ImageIcon,
  Info,
  Recycle
} from "lucide-react";

const plasticTiers = [
  {
    id: 1,
    tier: "Tier 1",
    name: "Hard Plastics",
    description: "Bottles, containers, PVC pipes, rigid packaging",
    pointsPerKg: 20,
    color: "primary",
    examples: ["Water bottles", "Food containers", "PVC pipes", "Hard packaging"],
    image: "/api/placeholder/200/150"
  },
  {
    id: 2,
    tier: "Tier 2", 
    name: "Flexible Plastics",
    description: "Plastic bags, films, flexible packaging, wrapping",
    pointsPerKg: 15,
    color: "warning",
    examples: ["Shopping bags", "Plastic films", "Flexible packaging", "Wrapping materials"],
    image: "/api/placeholder/200/150"
  },
  {
    id: 3,
    tier: "Tier 3",
    name: "Low-Value Plastics", 
    description: "Disposable cups, plates, cutlery, low-grade materials",
    pointsPerKg: 8,
    color: "info",
    examples: ["Disposable cups", "Plastic plates", "Cutlery", "Low-grade packaging"],
    image: "/api/placeholder/200/150"
  }
];

const rateHistory = [
  {
    id: 1,
    date: "2024-01-15",
    tier: "Tier 1",
    oldRate: 18,
    newRate: 20,
    admin: "Admin User",
    reason: "Market price adjustment"
  },
  {
    id: 2,
    date: "2024-01-10",
    tier: "Tier 2", 
    oldRate: 12,
    newRate: 15,
    admin: "Admin User",
    reason: "Increased demand for flexible plastics"
  },
  {
    id: 3,
    date: "2024-01-05",
    tier: "Tier 3",
    oldRate: 6,
    newRate: 8,
    admin: "System Admin",
    reason: "Quarterly rate review"
  }
];

const getTierColor = (color: string) => {
  switch (color) {
    case "primary": return "bg-primary/10 text-primary border-primary/20";
    case "warning": return "bg-warning/10 text-warning border-warning/20";
    case "info": return "bg-info/10 text-info border-info/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function Rates() {
  const [editingTier, setEditingTier] = useState<number | null>(null);
  const [newRates, setNewRates] = useState<{ [key: number]: number }>({});
  const [editingTierData, setEditingTierData] = useState<typeof plasticTiers[0] | null>(null);

  const handleEditRate = (tierId: number, currentRate: number) => {
    const tier = plasticTiers.find(t => t.id === tierId);
    if (tier) {
      setEditingTier(tierId);
      setEditingTierData({ ...tier });
      setNewRates({ ...newRates, [tierId]: currentRate });
    }
  };

  const handleSaveRate = (tierId: number) => {
    if (editingTierData) {
      // Update the tier in the plasticTiers array
      const updatedTiers = plasticTiers.map(tier => 
        tier.id === tierId ? editingTierData : tier
      );
      console.log("Updated tiers:", updatedTiers);
    }
    setEditingTier(null);
    setEditingTierData(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Plastic Rate Management</h1>
            <p className="text-muted-foreground">Configure point values for different plastic types</p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  Rate History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Rate Change History</DialogTitle>
                </DialogHeader>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Old Rate</TableHead>
                        <TableHead>New Rate</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rateHistory.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.tier}</TableCell>
                          <TableCell>{record.oldRate} pts/kg</TableCell>
                          <TableCell className="font-medium">{record.newRate} pts/kg</TableCell>
                          <TableCell>{record.admin}</TableCell>
                          <TableCell>{record.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Current Rates Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plasticTiers.map((tier) => (
            <Card key={tier.id} className={`bg-gradient-to-br from-${tier.color}/5 to-${tier.color}/10 border-${tier.color}/20`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{tier.tier}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tier.name}</p>
                  </div>
                  <Badge variant="outline" className={getTierColor(tier.color)}>
                    {tier.pointsPerKg} pts/kg
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{tier.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Examples:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tier.examples.map((example, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {editingTier === tier.id ? (
                    <div className="flex items-center space-x-2 w-full">
                      <Input
                        type="number"
                        value={newRates[tier.id] || tier.pointsPerKg}
                        onChange={(e) => setNewRates({ 
                          ...newRates, 
                          [tier.id]: parseInt(e.target.value) || 0 
                        })}
                        className="w-24"
                        min="1"
                      />
                      <span className="text-sm text-muted-foreground">pts/kg</span>
                      <Button size="sm" onClick={() => handleSaveRate(tier.id)}>
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditRate(tier.id, tier.pointsPerKg)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Rate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Tier Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Plastic Classification Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plasticTiers.map((tier) => (
                <div key={tier.id} className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">{tier.tier} - {tier.name}</h3>
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Badge variant="outline" className={getTierColor(tier.color)}>
                      {tier.pointsPerKg} points per kg
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Description:</h4>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Common Items:</h4>
                    <ul className="space-y-1">
                      {tier.examples.map((example, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <Recycle className="w-3 h-3 mr-2" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rate Change Form */}
        <Card>
          <CardHeader>
            <CardTitle>Update Multiple Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plasticTiers.map((tier) => (
                <div key={tier.id} className="space-y-2">
                  <label className="text-sm font-medium">{tier.tier} Rate (points/kg)</label>
                  <Input
                    type="number"
                    defaultValue={tier.pointsPerKg}
                    min="1"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Change</label>
              <Textarea 
                placeholder="Explain the reason for this rate change..."
                className="w-full"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}