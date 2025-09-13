import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Bike, 
  Bus, 
  Zap, 
  Flame, 
  Utensils, 
  ShoppingBag,
  Calculator,
  Save
} from "lucide-react";

interface ActivityLoggerProps {
  userType: "individual" | "business";
  onClose: () => void;
}

const ActivityLogger = ({ userType, onClose }: ActivityLoggerProps) => {
  const [activeTab, setActiveTab] = useState("transport");
  const [formData, setFormData] = useState({
    transport: { type: "", distance: "" },
    energy: { type: "", amount: "" },
    food: { type: "", meals: "" },
    shopping: { category: "", items: "" }
  });
  const [calculatedEmissions, setCalculatedEmissions] = useState<number | null>(null);
  const { toast } = useToast();

  // Emission factors (kg CO2 per unit)
  const emissionFactors = {
    transport: {
      car: 0.21, // per km
      bus: 0.089, // per km
      train: 0.041, // per km
      bike: 0, // per km
      walk: 0 // per km
    },
    energy: {
      electricity: 0.92, // per kWh
      gas: 2.04, // per m3
      heating_oil: 2.52 // per liter
    },
    food: {
      meat: 7.26, // per meal
      vegetarian: 3.81, // per meal
      vegan: 1.58 // per meal
    },
    shopping: {
      clothing: 22.0, // per item
      electronics: 85.0, // per item
      household: 5.0 // per item
    }
  };

  const calculateEmissions = () => {
    let total = 0;
    
    // Transport calculation
    if (formData.transport.type && formData.transport.distance) {
      const factor = emissionFactors.transport[formData.transport.type as keyof typeof emissionFactors.transport];
      total += factor * parseFloat(formData.transport.distance);
    }
    
    // Energy calculation
    if (formData.energy.type && formData.energy.amount) {
      const factor = emissionFactors.energy[formData.energy.type as keyof typeof emissionFactors.energy];
      total += factor * parseFloat(formData.energy.amount);
    }
    
    // Food calculation
    if (formData.food.type && formData.food.meals) {
      const factor = emissionFactors.food[formData.food.type as keyof typeof emissionFactors.food];
      total += factor * parseFloat(formData.food.meals);
    }
    
    // Shopping calculation
    if (formData.shopping.category && formData.shopping.items) {
      const factor = emissionFactors.shopping[formData.shopping.category as keyof typeof emissionFactors.shopping];
      total += factor * parseFloat(formData.shopping.items);
    }
    
    setCalculatedEmissions(total);
  };

  const saveActivity = () => {
    if (calculatedEmissions !== null) {
      toast({
        title: "Activity Saved! 🌱",
        description: `Added ${calculatedEmissions.toFixed(2)} kg CO₂ to today's tracking.`,
      });
      onClose();
    } else {
      toast({
        title: "Calculate First",
        description: "Please calculate emissions before saving.",
        variant: "destructive"
      });
    }
  };

  const tabs = [
    { id: "transport", label: "Transport", icon: Car },
    { id: "energy", label: "Energy", icon: Zap },
    { id: "food", label: "Food", icon: Utensils },
    { id: "shopping", label: "Shopping", icon: ShoppingBag }
  ];

  const updateFormData = (category: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
    setCalculatedEmissions(null);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Log {userType === "business" ? "Business" : "Personal"} Activity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Transport Tab */}
          {activeTab === "transport" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="transport-type">Mode of Transport</Label>
                  <Select onValueChange={(value) => updateFormData("transport", "type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">🚗 Car</SelectItem>
                      <SelectItem value="bus">🚌 Bus/Public Transport</SelectItem>
                      <SelectItem value="train">🚊 Train</SelectItem>
                      <SelectItem value="bike">🚲 Bicycle</SelectItem>
                      <SelectItem value="walk">🚶 Walking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transport-distance">Distance (km)</Label>
                  <Input
                    id="transport-distance"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 15.5"
                    value={formData.transport.distance}
                    onChange={(e) => updateFormData("transport", "distance", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Energy Tab */}
          {activeTab === "energy" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Energy Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="energy-type">Energy Type</Label>
                  <Select onValueChange={(value) => updateFormData("energy", "type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select energy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricity">⚡ Electricity (kWh)</SelectItem>
                      <SelectItem value="gas">🔥 Natural Gas (m³)</SelectItem>
                      <SelectItem value="heating_oil">🛢️ Heating Oil (L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="energy-amount">Amount</Label>
                  <Input
                    id="energy-amount"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 25.3"
                    value={formData.energy.amount}
                    onChange={(e) => updateFormData("energy", "amount", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Food Tab */}
          {activeTab === "food" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Food Consumption
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="food-type">Meal Type</Label>
                  <Select onValueChange={(value) => updateFormData("food", "type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meat">🥩 Meat-based meals</SelectItem>
                      <SelectItem value="vegetarian">🥗 Vegetarian meals</SelectItem>
                      <SelectItem value="vegan">🌱 Vegan meals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="food-meals">Number of Meals</Label>
                  <Input
                    id="food-meals"
                    type="number"
                    step="1"
                    placeholder="e.g., 2"
                    value={formData.food.meals}
                    onChange={(e) => updateFormData("food", "meals", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shopping Tab */}
          {activeTab === "shopping" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Shopping & Consumption
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shopping-category">Category</Label>
                  <Select onValueChange={(value) => updateFormData("shopping", "category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">👕 Clothing</SelectItem>
                      <SelectItem value="electronics">📱 Electronics</SelectItem>
                      <SelectItem value="household">🏠 Household Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="shopping-items">Number of Items</Label>
                  <Input
                    id="shopping-items"
                    type="number"
                    step="1"
                    placeholder="e.g., 1"
                    value={formData.shopping.items}
                    onChange={(e) => updateFormData("shopping", "items", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Calculation Result */}
          {calculatedEmissions !== null && (
            <Card className="bg-gradient-sky border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {calculatedEmissions.toFixed(2)} kg CO₂
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimated emissions from this activity
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button 
                onClick={calculateEmissions}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
              <Button 
                onClick={saveActivity}
                className="bg-gradient-earth text-primary-foreground flex items-center gap-2"
                disabled={calculatedEmissions === null}
              >
                <Save className="h-4 w-4" />
                Save Activity
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityLogger;