import { clusterDefinitions, evaluationSnapshot } from "../data/mlDataset.js";

const delay = (ms = 680) => new Promise((resolve) => setTimeout(resolve, ms));

function distanceToCentroid(sample, centroid) {
  const activityDistance = sample.activityScore - centroid.activityScore;
  const consistencyDistance = sample.consistencyScore - centroid.consistencyScore;
  return Math.sqrt(activityDistance ** 2 + consistencyDistance ** 2);
}

function rankClusters(sample) {
  return Object.values(clusterDefinitions)
    .map((cluster) => ({
      label: cluster.label,
      name: cluster.name,
      distance: distanceToCentroid(sample, cluster.centroid),
    }))
    .sort((a, b) => a.distance - b.distance);
}

function confidenceFromDistances(rankedClusters) {
  const [first, second] = rankedClusters;
  const margin = Math.max(second.distance - first.distance, 0);
  const normalized = Math.min(0.96, evaluationSnapshot.modelConfidenceBase + margin / 100);
  return Number(normalized.toFixed(2));
}

function buildExplanation(sample, prediction, rankedClusters) {
  const nearest = clusterDefinitions[prediction];
  const second = rankedClusters[1];

  return (
    `模型把 activity score=${sample.activityScore}、consistency score=${sample.consistencyScore} ` +
    `和三個群中心比較。${nearest.name} 的距離最近，因此預測為 ${prediction}。` +
    `第二接近的是 ${second.label}，這代表此樣本仍可用 decision boundary 觀察邊界風險。`
  );
}

async function predict(sample) {
  await delay();
  const rankedClusters = rankClusters(sample);
  const modelPrediction = rankedClusters[0].label;
  const confidence = confidenceFromDistances(rankedClusters);
  const correctLabel = sample.correctLabel;
  const playerChoice = sample.playerChoice;

  return {
    sample: {
      id: sample.id,
      name: sample.name,
      activityScore: sample.activityScore,
      consistencyScore: sample.consistencyScore,
      context: sample.context,
    },
    playerChoice,
    modelPrediction,
    correctLabel,
    isCorrect: playerChoice === correctLabel,
    modelIsCorrect: modelPrediction === correctLabel,
    confidence,
    explanation: buildExplanation(sample, modelPrediction, rankedClusters),
    rankedClusters,
    evaluation: evaluationSnapshot,
  };
}

export const mlService = {
  predict,
};
