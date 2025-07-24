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
import { Plus, Upload, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StoreFormData {
  name: string;
  password: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  latitude: string;
  longitude: string;
  operatingHours: string;
  image: File | null;
}

export function AddStoreDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<StoreFormData>({
    name: "",
    password: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    latitude: "",
    longitude: "",
    operatingHours: "",
    image: null,
  });

  const handleInputChange = (field: keyof StoreFormData, value: string) => {
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
        title: "Store Added Successfully",
        description: `${formData.name} has been registered as a partner store.`,
      });
      
      setOpen(false);
      setFormData({
        name: "",
        password: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        latitude: "",
        longitude: "",
        operatingHours: "",
        image: null,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add store. Please try again.",
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
          Add Store
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Store</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter store name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Store Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create store password"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="store@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://store-website.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location Details
            </h3>
            <div className="space-y-2">
              <Label htmlFor="address">Store Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete store address"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude *</Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange("latitude", e.target.value)}
                  placeholder="40.7128"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude *</Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange("longitude", e.target.value)}
                  placeholder="-74.0060"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Operating Hours
            </h3>
            <div className="space-y-2">
              <Label htmlFor="operatingHours">Operating Hours *</Label>
              <Textarea
                id="operatingHours"
                value={formData.operatingHours}
                onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                placeholder="Mon-Fri: 9:00 AM - 8:00 PM&#10;Sat-Sun: 10:00 AM - 6:00 PM"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Store Image
            </h3>
            <div className="space-y-2">
              <Label htmlFor="image">Upload Store Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload a clear image of your store front (max 5MB)
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Registering..." : "Register Store"}
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