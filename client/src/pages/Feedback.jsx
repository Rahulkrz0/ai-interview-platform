import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, api } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import BackButton from '../components/BackButton';
import { Star, Upload, Check, AlertTriangle, Loader2, Send } from 'lucide-react';

const Feedback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    overallRating: 0,
    category: '',
    message: '',
    recommendation: '',
  });

  // Feature ratings state (1 to 5 stars)
  const [featureRatings, setFeatureRatings] = useState({
    mockInterview: 0,
    codingInterview: 0,
    resumeChecker: 0,
    careerAssistant: 0,
    dashboardExperience: 0,
    websiteUiUx: 0,
  });

  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Autofill if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'student',
      }));
    }
  }, [user]);

  const handleRatingChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureRatingChange = (feature, value) => {
    setFeatureRatings((prev) => ({ ...prev, [feature]: value }));
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are supported for screenshot upload.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Screenshot size must be under 5MB.');
        return;
      }
      setError('');
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) return setError('Full Name is required.');
    if (!formData.email.trim()) return setError('Email Address is required.');
    if (!formData.overallRating) return setError('Please select an overall rating.');
    if (!formData.category) return setError('Please select a feedback category.');
    if (!formData.message.trim()) return setError('Please write a feedback message.');
    if (!formData.recommendation) return setError('Please select if you would recommend the platform.');

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('email', formData.email.trim());
      payload.append('role', formData.role);
      payload.append('overallRating', formData.overallRating);
      payload.append('category', formData.category);
      payload.append('message', formData.message.trim());
      payload.append('recommendation', formData.recommendation);
      
      // Feature ratings
      payload.append('mockInterview', featureRatings.mockInterview || 5);
      payload.append('codingInterview', featureRatings.codingInterview || 5);
      payload.append('resumeChecker', featureRatings.resumeChecker || 5);
      payload.append('careerAssistant', featureRatings.careerAssistant || 5);
      payload.append('dashboardExperience', featureRatings.dashboardExperience || 5);
      payload.append('websiteUiUx', featureRatings.websiteUiUx || 5);

      if (screenshot) {
        payload.append('screenshot', screenshot);
      }

      await api.post('/feedback', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'student',
        overallRating: 0,
        category: '',
        message: '',
        recommendation: '',
      });
      setFeatureRatings({
        mockInterview: 0,
        codingInterview: 0,
        resumeChecker: 0,
        careerAssistant: 0,
        dashboardExperience: 0,
        websiteUiUx: 0,
      });
      setScreenshot(null);
      setScreenshotPreview('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  // Render Star Rating Selector
  const StarRating = ({ value, onChange, label, max = 5 }) => {
    const [hoverVal, setHoverVal] = useState(null);
    return (
      <div className="flex flex-col space-y-1">
        {label && <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>}
        <div className="flex items-center space-x-1.5">
          {[...Array(max)].map((_, index) => {
            const starValue = index + 1;
            const isFilled = hoverVal !== null ? starValue <= hoverVal : starValue <= value;
            return (
              <button
                type="button"
                key={index}
                onClick={() => onChange(starValue)}
                onMouseEnter={() => setHoverVal(starValue)}
                onMouseLeave={() => setHoverVal(null)}
                className="p-0.5 rounded-md focus:outline-none transition-transform hover:scale-125"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    isFilled
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const featureLabels = {
    mockInterview: 'AI Mock Interview',
    codingInterview: 'Coding Interview',
    resumeChecker: 'Resume ATS Checker',
    careerAssistant: 'AI Career Assistant',
    dashboardExperience: 'Dashboard Experience',
    websiteUiUx: 'Website UI/UX',
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-900/5 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100">
      <Navbar />

      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 space-y-6">
        <div className="flex justify-start">
          <BackButton />
        </div>
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Share Your{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Feedback
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
            Help us improve the AI Interview Preparation Platform. Tell us about your experience and how we can make it even better.
          </p>
        </div>

        {success ? (
          <GlassCard className="max-w-xl mx-auto text-center py-12 px-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center border border-green-500/20">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Feedback Submitted!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Thank you for your valuable input. Your feedback helps us build a better platform for everyone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setSuccess(false)}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-indigo-500 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/20 transition-all"
              >
                Submit Another Response
              </button>
              <button
                onClick={() => navigate(user ? '/dashboard' : '/')}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:opacity-95 transition-all shadow-md"
              >
                Go to Home
              </button>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="w-full space-y-8">
            {error && (
              <div className="flex items-center space-x-2.5 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* User Identity Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full bg-slate-500/5 border border-slate-500/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                    disabled={!!user}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="w-full bg-slate-500/5 border border-slate-500/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                    disabled={!!user}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">User Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                    className="w-full bg-slate-500/5 dark:bg-slate-900 border border-slate-500/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                    disabled={!!user}
                  >
                    <option value="student">Student</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <hr className="border-slate-200/10" />

              {/* Ratings */}
              <div className="space-y-6">
                <div>
                  <StarRating
                    label="Overall Platform Rating *"
                    value={formData.overallRating}
                    onChange={(val) => handleRatingChange('overallRating', val)}
                  />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                    Feature-Specific Ratings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Object.keys(featureRatings).map((key) => (
                      <div key={key} className="p-3 bg-slate-500/5 rounded-xl border border-slate-200/5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{featureLabels[key]}</span>
                        <StarRating
                          value={featureRatings[key]}
                          onChange={(val) => handleFeatureRatingChange(key, val)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="border-slate-200/10" />

              {/* Details & category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">Feedback Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                    className="w-full bg-slate-500/5 dark:bg-slate-900 border border-slate-500/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="General Feedback">General Feedback</option>
                    <option value="Improvement Suggestion">Improvement Suggestion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold block mb-1.5 text-slate-700 dark:text-slate-300">Would you recommend this platform? *</label>
                  <div className="flex space-x-4">
                    {['Yes', 'No'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, recommendation: opt }))}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.recommendation === opt
                            ? 'bg-indigo-500 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-500/5 border-slate-500/15 hover:bg-slate-500/10 text-slate-400'
                        }`}
                      >
                        {formData.recommendation === opt && <Check className="h-3.5 w-3.5" />}
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1 text-slate-700 dark:text-slate-300">Feedback Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  rows="5"
                  placeholder="Tell us what you liked, what can be improved, or details of the issue you encountered..."
                  className="w-full bg-slate-500/5 border border-slate-500/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  required
                ></textarea>
              </div>

              {/* File Attachment */}
              <div className="space-y-2">
                <label className="text-xs font-bold block text-slate-700 dark:text-slate-300">Optional Screenshot Upload</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-500/10 hover:bg-slate-500/15 text-slate-600 dark:text-slate-300 border border-slate-500/15 rounded-xl text-xs font-semibold cursor-pointer transition-all">
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="hidden"
                    />
                  </label>
                  {screenshot && (
                    <div className="flex items-center space-x-2 bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full text-xs font-semibold">
                      <span className="truncate max-w-[200px]">{screenshot.name}</span>
                      <button
                        type="button"
                        onClick={handleRemoveScreenshot}
                        className="text-red-500 hover:text-red-600 font-bold focus:outline-none ml-1.5"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                {screenshotPreview && (
                  <div className="relative mt-2 border border-slate-200/10 rounded-xl overflow-hidden max-w-[250px] aspect-video bg-black/10">
                    <img src={screenshotPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <hr className="border-slate-200/10" />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:opacity-95 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    <span>Submitting Feedback...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>

            </form>
          </GlassCard>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Feedback;
