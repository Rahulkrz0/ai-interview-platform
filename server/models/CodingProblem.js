const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String }
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, default: false }
}, { _id: false });

const codingProblemSchema = new mongoose.Schema({
  problemNumber: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  topic: { type: String, required: true },
  companies: [{ type: String }],
  tags: [{ type: String }],

  // Problem details
  constraints: [{ type: String }],
  inputFormat: { type: String },
  outputFormat: { type: String },
  examples: [exampleSchema],

  // Code templates
  functionSignature: {
    javascript: { type: String },
    python: { type: String },
    cpp: { type: String },
    java: { type: String },
    c: { type: String }
  },
  starterCode: {
    javascript: { type: String },
    python: { type: String },
    cpp: { type: String },
    java: { type: String },
    c: { type: String }
  },

  // Test cases
  testCases: [testCaseSchema],

  // Solution & analysis
  timeComplexity: { type: String },
  spaceComplexity: { type: String },
  hints: [{ type: String }],
  editorial: { type: String },

  // Stats
  likes: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

// Virtual for acceptance rate
codingProblemSchema.virtual('acceptanceRate').get(function () {
  if (this.totalSubmissions === 0) return 0;
  return Math.round((this.acceptedSubmissions / this.totalSubmissions) * 100);
});

codingProblemSchema.set('toJSON', { virtuals: true });
codingProblemSchema.set('toObject', { virtuals: true });

// Index for efficient querying
codingProblemSchema.index({ difficulty: 1, topic: 1 });
codingProblemSchema.index({ slug: 1 });
codingProblemSchema.index({ problemNumber: 1 });

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
