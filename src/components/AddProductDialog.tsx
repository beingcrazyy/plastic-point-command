import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  name: string;
  description: string;
  pointsRequired: string;
  realPrice: string;
  stock: string;
  category: string;
  image: File | null;
}

const categories = [
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Sports & Outdoor",
  "Books & Media",
  "Health & Beauty",
  "Toys & Games",
  "Food & Beverages",
  "Gift Cards",
  "Other",
];

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    pointsRequired: "",
    realPrice: "",
    stock: "",
    category: "",
    image: null,
  });

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Product Added Successfully",
        description: `${formData.name} has been added to the rewards catalog.`,
      });
      
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        pointsRequired: "",
        realPrice: "",
        stock: "",
        category: "",
        image: null,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Add New Product
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the product features and benefits"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pointsRequired">Points Required *</Label>
              <Input
                id="pointsRequired"
                type="number"
                value={formData.pointsRequired}
                onChange={(e) => handleInputChange("pointsRequired", e.target.value)}
                placeholder="500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="realPrice">Real Price ($) *</Label>
              <Input
                id="realPrice"
                type="number"
                step="0.01"
                value={formData.realPrice}
                onChange={(e) => handleInputChange("realPrice", e.target.value)}
                placeholder="29.99"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                placeholder="100"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Product Image
            </h3>
            <div className="space-y-2">
              <Label htmlFor="image">Upload Product Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
                required
              />
              <p className="text-xs text-muted-foreground">
                Upload a high-quality product image (max 5MB)
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Adding Product..." : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}