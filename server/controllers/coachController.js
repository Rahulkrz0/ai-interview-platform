const User = require('../models/User');
const { Roadmap } = require('../models/MiscModels');
const geminiService = require('../services/geminiService');

exports.getRoadmap = async (req, res, next) => {
  try {
    let roadmap = await Roadmap.findOne({ userId: req.user.id });
    
    if (!roadmap) {
      // Create a default initial roadmap for Javascript FullStack
      const user = await User.findById(req.user.id);
      const userSkills = user?.skills || ['JavaScript'];
      
      const steps = await geminiService.generateRoadmap({
        title: 'Full Stack Web Development Roadmap',
        skillsArray: userSkills
      });

      roadmap = await Roadmap.create({
        userId: req.user.id,
        title: 'Full Stack Development Career Plan',
        steps: steps.length > 0 ? steps : [
          { title: 'JavaScript Essentials', description: 'Master closures, event loop, and asynchronous arrays.', status: 'in-progress', suggestedResources: ['MDN JavaScript'] },
          { title: 'React UI Development', description: 'Understand render cycles, hooks, state contexts, and styling.', status: 'todo', suggestedResources: ['React Dev Docs'] },
          { title: 'Node & Express Backends', description: 'Build secure APIs, database modeling, and token auth.', status: 'todo', suggestedResources: ['Node.js handbook'] }
        ]
      });
    }

    res.status(200).json({ success: true, data: { roadmap } });
  } catch (error) {
    next(error);
  }
};

exports.updateRoadmapStep = async (req, res, next) => {
  try {
    const { stepId, status } = req.body; // status: todo, in-progress, completed

    const roadmap = await Roadmap.findOne({ userId: req.user.id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found.' });
    }

    const step = roadmap.steps.id(stepId);
    if (!step) {
      return res.status(404).json({ success: false, message: 'Roadmap phase step not found.' });
    }

    step.status = status;
    await roadmap.save();

    res.status(200).json({ success: true, data: { roadmap } });
  } catch (error) {
    next(error);
  }
};

exports.getSalaryPrediction = async (req, res, next) => {
  try {
    const { targetRole, companyName, experienceLevel, country, state, skills, degree, yearsOfExperience } = req.query;

    const analysis = await geminiService.generateSalaryPrediction({
      targetRole,
      companyName,
      experienceLevel,
      country,
      state,
      skills,
      degree,
      yearsOfExperience
    });

    res.status(200).json({
      success: true,
      data: {
        role: targetRole || 'Software Engineer',
        company: companyName || 'General Tech',
        predictedSalary: analysis
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to generate salary prediction. Please try again.'
    });
  }
};

exports.getProjectSuggestions = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const skills = user?.skills || ['JavaScript', 'HTML/CSS'];

    const projects = await geminiService.generateProjectRecommendations({
      skillsArray: skills
    });

    res.status(200).json({
      success: true,
      data: {
        projects
      }
    });
  } catch (error) {
    next(error);
  }
};
