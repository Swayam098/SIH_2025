import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, MapPin } from "lucide-react";

interface ReportCardProps {
  id: string;
  image: string;
  title: string;
  route: string;
  status: "Reported" | "In-progress" | "Resolved";
  timeAgo: string;
  location: string;
  initialLikes: number;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Reported":
      return "destructive";
    case "In-progress":
      return "default";
    case "Resolved":
      return "secondary";
    default:
      return "default";
  }
};

const ReportCard = ({ 
  id, 
  image, 
  title, 
  route, 
  status, 
  timeAgo, 
  location, 
  initialLikes 
}: ReportCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  // Load like state from localStorage on mount
  useEffect(() => {
    const likedReports = JSON.parse(localStorage.getItem("likedReports") || "{}");
    const reportLikes = JSON.parse(localStorage.getItem("reportLikes") || "{}");
    
    setIsLiked(likedReports[id] || false);
    setLikeCount(reportLikes[id] || initialLikes);
  }, [id, initialLikes]);

  const handleLike = () => {
    const likedReports = JSON.parse(localStorage.getItem("likedReports") || "{}");
    const reportLikes = JSON.parse(localStorage.getItem("reportLikes") || "{}");
    
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
    
    // Update state
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);
    
    // Update localStorage
    likedReports[id] = newIsLiked;
    reportLikes[id] = newLikeCount;
    
    localStorage.setItem("likedReports", JSON.stringify(likedReports));
    localStorage.setItem("reportLikes", JSON.stringify(reportLikes));
  };

  return (
    <Card className="bg-card hover:shadow-elevated transition-smooth border-0 overflow-hidden group">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
          onError={(e) => {
            console.error(`Failed to load image for report ${id}:`, image);
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23414345'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='16'%3EImage not available%3C/text%3E%3C/svg%3E";
          }}
          onLoad={() => {
            console.log(`Successfully loaded image for report ${id}`);
          }}
        />
        <Badge 
          variant={getStatusVariant(status)}
          className="absolute top-3 right-3"
        >
          {status}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-2 mb-1">
            {title}
          </h3>
          <Badge variant="outline" className="text-xs">
            {route}
          </Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <span>{timeAgo}</span>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-bounce ${
              isLiked 
                ? "bg-destructive/10 text-destructive" 
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} 
            />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>
          
          <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;