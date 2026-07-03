const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firebaseUid: { type: String, unique: true, sparse: true },
  passwordHash: { type: String }, // optional for Google Auth users
  photo: { type: String },
  role: { type: String, enum: ['student', 'admin', 'recruiter'], default: 'student' },
  phone: { type: String },
  college: { type: String },
  degree: { type: String },
  branch: { type: String },
  graduationYear: { type: Number },
  skills: [{ type: String }],
  experience: { type: String }, // e.g., 'Entry level', '2 years'
  dreamCompany: { type: String },
  dreamRole: { type: String },
  resumeUrl: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String },
  
  // Gamification fields
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  coins: { type: Number, default: 0 },
  streakCount: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
