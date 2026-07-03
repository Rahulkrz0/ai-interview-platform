const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true },
  
  // Numerical scores
  overallScore: { type: Number, default: 0 },
  technicalScore: { type: Number, default: 0 },
  communicationScore: { type: Number, default: 0 },
  grammarScore: { type: Number, default: 0 },
  confidenceScore: { type: Number, default: 0 },
  fluencyScore: { type: Number, default: 0 },
  problemSolvingScore: { type: Number, default: 0 },
  hiringProbability: { type: Number, default: 0 }, // percentage
  
  // Qualitative reviews
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  
  // Key mistakes and how to fix them
  mistakes: [
    {
      question: { type: String },
      userAnswer: { type: String },
      errorDescription: { type: String },
      suggestedCorrection: { type: String }
    }
  ],

  suggestedAnswers: [
    {
      question: { type: String },
      sampleAnswer: { type: String }
    }
  ],

  personalizedImprovementPlan: { type: String },
  learningRoadmap: { type: mongoose.Schema.Types.Mixed }, // Structured roadmap JSON

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
