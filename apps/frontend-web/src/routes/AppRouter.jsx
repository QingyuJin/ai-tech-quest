import { Navigate, Route, Routes } from "react-router-dom";
import BusinessMissionPage from "../pages/BusinessMissionPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import MissionSelectPage from "../pages/MissionSelectPage.jsx";
import MlMissionPage from "../pages/MlMissionPage.jsx";
import PortfolioUnlockPage from "../pages/PortfolioUnlockPage.jsx";
import RagMissionPage from "../pages/RagMissionPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/missions" element={<MissionSelectPage />} />
      <Route path="/missions/rag" element={<RagMissionPage />} />
      <Route path="/missions/ml" element={<MlMissionPage />} />
      <Route path="/missions/business" element={<BusinessMissionPage />} />
      <Route path="/portfolio-unlock" element={<PortfolioUnlockPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
