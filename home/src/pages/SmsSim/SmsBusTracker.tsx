// src/pages/SmsSim/SmsBusTracker.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Bus, 
  Send, 
  Clock, 
  MapPin,
  Zap,
  Activity,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SmsMessage {
  id: string;
  busId: number;
  language: string;
  response: string;
  timestamp: Date;
  type: 'success' | 'error' | 'maintenance';
}

interface BusInfo {
  id: number;
  route: string;
  nextStop: string;
  speed: string;
  eta: string;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

const SmsBusTracker: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [busId, setBusId] = useState<string>("");
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busFleet, setBusFleet] = useState<BusInfo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBusFleet() {
      try {
        const res = await fetch(`http://localhost:5000/api/buses?lang=${selectedLanguage}`);
        const data = await res.json();
        // Transform backend data to BusInfo type
        const fleet: BusInfo[] = data.map((bus: any) => ({
          id: bus.bus_id,
          route: bus.route_id && bus.route_name ? `${bus.route_name}` : bus.route_id ? `Route ${bus.route_id}` : "Unknown Route",
          nextStop: bus.next_stop?.name_translated || "End",
          speed: bus.eta_minutes ? `${Math.round((bus.eta_minutes > 0 ? 36 : 0))} km/h` : "N/A",
          eta: bus.eta_minutes ? `${bus.eta_minutes} min ETA` : "N/A",
          status: bus.status === "active" ? "active" : "inactive",
          lastUpdate: new Date().toLocaleTimeString()
        }));
        setBusFleet(fleet);
      } catch (err) {
        setBusFleet([]);
      }
    }
    fetchBusFleet();
    // Optionally, refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchBusFleet, 30000);
    return () => clearInterval(interval);
  }, [selectedLanguage]);
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "ta", name: "தமிழ்" }
  ];

  const simulateBusStatus = async (busId: number, lang: string): Promise<{ response: string; type: 'success' | 'error' | 'maintenance' }> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    const responses = {
      en: {
        success: `🚌 Bus ${busId} Status:\n📍 Central Station\n⏰ Next stop: Mall Junction (5 mins)\n🚦 On time\n👥 Seats available: 12`,
        error: `❌ Bus ${busId} not found.`,
        maintenance: `🔧 Bus ${busId} under maintenance. Back by 3:00 PM.`
      },
      hi: {
        success: `🚌 बस ${busId} की स्थिति:\n📍 सेंट्रल स्टेशन\n⏰ अगला स्टॉप: मॉल जंक्शन (5 मिनट)\n🚦 समय पर\n👥 12 सीटें उपलब्ध`,
        error: `❌ बस ${busId} नहीं मिली।`,
        maintenance: `🔧 बस ${busId} रखरखाव में है। 3:00 बजे वापस।`
      },
      ta: {
        success: `🚌 பேருந்து ${busId} நிலை:\n📍 மத்திய நிலையம்\n⏰ அடுத்த நிறுத்தம்: மால் சந்திப்பு (5 நிமி)\n🚦 நேரத்தில்\n👥 12 இருக்கைகள் உள்ளது`,
        error: `❌ பேருந்து ${busId} கிடைக்கவில்லை.`,
        maintenance: `🔧 பேருந்து ${busId} பராமரிப்பில் உள்ளது. மாலை 3:00 மணிக்கு திரும்பும்.`
      }
    };
    const random = Math.random();
    if (random < 0.7) return { response: responses[lang as keyof typeof responses].success, type: 'success' };
    if (random < 0.9) return { response: responses[lang as keyof typeof responses].error, type: 'error' };
    return { response: responses[lang as keyof typeof responses].maintenance, type: 'maintenance' };
  };

  const handleSendQuery = async () => {
    if (!busId.trim()) {
      toast({ title: "Bus ID Required", description: "Enter a valid bus ID", variant: "destructive" });
      return;
    }
    const busIdNum = parseInt(busId);
    if (isNaN(busIdNum) || busIdNum <= 0) {
      toast({ title: "Invalid Bus ID", description: "Enter a valid number", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // --- Backend integration: fetch SMS status from backend ---
      const res = await fetch(`http://localhost:5000/api/sms?bus_id=${busIdNum}&lang=${selectedLanguage}`);
      const data = await res.json();
      let response = data.message || JSON.stringify(data);
      let type: 'success' | 'error' | 'maintenance' = 'success';
      if (response.toLowerCase().includes('not found')) type = 'error';
      if (response.toLowerCase().includes('maintenance')) type = 'maintenance';
      const newMessage: SmsMessage = { id: Date.now().toString(), busId: busIdNum, language: selectedLanguage, response, type, timestamp: new Date() };
      setMessages(prev => [newMessage, ...prev]);
      setBusId("");
      toast({ title: "SMS Sent", description: `Bus query sent for Bus ID: ${busIdNum}` });
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch SMS response from backend.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) handleSendQuery();
  };

  const activeCount = busFleet.filter(bus => bus.status === 'active').length;
  const inactiveCount = busFleet.filter(bus => bus.status === 'inactive').length;

  return (
    <div className="flex h-screen text-foreground">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold text-primary">Smart Bus Tracker</h1>
          </div>
          <p className="text-muted-foreground text-sm">Real-time Bus Tracking System</p>
        </div>

        {/* Fleet */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Bus Fleet</h2>
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-success font-medium">{activeCount} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{inactiveCount} Inactive</span>
            </div>
          </div>

          <div className="space-y-3">
            {busFleet.filter(bus => bus.status === 'active').map((bus) => (
              <Card key={bus.id} className="bg-secondary border-border hover:shadow-elevated cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-primary font-semibold">Bus #{bus.id}</h4>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-3 w-3" />{bus.route}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3 w-3" />Next: {bus.nextStop}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-warning"><Zap className="h-3 w-3" />{bus.speed}</div>
                      <div className="flex items-center gap-2 text-primary"><Clock className="h-3 w-3" />{bus.eta}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    Updated: {bus.lastUpdate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-primary">SMS Simulator</h2>
            <p className="text-muted-foreground text-sm">Test bus queries</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Query Panel */}
          <Card className="bg-secondary shadow-card">
            <CardHeader><CardTitle className="flex items-center gap-2 text-primary"><MessageCircle className="h-5 w-5" /> SMS Query Panel</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground">Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-background border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Bus ID</label>
                <div className="flex gap-3">
                  <Input type="number" placeholder="Enter bus number..." value={busId} onChange={(e) => setBusId(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} className="flex-1 bg-background border-border" />
                  <Button onClick={handleSendQuery} disabled={isLoading} className="gradient-primary px-6">
                    {isLoading ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center"><div className="text-2xl font-bold text-primary">{messages.length}</div><div className="text-xs text-muted-foreground">Queries</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-success">{activeCount}</div><div className="text-xs text-muted-foreground">Active Buses</div></div>
                <div className="text-center"><div className="text-2xl font-bold text-warning">{selectedLanguage}</div><div className="text-xs text-muted-foreground">Language</div></div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="bg-secondary shadow-card">
            <CardHeader><CardTitle className="flex items-center gap-2 text-primary"><Bus className="h-5 w-5" /> SMS Messages</CardTitle></CardHeader>
            <CardContent className="h-96 overflow-y-auto space-y-4 pr-2">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">No messages yet.</div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 max-w-xs">
                        <div className="font-medium text-sm">Query Bus #{message.busId}</div>
                        <div className="text-xs opacity-80">Language: {languages.find(l => l.code === message.language)?.name}</div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground rounded-xl px-4 py-3 max-w-xs">
                        <div className="whitespace-pre-wrap text-sm mb-2">{message.response}</div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <Badge variant={message.type === 'success' ? 'default' : 'destructive'} className="text-xs">{message.timestamp.toLocaleTimeString()}</Badge>
                          <Badge variant="outline" className="text-xs">{message.language.toUpperCase()}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmsBusTracker;
