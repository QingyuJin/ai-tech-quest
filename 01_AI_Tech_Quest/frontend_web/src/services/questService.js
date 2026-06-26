export const questService = {
  async completeMission(missionId) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 350);
    });

    return {
      missionId,
      completedAt: new Date().toISOString(),
      source: "mock-local-service",
    };
  },
};
