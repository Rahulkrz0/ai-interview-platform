import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LiveBackground from './components/LiveBackground';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feedback from './pages/Feedback';
import AdminFeedback from './pages/AdminFeedback';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';
import AIInterview from './pages/AIInterview';
import CodingPlatform from './pages/CodingPlatform';
import CodingWorkspace from './pages/CodingWorkspace';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import ResumeModule from './pages/ResumeModule';
import AiTools from './pages/AiTools';
import CareerCoach from './pages/CareerCoach';
import Reports from './pages/Reports';
import Gamification from './pages/Gamification';
import Discussions from './pages/Discussions';
import AdminDashboard from './pages/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

// Protected Route wrapper checking active user status
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect if role is invalid for page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("GlobalErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-100">Something went wrong</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected rendering error occurred. Our automated fallback system has successfully caught this to maintain session stability.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="/dashboard"
                className="block w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
              >
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <GlobalErrorBoundary>
      <Router>
        <ThemeProvider>
          <LiveBackground />
          <AuthProvider>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<><LandingPage /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/feedback" element={<Feedback />} />

              {/* Protected Workspace Layout Pages */}
              <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                {/* Student routes */}
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/interview" element={<AIInterview />} />
                <Route path="/coding" element={<CodingPlatform />} />
                <Route path="/coding/workspace/:id" element={<CodingWorkspace />} />
                <Route path="/question-bank" element={<QuestionBank />} />
                <Route path="/question-bank/:id" element={<QuestionDetail />} />
                <Route path="/resume-ats" element={<ResumeModule />} />
                <Route path="/ai-tools" element={<AiTools />} />
                <Route path="/career-coach" element={<CareerCoach />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/detail/:reportId" element={<Reports />} />
                <Route path="/gamification" element={<Gamification />} />
                <Route path="/discussions" element={<Discussions />} />
                
                {/* Recruiter-only routes */}
                <Route 
                  path="/recruiter-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['recruiter']}>
                      <RecruiterDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/recruiter-compare" 
                  element={
                    <ProtectedRoute allowedRoles={['recruiter']}>
                      <RecruiterDashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* Admin-only routes */}
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-feedback" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminFeedback />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </GlobalErrorBoundary>
  );
}

export default App;
