const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// 1. CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// 2. Express Rate Limiter for general endpoints
const isDev = (process.env.NODE_ENV || 'development') === 'development';

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 1000 : 100, // Very generous in dev, strict in production
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 3. Brute Force rate limiter for Auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 100 : 20, // Generous in dev, strict in production
  message: {
    status: 429,
    message: 'Too many authentication attempts, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// 4. Input Sanitization Middleware (Custom recursive cleaner to prevent XSS and DB attacks)
function sanitizeInput(req, res, next) {
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    // Replace script tags, HTML tags, and common MongoDB selector keys like $ne, $gt
    return str
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gi, '')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\$(gt|lt|gte|lte|ne|eq|in|nin|regex)/g, ''); // strip potential NoSQL injection key operators
  };

  const sanitizeObj = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitizeString(obj[key]);
        } else if (typeof obj[key] === 'object') {
          sanitizeObj(obj[key]);
        }
      }
    }
  };

  if (req.body) sanitizeObj(req.body);
  if (req.query) sanitizeObj(req.query);
  if (req.params) sanitizeObj(req.params);

  next();
}

module.exports = {
  helmetMiddleware: helmet(),
  corsMiddleware: cors(corsOptions),
  generalLimiter,
  authLimiter,
  sanitizeInput
};
