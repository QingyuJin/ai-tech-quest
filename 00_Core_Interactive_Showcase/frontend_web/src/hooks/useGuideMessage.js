import { useLocation } from "react-router-dom";
import { guideMessages } from "../data/mockData.js";
import { useMissionStore } from "../store/useMissionStore.js";

export function useGuideMessage() {
  const location = useLocation();
  const unlocked = useMissionStore((state) => state.isPortfolioUnlocked)();

  if (location.pathname === "/") {
    return guideMessages.home;
  }

  if (location.pathname === "/portfolio") {
    return unlocked ? guideMessages.portfolioUnlocked : guideMessages.portfolioLocked;
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

  return guideMessages.missions;
}
