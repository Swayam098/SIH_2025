// src/pages/PredictPage.tsx
import React from "react";
import "./predict/predict.css";
import TrafficPrediction from "./predict/TrafficPrediction"; // path assumes you put trafficprediction.tsx under src/pages/predict/

/**
 * PredictPage - imports the full TrafficPrediction UI which includes
 * model cards, pattern background and animated cubes. Wrapper uses
 * the .predict-root class so styles are scoped and don't leak.
 */
const PredictPage: React.FC = () => {
  return (
    <div className="predict-root traffic-pattern-bg min-h-screen relative overflow-hidden">
      {/* Decorative animated cubes (positioned behind content) */}
      <div className="traffic-cubes" aria-hidden="true" />

      {/* Render the full TrafficPrediction component (it already uses .page-content / z-10) */}
      <TrafficPrediction />
    </div>
  );
};

export default PredictPage;
