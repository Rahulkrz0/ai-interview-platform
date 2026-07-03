const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('\x1b[32m%s\x1b[0m', `MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Database Connection Error: ${error.message}`);
    console.warn('\x1b[33m%s\x1b[0m', 'Please ensure MongoDB is running locally or supply a valid MONGODB_URI in the .env file.');
    // We don't crash the server immediately, but logs will clearly flag database failure.
    // In production we would process.exit(1), but for developer experience, we keep the process alive
    // so they can read console logs and start their mongo daemon.
  }
};

module.exports = connectDB;
