import ModelCard from "@/components/ModelCard";
import gruChart from "@/assets/gru-chart.png";
import lstmChart from "@/assets/lstm-chart.png";
import mlpChart from "@/assets/mlp-chart.png";

const TrafficPrediction = () => {
  const models = [
    {
      title: "GRU Model",
      rmse: 0.23834953860500654,
      mae: 0.17188067329235995,
      imageUrl: gruChart,
    },
    {
      title: "MLP Model", 
      rmse: 0.23751491210882214,
      mae: 0.1717113773412267,
      imageUrl: mlpChart,
    },
    {
      title: "LSTM Model",
      rmse: 0.23847301593267392,
      mae: 0.17239614037706041,
      imageUrl: lstmChart,
    },
  ];

  // Sort models by MAE (best performance first)
  const sortedModels = [...models].sort((a, b) => a.mae - b.mae);

  return (
    <div className="min-h-screen relative overflow-hidden traffic-pattern-bg">
      {/* Animated Background */}
      <div className="traffic-cubes"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-prediction-text mb-4">
              Traffic Prediction
            </h1>
            <p className="text-xl text-prediction-text-muted max-w-2xl mx-auto">
              Comparative analysis of machine learning models for traffic flow prediction
            </p>
          </div>

          {/* Performance Summary */}
          <div className="mb-8 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <h2 className="text-2xl font-semibold text-prediction-text mb-4">Model Performance Rankings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sortedModels.map((model, index) => (
                <div 
                  key={model.title}
                  className={`p-4 rounded-lg text-center ${
                    index === 0 
                      ? 'bg-prediction-success/20 border border-prediction-success/30' 
                      : 'bg-secondary/20 border border-border/30'
                  }`}
                >
                  <div className="text-2xl font-bold text-prediction-text">#{index + 1}</div>
                  <div className="text-prediction-text font-semibold">{model.title}</div>
                  <div className="text-sm text-prediction-text-muted">
                    MAE: {model.mae.toFixed(6)}
                  </div>
                  {index === 0 && (
                    <div className="text-xs text-prediction-success font-medium mt-1">Best Performance</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Model Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <ModelCard
                key={model.title}
                title={model.title}
                rmse={model.rmse}
                mae={model.mae}
                imageUrl={model.imageUrl}
              />
            ))}
          </div>

          {/* Analysis Notes */}
          <div className="mt-12 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <h3 className="text-xl font-semibold text-prediction-text mb-3">Analysis Summary</h3>
            <p className="text-prediction-text-muted leading-relaxed">
              The comparative analysis shows that the <strong className="text-prediction-success">MLP model</strong> achieves 
              the best performance with the lowest Mean Absolute Error (MAE) of <strong>0.1717</strong>. 
              All three models demonstrate strong predictive capabilities for traffic flow, with RMSE values 
              closely clustered around <strong>0.238</strong>, indicating consistent accuracy across different 
              neural network architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficPrediction;