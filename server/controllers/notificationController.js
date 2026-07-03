const { Notification, Feedback, SupportTicket } = require('../models/MiscModels');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json({ status: 'success', notifications });
  } catch (error) {
    next(error);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    const { notificationId } = req.body;
    
    if (notificationId) {
      await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    } else {
      // Mark all read
      await Notification.updateMany({ userId: req.user.id, isRead: false }, { isRead: true });
    }

    res.status(200).json({ status: 'success', message: 'Notifications marked as read.' });
  } catch (error) {
    next(error);
  }
};

exports.submitFeedback = async (req, res, next) => {
  try {
    const { rating, comments, type } = req.body;
    
    const feedback = await Feedback.create({
      userId: req.user.id,
      rating: rating || 5,
      comments: comments || '',
      type: type || 'general'
    });

    res.status(201).json({ status: 'success', feedback });
  } catch (error) {
    next(error);
  }
};

exports.submitTicket = async (req, res, next) => {
  try {
    const { subject, message } = req.body;
    
    if (!subject || !message) {
      return res.status(400).json({ status: 'fail', message: 'Subject and message are required.' });
    }

    const ticket = await SupportTicket.create({
      userId: req.user.id,
      subject,
      message,
      status: 'open'
    });

    res.status(201).json({ status: 'success', ticket });
  } catch (error) {
    next(error);
  }
};
