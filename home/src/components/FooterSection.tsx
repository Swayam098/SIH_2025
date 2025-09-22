import { Bus, MapPin, Clock, Mail, Phone, Globe } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="relative bg-gradient-to-br from-background/95 to-card/50 backdrop-blur-md border-t border-border/30">
      {/* Animated City Skyline Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-32">
          {/* Skyline Silhouettes */}
          <div className="absolute bottom-0 left-0 w-24 h-20 bg-gradient-to-t from-primary to-transparent skew-x-12 floating-animation" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-0 left-20 w-16 h-28 bg-gradient-to-t from-secondary to-transparent floating-animation" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-32 w-20 h-16 bg-gradient-to-t from-primary to-transparent skew-x-6 floating-animation" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-48 w-28 h-24 bg-gradient-to-t from-secondary to-transparent floating-animation" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-0 left-72 w-18 h-32 bg-gradient-to-t from-primary to-transparent skew-x-12 floating-animation" style={{ animationDelay: '4s' }} />
          
          {/* More buildings across the screen */}
          <div className="absolute bottom-0 right-0 w-24 h-28 bg-gradient-to-t from-secondary to-transparent -skew-x-12 floating-animation" style={{ animationDelay: '5s' }} />
          <div className="absolute bottom-0 right-20 w-20 h-16 bg-gradient-to-t from-primary to-transparent floating-animation" style={{ animationDelay: '6s' }} />
          <div className="absolute bottom-0 right-36 w-16 h-24 bg-gradient-to-t from-secondary to-transparent skew-x-6 floating-animation" style={{ animationDelay: '7s' }} />
          <div className="absolute bottom-0 right-48 w-32 h-20 bg-gradient-to-t from-primary to-transparent floating-animation" style={{ animationDelay: '8s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-primary mr-4 pulse-glow">
                <Bus className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-2xl font-bold text-glow-blue">CityTracker</h3>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Revolutionizing urban mobility with intelligent bus tracking, 
              real-time updates, and seamless connectivity for the smart cities of tomorrow.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                Operating 24/7
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-secondary" />
                5+ Routes
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              <li key="Live Tracking">
                <a href="/buses" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline">
                  Live Tracking
                </a>
              </li>
              <li key="Community Connect">
                <a href="/community" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline">
                  Community Connect
                </a>
              </li>
              <li key="Sms Simulation">
                <a href="/sms-sim" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline">
                  Sms Simulation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-CITY</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-secondary" />
                <span className="text-muted-foreground">info@citytracker.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3 text-primary" />
                <span className="text-muted-foreground">Available in 3 languages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2025 CityTracker. All rights reserved. Built for the future of urban transportation.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};