const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('../config/env');

let genAI = null;
try {
    genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  } catch (err) {
    console.error('Failed to initialize GoogleGenerativeAI:', err.message);
  }

let cachedModelName = null;

async function getValidModel() {
  if (!genAI) {
    throw new Error('Gemini API key is not configured. Real AI evaluation requires a valid API key.');
  }

  if (cachedModelName) return genAI.getGenerativeModel({ model: cachedModelName });
  
  
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${env.GEMINI_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.models) {
      const validModels = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'));
      const preferred = ['models/gemini-2.5-flash', 'models/gemini-2.0-flash', 'models/gemini-1.5-flash'];
      for (const pref of preferred) {
        if (validModels.find(m => m.name === pref)) {
           cachedModelName = pref.replace('models/', '');
           return genAI.getGenerativeModel({ model: cachedModelName });
        }
      }
      if (validModels.length > 0) {
        cachedModelName = validModels[0].name.replace('models/', '');
        return genAI.getGenerativeModel({ model: cachedModelName });
      }
    }
  } catch (err) {
    console.error('Failed to dynamically fetch Gemini models. Falling back to default.', err.message);
  }
  
  cachedModelName = 'gemini-2.5-flash';
  return genAI.getGenerativeModel({ model: cachedModelName });
}


// Helper to extract JSON from Gemini text response
function extractJSON(text) {
  try {
    let rawJson = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/({[\s\S]*})/);
    if (jsonMatch) {
      rawJson = jsonMatch[1] || jsonMatch[0];
    }
    
    // Aggressive JSON repair
    rawJson = rawJson.trim();
    // Remove trailing commas before closing braces/brackets
    rawJson = rawJson.replace(/,\s*([\]}])/g, '$1');
    // Ensure all keys are quoted (simple attempt, might not catch all edge cases but helps with basic invalid JSON)
    // rawJson = rawJson.replace(/([{,]\s*)([A-Za-z0-9_]+)(\s*:)/g, '$1"$2"$3');
    
    return JSON.parse(rawJson);
  } catch (err) {
    console.error('Failed to parse JSON from AI response:', err.message, '\nRaw Text:', text);
    throw new Error(`AI returned malformed JSON data: ${err.message}. Raw: ${text.substring(0, 50)}...`);
  }
}

// 1. Generate Interview Questions
async function generateInterviewQuestions({ category, difficulty, jobRole, company, duration }) {

  const prompt = `Generate a JSON array containing exactly 5 interview questions for a ${difficulty} level candidate interviewing for a ${jobRole} position at ${company}. The questions should focus heavily on the topic of ${category}. Output only a raw JSON array of strings. Do not include markdown code block formatting or explanations.`;
  
  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    return extractJSON(textResponse);
  } catch (error) {
    console.error('Error generating questions from Gemini:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 2. Evaluate User's Answer
async function evaluateAnswer({ question, answer, jobRole, difficulty }) {
  const prompt = `You are an expert interviewer. Evaluate the candidate's answer for the following question.
Question: "${question}"
Candidate Answer: "${answer}"
Target Role: "${jobRole}"
Difficulty: "${difficulty}"

Provide a detailed evaluation in JSON format containing:
1. "scores": { "overall": 0-100, "technicalAccuracy": 0-100, "relevance": 0-100, "communication": 0-100, "confidence": 0-100, "completeness": 0-100, "grammar": 0-100, "professionalTone": 0-100, "fluency": 0-100 }
2. "strengths": Array of strings
3. "weaknesses": Array of strings
4. "mistakes": Array of objects each with { "errorDescription": "string", "suggestedCorrection": "string" }
5. "sampleAnswer": A high-quality model response.

CRITICAL INSTRUCTIONS:
- If the candidate's answer is completely irrelevant, nonsensical, or clearly just filler text (e.g. "test test test test test"), assign all scores between 0-15. Add a weakness stating: "This answer does not address the interview question. Please provide a meaningful response."
- Only return valid JSON matching the schema exactly. Do not use markdown blocks.`;

  try {
    const model = await getValidModel();
    
    console.log('\n=========================================================');
    console.log('[AI Evaluation] Question:', question);
    console.log('[AI Evaluation] User Answer:', answer);
    console.log('[AI Evaluation] Gemini Request (Prompt):', prompt);

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    
    console.log('[AI Evaluation] Gemini Response:', textResponse);
    console.log('=========================================================\n');
    
    return extractJSON(textResponse);
  } catch (error) {
    console.error('Error evaluating answer via Gemini:', error.message);
    throw new Error('AI evaluation failed: ' + error.message);
  }
}

// 3. Analyze Resume (ATS Score & Matches)
async function analyzeResume({ resumeText, targetRole }) {
  const prompt = `Analyze the following document text and determine if it is a valid resume. If it is a valid resume, evaluate it against the target job role "${targetRole}".
Document Content:
${resumeText}

Provide an ATS analysis in JSON format containing exactly these fields:
1. "isResume": boolean (true if it looks like a real resume, false if it is a random document, book, blank, etc.)
2. "atsScore": 0-100 (Overall ATS score)
3. "skillsMatch": 0-100
4. "keywordMatch": 0-100
5. "resumeStructureScore": 0-100
6. "experienceScore": 0-100
7. "educationScore": 0-100
8. "grammarScore": 0-100
9. "formattingScore": 0-100
10. "readabilityScore": 0-100
11. "missingKeywords": Array of strings (important missing industry-standard skills/keywords for this role)
12. "grammarIssuesCount": Integer (approximate number of typos or grammatical errors found)
13. "summary": Short paragraph summarizing their overall profile
14. "suggestions": Array of actionable improvement recommendations
15. "strengths": Array of candidate key strengths in their resume
16. "weaknesses": Array of identified gaps or weak points in their resume

Return only valid JSON.`;

  try {
    const model = await getValidModel();
    console.log('\n[ATS Analysis] Gemini Request (Prompt Length):', prompt.length);
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    console.log('[ATS Analysis] Gemini Raw Response:', rawText);
    const parsed = extractJSON(rawText);
    console.log('[ATS Analysis] Parsed JSON Successfully.');
    
    // Ensure backwards compatibility with matchScore and grammarCheck if needed
    parsed.matchScore = parsed.skillsMatch || 0;
    parsed.grammarCheck = parsed.grammarScore || 0;
    
    return parsed;
  } catch (error) {
    console.error('Error analyzing resume:', error.message);
    throw new Error(error.message); // REAL error message
  }
}

// 4. Generate Cover Letter
async function generateCoverLetter({ resumeText, companyName, jobRole }) {

  const prompt = `Based on the following resume text, write a professional cover letter for a "${jobRole}" position at "${companyName}". Keep it concise and professional.
Resume Content:
${resumeText}

Return only the cover letter text, no formatting wrappers.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error('Error generating cover letter:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 5. Review LinkedIn and Portfolio Profiles
async function reviewLinkedInAndPortfolio({ linkedinUrl, portfolioUrl, resumeText }) {

  const prompt = `Review the following developer profiles (LinkedIn: ${linkedinUrl}, Portfolio: ${portfolioUrl}) using their parsed resume text context.
Resume:
${resumeText}

Provide an evaluation in JSON format containing:
1. "linkedinReview": Suggestions to optimize their LinkedIn presence
2. "portfolioReview": UI/UX/Content feedback on their portfolio site
3. "generalSuggestions": Array of suggestions to align online presence.

Return only valid JSON.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return extractJSON(result.response.text());
  } catch (error) {
    console.error('AI generation error:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 6. Generate Roadmap & Timeline
async function generateRoadmap({ title, skillsArray }) {

  const prompt = `Generate a learning timeline/roadmap for target skill path "${title}" considering user's current skills: [${skillsArray.join(', ')}]. 
Generate a JSON array of objects, each object containing:
1. "title": Short phase title
2. "description": What to learn
3. "suggestedResources": Array of resource names/links

Return only the valid JSON array.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return extractJSON(result.response.text());
  } catch (error) {
    console.error('AI generation error:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 7. Generate Daily Quiz
async function generateDailyQuiz({ skillTopic }) {
const prompt = `Generate a daily coding quiz of 10 multiple-choice questions for topic "${skillTopic}".
Provide a JSON array of objects. Each object should have:
1. "question": String
2. "options": Array of 4 strings
3. "answer": The exact string of the correct option
4. "explanation": Explaining why it is correct.

Return only the valid JSON array.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    const parsed = extractJSON(result.response.text());
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('AI returned empty quiz'); return parsed;
  } catch (error) {
    console.error('Error generating daily quiz:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 8. Generate Flashcards
async function generateFlashcards({ topic }) {

  const prompt = `Generate 5 flashcards for "${topic}" in JSON format.
Output a JSON array of objects containing:
1. "question": String
2. "answer": String

Return only valid JSON.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return extractJSON(result.response.text());
  } catch (error) {
    console.error('AI generation error:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 9. Generate Project Recommendations
async function generateProjectRecommendations({ skillsArray }) {

  const prompt = `Recommend 3 custom project ideas matching candidate skills: [${skillsArray.join(', ')}].
Provide a JSON array of objects containing:
1. "title": Project name
2. "description": Detailed project scope
3. "techStack": Array of recommended technologies
4. "difficulty": 'Beginner' | 'Intermediate' | 'Advanced'

Return only the valid JSON.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return extractJSON(result.response.text());
  } catch (error) {
    console.error('AI generation error:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// 10. AI Interview Replay & Transcript Metareview
async function analyzeInterviewReplay({ transcriptText }) {

  const prompt = `Review this candidate's transcript for communication fluency, filler-words usage, and speaking rhythm:
Transcript:
${transcriptText}

Provide an analysis in JSON format containing:
1. "fluencyRating": Detailed summary feedback
2. "fillerWordFrequency": Comments about their usage of fillers
3. "speakingPaceFeedback": Rhythm analysis
4. "improvementSteps": Array of strings of things to practice.

Return only valid JSON.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return extractJSON(result.response.text());
  } catch (error) {
    console.error('AI generation error:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// Generic dynamic prompt execution helper
async function generateCustomAIContent({ prompt, isJson = true }) {
  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    if (isJson) {
      return extractJSON(textResponse);
    }
    return textResponse.trim();
  } catch (error) {
    console.error('Error generating custom AI content:', error.message);
    throw new Error('AI generation failed: ' + error.message);
  }
}

// Enrich a question dynamically with Gemini AI
async function enrichQuestionWithAI({ title, description, category, difficulty, companies = [] }) {
  const companiesList = Array.isArray(companies) ? companies : [];

  const prompt = `You are an expert interviewer and technical content generator. Generate a comprehensive interview prep package for the following question.
Question Title: "${title}"
Question Description: "${description}"
Category: "${category}"
Difficulty: "${difficulty}"
Target Companies: [${companiesList.join(', ')}]

Provide a response in JSON format containing:
1. "completeAnswer": A detailed, comprehensive overview of the answer.
2. "detailedExplanation": An in-depth technical explanation detailing core mechanics, underlying principles, and technical nuances.
3. "interviewTips": Array of 3 key interview strategies and tips to answer this specific question.
4. "commonMistakes": Array of 3 common technical pitfalls or bad responses candidates make for this question.
5. "bestAnswerStructure": A structured step-by-step guideline (HTML or text) on how to lay out the answer (e.g. Introduction -> Core Concept -> Example -> Tradeoffs).
6. "followUpQuestions": Array of 3 highly relevant follow-up questions an interviewer might ask next.
7. "sampleAnswer": A high-quality, high-fidelity model response a candidate should deliver to impress the interviewer.
8. "keyPoints": Array of 4 critical points that must be covered.
9. "importantKeywords": Array of 5 industry-standard keywords/terminology used in this context.
10. "companySpecificTips": Array of 2 tips specifically tailored for the target companies: [${companiesList.join(', ')}]. If no target companies are provided, provide general tech giant tips.
11. "estimatedTime": Estimated preparation time (number, in minutes) to master this topic, between 5 and 60.

Return only valid JSON.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    return extractJSON(textResponse);
  } catch (error) {
    console.error('Error enriching question with AI:', error.message);
    // Fall back to standard structure
    return {
      completeAnswer: `Explain key theoretical principles of ${category} and write direct definitions.`,
      detailedExplanation: `Review standard ${category} documentations for detailed explanations of this question.`,
      interviewTips: ['Practice code structure.', 'Describe your design patterns.'],
      commonMistakes: ['Lack of concrete examples.', 'Vague terminology.'],
      bestAnswerStructure: '1. Summary\n2. Implementation Details\n3. Complexity Details',
      followUpQuestions: [`How do you optimize this concept in production?`],
      sampleAnswer: 'A model answer can be configured based on target framework documentation.',
      keyPoints: ['Core syntax', 'Execution lifecycle'],
      importantKeywords: [category, difficulty],
      companySpecificTips: ['Focus on code details.', 'Describe tradeoffs.'],
      estimatedTime: 10
    };
  }
}

// 11. AI Coding Assistant
async function codingAssistant({ problemTitle, problemDescription, userCode, userLanguage, action, userMessage }) {

  let prompt = `You are an expert AI Coding Interview Assistant helping a candidate solve the problem "${problemTitle}".
Problem Description:
${problemDescription}

Candidate's Current Code (${userLanguage || 'javascript'}):
\`\`\`${userLanguage || 'javascript'}
${userCode || '// No code provided'}
\`\`\`

CRITICAL RULE: Never reveal the complete final code solution immediately unless the candidate explicitly requests the full solution in their message. Be encouraging, precise, and structure your output beautifully in Markdown.
`;

  if (action === 'hint') {
    prompt += `\nThe candidate clicked "Give Hint". Provide 2 or 3 insightful hints to guide them towards the optimal approach without writing the solution code.`;
  } else if (action === 'explain_problem') {
    prompt += `\nThe candidate clicked "Explain Problem". Break down the problem statement into plain, easy-to-understand terms, explain the input/output goals, and highlight key constraints.`;
  } else if (action === 'brute_force') {
    prompt += `\nThe candidate clicked "Explain Brute Force". Explain the naive brute-force approach, its logic, and its Time and Space Complexity.`;
  } else if (action === 'optimal_solution') {
    prompt += `\nThe candidate clicked "Explain Optimal Solution". Explain the concepts, data structures, and algorithms behind the optimal solution, along with its Time and Space Complexity. Do not provide the full code block unless requested.`;
  } else if (action === 'explain_code') {
    prompt += `\nThe candidate clicked "Explain My Code / Suggest Improvements". Walk through the candidate's current code, explain what it is doing, identify any bugs or inefficiencies, and suggest improvements.`;
  } else {
    prompt += `\nThe candidate asked: "${userMessage}". Answer their question directly and professionally.`;
  }

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return { response: result.response.text().trim() };
  } catch (error) {
    console.error('Error in codingAssistant Gemini service:', error.message);
    return { response: `**AI Assistant Fallback:** Unable to reach Gemini API. Remember to check your loop bounds and data structure lookups for *${problemTitle}*.` };
  }
}

async function generateSalaryPrediction({ targetRole, companyName, experienceLevel, country, state, skills, degree, yearsOfExperience }) {
  const prompt = `You are an expert AI Career & Salary Coach. Generate a highly accurate salary forecast based on the current market data.

Parameters:
- Job Title: ${targetRole || 'Not specified'}
- Company: ${companyName || 'Not specified'}
- Experience Level: ${experienceLevel || 'Not specified'}
- Country: ${country || 'Not specified'}
- State/City: ${state || 'Not specified'}
- Skills: ${skills || 'Not specified'}
- Degree: ${degree || 'Not specified'}
- Years of Experience: ${yearsOfExperience || 'Not specified'}

Provide a detailed evaluation in JSON format containing EXACTLY:
1. "minSalary": Number (Estimated Minimum Annual Salary)
2. "avgSalary": Number (Estimated Average Annual Salary)
3. "maxSalary": Number (Estimated Maximum Annual Salary)
4. "monthlySalary": Number (Estimated Average Monthly Salary)
5. "yearlySalary": Number (Same as avgSalary)
6. "currency": String (e.g., "USD", "INR", "EUR", "GBP" based on the Country)
7. "confidenceScore": Number (0-100, representing your confidence in this prediction)
8. "marketDemand": String ("Low", "Medium", "High")
9. "requiredSkills": Array of strings (Key skills required to hit the max salary)
10. "missingSkills": Array of strings (Important skills the user didn't mention)
11. "careerGrowth": String (A short paragraph on 5-year growth trajectory)
12. "interviewDifficulty": String ("Easy", "Medium", "Hard", "Very Hard")
13. "improvementSuggestions": Array of strings (Actionable tips to negotiate or increase salary)
14. "recommendedCertifications": Array of strings
15. "topCompanies": Array of strings (Other top companies hiring for this role in this region)

CRITICAL INSTRUCTION: Return ONLY valid JSON matching this schema exactly. No markdown blocks, no conversational text.`;

  try {
    const model = await getValidModel();
    const result = await model.generateContent(prompt);
    return extractJSON(result.response.text());
  } catch (error) {
    console.error('Error generating salary prediction via Gemini:', error.message);
    throw new Error('AI evaluation failed: ' + error.message);
  }
}

module.exports = {
  generateInterviewQuestions,
  evaluateAnswer,
  analyzeResume,
  generateCoverLetter,
  reviewLinkedInAndPortfolio,
  generateRoadmap,
  generateDailyQuiz,
  generateFlashcards,
  generateProjectRecommendations,
  analyzeInterviewReplay,
  generateCustomAIContent,
  enrichQuestionWithAI,
  codingAssistant,
  generateSalaryPrediction
};
