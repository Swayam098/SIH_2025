import React from "react";
// Import the community project’s styles (rename index.css → community.css and place here)
import "./community.css";

// Import the community project’s pages
import HomePage from "./community/HomePage";
import ReportPage from "./community/ReportPage";
import NotFound from "./community/NotFound";

// You can nest a BrowserRouter here if needed, but since the main App already has one,
// we’ll handle routing at the top level. This wrapper decides which community sub-page to show.
const CommunityPage: React.FC = () => {
  return (
    <div className="community-root">
      <HomePage />
    </div>
  );
};

export default CommunityPage;
