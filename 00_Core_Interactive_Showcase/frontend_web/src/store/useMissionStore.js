import { create } from "zustand";
import { persist } from "zustand/middleware";
import { missionOrder } from "../data/mockData.js";

export const useMissionStore = create(
  persist(
    (set, get) => ({
      completedMissionIds: [],
      completeMission: (missionId) => {
        const current = get().completedMissionIds;
        if (current.includes(missionId)) {
          return;
        }
        set({ completedMissionIds: [...current, missionId] });
      },
      resetProgress: () => set({ completedMissionIds: [] }),
      isMissionCompleted: (missionId) => get().completedMissionIds.includes(missionId),
      isPortfolioUnlocked: () =>
        missionOrder.every((missionId) => get().completedMissionIds.includes(missionId)),
      progressPercent: () =>
        Math.round((get().completedMissionIds.length / missionOrder.length) * 100),
    }),
    {
      name: "ai-tech-quest-mvp-progress",
      partialize: (state) => ({
        completedMissionIds: state.completedMissionIds,
      }),
    },
  ),
);
