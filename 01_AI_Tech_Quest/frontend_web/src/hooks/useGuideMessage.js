import { useLocation } from "react-router-dom";
import { guideMessages } from "../data/mockData.js";
import { useQuestStore } from "../store/useQuestStore.js";

export function useGuideMessage() {
  const location = useLocation();
  const portfolioUnlocked = useQuestStore((state) => state.isPortfolioUnlocked)();

  if (location.pathname === "/missions") {
    return guideMessages.missions;
  }

  if (location.pathname === "/demo") {
    return guideMessages.demo;
  }

  if (location.pathname === "/missions/rag") {
    return guideMessages.rag;
  }

  if (location.pathname === "/missions/ml") {
    return guideMessages.ml;
  }

  if (location.pathname === "/missions/business") {
    return guideMessages.business;
  }

  if (location.pathname === "/portfolio") {
    return portfolioUnlocked ? guideMessages.portfolioUnlocked : guideMessages.portfolioLocked;
  }

  return guideMessages.home;
}
