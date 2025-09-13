import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Car, 
  Zap, 
  Utensils, 
  ShoppingBag, 
  Target,
  TrendingDown,
  Award,
  Users,
  Building
} from "lucide-react";
import ActivityLogger from "./ActivityLogger";
import EmissionChart from "./EmissionChart";

const CarbonDashboard = () => {
  const [userType, setUserType] = useState<"individual" | "business">("individual");
  const [showLogger, setShowLogger] = useState(false);
  
  // Mock data - in real app this would come from database
  const todayEmissions = 8.5; // kg CO2
  const weeklyEmissions = 42.3;
  const monthlyEmissions = 185.7;
  const goalEmissions = 150; // monthly goal
  const progressPercent = (goalEmissions - monthlyEmissions) / goalEmissions * 100;
  
  const getEmissionLevel = (emissions: number) => {
    if (emissions <= 5) return { level: "low", color: "success", label: "Excellent!" };
    if (emissions <= 12) return { level: "moderate", color: "warning", label: "Good" };
    return { level: "high", color: "destructive", label: "Needs Attention" };
  };
  
  const todayLevel = getEmissionLevel(todayEmissions);
  
  const activities = [
    { icon: Car, label: "Transport", value: 4.2, color: "text-primary" },
    { icon: Zap, label: "Energy", value: 2.8, color: "text-warning" },
    { icon: Utensils, label: "Food", value: 1.3, color: "text-success" },
    { icon: ShoppingBag, label: "Shopping", value: 0.2, color: "text-accent-foreground" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-earth p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EcoTracker</h1>
                <p className="text-sm text-muted-foreground">Your carbon footprint companion</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg bg-muted p-1">
                <Button
                  variant={userType === "individual" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setUserType("individual")}
                  className="rounded-md"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Individual
                </Button>
                <Button
                  variant={userType === "business" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setUserType("business")}
                  className="rounded-md"
                >
                  <Building className="mr-2 h-4 w-4" />
                  Business
                </Button>
              </div>
              <Button 
                onClick={() => setShowLogger(true)}
                className="bg-gradient-earth text-primary-foreground shadow-medium hover:shadow-strong transition-all duration-300"
              >
                Log Activity
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Today's Overview */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl font-bold text-foreground">Today's Impact</h2>
            <Badge 
              variant={todayLevel.color === "success" ? "default" : "destructive"}
              className={`
                ${todayLevel.color === "success" ? "bg-gradient-success text-success-foreground" : ""}
                ${todayLevel.color === "warning" ? "bg-warning text-warning-foreground" : ""}
              `}
            >
              {todayLevel.label}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Today's Emissions */}
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-foreground">{todayEmissions}</span>
                  <span className="text-lg text-muted-foreground">kg CO₂</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="h-4 w-4 text-success" />
                  <span className="text-sm text-success font-medium">-12% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            {/* Weekly */}
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-foreground">{weeklyEmissions}</span>
                  <span className="text-lg text-muted-foreground">kg CO₂</span>
                </div>
                <div className="text-sm text-muted-foreground mt-2">Avg: {(weeklyEmissions / 7).toFixed(1)} kg/day</div>
              </CardContent>
            </Card>

            {/* Monthly */}
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-foreground">{monthlyEmissions}</span>
                  <span className="text-lg text-muted-foreground">kg CO₂</span>
                </div>
                <div className="text-sm text-muted-foreground mt-2">Goal: {goalEmissions} kg</div>
              </CardContent>
            </Card>

            {/* Goal Progress */}
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Monthly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{Math.max(0, progressPercent).toFixed(0)}% over</span>
                  </div>
                  <Progress 
                    value={Math.min(100, (monthlyEmissions / goalEmissions) * 100)} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {monthlyEmissions > goalEmissions ? 
                      `${(monthlyEmissions - goalEmissions).toFixed(1)} kg over goal` :
                      `${(goalEmissions - monthlyEmissions).toFixed(1)} kg under goal`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Breakdown */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Today's Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-primary/10 ${activity.color}`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{activity.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{activity.value}</div>
                        <div className="text-sm text-muted-foreground">kg CO₂</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <EmissionChart />
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Tips */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-success text-success-foreground">
                    <div className="rounded-full bg-white/20 p-1">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">Green Week</div>
                      <div className="text-sm opacity-90">7 days under target</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary-foreground">
                    <div className="rounded-full bg-primary/20 p-1">
                      <TrendingDown className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">Steady Reducer</div>
                      <div className="text-sm opacity-75">Reduced by 20% this month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>💡 Today's Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-accent/50 border-l-4 border-primary">
                    <div className="font-medium text-sm">🚲 Try cycling today</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Could save 2.3 kg CO₂ vs driving
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/50 border-l-4 border-primary">
                    <div className="font-medium text-sm">🌱 Plant-based lunch</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Reduce meal emissions by 70%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showLogger && (
        <ActivityLogger 
          userType={userType}
          onClose={() => setShowLogger(false)} 
        />
      )}
    </div>
  );
};

export default CarbonDashboard;