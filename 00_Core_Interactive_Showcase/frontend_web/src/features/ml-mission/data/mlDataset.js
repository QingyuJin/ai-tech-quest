export const clusterDefinitions = {
  A: {
    label: "A",
    name: "穩定型使用者",
    englishName: "Stable Users",
    color: "#0e7490",
    bgClass: "bg-cyan-600",
    textClass: "text-cyan-700",
    borderClass: "border-cyan-200",
    centroid: { activityScore: 42, consistencyScore: 78 },
    description: "互動頻率中等，但使用習慣穩定，適合長期維繫。",
  },
  B: {
    label: "B",
    name: "高活躍使用者",
    englishName: "High-Activity Users",
    color: "#b7791f",
    bgClass: "bg-amber-600",
    textClass: "text-amber-700",
    borderClass: "border-amber-200",
    centroid: { activityScore: 78, consistencyScore: 72 },
    description: "互動強、活躍度高，適合推薦新功能或進階方案。",
  },
  C: {
    label: "C",
    name: "低活躍使用者",
    englishName: "Low-Activity Users",
    color: "#be123c",
    bgClass: "bg-rose-600",
    textClass: "text-rose-700",
    borderClass: "border-rose-200",
    centroid: { activityScore: 25, consistencyScore: 30 },
    description: "互動頻率低且不穩定，可能需要喚回或重新引導。",
  },
};

export const knownDataPoints = [
  { id: "a1", label: "A", activityScore: 37, consistencyScore: 82 },
  { id: "a2", label: "A", activityScore: 45, consistencyScore: 74 },
  { id: "a3", label: "A", activityScore: 51, consistencyScore: 80 },
  { id: "a4", label: "A", activityScore: 40, consistencyScore: 69 },
  { id: "b1", label: "B", activityScore: 73, consistencyScore: 77 },
  { id: "b2", label: "B", activityScore: 82, consistencyScore: 68 },
  { id: "b3", label: "B", activityScore: 88, consistencyScore: 75 },
  { id: "b4", label: "B", activityScore: 70, consistencyScore: 63 },
  { id: "c1", label: "C", activityScore: 20, consistencyScore: 22 },
  { id: "c2", label: "C", activityScore: 28, consistencyScore: 35 },
  { id: "c3", label: "C", activityScore: 32, consistencyScore: 27 },
  { id: "c4", label: "C", activityScore: 18, consistencyScore: 42 },
];

export const challengeSample = {
  id: "u-17",
  name: "Unknown Sample U-17",
  activityScore: 76,
  consistencyScore: 70,
  correctLabel: "B",
  context: "過去 7 天登入頻率高，互動次數多，但回訪時間稍微分散。",
};

export const classOptions = Object.values(clusterDefinitions).map((cluster) => ({
  label: cluster.label,
  name: cluster.name,
  description: cluster.description,
}));

export const evaluationSnapshot = {
  accuracy: 87,
  modelConfidenceBase: 0.84,
  confusionMatrix: [
    { actual: "A", predicted: { A: 24, B: 3, C: 1 } },
    { actual: "B", predicted: { A: 2, B: 31, C: 2 } },
    { actual: "C", predicted: { A: 1, B: 4, C: 26 } },
  ],
  errorAnalysis:
    "模型最常混淆 B 與 C 的邊界樣本，通常是 activity score 偏高但 consistency score 不穩定的使用者。",
};

export const mlTechPoints = [
  {
    title: "Feature Engineering",
    description: "把使用者行為整理成 activity score 與 consistency score，讓模型可以用數值判斷。",
  },
  {
    title: "Classification",
    description: "玩家選擇 A/B/C 類別，模型也會根據特徵預測最可能的使用者群。",
  },
  {
    title: "Clustering",
    description: "三群資料點代表不同使用者型態，群中心可用來理解資料分布。",
  },
  {
    title: "Decision Boundary",
    description: "資料點靠近哪個群中心，代表它更可能落在哪個決策區域。",
  },
  {
    title: "Model Evaluation",
    description: "accuracy 與 confusion matrix 可以觀察模型整體表現與常見錯誤。",
  },
  {
    title: "Error Analysis",
    description: "錯誤樣本能揭露資料特徵不足、邊界模糊或模型需要改良的地方。",
  },
];
