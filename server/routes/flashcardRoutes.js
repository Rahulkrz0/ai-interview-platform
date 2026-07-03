const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, flashcardController.generateFlashcards);

module.exports = router;
