import { Button } from "@/components/ui/button";
import { Bus, MapPin, Clock, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-bus-city.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Futuristic smart city with electric buses and glowing routes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent" />
      </div>

      {/* Animated Route Lines */}
      <div className="absolute inset-0 z-10">
        <div className="route-line absolute top-1/4 left-1/4 w-64 h-1 rounded-full opacity-60 animate-pulse" 
             style={{ animationDelay: '0s' }} />
        <div className="route-line absolute top-1/2 right-1/3 w-48 h-1 rounded-full opacity-40 animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="route-line absolute bottom-1/3 left-1/2 w-56 h-1 rounded-full opacity-50 animate-pulse" 
             style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Bus Icons */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Bus className="absolute top-1/4 left-1/3 w-8 h-8 text-primary floating-animation" 
             style={{ animationDelay: '0s' }} />
        <Bus className="absolute top-1/2 right-1/4 w-6 h-6 text-secondary floating-animation" 
             style={{ animationDelay: '2s' }} />
        <Bus className="absolute bottom-1/3 left-1/2 w-7 h-7 text-primary/70 floating-animation" 
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center max-w-6xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/30 backdrop-blur-md border border-border/50 mb-8 pulse-glow">
          <MapPin className="w-4 h-4 text-primary mr-2" />
          <span className="text-sm font-medium">Smart City Transit</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-glow-blue">Track Your Bus.</span>
          <br />
          <span className="text-glow-green">Anytime.</span>
          <br />
          <span className="text-foreground">Anywhere.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience the future of public transportation with real-time tracking, 
          intelligent routing, and seamless connectivity across your smart city.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" className="btn-hero px-8 py-4 text-lg font-semibold rounded-full" asChild>
            <a href="/sms-sim">
              <Bus className="w-5 h-5 mr-2" />
              Sms Simulation
            </a>
          </Button>
          <Button size="lg" variant="outline" className="btn-secondary-hero px-8 py-4 text-lg font-semibold rounded-full" asChild>
            <a href="/buses">
              <MapPin className="w-5 h-5 mr-2" />
              Explore Routes
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Active Buses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">5</div>
            <div className="text-muted-foreground">Routes Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Live Tracking</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};