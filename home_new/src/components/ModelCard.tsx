import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModelCardProps {
  title: string;
  rmse: number;
  mae: number;
  imageUrl: string;
}

const ModelCard = ({ title, rmse, mae, imageUrl }: ModelCardProps) => {
  return (
    <Card className="bg-prediction-chart-bg border-border/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-prediction-text text-xl font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg overflow-hidden bg-background/5 p-2">
          <img 
            src={imageUrl} 
            alt={`${title} Traffic Prediction Chart`}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-prediction-text-muted text-sm font-medium">RMSE</p>
            <p className="text-prediction-text text-lg font-bold">{rmse.toFixed(6)}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-prediction-text-muted text-sm font-medium">MAE</p>
            <p className="text-prediction-text text-lg font-bold">{mae.toFixed(6)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelCard;