const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');

// Authenticate and protect routes
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Not authorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'User belonging to this token no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'expired', message: 'Access token expired.' });
    }
    return res.status(401).json({ status: 'fail', message: 'Not authorized. Invalid token.' });
  }
};

// Restrict routes to specific user roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'fail', 
        message: 'Permission denied. You do not have the required access role.' 
      });
    }
    next();
  };
};

const optionalProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    } catch (err) {
      // ignore decoding error for optional auth state
    }
  }
  next();
};

module.exports = {
  protect,
  restrictTo,
  optionalProtect
};
