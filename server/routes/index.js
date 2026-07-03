const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Controllers
const authController = require('../controllers/authController');
const interviewController = require('../controllers/interviewController');
const codingController = require('../controllers/codingController');
const resumeController = require('../controllers/resumeController');
const coachController = require('../controllers/coachController');
const reportController = require('../controllers/reportController');
const gamificationController = require('../controllers/gamificationController');
const notificationController = require('../controllers/notificationController');
const adminController = require('../controllers/adminController');
const recruiterController = require('../controllers/recruiterController');
const feedbackController = require('../controllers/feedbackController');
const questionsController = require('../controllers/questionsController');
const aiToolsController = require('../controllers/aiToolsController');
const flashcardRoutes = require('./flashcardRoutes');

// Middlewares
const { protect, restrictTo, optionalProtect } = require('../middleware/authMiddleware');
const { authLimiter, generalLimiter } = require('../middleware/securityMiddleware');

// Configure Multer for Resume upload versions
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit to 5MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype.startsWith('image/')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, or Image file uploads are supported.'));
    }
  }
});

// ==========================================
// 1. Auth Routing (With Rate Limits)
// ==========================================
router.post('/auth/signup', authLimiter, authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/google', authController.googleLogin);
router.post('/auth/refresh', authController.refreshToken);
router.post('/auth/logout', authController.logout);
router.get('/auth/profile', protect, authController.getProfile);
router.put('/auth/profile', protect, authController.updateProfile);

// ==========================================
// 2. Interview Operations (Student Prep)
// ==========================================
router.post('/interviews/create', protect, generalLimiter, interviewController.createInterview);
router.post('/interviews/submit-answer', protect, interviewController.submitAnswer);
router.post('/interviews/evaluate-speech', protect, interviewController.evaluateSpeech);
router.post('/interviews/end', protect, interviewController.endInterview);
router.get('/interviews/history', protect, interviewController.getInterviewHistory);

// ==========================================
// 3. Coding Platform
// ==========================================
router.get('/coding/problems', protect, codingController.getProblems);
router.get('/coding/stats', protect, codingController.getDashboardStats);
router.get('/coding/problems/:id', protect, codingController.getProblemDetail);
router.post('/coding/run', protect, codingController.runCode);
router.post('/coding/submit', protect, codingController.submitCode);
router.get('/coding/history', protect, codingController.getSubmissionHistory);
router.post('/coding/assistant', protect, codingController.aiAssistant);

// ==========================================
// 4. Resume Module
// ==========================================
router.post('/resumes/upload', protect, upload.single('resume'), resumeController.uploadResume);
router.get('/resumes/detail', protect, resumeController.getResume);
router.post('/resumes/cover-letter', protect, resumeController.generateCoverLetter);
router.post('/resumes/review-profiles', protect, resumeController.reviewSocialProfiles);

// ==========================================
// 5. AI Career Coach
// ==========================================
router.get('/coach/roadmap', protect, coachController.getRoadmap);
router.put('/coach/roadmap/step', protect, coachController.updateRoadmapStep);
router.get('/coach/salary-predict', protect, coachController.getSalaryPrediction);
router.get('/coach/projects', protect, coachController.getProjectSuggestions);

// ==========================================
// 6. Reports View & Downloads
// ==========================================
router.get('/reports', protect, reportController.getReports);
router.get('/reports/detail/:reportId', protect, reportController.getReportDetail);
router.get('/reports/download-pdf/:reportId', protect, reportController.downloadReportPDF);
router.get('/reports/download-csv', protect, reportController.downloadReportsCSV);

// ==========================================
// 7. Gamification & XP Actions
// ==========================================
router.get('/gamification/leaderboard', protect, gamificationController.getLeaderboard);
router.get('/gamification/quiz', protect, gamificationController.getQuiz);
router.post('/gamification/quiz/submit', protect, gamificationController.submitQuizResult);
router.get('/gamification/flashcards', protect, gamificationController.getFlashcards);
router.get('/gamification/achievements', protect, gamificationController.getAchievements);
router.post('/gamification/claim-cert', protect, gamificationController.claimCertificate);
router.get('/gamification/certs', protect, gamificationController.getCertificates);
router.post('/gamification/bookmark', protect, gamificationController.toggleBookmark);

// ==========================================
// 7.5. Conceptual Questions Library
// ==========================================
router.get('/questions', protect, questionsController.getQuestions);
router.get('/questions/bookmarks', protect, questionsController.getBookmarkedQuestions);
router.get('/questions/progress', protect, questionsController.getProgress);
router.get('/questions/:id', protect, questionsController.getQuestionDetail);
router.post('/questions/:id/complete', protect, questionsController.markComplete);
router.get('/questions/:id/answer', protect, questionsController.getAnswer);
router.post('/questions/:id/answer', protect, questionsController.saveAnswer);
router.post('/questions/:id/evaluate', protect, questionsController.evaluateAnswer);

// ==========================================
// 7.6. Advanced AI Tools Workspace
// ==========================================
router.post('/ai-tools/:tool', protect, aiToolsController.runTool);

// ==========================================
// 7.7. AI Flashcards
// ==========================================
router.use('/flashcards', flashcardRoutes);

// ==========================================
// 8. Notifications, Support & Contact
// ==========================================
router.get('/notifications', protect, notificationController.getNotifications);
router.post('/notifications/read', protect, notificationController.markRead);
router.post('/feedback', optionalProtect, upload.single('screenshot'), feedbackController.submitFeedback);
router.post('/support/ticket', protect, notificationController.submitTicket);

// ==========================================
// 9. Admin Operations (Restricted)
// ==========================================
router.get('/admin/stats', protect, restrictTo('admin'), adminController.getAdminDashboardStats);
router.get('/admin/logs', protect, restrictTo('admin'), adminController.getAuditLogs);
router.get('/admin/feedback', protect, restrictTo('admin'), feedbackController.getAllFeedback);
router.put('/admin/feedback/:id/status', protect, restrictTo('admin'), feedbackController.updateStatus);
router.delete('/admin/feedback/:id', protect, restrictTo('admin'), feedbackController.deleteFeedback);
router.get('/admin/feedback/export', protect, restrictTo('admin'), feedbackController.exportToCSV);
router.get('/admin/tickets', protect, restrictTo('admin'), adminController.getSupportTickets);
router.put('/admin/tickets/status', protect, restrictTo('admin'), adminController.updateTicketStatus);
router.post('/admin/question', protect, restrictTo('admin'), adminController.manageQuestion);

// ==========================================
// 10. Recruiter Operations (Restricted)
// ==========================================
router.post('/recruiter/invite', protect, restrictTo('recruiter'), recruiterController.createInvite);
router.get('/recruiter/invites', protect, restrictTo('recruiter'), recruiterController.getInvites);
router.get('/recruiter/compare', protect, restrictTo('recruiter'), recruiterController.compareCandidates);

module.exports = router;
