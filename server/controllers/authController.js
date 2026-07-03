const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const { UserSettings } = require('../models/MiscModels');

// Helper to generate access & refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, firebaseUid, role } = req.body;

    if (!name || !email || !firebaseUid) {
      return res.status(400).json({ status: 'fail', message: 'Missing signup details (name, email, firebaseUid).' });
    }

    let user = await User.findOne({ $or: [{ firebaseUid }, { email }] });
    if (user) {
      // If user exists, sync UID
      if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        firebaseUid,
        role: role || 'student'
      });
      // Create default settings for user
      await UserSettings.create({ userId: user._id });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      status: 'success',
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        xp: user.xp,
        level: user.level,
        coins: user.coins,
        streakCount: user.streakCount
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, firebaseUid } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email.' });
    }

    let user;

    if (firebaseUid) {
      user = await User.findOne({ $or: [{ firebaseUid }, { email }] });
      if (!user) {
        // Sync-create if needed
        user = await User.create({
          name: email.split('@')[0],
          email,
          firebaseUid,
          role: 'student'
        });
        await UserSettings.create({ userId: user._id });
      } else if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
        await user.save();
      }
    } else {
      return res.status(400).json({ status: 'fail', message: 'Missing authentication credentials.' });
    }

    // Update daily streak check
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (user.lastActiveDate) {
      const lastActive = new Date(user.lastActiveDate);
      if (lastActive.toDateString() === yesterday.toDateString()) {
        user.streakCount += 1;
        user.xp += 10; // 10 XP for daily check-in
      } else if (lastActive.toDateString() !== today.toDateString()) {
        user.streakCount = 1; // streak reset
      }
    } else {
      user.streakCount = 1;
    }
    user.lastActiveDate = today;
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      status: 'success',
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        xp: user.xp,
        level: user.level,
        coins: user.coins,
        streakCount: user.streakCount
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { email, name, photo, firebaseUid } = req.body;
    
    if (!email || !firebaseUid) {
      return res.status(400).json({ status: 'fail', message: 'Invalid Google sign-in credentials.' });
    }

    let user = await User.findOne({ $or: [{ firebaseUid }, { email }] });
    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        photo,
        firebaseUid,
        role: 'student'
      });
      await UserSettings.create({ userId: user._id });
    } else {
      if (!user.firebaseUid) user.firebaseUid = firebaseUid;
      if (photo && !user.photo) user.photo = photo;
      await user.save();
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      status: 'success',
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        xp: user.xp,
        level: user.level,
        coins: user.coins,
        streakCount: user.streakCount
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    let token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'Refresh token not found. Please log in.' });
    }

    jwt.verify(token, env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: 'fail', message: 'Invalid or expired refresh token. Please re-login.' });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ status: 'fail', message: 'User does not exist.' });
      }

      const { accessToken } = generateTokens(user._id);

      res.status(200).json({
        status: 'success',
        accessToken
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ status: 'success', message: 'Logged out successfully.' });
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const settings = await UserSettings.findOne({ userId: req.user.id });
    res.status(200).json({ status: 'success', user, settings });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, college, degree, branch, graduationYear, skills, experience, dreamCompany, dreamRole, linkedinUrl, githubUrl, photo, theme, emailNotifications } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found.' });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (college !== undefined) user.college = college;
    if (degree !== undefined) user.degree = degree;
    if (branch !== undefined) user.branch = branch;
    if (graduationYear !== undefined) user.graduationYear = graduationYear;
    if (skills !== undefined) user.skills = skills;
    if (experience !== undefined) user.experience = experience;
    if (dreamCompany !== undefined) user.dreamCompany = dreamCompany;
    if (dreamRole !== undefined) user.dreamRole = dreamRole;
    if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;
    if (githubUrl !== undefined) user.githubUrl = githubUrl;
    if (photo !== undefined) user.photo = photo;

    await user.save();

    // Save settings
    const settings = await UserSettings.findOne({ userId: req.user.id });
    if (settings) {
      if (theme) settings.theme = theme;
      if (emailNotifications !== undefined) settings.emailNotifications = emailNotifications;
      await settings.save();
    }

    res.status(200).json({ status: 'success', user, settings });
  } catch (error) {
    next(error);
  }
};
