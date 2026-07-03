import React, { useState, useEffect } from 'react';
import { api, useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { Award, Star, Flame, CheckCircle, ChevronRight, HelpCircle, RefreshCw, Shuffle, RotateCcw, Bookmark, Check } from 'lucide-react';

const Gamification = () => {
  const { user, updateUserProfile } = useAuth();
  
  // Quiz states
  const [topic, setTopic] = useState('React');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer (600 seconds)

  // Flashcard states
  const [fcTopic, setFcTopic] = useState('System Design');
  const [flashcards, setFlashcards] = useState([]);
  const [currentFcIdx, setCurrentFcIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [fcLoading, setFcLoading] = useState(false);
  const [learnedCards, setLearnedCards] = useState(new Set());
  const [viewedCards, setViewedCards] = useState(new Set([0])); // initially view the first card
  const [fcError, setFcError] = useState('');

  // Leaderboard lists
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Certification state
  const [certClaimed, setCertClaimed] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    let timer;
    if (quizQuestions.length > 0 && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizQuestions, quizFinished, timeLeft]);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get('/gamification/leaderboard');
      setLeaderboard(res.data.leaderboard);
    } catch (e) {
      console.warn('Leaderboard fetch fallback.');
      setLeaderboard([
        { _id: '1', name: 'Rohan Sharma', xp: 1200, level: 4, streakCount: 15 },
        { _id: '2', name: 'Priya Iyer', xp: 950, level: 3, streakCount: 8 },
        { _id: '3', name: 'John Doe (You)', xp: user?.xp || 250, level: user?.level || 1, streakCount: user?.streakCount || 2 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    setQuizLoading(true);
    setQuizFinished(false);
    setCurrentQuizIdx(0);
    setScore(0);
    setUserAnswers({});
    setTimeLeft(600);
    const fallbackList = [
      {
        question: `Which of the following is NOT a standard hook in React?`,
        options: ['useState', 'useEffect', 'useRender', 'useContext'],
        answer: 'useRender',
        explanation: 'useRender does not exist in the standard React hook API.'
      },
      {
        question: `What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?`,
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        answer: 'O(log N)',
        explanation: 'A balanced BST halves the search space at each step, yielding logarithmic search complexity.'
      },
      {
        question: `Which HTTP method is idempotent and used to replace an existing resource entirely?`,
        options: ['POST', 'PUT', 'PATCH', 'DELETE'],
        answer: 'PUT',
        explanation: 'PUT is idempotent and replaces the target resource with the request payload.'
      },
      {
        question: `In JavaScript, what is the output of "typeof null"?`,
        options: ['null', 'object', 'undefined', 'string'],
        answer: 'object',
        explanation: 'Due to a historical bug in JavaScript, typeof null returns "object".'
      },
      {
        question: `Which data structure uses the Last-In-First-Out (LIFO) principle?`,
        options: ['Queue', 'Stack', 'Linked List', 'Heap'],
        answer: 'Stack',
        explanation: 'A Stack follows LIFO where the last element added is the first one to be removed.'
      },
      {
        question: `What is the primary purpose of indexing in a database?`,
        options: ['To reduce storage space', 'To encrypt data', 'To speed up data retrieval queries', 'To prevent SQL injection'],
        answer: 'To speed up data retrieval queries',
        explanation: 'Database indexes create data structures that allow faster lookup and retrieval of records.'
      },
      {
        question: `Which Git command is used to combine changes from one branch into the current branch?`,
        options: ['git push', 'git merge', 'git stash', 'git clone'],
        answer: 'git merge',
        explanation: 'git merge incorporates changes from the specified branch into the currently checked-out branch.'
      },
      {
        question: `What is the worst-case time complexity of QuickSort?`,
        options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'],
        answer: 'O(N²)',
        explanation: 'When the pivot selection is extremely poor (e.g., already sorted array with first element pivot), QuickSort degrades to O(N²).'
      },
      {
        question: `In Object-Oriented Programming, what principle allows a subclass to provide a specific implementation of a method defined in its superclass?`,
        options: ['Encapsulation', 'Polymorphism', 'Abstraction', 'Composition'],
        answer: 'Polymorphism',
        explanation: 'Polymorphism allows objects of different classes to respond to the same method call in their own unique way.'
      },
      {
        question: `Which of the following is a NoSQL document database?`,
        options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
        answer: 'MongoDB',
        explanation: 'MongoDB is a popular NoSQL database that stores data in JSON-like BSON documents.'
      }
    ];

    try {
      const res = await api.get(`/gamification/quiz?topic=${topic}`);
      setQuizQuestions(Array.isArray(res.data.questions) && res.data.questions.length > 0 ? res.data.questions : fallbackList);
    } catch (e) {
      setQuizQuestions(fallbackList);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSelectOption = (opt) => {
    setUserAnswers(prev => ({ ...prev, [currentQuizIdx]: opt }));
  };

  const handleFinishQuiz = async () => {
    setQuizFinished(true);
    let calcScore = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        calcScore++;
      }
    });
    setScore(calcScore);

    try {
      await api.post('/gamification/quiz/submit', {
        topic,
        score: calcScore,
        totalQuestions: quizQuestions.length
      });
      if (updateUserProfile) {
        updateUserProfile();
      }
    } catch (e) {
      console.warn('XP submission local fallback:', e.message);
    }
  };

  const startFlashcards = async () => {
    setFcLoading(true);
    setFlipped(false);
    setCurrentFcIdx(0);
    setLearnedCards(new Set());
    setViewedCards(new Set([0]));
    setFcError('');
    try {
      console.log(`[Flashcards] Fetching for topic: ${fcTopic}...`);
      const res = await api.post(`/flashcards/generate`, { topic: fcTopic });
      if (res.data && res.data.flashcards && res.data.flashcards.length > 0) {
        setFlashcards(res.data.flashcards);
        console.log(`[Flashcards] Successfully loaded ${res.data.flashcards.length} cards.`);
      } else {
        throw new Error('No flashcards generated.');
      }
    } catch (e) {
      console.error(`[Flashcards] Error fetching:`, e);
      setFcError('Failed to fetch flashcards. Using local fallback.');
      setFlashcards([
        { question: 'What is horizontal scaling?', answer: 'Scaling horizontally means adding more server nodes/machines to your resource pool rather than increasing CPU/RAM capacity of a single system.', difficulty: 'Medium', topic: fcTopic },
        { question: 'Describe database sharding.', answer: 'Database sharding is a database architecture pattern that breaks down a single database server into partition blocks called shards, distributing queries.', difficulty: 'Hard', topic: fcTopic }
      ]);
    } finally {
      setFcLoading(false);
    }
  };

  const handleShuffleCards = () => {
    if (flashcards.length === 0) return;
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentFcIdx(0);
    setFlipped(false);
    setViewedCards(new Set([0]));
  };

  const handleRestartCards = () => {
    setCurrentFcIdx(0);
    setFlipped(false);
    setViewedCards(new Set([0]));
  };

  const handleMarkLearned = () => {
    if (!learnedCards.has(currentFcIdx)) {
      setLearnedCards(prev => {
        const next = new Set(prev);
        next.add(currentFcIdx);
        return next;
      });
      // Optionally award XP for learning a new card
      if (updateUserProfile) updateUserProfile({ xpEarned: 5 });
    }
  };

  const handleNextCard = () => {
    const nextIdx = currentFcIdx + 1;
    if (nextIdx < flashcards.length) {
      setCurrentFcIdx(nextIdx);
      setFlipped(false);
      setViewedCards(prev => {
        const next = new Set(prev);
        next.add(nextIdx);
        return next;
      });
    }
  };

  const handleClaimCertificate = async () => {
    try {
      await api.post('/gamification/claim-cert', { title: 'Placement Ready Certification' });
      setCertClaimed(true);
    } catch (e) {
      setCertClaimed(true);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="border-b border-slate-200/10 pb-4">
        <h1 className="text-2xl font-bold">XP Level & Gamification</h1>
        <p className="text-xs text-slate-400 mt-0.5">Solve daily challenges, flip study flashcards, and claim placement certificates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Grid: Quiz and Flashcards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Daily Quiz */}
          <GlassCard className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
                <span>Daily AI Prep Quiz</span>
              </h3>
              {!quizQuestions.length && (
                <div className="flex space-x-2">
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="bg-slate-500/10 border border-slate-500/20 text-xs rounded-xl px-2 py-1 focus:outline-none"
                  >
                    {['React', 'JavaScript', 'SQL', 'Python'].map(t => (
                      <option key={t} value={t} className="bg-slate-900">{t}</option>
                    ))}
                  </select>
                  <button
                    onClick={startQuiz}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                  >
                    Start
                  </button>
                </div>
              )}
            </div>

            {quizLoading && <LoadingSpinner />}

            {quizQuestions.length > 0 && !quizFinished && (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center text-slate-400 font-bold border-b border-slate-200/10 pb-3">
                  <span>Question {currentQuizIdx + 1} of {quizQuestions.length}</span>
                  <span className="flex items-center space-x-1 text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl font-mono">
                    <span>⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                  </span>
                </div>

                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  {quizQuestions[currentQuizIdx].question}
                </p>

                <div className="space-y-2">
                  {quizQuestions[currentQuizIdx].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-3 rounded-xl border font-semibold transition-all ${
                        userAnswers[currentQuizIdx] === opt
                          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500'
                          : 'glass-card border-slate-200/10 hover:border-indigo-500/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200/10">
                  <button
                    onClick={() => setCurrentQuizIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentQuizIdx === 0}
                    className="px-4 py-2 bg-slate-500/10 hover:bg-slate-500/20 disabled:opacity-50 disabled:hover:bg-slate-500/10 rounded-xl font-bold text-slate-700 dark:text-slate-300 transition-all"
                  >
                    Previous
                  </button>

                  {currentQuizIdx + 1 < quizQuestions.length ? (
                    <button
                      onClick={() => setCurrentQuizIdx(prev => prev + 1)}
                      className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            )}

            {quizFinished && (
              <div className="text-center py-6 space-y-4">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
                <div>
                  <h4 className="font-bold text-sm">Quiz Completed!</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Correct Answers: {score} / {quizQuestions.length}. You earned +{score * 15} XP!
                  </p>
                </div>
                <button
                  onClick={() => setQuizQuestions([])}
                  className="px-4 py-2 border border-slate-200/10 rounded-xl text-xs font-bold hover:bg-slate-500/10 transition-colors"
                >
                  Try Another Topic
                </button>
              </div>
            )}
          </GlassCard>

          {/* AI Flashcards */}
          <GlassCard className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <RefreshCw className="h-4.5 w-4.5 text-indigo-500 animate-spin-slow" />
                <span>AI Flip Flashcards</span>
              </h3>
              {!flashcards.length && (
                <div className="flex space-x-2">
                  <select
                    value={fcTopic}
                    onChange={e => setFcTopic(e.target.value)}
                    className="bg-slate-500/10 border border-slate-500/20 text-xs rounded-xl px-2 py-1 focus:outline-none"
                  >
                    {['System Design', 'OOP', 'Networks', 'Operating System'].map(t => (
                      <option key={t} value={t} className="bg-slate-900">{t}</option>
                    ))}
                  </select>
                  <button
                    onClick={startFlashcards}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                  >
                    Fetch
                  </button>
                </div>
              )}
            </div>

            {fcLoading && <LoadingSpinner />}

            {flashcards.length > 0 && (
              <div className="space-y-4">
                
                {/* Metrics */}
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-200/10 pb-2">
                  <div className="flex space-x-4">
                    <span title="Cards Viewed">👁️ {viewedCards.size} / {flashcards.length}</span>
                    <span title="Cards Learned" className="text-emerald-500">✓ {learnedCards.size} Learned</span>
                  </div>
                  {/* Difficulty Tag */}
                  {flashcards[currentFcIdx].difficulty && (
                    <span className={`px-2 py-0.5 rounded-full ${
                      flashcards[currentFcIdx].difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' :
                      flashcards[currentFcIdx].difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {flashcards[currentFcIdx].difficulty}
                    </span>
                  )}
                </div>

                {/* 3D card flip simulation */}
                <div className="perspective-1000 h-48 w-full">
                  <div
                    onClick={() => setFlipped(!flipped)}
                    className={`w-full h-full cursor-pointer select-none transition-transform duration-500 transform-style-preserve-3d relative ${
                      flipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Face (Question) */}
                    <div className="absolute inset-0 backface-hidden glass-card border border-slate-200/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-md">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-3">Question</span>
                      <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">
                        {flashcards[currentFcIdx].question}
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-auto pt-4">(Click to flip card)</span>
                    </div>

                    {/* Back Face (Answer) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg shadow-indigo-500/10 bg-indigo-500/5">
                      <span className="text-[9px] uppercase tracking-wider text-indigo-500 font-bold mb-3">Answer</span>
                      <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-300 overflow-y-auto">
                        {flashcards[currentFcIdx].answer}
                      </p>
                    </div>

                    {/* Checkmark (Needs to not be on a backface container directly, or handle its rotation) */}
                    {learnedCards.has(currentFcIdx) && (
                      <div className={`absolute top-3 right-3 text-emerald-500 bg-emerald-500/10 p-1 rounded-full z-10 transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex flex-col space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs w-full">
                    <button
                      onClick={() => {
                        setFlipped(false);
                        const prevIdx = Math.max(0, currentFcIdx - 1);
                        setCurrentFcIdx(prevIdx);
                        setViewedCards(prev => { const n = new Set(prev); n.add(prevIdx); return n; });
                      }}
                      disabled={currentFcIdx === 0}
                      className="px-4 py-2 bg-slate-500/10 rounded-xl font-bold hover:bg-slate-500/20 disabled:opacity-50 transition-all text-slate-700 dark:text-slate-300"
                    >
                      Prev
                    </button>
                    
                    <span className="text-slate-400 font-bold">
                      {currentFcIdx + 1} / {flashcards.length}
                    </span>
                    
                    <button
                      onClick={handleNextCard}
                      disabled={currentFcIdx + 1 >= flashcards.length}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 disabled:opacity-50 transition-all shadow-md shadow-indigo-500/20"
                    >
                      Next
                    </button>
                  </div>

                  {/* Secondary Action Row */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200/10">
                    <button onClick={handleShuffleCards} className="col-span-1 flex items-center justify-center p-2 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-200/10 rounded-xl text-slate-400 hover:text-indigo-500 transition-colors" title="Shuffle Cards">
                      <Shuffle className="h-4 w-4" />
                    </button>
                    <button onClick={handleRestartCards} className="col-span-1 flex items-center justify-center p-2 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-200/10 rounded-xl text-slate-400 hover:text-indigo-500 transition-colors" title="Restart List">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button onClick={() => setFlashcards([])} className="col-span-1 flex items-center justify-center p-2 bg-slate-500/5 hover:bg-red-500/10 border border-slate-200/10 rounded-xl text-slate-400 hover:text-red-500 transition-colors" title="Close Flashcards">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={handleMarkLearned} disabled={learnedCards.has(currentFcIdx)} className="col-span-1 flex items-center justify-center p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl transition-colors disabled:opacity-50" title="Mark as Learned">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Grid: Leaderboard & Certification */}
        <div className="space-y-6">
          
          {/* XP Leaderboard */}
          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold">XP Leaderboard rankings</h3>
            <div className="space-y-3">
              {leaderboard.map((item, index) => (
                <div key={item._id} className="flex justify-between items-center text-xs p-2.5 border border-slate-200/10 rounded-xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-bold text-slate-400">#{index + 1}</span>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-[10px] text-slate-400">Streak: 🔥 {item.streakCount} days</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-indigo-500">{item.xp} XP</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Certificate claiming */}
          <GlassCard className="space-y-4 text-center">
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-full w-fit mx-auto">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Placement Readiness Certificate</h3>
              <p className="text-[10px] text-slate-400 mt-1">Claim your completion certificate as a shareable verification portfolio link.</p>
            </div>

            {certClaimed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs rounded-xl p-2.5 font-bold">
                ✓ Certificate Claimed Successfully!
              </div>
            ) : (
              <button
                onClick={handleClaimCertificate}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-all"
              >
                Claim Digital Certificate
              </button>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
