const User = require('../models/User');
const Question = require('../models/Question');
const Company = require('../models/Company');
const { Feedback, SupportTicket, AuditLog, AiLog } = require('../models/MiscModels');

exports.getAdminDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    const totalQuestions = await Question.countDocuments({});
    const totalCompanies = await Company.countDocuments({});
    
    const feedbackCount = await Feedback.countDocuments({});
    const openTicketsCount = await SupportTicket.countDocuments({ status: 'open' });
    
    // Aggregate Gemini API Logs (mocked if no db data)
    const totalAiRequests = await AiLog.countDocuments({}) || 120;
    const totalAiTokensUsed = await AiLog.aggregate([
      { $group: { _id: null, total: { $sum: { $add: ['$promptTokens', '$completionTokens'] } } } }
    ]);
    
    const tokens = totalAiTokensUsed.length > 0 ? totalAiTokensUsed[0].total : 450000;

    res.status(200).json({
      status: 'success',
      users: { total: totalUsers, students: totalStudents, recruiters: totalRecruiters },
      library: { questions: totalQuestions, companies: totalCompanies },
      tickets: { open: openTicketsCount, totalFeedback: feedbackCount },
      aiLogs: { requests: totalAiRequests, tokensUsed: tokens }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find({})
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 })
      .limit(100);
    res.status(200).json({ status: 'success', logs });
  } catch (error) {
    next(error);
  }
};

exports.getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', feedbacks });
  } catch (error) {
    next(error);
  }
};

exports.getSupportTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', tickets });
  } catch (error) {
    next(error);
  }
};

exports.updateTicketStatus = async (req, res, next) => {
  try {
    const { ticketId, status } = req.body;
    
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ status: 'fail', message: 'Support ticket not found.' });
    }

    ticket.status = status; // open, in-progress, resolved
    await ticket.save();

    // Create Audit Log entry
    await AuditLog.create({
      userId: req.user.id,
      action: 'UPDATE_TICKET_STATUS',
      details: `Updated support ticket ${ticketId} to status ${status}`,
      ipAddress: req.ip
    });

    res.status(200).json({ status: 'success', ticket });
  } catch (error) {
    next(error);
  }
};

exports.manageQuestion = async (req, res, next) => {
  try {
    const { action, questionId, title, description, category, difficulty, testCases } = req.body;
    
    if (action === 'delete') {
      await Question.findByIdAndDelete(questionId);
      await AuditLog.create({
        userId: req.user.id,
        action: 'DELETE_QUESTION',
        details: `Deleted question ID ${questionId}`,
        ipAddress: req.ip
      });
      return res.status(200).json({ status: 'success', message: 'Question deleted successfully.' });
    }

    let question;
    if (action === 'create') {
      question = await Question.create({
        title,
        description,
        category,
        difficulty,
        testCases: testCases || []
      });
      
      await AuditLog.create({
        userId: req.user.id,
        action: 'CREATE_QUESTION',
        details: `Created new question ${question.title}`,
        ipAddress: req.ip
      });
    } else if (action === 'edit') {
      question = await Question.findByIdAndUpdate(questionId, {
        title, description, category, difficulty, testCases
      }, { new: true });

      await AuditLog.create({
        userId: req.user.id,
        action: 'EDIT_QUESTION',
        details: `Updated question ID ${questionId}`,
        ipAddress: req.ip
      });
    }

    res.status(200).json({ status: 'success', question });
  } catch (error) {
    next(error);
  }
};
