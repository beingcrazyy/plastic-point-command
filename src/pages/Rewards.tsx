import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Gift, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Plus,
  Package,
  Star
} from "lucide-react";

const rewards = [
  {
    id: 1,
    name: "Eco Water Bottle",
    image: "/api/placeholder/60/60",
    pointsRequired: 50,
    realPrice: "$12.99",
    stock: 45,
    category: "Drinkware",
    status: "active",
    description: "Reusable stainless steel water bottle",
    redeemed: 124
  },
  {
    id: 2,
    name: "Reusable Tote Bag",
    image: "/api/placeholder/60/60",
    pointsRequired: 30,
    realPrice: "$8.99",
    stock: 89,
    category: "Bags",
    status: "active",
    description: "Organic cotton shopping bag",
    redeemed: 98
  },
  {
    id: 3,
    name: "Plant Seedlings Kit",
    image: "/api/placeholder/60/60",
    pointsRequired: 75,
    realPrice: "$15.99",
    stock: 0,
    category: "Garden",
    status: "out_of_stock",
    description: "Herb garden starter kit",
    redeemed: 67
  },
  {
    id: 4,
    name: "Bamboo Utensil Set",
    image: "/api/placeholder/60/60",
    pointsRequired: 40,
    realPrice: "$9.99",
    stock: 23,
    category: "Kitchenware",
    status: "active",
    description: "Portable bamboo cutlery set",
    redeemed: 156
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-success/10 text-success border-success/20";
    case "out_of_stock": return "bg-destructive/10 text-destructive border-destructive/20";
    case "inactive": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function Rewards() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRewards = rewards.filter(reward =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reward.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reward Management</h1>
            <p className="text-muted-foreground">Manage products and gifts for point redemption</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">87</div>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">73</div>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">14</div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-info">445</div>
              <p className="text-sm text-muted-foreground">Total Redeemed</p>
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
                  placeholder="Search products by name or category..."
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

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredRewards.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Points Required</TableHead>
                    <TableHead className="hidden sm:table-cell">Real Price</TableHead>
                    <TableHead className="hidden md:table-cell">Stock</TableHead>
                    <TableHead className="hidden lg:table-cell">Redeemed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                            <img 
                              src={reward.image} 
                              alt={reward.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = '<Gift class="w-6 h-6 text-muted-foreground" />';
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{reward.name}</div>
                            <div className="text-sm text-muted-foreground">{reward.category}</div>
                            <div className="text-xs text-muted-foreground sm:hidden">
                              {reward.pointsRequired} points • Stock: {reward.stock}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-warning" />
                          <span className="font-medium">{reward.pointsRequired}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="text-muted-foreground">{reward.realPrice}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge 
                          variant="outline" 
                          className={
                            reward.stock === 0 
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : reward.stock < 20
                              ? "bg-warning/10 text-warning border-warning/20"
                              : "bg-success/10 text-success border-success/20"
                          }
                        >
                          {reward.stock === 0 ? "Out of Stock" : `${reward.stock} units`}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{reward.redeemed}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(reward.status)}>
                          {reward.status.replace('_', ' ')}
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
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="w-4 h-4 mr-2" />
                              Update Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove Product
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