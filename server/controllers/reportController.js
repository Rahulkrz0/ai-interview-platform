const Report = require('../models/Report');
const Interview = require('../models/Interview');
const PDFDocument = require('pdfkit');

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
      .populate('interviewId', 'type company roleName difficulty mode createdAt')
      .sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', reports });
  } catch (error) {
    next(error);
  }
};

exports.getReportDetail = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId)
      .populate('interviewId');

    if (!report) {
      return res.status(404).json({ status: 'fail', message: 'Report not found.' });
    }

    res.status(200).json({ status: 'success', report });
  } catch (error) {
    next(error);
  }
};

// Export report as PDF format
exports.downloadReportPDF = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId).populate('interviewId');

    if (!report) {
      return res.status(404).json({ status: 'fail', message: 'Report record not found.' });
    }

    // Initialize PDF document
    const doc = new PDFDocument({ margin: 50 });
    
    // Set headers to trigger browser download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Interview_Report_${report._id}.pdf`);

    // Stream PDF directly to client response
    doc.pipe(res);

    // Title banner
    doc.fillColor('#4f46e5').fontSize(26).text('AI Interview Preparation Platform', { align: 'center' });
    doc.fillColor('#6b7280').fontSize(14).text('Personalized Interview Report Card', { align: 'center' });
    doc.moveDown(1.5);

    // Metadata block
    doc.fillColor('#1f2937').fontSize(12);
    doc.text(`Report ID: ${report._id}`);
    doc.text(`Interview Date: ${new Date(report.createdAt).toLocaleDateString()}`);
    doc.text(`Category: ${report.interviewId?.type || 'N/A'}`);
    doc.text(`Role: ${report.interviewId?.roleName || 'N/A'}`);
    doc.text(`Company: ${report.interviewId?.company || 'N/A'}`);
    doc.text(`Difficulty: ${report.interviewId?.difficulty || 'N/A'}`);
    doc.moveDown(1.5);

    // Score Table
    doc.fillColor('#4f46e5').fontSize(16).text('Evaluation Performance Metrics');
    doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    doc.fillColor('#1f2937').fontSize(12);
    doc.text(`Overall Score: ${report.overallScore}/100`);
    doc.text(`Technical Competence: ${report.technicalScore}/100`);
    doc.text(`Communication Fluency: ${report.communicationScore}/100`);
    doc.text(`Grammar & Vocabulary: ${report.grammarScore}/100`);
    doc.text(`Confidence Indicator: ${report.confidenceScore}/100`);
    doc.text(`Hiring Probability Index: ${report.hiringProbability}%`);
    doc.moveDown(1.5);

    // Strengths & Weaknesses
    doc.fillColor('#059669').fontSize(16).text('Key Strengths');
    doc.moveDown(0.5);
    doc.fillColor('#1f2937').fontSize(11);
    report.strengths.forEach((str, index) => {
      doc.text(`${index + 1}. ${str}`);
    });
    doc.moveDown(1.5);

    doc.fillColor('#dc2626').fontSize(16).text('Identified Weaknesses');
    doc.moveDown(0.5);
    doc.fillColor('#1f2937').fontSize(11);
    report.weaknesses.forEach((wk, index) => {
      doc.text(`${index + 1}. ${wk}`);
    });
    doc.moveDown(1.5);

    // Final plan
    doc.fillColor('#4f46e5').fontSize(16).text('Suggested Improvement Actions');
    doc.moveDown(0.5);
    doc.fillColor('#1f2937').fontSize(11);
    doc.text(report.personalizedImprovementPlan || 'Focus on active code structure definitions.');

    // End file write stream
    doc.end();
  } catch (error) {
    next(error);
  }
};

// Export candidate reports summaries as CSV
exports.downloadReportsCSV = async (req, res, next) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
      .populate('interviewId', 'type roleName company');

    let csvContent = 'Report ID,Date,Role,Company,Overall Score,Technical,Communication,Hiring Probability\n';
    
    reports.forEach(rep => {
      csvContent += `"${rep._id}","${new Date(rep.createdAt).toLocaleDateString()}","${rep.interviewId?.roleName || 'N/A'}","${rep.interviewId?.company || 'N/A'}",${rep.overallScore},${rep.technicalScore},${rep.communicationScore},${rep.hiringProbability}%\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=Candidate_Performances_Summary.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
