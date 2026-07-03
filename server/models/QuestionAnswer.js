const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  answerText: { type: String, default: '' },
  
  // AI Evaluation Fields
  isEvaluated: { type: Boolean, default: false },
  overallScore: { type: Number },
  scores: {
    relevance: { type: Number },
    technicalAccuracy: { type: Number },
    communication: { type: Number },
    confidence: { type: Number },
    completeness: { type: Number },
    grammar: { type: Number },
    professionalTone: { type: Number },
    fluency: { type: Number }
  },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  missingPoints: [{ type: String }],
  suggestedImprovements: [{ type: String }],
  sampleAnswer: { type: String },
  aiFeedback: { type: String },
  estimatedInterviewRating: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp before saving
questionAnswerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('QuestionAnswer', questionAnswerSchema);
