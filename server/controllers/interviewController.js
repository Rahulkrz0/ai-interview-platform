const Interview = require('../models/Interview');
const Report = require('../models/Report');
const User = require('../models/User');
const geminiService = require('../services/geminiService');

// Filler words pattern match
const FILLER_WORDS = ['um', 'uh', 'like', 'so', 'you know', 'basically', 'actually'];

// Helper to count filler words
function analyzeSpeechPaceAndFillers(text, durationSec) {
  if (!text) return { count: 0, list: [], wpm: 0 };
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  const list = [];
  let count = 0;

  words.forEach(word => {
    // clean word from punctuation
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    if (FILLER_WORDS.includes(cleanWord)) {
      count++;
      if (!list.includes(cleanWord)) {
        list.push(cleanWord);
      }
    }
  });

  const minutes = durationSec > 0 ? durationSec / 60 : 0.5; // fallback to 30 secs
  const wpm = Math.round(totalWords / minutes);

  return { count, list, wpm };
}

exports.createInterview = async (req, res, next) => {
  try {
    const { type, company, roleName, difficulty, durationLimit, mode, language } = req.body;

    const interview = await Interview.create({
      userId: req.user.id,
      type: type || 'HR',
      company: company || 'General',
      roleName: roleName || 'Software Engineer',
      difficulty: difficulty || 'Medium',
      durationLimit: durationLimit || 30,
      mode: mode || 'text',
      language: language || 'English',
      status: 'in-progress'
    });

    // Request initial set of questions from Gemini
    const questionsList = await geminiService.generateInterviewQuestions({
      category: interview.type,
      difficulty: interview.difficulty,
      jobRole: interview.roleName,
      company: interview.company,
      duration: interview.durationLimit
    });

    // Populate interview questions structure
    interview.questions = questionsList.map(qText => ({
      questionText: qText,
      userAnswer: ''
    }));

    await interview.save();

    res.status(201).json({
      success: true,
      data: {
        interviewId: interview._id,
        firstQuestion: interview.questions[0].questionText,
        totalQuestions: interview.questions.length
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.submitAnswer = async (req, res, next) => {
  try {
    const { interviewId, answer, durationSec } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview || interview.status !== 'in-progress') {
      return res.status(400).json({ success: false, message: 'Active interview session not found.' });
    }

    const currentIndex = interview.currentQuestionIndex;
    if (currentIndex >= interview.questions.length) {
      return res.status(400).json({ success: false, message: 'All questions already answered.' });
    }

    // Speech speed & filler-word check
    const sec = durationSec || 30; // default duration mock
    const speechMetrics = analyzeSpeechPaceAndFillers(answer, sec);

    // No eye-tracking implementation yet
    const eyeContactScore = null;

    interview.questions[currentIndex].userAnswer = answer;
    interview.questions[currentIndex].wpm = speechMetrics.wpm;
    interview.questions[currentIndex].fillerWordsCount = speechMetrics.count;
    interview.questions[currentIndex].fillerWordsList = speechMetrics.list;
    interview.questions[currentIndex].eyeContactScore = eyeContactScore;
    interview.questions[currentIndex].responseDuration = sec;

    interview.currentQuestionIndex += 1;
    await interview.save();

    const isFinished = interview.currentQuestionIndex >= interview.questions.length;
    let nextQuestion = null;

    if (!isFinished) {
      nextQuestion = interview.questions[interview.currentQuestionIndex].questionText;
    }

    res.status(200).json({
      success: true,
      data: {
        isFinished,
        nextQuestion,
        currentIndex: interview.currentQuestionIndex
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.endInterview = async (req, res, next) => {
  try {
    const { interviewId } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    interview.status = 'completed';
    interview.completedAt = Date.now();
    await interview.save();

    // Collect all answers and build summary prompt for evaluation
    // Evaluate using first question/answer as primary sample
    const primaryQ = interview.questions[0];
    const evalResult = await geminiService.evaluateAnswer({
      question: primaryQ.questionText,
      answer: primaryQ.userAnswer,
      jobRole: interview.roleName,
      difficulty: interview.difficulty
    });

    // Create learning timeline nodes mockup for career enhancement path
    const roadmap = await geminiService.generateRoadmap({
      title: `${interview.roleName} - ${interview.type}`,
      skillsArray: [interview.type]
    });

    const report = await Report.create({
      userId: req.user.id,
      interviewId: interview._id,
      overallScore: evalResult.scores.overall || 0,
      technicalScore: evalResult.scores.technicalAccuracy || 0,
      communicationScore: evalResult.scores.communication || 0,
      grammarScore: evalResult.scores.grammar || 0,
      confidenceScore: evalResult.scores.confidence || 0,
      fluencyScore: evalResult.scores.fluency || 0,
      problemSolvingScore: evalResult.scores.technicalAccuracy || 0,
      hiringProbability: Math.min(100, Math.round((evalResult.scores.overall || 0) * 1.1)),
      strengths: evalResult.strengths,
      weaknesses: evalResult.weaknesses,
      mistakes: evalResult.mistakes.map(m => ({
        question: primaryQ.questionText,
        userAnswer: primaryQ.userAnswer,
        errorDescription: m.errorDescription,
        suggestedCorrection: m.suggestedCorrection
      })),
      suggestedAnswers: [
        {
          question: primaryQ.questionText,
          sampleAnswer: evalResult.sampleAnswer
        }
      ],
      personalizedImprovementPlan: 'Focus on structuring answers using the STAR method (Situation, Task, Action, Result) and lowering filler word count.',
      learningRoadmap: roadmap
    });

    // Reward XP & Coins for completing interview
    const user = await User.findById(req.user.id);
    if (user) {
      user.xp += 100; // 100 XP for interview
      user.coins += 20; // 20 Coins
      // Check Level up (every 300 XP is a level)
      const nextLevel = Math.floor(user.xp / 300) + 1;
      if (nextLevel > user.level) {
        user.level = nextLevel;
      }
      await user.save();
    }

    res.status(200).json({
      success: true,
      data: {
        reportId: report._id,
        scores: evalResult.scores
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getInterviewHistory = async (req, res, next) => {
  try {
    const history = await Interview.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { history } });
  } catch (error) {
    next(error);
  }
};

exports.evaluateSpeech = async (req, res, next) => {
  try {
    const { questionText, answerText, roleName, difficulty, durationSec } = req.body;

    if (!questionText || !answerText) {
      return res.status(400).json({ success: false, message: 'Question and answer text are required.' });
    }

    const sec = durationSec || Math.max(1, Math.round(answerText.split(' ').length / 2.5)); // Fallback duration estimate
    const speechMetrics = analyzeSpeechPaceAndFillers(answerText, sec);

    const evalResult = await geminiService.evaluateAnswer({
      question: questionText,
      answer: answerText,
      jobRole: roleName || 'General',
      difficulty: difficulty || 'Medium'
    });

    res.status(200).json({
      success: true,
      data: {
        speechMetrics,
        evaluation: evalResult
      }
    });
  } catch (error) {
    next(error);
  }
};
