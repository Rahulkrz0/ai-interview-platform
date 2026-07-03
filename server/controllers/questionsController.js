const Question = require('../models/Question');
const { Bookmark, QuestionProgress } = require('../models/MiscModels');
const QuestionAnswer = require('../models/QuestionAnswer');
const geminiService = require('../services/geminiService');

// Get questions list with search, filter, and pagination
exports.getQuestions = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      category, 
      difficulty, 
      company, 
      topic 
    } = req.query;

    const query = {};

    // Search by title, description, or topic
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { topic: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Difficulty filter
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    // Company tag filter
    if (company && company !== 'All') {
      query.companies = { $regex: company, $options: 'i' };
    }

    // Topic filter
    if (topic && topic !== 'All') {
      query.topic = { $regex: topic, $options: 'i' };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const total = await Question.countDocuments(query);
    const questions = await Question.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: 1 }); // Seed order is natural

    // Fetch user bookmarks & completed stats to label them inline
    const userBookmarks = await Bookmark.find({ userId: req.user.id }).select('questionId');
    const bookmarkIds = userBookmarks.map(b => b.questionId.toString());

    const userProgress = await QuestionProgress.find({ userId: req.user.id });
    const completedIds = userProgress.filter(p => p.isCompleted).map(p => p.questionId.toString());
    const viewedIds = userProgress.filter(p => p.isViewed).map(p => p.questionId.toString());

    const formattedQuestions = questions.map(q => ({
      ...q.toObject(),
      isBookmarked: bookmarkIds.includes(q._id.toString()),
      isCompleted: completedIds.includes(q._id.toString()),
      isViewed: viewedIds.includes(q._id.toString())
    }));

    res.status(200).json({
      status: 'success',
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      questions: formattedQuestions
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve single question details and mark it as viewed
exports.getQuestionDetail = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ status: 'fail', message: 'Question not found.' });
    }

    // Call AI enrichment if not cached in DB
    if (!question.isAiGenerated) {
      try {
        const aiData = await geminiService.enrichQuestionWithAI({
          title: question.title,
          description: question.description,
          category: question.category,
          difficulty: question.difficulty,
          companies: question.companies
        });

        // Save AI content directly into the document
        question.completeAnswer = aiData.completeAnswer || question.completeAnswer;
        question.detailedExplanation = aiData.detailedExplanation || question.detailedExplanation;
        question.interviewTips = aiData.interviewTips || question.interviewTips;
        question.commonMistakes = aiData.commonMistakes || question.commonMistakes;
        question.bestAnswerStructure = aiData.bestAnswerStructure || '';
        question.followUpQuestions = aiData.followUpQuestions || [];
        question.sampleAnswer = aiData.sampleAnswer || '';
        question.keyPoints = aiData.keyPoints || [];
        question.importantKeywords = aiData.importantKeywords || [];
        question.companySpecificTips = aiData.companySpecificTips || [];
        question.estimatedTime = aiData.estimatedTime || question.estimatedTime;
        question.isAiGenerated = true;

        await question.save();
      } catch (aiErr) {
        console.error('AI Enrichment warning for question details:', aiErr.message);
        // Do not crash the endpoint, return pre-seeded static content
      }
    }

    // Mark as viewed in progress schema
    await QuestionProgress.findOneAndUpdate(
      { userId: req.user.id, questionId: question._id },
      { isViewed: true },
      { upsert: true, new: true }
    );

    // Grab bookmark and completion states
    const isBookmarked = await Bookmark.exists({ userId: req.user.id, questionId: question._id });
    const progress = await QuestionProgress.findOne({ userId: req.user.id, questionId: question._id });

    // Fetch up to 3 related questions in the same category
    const relatedQuestions = await Question.find({
      category: question.category,
      _id: { $ne: question._id }
    }).limit(3).select('title difficulty category');

    res.status(200).json({
      status: 'success',
      question,
      isBookmarked: !!isBookmarked,
      isCompleted: !!(progress && progress.isCompleted),
      relatedQuestions
    });
  } catch (error) {
    next(error);
  }
};

// Toggle completion status of a conceptual question
exports.markComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const progress = await QuestionProgress.findOneAndUpdate(
      { userId: req.user.id, questionId: id },
      { isCompleted: !!isCompleted },
      { upsert: true, new: true }
    );

    res.status(200).json({
      status: 'success',
      isCompleted: progress.isCompleted
    });
  } catch (error) {
    next(error);
  }
};

// Get user bookmarked list
exports.getBookmarkedQuestions = async (req, res, next) => {
  try {
    const userBookmarks = await Bookmark.find({ userId: req.user.id }).populate('questionId');
    const questions = userBookmarks.map(b => b.questionId).filter(Boolean);

    res.status(200).json({
      status: 'success',
      count: questions.length,
      questions
    });
  } catch (error) {
    next(error);
  }
};

// Get progress stats
exports.getProgress = async (req, res, next) => {
  try {
    const totalQuestions = await Question.countDocuments({});
    
    const userProgress = await QuestionProgress.find({ userId: req.user.id });
    const completedCount = userProgress.filter(p => p.isCompleted).length;
    const viewedCount = userProgress.filter(p => p.isViewed).length;
    
    const bookmarkedCount = await Bookmark.countDocuments({ userId: req.user.id });
    
    const completionPercentage = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

    res.status(200).json({
      status: 'success',
      stats: {
        totalQuestions,
        viewedQuestions: viewedCount,
        completedQuestions: completedCount,
        bookmarkedQuestions: bookmarkedCount,
        completionPercentage
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get the user's saved answer or evaluation for a specific question
exports.getAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const answer = await QuestionAnswer.findOne({ userId: req.user.id, questionId: id });
    
    res.status(200).json({
      status: 'success',
      answer
    });
  } catch (error) {
    next(error);
  }
};

// Save a draft of the user's answer
exports.saveAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answerText } = req.body;

    let answer = await QuestionAnswer.findOne({ userId: req.user.id, questionId: id });
    if (!answer) {
      answer = await QuestionAnswer.create({
        userId: req.user.id,
        questionId: id,
        answerText
      });
    } else {
      answer.answerText = answerText;
      await answer.save();
    }

    res.status(200).json({
      status: 'success',
      answer
    });
  } catch (error) {
    next(error);
  }
};

// Evaluate the user's answer using Gemini
exports.evaluateAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answerText } = req.body;

    if (!answerText || answerText.trim() === '') {
      return res.status(400).json({ status: 'fail', message: 'Answer cannot be empty.' });
    }

    if (answerText.trim().length < 15) {
      return res.status(400).json({ status: 'fail', message: 'Your answer is too short or not meaningful. Please provide a complete interview answer before evaluation.' });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ status: 'fail', message: 'Question not found.' });
    }

    // Call Gemini to evaluate
    const evaluation = await geminiService.evaluateAnswer({
      question: question.title + ' - ' + question.description,
      answer: answerText,
      jobRole: 'Software Engineer', // Default or could pass from req
      difficulty: question.difficulty
    });

    let answerRecord = await QuestionAnswer.findOne({ userId: req.user.id, questionId: id });
    if (!answerRecord) {
      answerRecord = new QuestionAnswer({
        userId: req.user.id,
        questionId: id
      });
    }

    answerRecord.answerText = answerText;
    answerRecord.isEvaluated = true;
    answerRecord.overallScore = evaluation.scores?.overall || 0;
    answerRecord.scores = evaluation.scores || {};
    answerRecord.strengths = evaluation.strengths || [];
    answerRecord.weaknesses = evaluation.weaknesses || [];
    
    // Convert 'mistakes' to missingPoints or suggestedImprovements based on geminiService response
    answerRecord.missingPoints = evaluation.mistakes?.map(m => m.errorDescription) || [];
    answerRecord.suggestedImprovements = evaluation.mistakes?.map(m => m.suggestedCorrection) || [];
    
    answerRecord.sampleAnswer = evaluation.sampleAnswer || '';
    answerRecord.aiFeedback = 'Evaluation complete. See metrics above.';
    
    await answerRecord.save();

    res.status(200).json({
      status: 'success',
      answer: answerRecord
    });
  } catch (error) {
    console.error('[AI Evaluation Error]', error);
    res.status(500).json({ 
      status: 'fail', 
      message: 'AI evaluation is temporarily unavailable. Please try again later.' 
    });
  }
};
