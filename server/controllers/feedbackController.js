const { Feedback } = require('../models/MiscModels');

// Submit new feedback (Public or Authenticated)
exports.submitFeedback = async (req, res, next) => {
  try {
    const {
      name,
      email,
      role,
      overallRating,
      mockInterview,
      codingInterview,
      resumeChecker,
      careerAssistant,
      dashboardExperience,
      websiteUiUx,
      category,
      message,
      screenshotUrl,
      recommendation
    } = req.body;

    if (!name || !email || !overallRating || !category || !message || !recommendation) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide name, email, rating, category, message, and recommendation.'
      });
    }

    // Capture uploaded screenshot if passed via multer multipart
    let finalScreenshot = screenshotUrl || '';
    if (req.file) {
      finalScreenshot = `/uploads/${req.file.filename}`;
    }

    const feedback = await Feedback.create({
      userId: req.user ? req.user.id : null,
      name,
      email,
      role: role || 'student',
      overallRating: Number(overallRating),
      featureRatings: {
        mockInterview: Number(mockInterview) || 5,
        codingInterview: Number(codingInterview) || 5,
        resumeChecker: Number(resumeChecker) || 5,
        careerAssistant: Number(careerAssistant) || 5,
        dashboardExperience: Number(dashboardExperience) || 5,
        websiteUiUx: Number(websiteUiUx) || 5
      },
      category,
      message,
      screenshotUrl: finalScreenshot,
      recommendation,
      status: 'New'
    });

    res.status(201).json({
      status: 'success',
      feedback
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Retrieve feedbacks with search, filter, and sorting
exports.getAllFeedback = async (req, res, next) => {
  try {
    const { search, category, rating, status, sort } = req.query;

    const query = {};

    // 1. Search filter (name or email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // 3. Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // 4. Rating filter
    if (rating && rating !== 'All') {
      query.overallRating = Number(rating);
    }

    // 5. Sorting
    let sortOption = { createdAt: -1 }; // newest first
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'rating-desc') {
      sortOption = { overallRating: -1 };
    } else if (sort === 'rating-asc') {
      sortOption = { overallRating: 1 };
    }

    const feedbacks = await Feedback.find(query)
      .sort(sortOption);

    res.status(200).json({
      status: 'success',
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update feedback status (New, Reviewed, Resolved)
exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Reviewed', 'Resolved'].includes(status)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid status value.' });
    }

    const feedback = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    if (!feedback) {
      return res.status(404).json({ status: 'fail', message: 'Feedback not found.' });
    }

    res.status(200).json({ status: 'success', feedback });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete feedback
exports.deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ status: 'fail', message: 'Feedback not found.' });
    }

    res.status(200).json({ status: 'success', message: 'Feedback deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Admin: Export feedback to CSV
exports.exportToCSV = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

    let csvContent = 'ID,Date,Name,Email,Role,Overall Rating,Category,Message,Recommendation,Status\n';

    feedbacks.forEach(fb => {
      // Escape strings to prevent syntax breakages in CSV files
      const escapedMsg = fb.message.replace(/"/g, '""').replace(/\n/g, ' ');
      csvContent += `"${fb._id}","${fb.createdAt.toISOString()}","${fb.name}","${fb.email}","${fb.role}",${fb.overallRating},"${fb.category}","${escapedMsg}","${fb.recommendation}","${fb.status}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=Users_Feedback_Report.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
