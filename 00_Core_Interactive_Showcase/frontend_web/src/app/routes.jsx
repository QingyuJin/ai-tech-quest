import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import MissionSelectPage from "../pages/MissionSelectPage.jsx";
import PortfolioUnlockPage from "../pages/PortfolioUnlockPage.jsx";
import RagMissionPage from "../features/rag-mission/RagMissionPage.jsx";
import MlMissionPage from "../features/ml-mission/MlMissionPage.jsx";
import BusinessMissionPage from "../features/business-mission/BusinessMissionPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/missions" element={<MissionSelectPage />} />
      <Route path="/missions/rag" element={<RagMissionPage />} />
      <Route path="/missions/ml" element={<MlMissionPage />} />
      <Route path="/missions/business" element={<BusinessMissionPage />} />
      <Route path="/portfolio" element={<PortfolioUnlockPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
