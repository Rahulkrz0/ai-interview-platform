import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import {
  Play, StopCircle, RefreshCw, Volume2, Maximize2, Minimize2, Mic, Eye, CheckCircle, Video
} from 'lucide-react';

const AIInterview = () => {
  // Config state
  const [inProgress, setInProgress] = useState(false);
  const [config, setConfig] = useState({
    type: 'Technical',
    company: 'Google',
    roleName: 'Software Engineer',
    difficulty: 'Medium',
    mode: 'text',
    durationLimit: 15
  });

  // Active session state
  const [interviewId, setInterviewId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  // Real-time analysis feedbacks
  const [fillerFeedback, setFillerFeedback] = useState(null);
  const [wpmFeedback, setWpmFeedback] = useState(null);

  // New Voice Features
  const [speechFeedback, setSpeechFeedback] = useState(null);
  const [speechLoadingState, setSpeechLoadingState] = useState('');
  const recognitionRef = useRef(null);
  
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Handle countdown timer
  useEffect(() => {
    let interval;
    if (inProgress) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inProgress]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
    }
  }, []);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await api.post('/interviews/create', config);
      setInterviewId(res.data.data.interviewId);
      setCurrentQuestionText(res.data.data.firstQuestion);
      setInProgress(true);
      setTimer(0);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.() || containerRef.current.webkitRequestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const handleStartRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }
    setSpeechFeedback(null);
    setCurrentAnswer('');
    
    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentAnswer(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      if (event.error === 'not-allowed') {
        alert("Microphone permission required.");
      } else {
        alert("Speech could not be recognized. Please try again.");
      }
      setIsRecording(false);
      setSpeechLoadingState('');
    };

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setSpeechLoadingState('Recording...');
    };

    recognitionRef.current.onend = () => {
      if (isRecording) {
         setIsRecording(false);
         setSpeechLoadingState('');
      }
    };

    try {
      recognitionRef.current.start();
    } catch(e) {
      console.error(e);
    }
  };

  const handleStopRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    
    if (!currentAnswer.trim()) {
       setSpeechLoadingState('');
       return;
    }

    setSpeechLoadingState('Transcribing...');
    
    try {
      setTimeout(() => setSpeechLoadingState('Analyzing with Gemini...'), 1000);
      setTimeout(() => setSpeechLoadingState('Generating Feedback...'), 3000);
      
      const res = await api.post('/interviews/evaluate-speech', {
        questionText: currentQuestionText,
        answerText: currentAnswer,
        roleName: config.roleName,
        difficulty: config.difficulty,
        durationSec: 30 // Approximate
      });
      
      setSpeechFeedback(res.data.data);
    } catch (err) {
      console.error(err);
      alert("AI evaluation failed. Please try again.");
    } finally {
      setSpeechLoadingState('');
    }
  };

  const handleSubmit = async () => {
    if (!currentAnswer.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/interviews/submit-answer', {
        interviewId,
        answer: currentAnswer,
        durationSec: 30
      });

      // Clear answer box
      setCurrentAnswer('');
      setFillerFeedback(null);
      setWpmFeedback(null);
      setSpeechFeedback(null);

      if (res.data.data.isFinished) {
        // End interview and compile report
        const endRes = await api.post('/interviews/end', { interviewId });
        navigate(`/reports/detail/${endRes.data.data.reportId}`);
      } else {
        setCurrentIndex(res.data.data.currentIndex);
        setCurrentQuestionText(res.data.data.nextQuestion);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-6 space-y-6">
      {/* 1. Setup Form */}
      {!inProgress ? (
        <GlassCard className="space-y-6 max-w-xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Start AI Practice Round</h2>
            <p className="text-xs text-slate-400 mt-1">Configure your dream settings and start simulating.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1">Company</label>
              <select
                value={config.company}
                onChange={e => setConfig({ ...config, company: e.target.value })}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              >
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe', 'TCS', 'Infosys'].map(c => (
                  <option key={c} value={c} className="bg-slate-900">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Interview Type</label>
              <select
                value={config.type}
                onChange={e => setConfig({ ...config, type: e.target.value })}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              >
                {['HR', 'Technical', 'Behavioral', 'Aptitude', 'System Design'].map(t => (
                  <option key={t} value={t} className="bg-slate-900">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Difficulty</label>
              <select
                value={config.difficulty}
                onChange={e => setConfig({ ...config, difficulty: e.target.value })}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="Easy" className="bg-slate-900">Easy</option>
                <option value="Medium" className="bg-slate-900">Medium</option>
                <option value="Hard" className="bg-slate-900">Hard</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Session Mode</label>
              <select
                value={config.mode}
                onChange={e => setConfig({ ...config, mode: e.target.value })}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="text" className="bg-slate-900">Interactive Text</option>
                <option value="voice" className="bg-slate-900">Voice Speech (Simulated)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 disabled:opacity-50 transition-all"
          >
            <Play className="h-4 w-4" />
            <span>{loading ? 'Initializing AI...' : 'Enter Full Screen Interview'}</span>
          </button>
        </GlassCard>
      ) : (
        /* 2. Fullscreen Active Interview Layout */
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-500/5 px-6 py-3 rounded-2xl border border-slate-200/10">
            <span className="text-xs font-bold text-slate-400">
              Q{currentIndex + 1}: {config.type} Round for {config.roleName}
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold tracking-wider font-mono bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full">
                ⏱ {formatTime(timer)}
              </span>
              <button onClick={handleFullscreen} className="text-slate-400 hover:text-indigo-500 transition-colors">
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* AI Avatar Face Screen Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Box: Animated Avatar Visualizer */}
            <GlassCard className="flex flex-col items-center justify-center space-y-4 min-h-[300px] text-center border border-indigo-500/10">
              <div className="relative">
                {/* Simulated Webcam Circle */}
                <div className="h-32 w-32 rounded-full border-4 border-indigo-500 flex items-center justify-center overflow-hidden bg-slate-900 relative">
                  <div className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></div>
                  <Video className="h-10 w-10 text-indigo-400" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm">Interviewer Avatar: Elena</h4>
                <p className="text-[10px] text-slate-400 mt-1">Listening and evaluating speaking cadence...</p>
              </div>

              {/* Dynamic waveform simulation in voice mode */}
              {isRecording && (
                <div className="flex items-center justify-center space-x-1.5 h-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="w-1 bg-indigo-500 rounded animate-bounce" style={{ height: `${Math.random() * 20 + 8}px`, animationDelay: `${i * 0.1}s` }}></span>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Right Box: Webcam Mockup feed */}
            <GlassCard className="flex flex-col items-center justify-center space-y-4 min-h-[300px] text-center border border-emerald-500/20">
              <div className="h-32 w-48 rounded-xl border-2 border-emerald-500 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 text-[8px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">
                  LIVE WEBCAM
                </span>
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-[8px] text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded">
                  <Eye className="h-3 w-3" />
                  <span>Eye Contact: 92%</span>
                </div>
                <div className="text-slate-500 text-xs">Simulated Camera Video</div>
              </div>
              <div>
                <h4 className="font-bold text-sm">Candidate View</h4>
                <p className="text-[10px] text-emerald-500 mt-1">✓ Looking at camera (Eye contact reminder active)</p>
              </div>
            </GlassCard>
          </div>

          {/* AI Question Box */}
          <GlassCard className="border border-indigo-500/10">
            <h3 className="text-base font-bold text-indigo-500"> Elena Asks:</h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2 leading-relaxed">
              "{currentQuestionText}"
            </p>
          </GlassCard>

          {/* Candidate response area */}
          <GlassCard className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold">Your Response</h3>
              {config.mode === 'voice' && (
                <button
                  onClick={toggleRecording}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20'
                  }`}
                >
                  {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span>{isRecording ? 'Stop Recording' : 'Speak Answer'}</span>
                </button>
              )}
            </div>

            <textarea
              value={currentAnswer}
              onChange={e => setCurrentAnswer(e.target.value)}
              placeholder="Structure your answer clearly. In voice mode, click Speak to insert a simulated answer transcript..."
              rows={4}
              className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
            ></textarea>

            {/* Speech Loading State */}
            {speechLoadingState && (
              <div className="flex items-center space-x-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <LoadingSpinner />
                <span className="text-xs font-bold text-indigo-400">{speechLoadingState}</span>
              </div>
            )}

            {/* Inline Speech Feedback Card */}
            {speechFeedback && speechFeedback.evaluation && (
              <div className="p-4 bg-slate-900 rounded-xl border border-indigo-500/30 space-y-4 animate-fade-in text-left">
                <h4 className="text-sm font-bold text-indigo-400 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Real-Time AI Evaluation</span>
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
                    <span className="text-slate-400 block mb-1">Overall</span>
                    <span className="font-bold text-emerald-400 text-lg">{speechFeedback.evaluation.scores?.overall || 0}/100</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
                    <span className="text-slate-400 block mb-1">Technical</span>
                    <span className="font-bold text-indigo-400 text-lg">{speechFeedback.evaluation.scores?.technicalAccuracy || 0}/100</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
                    <span className="text-slate-400 block mb-1">WPM (Speed)</span>
                    <span className="font-bold text-blue-400 text-lg">{speechFeedback.speechMetrics?.wpm || 0}</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-center">
                    <span className="text-slate-400 block mb-1">Filler Words</span>
                    <span className="font-bold text-rose-400 text-lg">{speechFeedback.speechMetrics?.count || 0}</span>
                  </div>
                </div>

                {speechFeedback.evaluation.mistakes && speechFeedback.evaluation.mistakes.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-rose-400">Identified Mistakes:</h5>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                      {speechFeedback.evaluation.mistakes.map((m, i) => (
                        <li key={i}>
                          <span className="text-rose-300">{m.errorDescription}</span> <br/>
                          <span className="text-emerald-400">Fix: {m.suggestedCorrection}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="space-y-1 bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10">
                  <h5 className="text-xs font-bold text-indigo-400">Model Answer:</h5>
                  <p className="text-xs text-slate-300 italic">{speechFeedback.evaluation.sampleAnswer}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setCurrentAnswer("Could you please repeat the question, Elena?")}
                className="px-4 py-2 border border-slate-200/10 rounded-xl text-xs hover:bg-slate-500/10 transition-all"
              >
                Repeat Question
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !currentAnswer.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 disabled:opacity-50 transition-all"
              >
                {loading ? 'Submitting...' : 'Submit & Next Question'}
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default AIInterview;
