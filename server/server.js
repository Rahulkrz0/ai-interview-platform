const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const env = require('./config/env');

// Security & Middlewares
const { helmetMiddleware, corsMiddleware, generalLimiter, sanitizeInput } = require('./middleware/securityMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

// Routes
const apiRoutes = require('./routes');

// Models for seeding
const Question = require('./models/Question');
const Company = require('./models/Company');
const User = require('./models/User');
const CodingProblem = require('./models/CodingProblem');

const app = express();

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    timestamp: new Date(),
    uptime: process.uptime(),
    dbState: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Register API Routes
app.use('/api', generalLimiter, apiRoutes);

// Catch 404
app.use((req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use(errorHandler);

// Automatic DB Seeder
async function seedDatabase() {
  console.log('Checking database population status...');
  try {
    const questionCount = await Question.countDocuments({});
    if (questionCount < 50) {
      console.log('Database questions count is low. Seeding 100+ high-quality interview questions...');
      await Question.deleteMany({});
      const questionsSeed = require('./config/questionsSeed');
      await Question.insertMany(questionsSeed, { ordered: false });
      console.log(`Seeding completed successfully! Inserted ${questionsSeed.length} questions.`);
    }
  } catch (error) {
    console.error('Seeding database error (Questions):', error.message, error.stack, error.writeErrors);
  }

  try {
    // Seed Coding Problems (120 Real Interview Problems)
    const codingProblemCount = await CodingProblem.countDocuments({});
    if (codingProblemCount < 100) {
      console.log('Database coding problems count is low. Seeding 120 high-quality coding problems...');
      await CodingProblem.deleteMany({});
      const part1 = require('./config/codingProblemsSeed');
      const part2 = require('./config/codingProblemsSeedPart2');
      const allProblems = [...part1, ...part2];
      
      // Deduplicate before insert to prevent slug/problemNumber collisions
      const uniqueProblems = [];
      const seenSlugs = new Set();
      const seenProblemNumbers = new Set();
      for (const p of allProblems) {
        if (!seenSlugs.has(p.slug) && !seenProblemNumbers.has(p.problemNumber)) {
          seenSlugs.add(p.slug);
          seenProblemNumbers.add(p.problemNumber);
          uniqueProblems.push(p);
        } else {
          console.warn(`Skipping duplicate in seed data: slug=${p.slug}, problemNumber=${p.problemNumber}`);
        }
      }
      
      await CodingProblem.insertMany(uniqueProblems, { ordered: false });
      console.log(`Coding Problems Seeding completed successfully! Inserted ${uniqueProblems.length} problems.`);
    } else {
      console.log(`Coding problems collection already populated with ${codingProblemCount} documents.`);
    }
  } catch (error) {
    console.error('Seeding database error (Coding Problems):', error.message, error.stack, error.writeErrors);
  }

  try {
    // Seed default company pages
    const companyCount = await Company.countDocuments({});
    if (companyCount === 0) {
      await Company.create({
        name: 'Google',
        logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
        description: 'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, and computer software.',
        tips: ['Focus heavily on DS & Algorithm speed complexity analysis', 'Use structural communication patterns during systems design rounds.'],
        faq: [
          { question: 'What is the average Google interview format?', answer: '1 phone screening session followed by 4-5 on-site technical and googliness rounds.' }
        ],
        hrQuestions: ['Tell me about a time you solved an ambiguous task.', 'Why Google?'],
        technicalQuestions: ['How does garbage collection work in V8?']
      });
      console.log('Seeding Company Pages: Google');
    }
  } catch (error) {
    console.error('Seeding database error (Company):', error.message, error.stack);
  }
}

// Start Server
const PORT = env.PORT;
app.listen(PORT, async () => {
  console.log('\x1b[36m%s\x1b[0m', `AI Interview Preparation Platform Server running on port ${PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
  await seedDatabase();
});
