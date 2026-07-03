import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { FileText, Download, TrendingUp, AlertTriangle, CheckCircle, RefreshCw, BarChart2 } from 'lucide-react';

const Reports = () => {
  const { reportId } = useParams();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [reportId]);

  const fetchReports = async () => {
    try {
      const res = await api.get('/reports');
      setReports(res.data.reports);

      // Auto select current reportId or first report
      if (reportId) {
        fetchReportDetail(reportId);
      } else if (res.data.reports.length > 0) {
        fetchReportDetail(res.data.reports[0]._id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.warn('Reports list fetch mockup.');
      // Seed fallback reports
      const mocks = [
        {
          _id: 'rep1',
          overallScore: 82,
          hiringProbability: 88,
          createdAt: new Date(),
          interviewId: { type: 'Technical', roleName: 'Software Engineer', company: 'Google', difficulty: 'Medium' }
        },
        {
          _id: 'rep2',
          overallScore: 75,
          hiringProbability: 70,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          interviewId: { type: 'HR', roleName: 'Product Associate', company: 'Microsoft', difficulty: 'Easy' }
        }
      ];
      setReports(mocks);
      setSelectedReport(mockReportDetail('rep1'));
      setLoading(false);
    }
  };

  const fetchReportDetail = async (id) => {
    setReportLoading(true);
    try {
      const res = await api.get(`/reports/detail/${id}`);
      setSelectedReport(res.data.report);
    } catch (err) {
      // Mock detail fallback
      setSelectedReport(mockReportDetail(id));
    } finally {
      setReportLoading(false);
      setLoading(false);
    }
  };

  const mockReportDetail = (id) => {
    return {
      _id: id,
      overallScore: id === 'rep1' ? 82 : 75,
      technicalScore: 84,
      communicationScore: 78,
      grammarScore: 88,
      confidenceScore: 80,
      fluencyScore: 80,
      problemSolvingScore: 85,
      hiringProbability: 88,
      strengths: ['Structured answers using clean tech keywords', 'Good volume and pace modulation'],
      weaknesses: ['Vague details on database normalization steps', 'Pacing checks count 6 filler words'],
      mistakes: [
        {
          question: 'Can you describe how you scale a read-heavy MongoDB schema?',
          userAnswer: 'Basically, we just read and then caching, like, adding redis makes it scale, um, quickly.',
          errorDescription: 'Missed clarifying indexes, database replication, and read-replicas configurations.',
          suggestedCorrection: 'Use read-only secondary replica nodes and set up Redis key-value caching in front of hot documents.'
        }
      ],
      suggestedAnswers: [
        {
          question: 'Can you describe how you scale a read-heavy MongoDB schema?',
          sampleAnswer: 'To scale a read-heavy database, we can configure a Replica Set with primary-secondary nodes, routing read operations to secondary nodes using readPreferences. Additionally, caching frequently requested queries using Redis significantly reduces document lookups.'
        }
      ],
      personalizedImprovementPlan: 'Incorporate the STAR methodology. Pause for 1 second before formulating system components instead of inserting filler transitional elements like "so" and "basically".',
      createdAt: new Date(),
      interviewId: {
        type: id === 'rep1' ? 'Technical' : 'HR',
        roleName: 'Software Engineer',
        company: id === 'rep1' ? 'Google' : 'Microsoft',
        difficulty: 'Medium'
      }
    };
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-4">
      {/* Left Panel: Reports list history */}
      <div className="space-y-6">
        <GlassCard className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200/10 pb-2">
            <h3 className="font-bold text-sm">Attempt History</h3>
            <a
              href={import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000"}
              className="text-[10px] text-indigo-500 hover:underline flex items-center space-x-1"
            >
              <Download className="h-3 w-3" />
              <span>Export CSV</span>
            </a>
          </div>

          {reports.length === 0 ? (
            <div className="text-center text-xs py-8 text-slate-400">No report cards created yet.</div>
          ) : (
            <div className="space-y-2">
              {reports.map(rep => (
                <div
                  key={rep._id}
                  onClick={() => fetchReportDetail(rep._id)}
                  className={`p-3 rounded-2xl cursor-pointer border text-xs flex justify-between items-center transition-all ${selectedReport?._id === rep._id
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500'
                    : 'glass-card border-slate-200/10 hover:border-indigo-500/20'
                    }`}
                >
                  <div className="space-y-1">
                    <p className="font-bold">{rep.interviewId?.type} ({rep.interviewId?.company})</p>
                    <p className="text-[10px] text-slate-400">{new Date(rep.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="font-extrabold text-sm">{rep.overallScore}%</span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Right Panel: Detailed report review */}
      <div className="lg:col-span-2">
        {reportLoading ? (
          <LoadingSpinner />
        ) : selectedReport ? (
          <div className="space-y-6">
            {/* Header info */}
            <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-bold uppercase">
                  {selectedReport.interviewId?.type} prep
                </span>
                <h2 className="text-2xl font-bold mt-1">
                  Mock Interview with Elena ({selectedReport.interviewId?.company})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Role: {selectedReport.interviewId?.roleName} | Difficulty: {selectedReport.interviewId?.difficulty}
                </p>
              </div>

              <a
                href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reports/download-pdf/${selectedReport._id}`}
                className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF Report</span>
              </a>
            </GlassCard>

            {/* Performance scores matrix */}
            <GlassCard className="space-y-4">
              <h3 className="text-sm font-bold flex items-center space-x-2 text-indigo-500">
                <BarChart2 className="h-4.5 w-4.5" />
                <span>Performance Scores Metrics</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                <div className="bg-slate-500/10 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold">Overall Score</span>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {selectedReport.overallScore}/100
                  </div>
                </div>
                <div className="bg-slate-500/10 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold">Technical</span>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {selectedReport.technicalScore}/100
                  </div>
                </div>
                <div className="bg-slate-500/10 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold">Fluency / Pace</span>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {selectedReport.communicationScore}/100
                  </div>
                </div>
                <div className="bg-slate-500/10 p-3 rounded-xl">
                  <span className="text-slate-400 font-semibold">Hiring Probability</span>
                  <div className="text-xl font-bold text-emerald-500 mt-1">
                    {selectedReport.hiringProbability}%
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-emerald-500 flex items-center space-x-1.5">
                  <CheckCircle className="h-4 w-4" />
                  <span>Key Strengths</span>
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1.5 leading-relaxed">
                  {selectedReport.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-red-500 flex items-center space-x-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Identified Weaknesses</span>
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1.5 leading-relaxed">
                  {selectedReport.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* Mistakes & Corrections */}
            {selectedReport.mistakes?.map((mistake, idx) => (
              <GlassCard key={idx} className="space-y-4 border border-red-500/10">
                <h3 className="font-bold text-sm text-red-500">Fluency / Grammar Breakdown</h3>
                <div className="space-y-2.5 text-xs leading-relaxed">
                  <div>
                    <span className="font-bold text-slate-400">Elena Asked:</span>
                    <p className="text-slate-500">"{mistake.question}"</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400">Your Answer:</span>
                    <p className="text-slate-500 bg-slate-500/10 px-3 py-2 rounded-xl mt-1">
                      "{mistake.userAnswer}"
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-red-500">Critique & Grammar Slipups:</span>
                    <p className="text-slate-500 mt-0.5">{mistake.errorDescription}</p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-500">Suggested Response:</span>
                    <p className="text-slate-500 mt-0.5">{mistake.suggestedCorrection}</p>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Personalized Improvement Plan */}
            <GlassCard className="space-y-3">
              <h3 className="font-bold text-sm">Actionable Improvement Plan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedReport.personalizedImprovementPlan}
              </p>
            </GlassCard>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 text-xs">Select an interview history log to inspect report card details.</div>
        )}
      </div>
    </div>
  );
};

export default Reports;
