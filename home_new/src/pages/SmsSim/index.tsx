// src/pages/SmsSim/index.tsx
import React from "react";
import "./smssim-scoped.css";
import SmsBusTracker from "./SmsBusTracker";

/**
 * SMS Simulator page wrapper
 * - provides decorative pattern-bg + cube-svg like other pages
 * - scopes styles under .sms-root
 * - renders SmsBusTracker as the page content
 */
const SmsSimPage: React.FC = () => {
  return (
    <div className="sms-root">
      <div className="pattern-bg" aria-hidden="true" />

      <svg
        className="cube-svg"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <g transform="translate(-200,-200) scale(2)">
          <rect x="0" y="0" width="200" height="200" rx="12" fill="url(#g1)" transform="rotate(-25 100 100)" />
          <rect x="180" y="-40" width="220" height="220" rx="12" fill="url(#g1)" transform="rotate(-25 290 70)" />
          <rect x="360" y="-120" width="280" height="280" rx="12" fill="url(#g1)" transform="rotate(-25 500 -10)" />
          <rect x="540" y="-200" width="240" height="240" rx="12" fill="url(#g1)" transform="rotate(-25 660 -80)" />
        </g>
      </svg>

      <div className="page-content">
        <SmsBusTracker />
      </div>
    </div>
  );
};

export default SmsSimPage;
