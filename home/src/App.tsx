import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SmsSimPage from "./pages/SmsSim";
import BusesPage from "./pages/BusesPage";
import NotFound from "./pages/NotFound";
import CommunityPage from "./pages/CommunityPage";
import CommunityHome from "./pages/community/HomePage";
import CommunityReport from "./pages/community/ReportPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buses" element={<BusesPage />} />
          <Route path="/sms-sim" element={<SmsSimPage />} />
          <Route path="/community" element={<CommunityHome />} />
          <Route path="/community/report" element={<CommunityReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
