export const classDefinitions = {
  A: {
    label: "穩定型使用者",
    description: "活躍度中等，但使用行為很穩定。",
    color: "#0EA5E9",
  },
  B: {
    label: "高活躍使用者",
    description: "活躍度高，且持續使用狀態良好。",
    color: "#047857",
  },
  C: {
    label: "低活躍使用者",
    description: "活躍度與穩定度都偏低，需要重新喚回。",
    color: "#D97706",
  },
};

export const clusterPoints = [
  { id: "a-01", label: "A", activityScore: 42, consistencyScore: 82 },
  { id: "a-02", label: "A", activityScore: 48, consistencyScore: 76 },
  { id: "a-03", label: "A", activityScore: 54, consistencyScore: 88 },
  { id: "a-04", label: "A", activityScore: 38, consistencyScore: 71 },
  { id: "a-05", label: "A", activityScore: 57, consistencyScore: 80 },
  { id: "b-01", label: "B", activityScore: 74, consistencyScore: 68 },
  { id: "b-02", label: "B", activityScore: 82, consistencyScore: 74 },
  { id: "b-03", label: "B", activityScore: 88, consistencyScore: 62 },
  { id: "b-04", label: "B", activityScore: 78, consistencyScore: 82 },
  { id: "b-05", label: "B", activityScore: 91, consistencyScore: 70 },
  { id: "c-01", label: "C", activityScore: 22, consistencyScore: 32 },
  { id: "c-02", label: "C", activityScore: 29, consistencyScore: 46 },
  { id: "c-03", label: "C", activityScore: 35, consistencyScore: 28 },
  { id: "c-04", label: "C", activityScore: 18, consistencyScore: 41 },
  { id: "c-05", label: "C", activityScore: 33, consistencyScore: 36 },
];

export const unknownSample = {
  id: "unknown-user-01",
  activityScore: 76,
  consistencyScore: 64,
  correctLabel: "B",
};

export const mlTechPoints = [
  {
    title: "特徵設計（Feature Engineering）",
    body: "把原始使用行為整理成活躍分數與穩定分數，讓模型可以用簡單座標比較不同使用者。",
  },
  {
    title: "分類模型（Classification）",
    body: "玩家先選 A / B / C，再和 mock 模型預測與正確答案比較，理解分類任務的基本流程。",
  },
  {
    title: "分群觀察（Clustering）",
    body: "散佈圖把使用者分成三群，讓使用者可以直觀看到資料分布與群體差異。",
  },
  {
    title: "決策邊界（Decision Boundary）",
    body: "mock 模型用簡化規則模擬決策邊界，示範模型如何把資料點分到不同類別。",
  },
  {
    title: "模型評估（Model Evaluation）",
    body: "準確率與混淆矩陣可以看出模型是否穩定，不只看單次預測是否答對。",
  },
  {
    title: "錯誤分析（Error Analysis）",
    body: "靠近分類邊界的資料最容易出錯，這也是正式模型需要持續評測與調整的原因。",
  },
];

export const evaluationSummary = {
  accuracy: 87,
  confusionMatrix: [
    { actual: "A", predicted: { A: 24, B: 3, C: 1 } },
    { actual: "B", predicted: { A: 2, B: 31, C: 2 } },
    { actual: "C", predicted: { A: 1, B: 4, C: 26 } },
  ],
  errorAnalysis:
    "大多數錯誤發生在 A/B 與 B/C 邊界附近，代表使用者行為有時會介於兩種族群之間。",
};
