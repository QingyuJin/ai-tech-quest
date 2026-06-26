import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultFaqs, missionOrder } from "../data/missions.js";

const cloneDefaultFaqs = () => defaultFaqs.map((faq) => ({ ...faq, tags: [...faq.tags] }));

export const useMissionStore = create(
  persist(
    (set, get) => ({
      completedMissionIds: [],
      faqs: cloneDefaultFaqs(),
      completeMission: (missionId) => {
        const completed = get().completedMissionIds;
        if (completed.includes(missionId)) {
          return;
        }
        set({ completedMissionIds: [...completed, missionId] });
      },
      isMissionCompleted: (missionId) => get().completedMissionIds.includes(missionId),
      isPortfolioUnlocked: () =>
        missionOrder.every((missionId) => get().completedMissionIds.includes(missionId)),
      addFaq: (faq) =>
        set((state) => ({
          faqs: [
            {
              id: `faq-${Date.now()}`,
              tags: faq.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
              question: faq.question.trim(),
              answer: faq.answer.trim(),
            },
            ...state.faqs,
          ],
        })),
      resetProgress: () =>
        set({
          completedMissionIds: [],
          faqs: cloneDefaultFaqs(),
        }),
    }),
    {
      name: "ai-tech-quest-progress",
      partialize: (state) => ({
        completedMissionIds: state.completedMissionIds,
        faqs: state.faqs,
      }),
    },
  ),
);
