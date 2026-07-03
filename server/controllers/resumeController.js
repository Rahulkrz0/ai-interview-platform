const path = require('path');
const fs = require('fs');
const Resume = require('../models/Resume');
const geminiService = require('../services/geminiService');

const pdfParse = require('pdf-parse');

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log('[Resume Upload] Failed: No file uploaded.');
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    console.log('\n[Resume Upload] Received file:', req.file.originalname, 'Size:', req.file.size);
    const { targetRole } = req.body;
    const filePath = `/uploads/${req.file.filename}`;
    let fileBuffer;
    
    // Validate PDF file header signature (%PDF)
    try {
      fileBuffer = fs.readFileSync(req.file.path);
      const fileHeader = fileBuffer.toString('utf8', 0, 4);
      if (fileHeader !== '%PDF') {
        console.error('[Resume Upload] Invalid PDF signature:', fileHeader);
        fs.unlinkSync(req.file.path); // Clean up invalid file
        return res.status(400).json({
          success: false,
          message: 'Invalid or corrupted PDF file. Please upload a valid, readable PDF document.'
        });
      }
    } catch (readErr) {
      console.error('[Resume Upload] PDF reading error:', readErr.message);
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Could not parse or validate the uploaded file. Please make sure it is not corrupted.'
      });
    }
    
    // Parse PDF text with cascading fallbacks
    let resumeText = '';
    
    // 1. pdf-parse
    try {
      const pdfData = await pdfParse(fileBuffer);
      if (pdfData.text && pdfData.text.trim().length >= 50) {
        resumeText = pdfData.text;
      }
    } catch (e) {
      console.error('pdf-parse failed:', e.message);
    }

    // 2. pdfjs-dist
    if (!resumeText) {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
        const pdf = await loadingTask.promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
        if (text && text.trim().length >= 50) resumeText = text;
      } catch (e) {
        console.error('pdfjs-dist failed:', e.message);
      }
    }

    // 3. pdf2json
    if (!resumeText) {
      try {
        const PDFParser = require("pdf2json");
        resumeText = await new Promise((resolve, reject) => {
          const pdfParser = new PDFParser(this, 1);
          pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
          pdfParser.on("pdfParser_dataReady", () => {
            resolve(pdfParser.getRawTextContent());
          });
          pdfParser.parseBuffer(fileBuffer);
        });
        if (resumeText && resumeText.trim().length < 50) resumeText = '';
      } catch (e) {
        console.error('pdf2json failed:', e.message);
      }
    }

    // 4. OCR Support using Tesseract
    if (!resumeText) {
      try {
        console.log('Text extraction empty. Attempting OCR with Tesseract...');
        const Tesseract = require('tesseract.js');
        const { data: { text } } = await Tesseract.recognize(fileBuffer, 'eng');
        if (text && text.trim().length >= 20) {
          resumeText = text;
        }
      } catch (e) {
        console.error('Tesseract OCR failed:', e.message);
      }
    }

    if (!resumeText || resumeText.trim().length < 20) {
      console.error('[Resume Upload] Final extraction failed. Extracted text too short or empty.');
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Unable to analyze this resume. Text extraction failed.'
      });
    }
    
    console.log(`Extracted resume text length: ${resumeText.length} characters`);
    console.log(`First 500 characters of extracted text: ${resumeText.substring(0, 500)}`);

    // Process parsing analytics through Gemini
    const analysis = await geminiService.analyzeResume({
      resumeText,
      targetRole: targetRole || 'Full Stack Engineer'
    });

    if (analysis.isResume === false) {
      console.warn('[Resume Upload] Document identified as NOT a resume by Gemini.');
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'This document does not appear to be a resume. Please upload a valid resume PDF.'
      });
    }

    // Check if user has an existing Resume record
    let resume = await Resume.findOne({ userId: req.user.id });

    const updateFields = {
      fileName: req.file.originalname,
      fileUrl: filePath,
      fileContentText: resumeText,
      atsScore: analysis.atsScore,
      skillsMatch: analysis.skillsMatch || 0,
      keywordMatch: analysis.keywordMatch || 0,
      resumeStructureScore: analysis.resumeStructureScore || 0,
      experienceScore: analysis.experienceScore || 0,
      educationScore: analysis.educationScore || 0,
      grammarScore: analysis.grammarScore || 0,
      formattingScore: analysis.formattingScore || 0,
      readabilityScore: analysis.readabilityScore || 0,
      grammarIssuesCount: analysis.grammarIssuesCount || 0,
      missingKeywords: analysis.missingKeywords || [],
      matchScore: analysis.matchScore || analysis.skillsMatch || 0,
      summary: analysis.summary,
      suggestions: analysis.suggestions || [],
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || []
    };

    if (!resume) {
      resume = await Resume.create({
        userId: req.user.id,
        ...updateFields,
        versionHistory: [{
          version: 1,
          fileName: req.file.originalname,
          fileUrl: filePath,
          atsScore: analysis.atsScore
        }]
      });
    } else {
      // Add version increment
      const nextVersion = resume.versionHistory.length + 1;
      
      Object.assign(resume, updateFields);
      
      resume.versionHistory.push({
        version: nextVersion,
        fileName: req.file.originalname,
        fileUrl: filePath,
        atsScore: analysis.atsScore
      });

      await resume.save();
    }

    console.log('[Resume Upload] Processing complete. Sending success response.');
    res.status(200).json({
      success: true,
      data: { resume }
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'No resume found.' });
    }
    res.status(200).json({ success: true, data: { resume } });
  } catch (error) {
    next(error);
  }
};

exports.generateCoverLetter = async (req, res, next) => {
  try {
    const { companyName, jobRole } = req.body;

    const resume = await Resume.findOne({ userId: req.user.id });
    const contentText = resume ? resume.fileContentText : 'Default Developer Resume Profile';

    const coverLetterText = await geminiService.generateCoverLetter({
      resumeText: contentText,
      companyName,
      jobRole
    });

    if (resume) {
      resume.coverLetters.push({
        companyName,
        jobRole,
        letterContent: coverLetterText
      });
      await resume.save();
    }

    res.status(200).json({
      success: true,
      data: { coverLetter: coverLetterText }
    });
  } catch (error) {
    next(error);
  }
};

exports.reviewSocialProfiles = async (req, res, next) => {
  try {
    const { linkedinUrl, portfolioUrl } = req.body;

    const resume = await Resume.findOne({ userId: req.user.id });
    const contentText = resume ? resume.fileContentText : 'Default Developer Resume Profile';

    const feedback = await geminiService.reviewLinkedInAndPortfolio({
      linkedinUrl,
      portfolioUrl,
      resumeText: contentText
    });

    res.status(200).json({
      success: true,
      data: { feedback }
    });
  } catch (error) {
    next(error);
  }
};
