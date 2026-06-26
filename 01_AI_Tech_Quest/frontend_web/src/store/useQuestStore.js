import { create } from "zustand";
import { persist } from "zustand/middleware";
import { missionOrder } from "../data/mockData.js";

export const useQuestStore = create(
  persist(
    (set, get) => ({
      completedMissionIds: [],
      activeMissionId: missionOrder[0],
      setActiveMission: (missionId) => set({ activeMissionId: missionId }),
      completeMission: (missionId) => {
        const completedMissionIds = get().completedMissionIds;
        if (completedMissionIds.includes(missionId)) {
          return;
        }
        set({ completedMissionIds: [...completedMissionIds, missionId] });
      },
      resetQuest: () =>
        set({
          completedMissionIds: [],
          activeMissionId: missionOrder[0],
        }),
      isMissionCompleted: (missionId) => get().completedMissionIds.includes(missionId),
      isPortfolioUnlocked: () =>
        missionOrder.every((missionId) => get().completedMissionIds.includes(missionId)),
      progressPercent: () =>
        Math.round((get().completedMissionIds.length / missionOrder.length) * 100),
    }),
    {
      name: "ai-tech-quest-product-progress",
      partialize: (state) => ({
        completedMissionIds: state.completedMissionIds,
        activeMissionId: state.activeMissionId,
      }),
    },
  ),
);
