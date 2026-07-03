const User = require('../models/User');
const Report = require('../models/Report');
const { RecruiterInvite } = require('../models/MiscModels');

exports.createInvite = async (req, res, next) => {
  try {
    const { candidateEmail, company, roleName } = req.body;

    if (!candidateEmail) {
      return res.status(400).json({ status: 'fail', message: 'Candidate email is required.' });
    }

    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const invite = await RecruiterInvite.create({
      recruiterId: req.user.id,
      candidateEmail,
      company: company || 'My Company',
      roleName: roleName || 'Software Intern',
      inviteCode,
      status: 'pending'
    });

    res.status(201).json({ status: 'success', invite });
  } catch (error) {
    next(error);
  }
};

exports.getInvites = async (req, res, next) => {
  try {
    const invites = await RecruiterInvite.find({ recruiterId: req.user.id });
    res.status(200).json({ status: 'success', invites });
  } catch (error) {
    next(error);
  }
};

exports.compareCandidates = async (req, res, next) => {
  try {
    const { emails } = req.query; // comma separated list
    
    if (!emails) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email query params.' });
    }

    const emailList = emails.split(',');
    
    const users = await User.find({ email: { $in: emailList }, role: 'student' });
    const userIds = users.map(u => u._id);

    // Fetch reports for these candidates
    const reports = await Report.find({ userId: { $in: userIds } })
      .populate('userId', 'name email skills xp')
      .populate('interviewId', 'type roleName company difficulty');

    res.status(200).json({ status: 'success', comparisons: reports });
  } catch (error) {
    next(error);
  }
};
