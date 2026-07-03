import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUp, MessageSquare, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-slate-200/20 bg-slate-900/5 dark:bg-slate-950/40 backdrop-blur-md overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block tracking-tight">
                AI Prep
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xs">
                Empowering the next generation of software engineers. Practice smarter, prepare better, and land your dream job with AI-driven insights.
              </p>
            </div>
            
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com/Rahulkrz0" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="group p-2.5 bg-white/50 dark:bg-slate-800/50 hover:bg-indigo-500 text-slate-500 hover:text-white border border-slate-200/50 dark:border-slate-700/50 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(99,102,241,0.3)]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/rahulkrz" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="group p-2.5 bg-white/50 dark:bg-slate-800/50 hover:bg-indigo-500 text-slate-500 hover:text-white border border-slate-200/50 dark:border-slate-700/50 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(99,102,241,0.3)]"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a 
                href="mailto:rahulkumar9yc@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="group p-2.5 bg-white/50 dark:bg-slate-800/50 hover:bg-indigo-500 text-slate-500 hover:text-white border border-slate-200/50 dark:border-slate-700/50 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(99,102,241,0.3)]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Features */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-xs mb-6 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>Platform</span>
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link to="/coding" className="hover:text-indigo-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-500 mr-1"/>Coding Arena</Link></li>
              <li><Link to="/interviews" className="hover:text-indigo-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-500 mr-1"/>Mock Interviews</Link></li>
              <li><Link to="/resume" className="hover:text-indigo-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-500 mr-1"/>ATS Resume Analyzer</Link></li>
              <li><Link to="/flashcards" className="hover:text-indigo-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-500 mr-1"/>Smart Flashcards</Link></li>
              <li><Link to="/salary" className="hover:text-indigo-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-500 mr-1"/>Salary Predictor</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-xs mb-6 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>Resources</span>
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#" className="hover:text-purple-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-purple-500 mr-1"/>Blog & Updates</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-purple-500 mr-1"/>Interview Guide</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-purple-500 mr-1"/>System Design</a></li>
              <li><Link to="/feedback" className="hover:text-purple-500 transition-colors flex items-center group"><ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-purple-500 mr-1"/>Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Legal */}
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-xs mb-6 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>Contact & Legal</span>
            </h4>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Developer</span>
                <span className="text-slate-700 dark:text-slate-300 font-bold">Rahul</span>
                <a href="mailto:rahulkumar9yc@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1.5 text-indigo-500 hover:text-indigo-600 transition-colors group">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="underline decoration-indigo-500/30 group-hover:decoration-indigo-500">rahulkumar9yc@gmail.com</span>
                </a>
              </div>
              <div className="pt-4 border-t border-slate-200/20 dark:border-slate-800 space-y-2">
                <a href="#" className="hover:text-pink-500 transition-colors flex items-center space-x-2"><ShieldCheck className="h-3.5 w-3.5"/> <span>Privacy Policy</span></a>
                <a href="#" className="hover:text-pink-500 transition-colors flex items-center space-x-2"><ExternalLink className="h-3.5 w-3.5"/> <span>Terms of Service</span></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/20 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
            <span>© {currentYear} AI Prep Platform. Designed with</span>
            <span className="text-rose-500 mx-1">❤</span>
            <span>by Rahul.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-xs font-bold">
            <Link to="/feedback" className="text-slate-500 hover:text-indigo-500 transition-colors flex items-center space-x-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Feedback</span>
            </Link>
            <button 
              onClick={scrollToTop} 
              className="group flex items-center space-x-1.5 px-3 py-1.5 bg-slate-200/50 dark:bg-slate-800/50 hover:bg-indigo-500 hover:text-white rounded-full text-slate-600 dark:text-slate-400 transition-all"
            >
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
