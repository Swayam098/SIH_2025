// src/pages/BusesPage.tsx
import React from "react";
/* Import the buses styles (rename the buses project's index.css -> buses.css and place next to this file) */
import "./buses.css";

/* If you copied Buses.js from the other project, put it as Buses.tsx or Buses.jsx under the same folder and import it */
import Buses from "./Buses";

/* Optional: small Navbar for the buses page (copied/adapted from the other project) */
const BusesNavbar: React.FC<{ lang: string; setLang: (l: string) => void }> = ({ lang, setLang }) => (
  <nav className="navbar">
    <div className="navbar-title">SmartBus</div>
    <div>
      <label htmlFor="lang" style={{ marginRight: 8, fontWeight: "normal" }}>Language:</label>
      <select id="lang" value={lang} onChange={e => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
      </select>
    </div>
  </nav>
);

const BusesPage: React.FC = () => {
  const [lang, setLang] = React.useState("en");

  return (
    <div className="buses-root">
      <div className="pattern-bg" />
      <svg className="cube-svg" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
        <BusesNavbar lang={lang} setLang={setLang} />
        <Buses lang={lang} />
      </div>
    </div>
  );
};

export default BusesPage;
