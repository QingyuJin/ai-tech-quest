import { apiClient } from "../../../services/apiClient.js";
import { evaluationSummary } from "../data/mlDataset.js";

function predictCluster(sample) {
  if (sample.activityScore >= 65 && sample.consistencyScore >= 50) {
    return "B";
  }

  if (sample.consistencyScore >= 60 && sample.activityScore >= 35) {
    return "A";
  }

  return "C";
}

function confidenceFor(sample, prediction) {
  if (prediction === "B") {
    return sample.activityScore >= 74 && sample.consistencyScore >= 58 ? 0.9 : 0.76;
  }

  if (prediction === "A") {
    return sample.consistencyScore >= 74 ? 0.86 : 0.72;
  }

  return sample.activityScore <= 35 && sample.consistencyScore <= 46 ? 0.84 : 0.7;
}

function explainPrediction(sample, prediction) {
  if (prediction === "B") {
    return `mock 模型預測為 B，因為活躍分數為 ${sample.activityScore}，屬於偏高區間；穩定分數 ${sample.consistencyScore} 也足以讓它遠離低活躍族群。`;
  }

  if (prediction === "A") {
    return `mock 模型預測為 A，因為穩定分數 ${sample.consistencyScore} 偏高，而活躍分數 ${sample.activityScore} 屬於中等，不是極端高活躍。`;
  }

  return `mock 模型預測為 C，因為活躍分數 ${sample.activityScore} 和穩定分數 ${sample.consistencyScore} 都更接近低活躍族群。`;
}

function mapApiResponse(payload) {
  return {
    sampleId: payload.sample_id,
    modelPrediction: payload.model_prediction,
    correctLabel: payload.correct_label,
    confidence: payload.confidence,
    explanation: payload.explanation,
    features: {
      activityScore: payload.features.activity_score,
      consistencyScore: payload.features.consistency_score,
    },
    evaluation: {
      accuracy: payload.evaluation.accuracy,
      confusionMatrix: payload.evaluation.confusion_matrix,
      errorAnalysis: payload.evaluation.error_analysis,
    },
  };
}

async function predictMock(sample) {
  if (!sample) {
    throw new Error("請先點選未知資料點。");
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 600);
  });

  const modelPrediction = predictCluster(sample);
  const confidence = confidenceFor(sample, modelPrediction);

  return {
    sampleId: sample.id,
    modelPrediction,
    correctLabel: sample.correctLabel,
    confidence,
    explanation: explainPrediction(sample, modelPrediction),
    features: {
      activityScore: sample.activityScore,
      consistencyScore: sample.consistencyScore,
    },
    evaluation: evaluationSummary,
  };
}

export const mlService = {
  async predict(sample) {
    if (apiClient.enabled) {
      const payload = await apiClient.post("/ml/predict", {
        sample_id: sample.id,
        activity_score: sample.activityScore,
        consistency_score: sample.consistencyScore,
        correct_label: sample.correctLabel,
      });
      return mapApiResponse(payload);
    }

    return predictMock(sample);
  },
};
