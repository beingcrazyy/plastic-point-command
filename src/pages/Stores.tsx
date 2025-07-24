import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Store as StoreIcon, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Download,
  Plus
 } from "lucide-react";
import { AddStoreDialog } from "@/components/AddStoreDialog";
import { useToast } from "@/hooks/use-toast";

const stores = [
  {
    id: 1,
    name: "GreenMart Central",
    image: "/api/placeholder/40/40",
    address: "123 Main St, Downtown",
    contact: "+1 234 567 8900",
    email: "contact@greenmart.com",
    plasticCollected: "145.8",
    threshold: "50",
    status: "active",
    lastSubmission: "2 hours ago",
    totalUsers: 45
  },
  {
    id: 2,
    name: "EcoShop Plaza",
    image: "/api/placeholder/40/40",
    address: "456 Green Ave, Midtown",
    contact: "+1 234 567 8901",
    email: "info@ecoshop.com",
    plasticCollected: "89.2",
    threshold: "40",
    status: "active",
    lastSubmission: "5 hours ago",
    totalUsers: 32
  },
  {
    id: 3,
    name: "Fresh Foods Market",
    image: "/api/placeholder/40/40",
    address: "789 Oak St, Uptown",
    contact: "+1 234 567 8902",
    email: "admin@freshfoods.com",
    plasticCollected: "67.5",
    threshold: "30",
    status: "inactive",
    lastSubmission: "2 days ago",
    totalUsers: 28
  },
  {
    id: 4,
    name: "SuperSave Grocery",
    image: "/api/placeholder/40/40",
    address: "321 Pine Rd, Suburbs",
    contact: "+1 234 567 8903",
    email: "store@supersave.com",
    plasticCollected: "123.4",
    threshold: "60",
    status: "active",
    lastSubmission: "1 hour ago",
    totalUsers: 67
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-success/10 text-success border-success/20";
    case "inactive": return "bg-muted text-muted-foreground border-border";
    case "pending": return "bg-warning/10 text-warning border-warning/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function Stores() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Stores data is being exported. You'll receive a download link shortly.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Store Management</h1>
            <p className="text-muted-foreground">Manage partner stores and their activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <AddStoreDialog />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">156</div>
              <p className="text-sm text-muted-foreground">Total Stores</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">142</div>
              <p className="text-sm text-muted-foreground">Active Stores</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">14</div>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-info">425.9</div>
              <p className="text-sm text-muted-foreground">Total Plastic (kg)</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search stores by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stores Table */}
        <Card>
          <CardHeader>
            <CardTitle>Stores ({filteredStores.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead>Plastic Collected</TableHead>
                    <TableHead className="hidden sm:table-cell">Threshold</TableHead>
                    <TableHead className="hidden lg:table-cell">Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10 rounded-lg">
                            <AvatarImage src={store.image} />
                            <AvatarFallback className="text-xs rounded-lg bg-primary/10 text-primary">
                              <StoreIcon className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{store.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {store.address}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                          <div>
                            <div className="text-sm">{store.address}</div>
                            <div className="text-sm text-muted-foreground">{store.contact}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{store.plasticCollected} kg</div>
                          <div className="text-sm text-muted-foreground">{store.lastSubmission}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="bg-info/10 text-info border-info/20">
                          {store.threshold} kg/week
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{store.totalUsers}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(store.status)}>
                          {store.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Store
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="w-4 h-4 mr-2" />
                              View on Map
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove Store
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}