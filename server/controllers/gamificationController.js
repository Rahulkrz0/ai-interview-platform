const User = require('../models/User');
const { Achievement, Certificate, Bookmark, QuizHistory } = require('../models/MiscModels');
const Question = require('../models/Question');
const geminiService = require('../services/geminiService');

exports.getLeaderboard = async (req, res, next) => {
  try {
    // Return top 10 users sorted by XP points
    const users = await User.find({})
      .select('name photo xp level streakCount')
      .sort({ xp: -1 })
      .limit(10);
    res.status(200).json({ status: 'success', leaderboard: users });
  } catch (error) {
    next(error);
  }
};

exports.getQuiz = async (req, res, next) => {
  try {
    const { topic } = req.query;
    const questions = await geminiService.generateDailyQuiz({
      skillTopic: topic || 'General Programming'
    });
    res.status(200).json({ status: 'success', questions });
  } catch (error) {
    next(error);
  }
};

exports.submitQuizResult = async (req, res, next) => {
  try {
    const { topic, score, totalQuestions } = req.body;
    
    // Add XP depending on correct quiz answers (e.g. 15 XP per correct answer)
    const gainedXp = score * 15;
    
    const user = await User.findById(req.user.id);
    if (user && gainedXp > 0) {
      user.xp += gainedXp;
      user.coins += score * 2; // 2 coins per correct answer
      
      const nextLevel = Math.floor(user.xp / 300) + 1;
      if (nextLevel > user.level) {
        user.level = nextLevel;
      }
      await user.save();
    }

    // Save quiz history
    const quizHistory = await QuizHistory.create({
      userId: req.user.id,
      topic: topic || 'General Programming',
      score,
      totalQuestions: totalQuestions || 10,
      xpEarned: gainedXp
    });

    res.status(200).json({
      status: 'success',
      gainedXp,
      coins: score * 2,
      newXpTotal: user ? user.xp : 0,
      quizHistory
    });
  } catch (error) {
    next(error);
  }
};

exports.getFlashcards = async (req, res, next) => {
  try {
    const { topic } = req.query;
    const cards = await geminiService.generateFlashcards({
      topic: topic || 'System Design'
    });
    res.status(200).json({ status: 'success', flashcards: cards });
  } catch (error) {
    next(error);
  }
};

exports.getAchievements = async (req, res, next) => {
  try {
    let achievements = await Achievement.find({ userId: req.user.id });
    
    if (achievements.length === 0) {
      // Seed default basic achievement
      achievements = [await Achievement.create({
        userId: req.user.id,
        title: 'Fresh Recruit',
        description: 'Signed up and initialized coding roadmap profile.',
        badgeIcon: 'award'
      })];
    }
    res.status(200).json({ status: 'success', achievements });
  } catch (error) {
    next(error);
  }
};

exports.claimCertificate = async (req, res, next) => {
  try {
    const { title } = req.body;

    const certificate = await Certificate.create({
      userId: req.user.id,
      title: title || 'Full-Stack Developer Core Certification',
      credentialUrl: `/verify-certificate/${Math.random().toString(36).substring(2, 10)}`
    });

    res.status(201).json({ status: 'success', certificate });
  } catch (error) {
    next(error);
  }
};

exports.getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ userId: req.user.id });
    res.status(200).json({ status: 'success', certificates });
  } catch (error) {
    next(error);
  }
};

exports.toggleBookmark = async (req, res, next) => {
  try {
    const { questionId } = req.body;
    
    const bookmark = await Bookmark.findOne({ userId: req.user.id, questionId });
    let bookmarked = false;

    if (bookmark) {
      await Bookmark.findByIdAndDelete(bookmark._id);
    } else {
      await Bookmark.create({ userId: req.user.id, questionId });
      bookmarked = true;
    }

    res.status(200).json({ status: 'success', bookmarked });
  } catch (error) {
    next(error);
  }
};
