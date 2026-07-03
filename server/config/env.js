const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

function validateEnv() {
  const required = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'MONGODB_URI'];
  const missing = [];

  required.forEach(key => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', `CRITICAL ERROR: Missing required environment variables: ${missing.join(', ')}`);
    console.error('\x1b[33m%s\x1b[0m', 'Please create/verify the .env file in the server directory.');
    process.exit(1);
  }

  // Warn about Gemini API Key
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MOCK_GEMINI_API_KEY') {
    console.warn('\x1b[33m%s\x1b[0m', 'WARNING: GEMINI_API_KEY is not configured or is set to a mock value.');
    console.warn('\x1b[36m%s\x1b[0m', 'The platform will run in Mock-AI fallback mode for evaluation features.');
  }

  return {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    JUDGE0_API_KEY: process.env.JUDGE0_API_KEY,
    JUDGE0_API_HOST: process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };
}

module.exports = validateEnv();
