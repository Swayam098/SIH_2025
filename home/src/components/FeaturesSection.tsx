import { MapPin, Globe, MessageSquare, Clock, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Live Bus Tracking",
    description: "Real-time GPS tracking of all buses with precise location updates every 30 seconds.",
    color: "text-primary",
    shadowColor: "hover:shadow-glow-blue"
  },
  {
    icon: Globe,
    title: "Multi-Language Support", 
    description: "Available in 3 languages to serve our diverse community of travelers.",
    color: "text-secondary",
    shadowColor: "hover:shadow-glow-green"
  },
  {
    icon: MessageSquare,
    title: "SMS Queries",
    description: "Get bus schedules and updates via SMS - no app required, works on any phone.",
    color: "text-primary",
    shadowColor: "hover:shadow-glow-blue"
  },
  {
    icon: Clock,
    title: "Smart Predictions",
    description: "AI-powered arrival predictions based on traffic, and historical data.",
    color: "text-secondary", 
    shadowColor: "hover:shadow-glow-green"
  },
  {
    icon: Shield,
    title: "Safe Journey",
    description: "Emergency alerts, and 24/7 customer support.",
    color: "text-primary",
    shadowColor: "hover:shadow-glow-blue"
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description: "Push notifications for route changes, and service disruptions.",
    color: "text-secondary",
    shadowColor: "hover:shadow-glow-green"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/30 backdrop-blur-md border border-border/50 mb-6">
            <Zap className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium">Smart Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-glow-blue">Future-Ready</span><br />
            <span className="text-foreground">Transportation</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by cutting-edge technology to make your journey smoother, 
            safer, and more connected than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className={`card-feature p-8 rounded-2xl group ${feature.shadowColor}`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in-scale 0.6s ease-out forwards'
                }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-card to-card/50 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className={`absolute inset-0 rounded-2xl ${feature.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-xl`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`h-1 w-0 ${feature.color} opacity-50 rounded-full mt-6 group-hover:w-full transition-all duration-500 bg-gradient-primary`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-card/30 backdrop-blur-md border border-border/50 pulse-glow">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">Available 24/7 across all routes</span>
          </div>
        </div>
      </div>
    </section>
  );
};