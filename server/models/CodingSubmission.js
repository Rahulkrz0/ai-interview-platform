const mongoose = require('mongoose');

const codingSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'CodingProblem', required: true },
  language: { type: String, enum: ['javascript', 'python', 'cpp', 'java', 'c'], required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compile Error'], required: true },
  verdict: { type: String }, // Additional detailed status/output message
  
  testCasesPassed: { type: Number, default: 0 },
  totalTestCases: { type: Number, default: 0 },
  executionTime: { type: Number }, // in ms
  memoryUsed: { type: Number }, // in KB
  
  // AI Reviews
  aiOptimizationSuggestion: { type: String },
  complexityAnalysis: {
    timeComplexity: { type: String },
    spaceComplexity: { type: String }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodingSubmission', codingSubmissionSchema);
