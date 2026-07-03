const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['HR', 'Technical', 'Behavioral', 'Aptitude', 'System Design', 'Coding', 'Custom'], 
    required: true 
  },
  company: { type: String },
  roleName: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  durationLimit: { type: Number, default: 30 }, // in minutes
  status: { type: String, enum: ['scheduled', 'in-progress', 'completed'], default: 'in-progress' },
  mode: { type: String, enum: ['text', 'voice'], default: 'text' },
  language: { type: String, default: 'English' },

  // Array of questions in this interview
  questions: [
    {
      questionText: { type: String, required: true },
      userAnswer: { type: String },
      audioUrl: { type: String },
      timestamp: { type: Date, default: Date.now },
      
      // Real-time analysis metrics
      wpm: { type: Number }, // words per minute
      fillerWordsCount: { type: Number, default: 0 }, // um, uh, like etc.
      fillerWordsList: [{ type: String }],
      eyeContactScore: { type: Number }, // mock eye-contact percentage
      responseDuration: { type: Number } // in seconds
    }
  ],

  currentQuestionIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Interview', interviewSchema);
