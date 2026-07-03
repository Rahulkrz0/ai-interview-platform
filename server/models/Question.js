const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'Java', 'C++', 'Python', 'JavaScript', 'React', 'Node.js', 'Express.js',
      'MongoDB', 'SQL', 'DBMS', 'OOP', 'Operating System', 'Computer Networks', 
      'Data Structures', 'Algorithms', 'Aptitude', 'HR', 'Behavioral', 'System Design'
    ]
  },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  companies: [{ type: String }], // Google, Microsoft, Amazon, etc.
  topic: { type: String },
  completeAnswer: { type: String },
  detailedExplanation: { type: String },
  estimatedTime: { type: Number, default: 10 }, // in minutes
  relatedTopics: [{ type: String }],
  interviewTips: [{ type: String }],
  commonMistakes: [{ type: String }],
  bestAnswerStructure: { type: String },
  followUpQuestions: [{ type: String }],
  sampleAnswer: { type: String },
  keyPoints: [{ type: String }],
  importantKeywords: [{ type: String }],
  companySpecificTips: [{ type: String }],
  isAiGenerated: { type: Boolean, default: false },
  
  // For coding questions
  isCoding: { type: Boolean, default: false },
  starterCode: {
    javascript: { type: String },
    python: { type: String },
    cpp: { type: String },
    java: { type: String }
  },
  testCases: [
    {
      input: { type: String },
      output: { type: String },
      isPrivate: { type: Boolean, default: false }
    }
  ],
  constraints: [{ type: String }],
  optimalSolution: { type: String },
  complexityAnalysis: { type: String }, // AI explanation

  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
