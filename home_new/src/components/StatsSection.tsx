import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const StatsSection = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app, this would come from API
  const totalPhotos = 1247;
  const cleanedCount = 856;
  const cleanupProgress = Math.round((cleanedCount / totalPhotos) * 100);
  const worstRoute = "Route 42";
  const worstRouteCount = 3;
  const recentPhotos = 124;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Quick stats */}
        <Card className="bg-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Worst Route</span>
                  <span className="text-destructive font-semibold">
                    {worstRoute} ({worstRouteCount})
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Photos (30 days)</span>
                  <span className="font-semibold">{recentPhotos}</span>
                </div>
              </div>
              
              <Button 
                className="w-full gradient-secondary hover:opacity-90 transition-smooth"
                onClick={() => navigate("/community/report")}
              >
                Contribute Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Main stats */}
        <Card className="bg-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {totalPhotos.toLocaleString()}
                </div>
                <div className="text-lg text-muted-foreground">
                  Total Photos ({cleanedCount.toLocaleString()} cleaned)
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Cleanup Progress</span>
                  <span className="text-sm font-medium">{cleanupProgress}%</span>
                </div>
                <Progress 
                  value={cleanupProgress} 
                  className="h-3 bg-muted"
                />
                <div className="text-sm text-muted-foreground text-center">
                  {totalPhotos - cleanedCount} issues remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StatsSection;