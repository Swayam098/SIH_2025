import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isReportPage = location.pathname === "/community/report";

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-primary hover:text-primary-hover transition-smooth"
          >
            Community Reports
          </button>
          {!isReportPage && (
            <p className="text-muted-foreground hidden sm:block">
              Help keep our city clean and safe
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {!isReportPage ? (
            <Button 
              onClick={() => navigate("/community/report")}
              className="gradient-primary hover:opacity-90 transition-smooth"
            >
              Report an Issue
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              Back to Reports
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;