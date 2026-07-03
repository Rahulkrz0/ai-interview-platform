const Flashcard = require('../models/Flashcard');
const geminiService = require('../services/geminiService');

exports.generateFlashcards = async (req, res, next) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ success: false, message: 'Topic is required.' });
    }

    console.log('\x1b[36m%s\x1b[0m', '=== Flashcard Generation Request ===');
    console.log(`Topic received: ${topic}`);

    let flashcards = [];

    try {
      // Attempt to generate using Gemini AI
      const cards = await geminiService.generateFlashcards({ topic });
      if (cards && Array.isArray(cards) && cards.length > 0) {
        flashcards = cards;
        console.log(`Gemini generated ${flashcards.length} flashcards successfully.`);
      } else {
        throw new Error('Gemini returned empty or invalid format.');
      }
    } catch (geminiError) {
      console.warn(`Gemini generation failed: ${geminiError.message}. Falling back to database...`);
      
      // Fallback to database
      const dbCards = await Flashcard.find({ topic: new RegExp(topic, 'i') }).limit(5);
      
      if (dbCards && dbCards.length > 0) {
        flashcards = dbCards.map(c => ({
          question: c.question,
          answer: c.answer,
          difficulty: c.difficulty,
          topic: c.topic
        }));
        console.log(`Database fallback loaded ${flashcards.length} flashcards.`);
      } else {
        // Ultimate fallback if DB has none for this topic
        console.warn(`No database flashcards found for topic: ${topic}. Using static fallback.`);
        flashcards = [
          {
            question: `What is the core concept of ${topic}?`,
            answer: `The core concept of ${topic} revolves around its primary use case in modern software engineering and interviews.`,
            difficulty: 'Easy',
            topic: topic
          },
          {
            question: `What are the key advantages of using ${topic}?`,
            answer: `It improves scalability, maintainability, and is a standard industry practice.`,
            difficulty: 'Medium',
            topic: topic
          }
        ];
      }
    }

    console.log('Response returned: Flashcards ready.');
    console.log('====================================');

    res.status(200).json({
      success: true,
      flashcards
    });
  } catch (error) {
    console.error('Error in generateFlashcards:', error.message);
    next(error);
  }
};
