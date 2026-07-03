import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Award, Zap, HelpCircle, Code, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSent(true);
      setTimeout(() => {
        setFormSent(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 3000);
    }
  };



  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6 bg-gradient-to-br from-indigo-900/40 via-purple-900/10 to-transparent">
        <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="h-3 w-3" />
            <span>Next Generation Practice Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Master Your Next Tech Interview with{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Generative AI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            Get instant, production-grade feedback on your communication speed, filler word counts, system design models, and source code optimizations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:opacity-95 transition-all text-center"
            >
              Start Free Practice
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold glass-panel rounded-2xl hover:bg-indigo-500/10 transition-all text-center"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Comprehensive Preparation Tool Suite</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Everything you need to go from placement application to high-tier job offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlassCard hover className="space-y-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl w-fit">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Simulated Avatar Interviews</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Answer HR, Technical, and Behavioral questions in full-screen mode with an active animated visual feedback avatar.
            </p>
          </GlassCard>

          <GlassCard hover className="space-y-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl w-fit">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Monaco Coding Sandbox</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Compile source code in JS/Python/C++ in a professional-grade editor. Submit solutions to trigger live Gemini complexity reviews.
            </p>
          </GlassCard>

          <GlassCard hover className="space-y-4">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl w-fit">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Resume ATS Analysis</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload your CV to compute instant ATS match scores, missing key terms lists, and custom PDF cover letters.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 3. Section Divider */}
      <div className="max-w-6xl mx-auto px-6"><hr className="border-slate-200/10" /></div>

      {/* 4. FAQ Accordion */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <GlassCard className="space-y-2">
            <h4 className="font-bold flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-indigo-500" />
              <span>How accurate is the Speech Analysis feature?</span>
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed pl-6">
              Our analyzer detects filler words ("um", "uh", "like") and calculates words-per-minute speed. This helps you maintain a target pace of 110-150 words per minute.
            </p>
          </GlassCard>

          <GlassCard className="space-y-2">
            <h4 className="font-bold flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-indigo-500" />
              <span>How is code evaluated in the editor?</span>
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed pl-6">
              JavaScript executes immediately in a sandboxed runtime. C++, Python, and Java evaluate against model cases and are optimized using Gemini API prompt analyses.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="py-20 px-6 max-w-md mx-auto">
        <GlassCard className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Have Questions?</h3>
            <p className="text-xs text-slate-400 mt-1">Get in touch with our engineering team.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1">Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows="4"
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-all"
            >
              <Send className="h-4 w-4" />
              <span>{formSent ? 'Sent Successfully!' : 'Send Message'}</span>
            </button>
          </form>
        </GlassCard>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
