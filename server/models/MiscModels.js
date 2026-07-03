const mongoose = require('mongoose');

// 1. Role Schema
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. student, admin, recruiter
  permissions: [{ type: String }] // e.g. 'read:questions', 'delete:users'
});

// 2. Permission Schema
const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. 'read:questions'
  description: { type: String }
});

// 3. Session Schema (for user login logging)
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  deviceInfo: { type: String },
  ipAddress: { type: String },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 4. Achievement Schema (for Gamification)
const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g., 'Streak Master', 'Bug Hunter'
  description: { type: String },
  badgeIcon: { type: String }, // e.g., URL or code name
  unlockedAt: { type: Date, default: Date.now }
});

// 5. Bookmark Schema
const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  createdAt: { type: Date, default: Date.now }
});

// 6. Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['system', 'reminder', 'achievement', 'discussion'], default: 'system' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// 7. Roadmap Schema (for Career Coach)
const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g., 'Frontend Roadmap'
  steps: [
    {
      title: { type: String },
      description: { type: String },
      status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
      suggestedResources: [{ type: String }]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

// 8. Certificate Schema
const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g. "React Coding Assessment"
  issuer: { type: String, default: "AI Interview Platform" },
  issueDate: { type: Date, default: Date.now },
  credentialUrl: { type: String }, // generated verification path
  pdfUrl: { type: String }
});

// 9. RecruiterInvite Schema
const recruiterInviteSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateEmail: { type: String, required: true },
  company: { type: String },
  roleName: { type: String },
  inviteCode: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// 10. Feedback Schema
const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
  overallRating: { type: Number, min: 1, max: 5, required: true },
  featureRatings: {
    mockInterview: { type: Number, min: 1, max: 5 },
    codingInterview: { type: Number, min: 1, max: 5 },
    resumeChecker: { type: Number, min: 1, max: 5 },
    careerAssistant: { type: Number, min: 1, max: 5 },
    dashboardExperience: { type: Number, min: 1, max: 5 },
    websiteUiUx: { type: Number, min: 1, max: 5 }
  },
  category: { 
    type: String, 
    enum: ['Bug Report', 'Feature Request', 'General Feedback', 'Improvement Suggestion', 'Other'], 
    required: true 
  },
  message: { type: String, required: true },
  screenshotUrl: { type: String },
  recommendation: { type: String, enum: ['Yes', 'No'], required: true },
  status: { type: String, enum: ['New', 'Reviewed', 'Resolved'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

// 11. SupportTicket Schema (Admin / Recruiter help)
const supportTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

// 12. UserSettings Schema
const userSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: false },
  theme: { type: String, enum: ['light', 'dark'], default: 'dark' },
  preferredLanguage: { type: String, default: 'English' }
});

// 13. AiLog Schema (Audit logs for Gemini usage and prompt performance)
const aiLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  apiType: { type: String }, // e.g. 'interview-eval', 'code-review', 'resume-score'
  promptTokens: { type: Number },
  completionTokens: { type: Number },
  cost: { type: Number, default: 0 },
  responseTimeMs: { type: Number },
  status: { type: String, enum: ['success', 'error'] },
  createdAt: { type: Date, default: Date.now }
});

// 14. AuditLog Schema
const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true }, // e.g. 'delete-user', 'edit-question'
  details: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 15. QuestionProgress Schema
const questionProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  isViewed: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

// 16. QuizHistory Schema
const quizHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  xpEarned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Role: mongoose.model('Role', roleSchema),
  Permission: mongoose.model('Permission', permissionSchema),
  Session: mongoose.model('Session', sessionSchema),
  Achievement: mongoose.model('Achievement', achievementSchema),
  Bookmark: mongoose.model('Bookmark', bookmarkSchema),
  Notification: mongoose.model('Notification', notificationSchema),
  Roadmap: mongoose.model('Roadmap', roadmapSchema),
  Certificate: mongoose.model('Certificate', certificateSchema),
  RecruiterInvite: mongoose.model('RecruiterInvite', recruiterInviteSchema),
  Feedback: mongoose.model('Feedback', feedbackSchema),
  SupportTicket: mongoose.model('SupportTicket', supportTicketSchema),
  UserSettings: mongoose.model('UserSettings', userSettingsSchema),
  AiLog: mongoose.model('AiLog', aiLogSchema),
  AuditLog: mongoose.model('AuditLog', auditLogSchema),
  QuestionProgress: mongoose.model('QuestionProgress', questionProgressSchema),
  QuizHistory: mongoose.model('QuizHistory', quizHistorySchema)
};
