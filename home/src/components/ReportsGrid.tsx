import ReportCard from "./ReportCard";

const ReportsGrid = () => {
  // Mock data - in real app, this would come from API
  const reports = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      title: "Broken glass scattered on sidewalk",
      route: "Route B46",
      status: "Reported" as const,
      timeAgo: "3h ago",
      location: "40.7128°N, 74.0060°W",
      initialLikes: 12
    },
    {
      id: "2", 
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=300&fit=crop",
      title: "Graffiti on bus stop shelter",
      route: "Route M15",
      status: "In-progress" as const,
      timeAgo: "5h ago", 
      location: "40.7589°N, 73.9851°W",
      initialLikes: 8
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      title: "Trash overflow at main station",
      route: "Route Q32",
      status: "Reported" as const,
      timeAgo: "Just now",
      location: "40.7505°N, 73.9934°W",
      initialLikes: 15
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=400&h=300&fit=crop",
      title: "Damaged bench needs repair",
      route: "Route D21",
      status: "Resolved" as const,
      timeAgo: "1d ago",
      location: "40.7282°N, 73.7949°W",
      initialLikes: 6
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      title: "Pothole blocking bike lane access",
      route: "Route B63",
      status: "In-progress" as const,
      timeAgo: "2d ago",
      location: "40.6892°N, 74.0445°W", 
      initialLikes: 23
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1572949645841-094f3a8b1050?w=400&h=300&fit=crop",
      title: "Broken streetlight creates safety hazard",
      route: "Route M34",
      status: "Reported" as const,
      timeAgo: "3d ago",
      location: "40.7614°N, 73.9776°W",
      initialLikes: 31
    }
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Recent Reports</h2>
        <p className="text-muted-foreground">Community submitted issues that need attention</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} {...report} />
        ))}
      </div>
    </section>
  );
};

export default ReportsGrid;