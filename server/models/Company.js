const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. "Google", "TCS"
  logo: { type: String },
  description: { type: String },
  tips: [{ type: String }],
  faq: [
    {
      question: { type: String },
      answer: { type: String }
    }
  ],
  interviewProcess: [{ type: String }], // phases/rounds
  
  // Categorized questions lists (or references)
  hrQuestions: [{ type: String }],
  technicalQuestions: [{ type: String }],
  codingQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  oaQuestions: [{ type: String }], // Online assessment questions
  behavioralQuestions: [{ type: String }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
