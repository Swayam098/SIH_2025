import Header from "@/components/Header";
import StatsSection from "@/components/StatsSection";
import ReportsGrid from "@/components/ReportsGrid";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <StatsSection />
      <ReportsGrid />
      <Footer />
    </div>
  );
};

export default HomePage;