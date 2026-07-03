const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileContentText: { type: String }, // parsed plain text of resume
  
  atsScore: { type: Number, default: 0 },
  skillsMatch: { type: Number, default: 0 },
  keywordMatch: { type: Number, default: 0 },
  resumeStructureScore: { type: Number, default: 0 },
  experienceScore: { type: Number, default: 0 },
  educationScore: { type: Number, default: 0 },
  grammarScore: { type: Number, default: 0 },
  formattingScore: { type: Number, default: 0 },
  readabilityScore: { type: Number, default: 0 },
  grammarIssuesCount: { type: Number, default: 0 },
  missingKeywords: [{ type: String }],
  matchScore: { type: Number, default: 0 }, // legacy generic match score, keeping for compatibility
  summary: { type: String },
  suggestions: [{ type: String }],
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],

  // Custom generated cover letters
  coverLetters: [
    {
      companyName: { type: String },
      jobRole: { type: String },
      letterContent: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  // History versioning
  versionHistory: [
    {
      version: { type: Number },
      fileName: { type: String },
      fileUrl: { type: String },
      atsScore: { type: Number },
      updatedAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
