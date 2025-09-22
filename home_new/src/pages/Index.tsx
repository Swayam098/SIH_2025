// Smart City Bus Tracking Landing Page with Menu

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FooterSection } from "@/components/FooterSection";
import { List, X } from "lucide-react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full top-0 left-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center">
            <span className="font-bold text-background">CT</span>
          </div>
          <div>
            <Link to="/" className="text-lg font-bold text-glow-blue">CityTracker</Link>
            <div className="text-xs text-muted-foreground">Smart Bus Tracking</div>
          </div>
        </div>

        {/* Menu button */}
        <div className="relative">
          <button
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm hover:shadow-[var(--shadow-glow-blue)] transition"
          >
            {open ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Dropdown */}
          {open && (
            <nav
              className="absolute right-0 mt-3 w-48 bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg py-2 z-50"
              role="menu"
            >
              <Link
                to="/buses"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-card/40 transition"
              >
                Buses
              </Link>
              <Link
                to="/sms-sim"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-card/40 transition"
              >
                SMS
              </Link>
              <Link
                to="/community"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-card/40 transition"
              >
                Community
              </Link>

              <Link
              to="/predict"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-card/40 transition"
              >
              Predict
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;