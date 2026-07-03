const geminiService = require('../services/geminiService');

exports.runTool = async (req, res, next) => {
  try {
    const { tool } = req.params;
    const inputs = req.body;

    let prompt = '';
    switch (tool) {
      case 'resume-reviewer': {
        const { resumeText } = inputs;
        if (!resumeText) {
          return res.status(400).json({ success: false, message: 'Resume text content is required.' });
        }
        prompt = `You are a professional resume reviewer. Review the following resume text details.
Resume Text:
"${resumeText}"

Provide a detailed section-by-section formatting and layout review in JSON format containing:
1. "visualScore": Rating from 0 to 100
2. "formattingFeedback": Array of formatting and spacing suggestions
3. "sectionReviews": Object containing reviews for:
   - "summary": Review comments
   - "experience": Review comments
   - "projects": Review comments
   - "skills": Review comments
   - "education": Review comments
4. "actionPlan": List of top 3 immediate improvements to make.

Return only valid JSON.`;
        break;
      }

      case 'ats-checker': {
        const { resumeText, jobDescription } = inputs;
        if (!resumeText || !jobDescription) {
          return res.status(400).json({ success: false, message: 'Both resume text and job description are required.' });
        }
        prompt = `You are an expert recruiter. Compare the candidate's resume text with the target job description.
Resume Text:
"${resumeText}"
Job Description:
"${jobDescription}"

Provide a detailed ATS compliance report in JSON format containing:
1. "atsScore": Rating from 0 to 100
2. "matchPercentage": Rating from 0 to 100
3. "matchedKeywords": Array of matching technical keywords/skills
4. "missingKeywords": Array of missing technical keywords/skills that are in the Job Description
5. "recommendations": Array of layout/text changes to rank higher in Applicant Tracking Systems.

Return only valid JSON.`;
        break;
      }

      case 'cover-letter': {
        const { resumeText, companyName, jobRole } = inputs;
        if (!resumeText) {
          return res.status(400).json({ success: false, message: 'Resume text content is required.' });
        }
        prompt = `You are a professional cover letter writer. Draft a professional, compelling cover letter based on this candidate's resume.
Company: "${companyName || 'Target Company'}"
Role: "${jobRole || 'Software Engineer'}"
Candidate Resume Content:
"${resumeText}"

Provide a JSON object containing:
1. "subjectLine": Standard professional subject line
2. "salutation": Professional salutation
3. "body": HTML-formatted string (use <p> tags for paragraphs) of the letter body
4. "signOff": Professional closing signature

Return only valid JSON.`;
        break;
      }

      case 'hr-generator': {
        const { jobRole, companyName, experience } = inputs;
        prompt = `Generate a set of 5 custom HR and cultural fit interview questions for a candidate.
Job Role: "${jobRole || 'Software Engineer'}"
Company: "${companyName || 'Target Company'}"
Experience Level: "${experience || 'Entry level'}"

Provide a JSON array of objects, each object containing:
1. "question": The HR question string
2. "intent": What the interviewer is evaluating behind this question
3. "tips": Structural advice on how to build a strong answer.

Return only valid JSON.`;
        fallbackData = [
          {
            question: `Why do you want to work at ${companyName || 'this company'} specifically?`,
            intent: 'Evaluating company research, core interest, and long-term retention goals.',
            tips: 'Align their recent product launches or cultural values with your personal growth timeline.'
          },
          {
            question: 'Tell me about a time you had a technical disagreement with a team member. How did you resolve it?',
            intent: 'Testing collaboration skills, empathy, and professional conflict management.',
            tips: 'Use the STAR method, emphasizing active listening and focus on data-driven solutions.'
          },
          {
            question: 'Where do you see yourself in five years?',
            intent: 'Assessing career ambition, growth path, and stability.',
            tips: 'Indicate interest in growing into technical mentorship or architecture roles within the company.'
          },
          {
            question: 'Describe a situation where you had to work under a tight deadline with incomplete requirements.',
            intent: 'Evaluating adaptability, pressure handling, and proactive communication.',
            tips: 'Focus on how you prioritized tasks and communicated progress with product managers.'
          },
          {
            question: 'What is your greatest professional achievement so far?',
            intent: 'Measuring technical passion, pride in outcomes, and performance metrics.',
            tips: 'Highlight a project where you took ownership, and state the exact positive results.'
          }
        ];
        break;
      }

      case 'tech-generator': {
        const { jobRole, category, experience } = inputs;
        prompt = `Generate a set of 5 technical conceptual interview questions for an interview.
Job Role: "${jobRole || 'Software Engineer'}"
Tech Category: "${category || 'General Programming'}"
Experience Level: "${experience || 'Entry level'}"

Provide a JSON array of objects, each object containing:
1. "question": The technical question
2. "topicsCovered": Array of subtopics (e.g. closures, memory leaks)
3. "optimalAnswerSummary": Core key phrases that must be mentioned in a correct answer
4. "tips": Interview strategy suggestions.

Return only valid JSON.`;
        fallbackData = [
          {
            question: `How does the Event Loop handle asynchronous execution in ${category || 'JavaScript'}?`,
            topicsCovered: ['Asynchronous Runtime', 'Call Stack', 'Callback Queue', 'Event Loop'],
            optimalAnswerSummary: 'Call stack, task queue, microtasks, event loop checking stack emptiness, non-blocking execution.',
            tips: 'Draw or explain the flow sequentially: Stack -> Web APIs -> Task Queue -> Stack.'
          },
          {
            question: 'What is the difference between normalization and denormalization in database design?',
            topicsCovered: ['DBMS', 'Relational Schemas', 'Redundancy', 'Query Speed'],
            optimalAnswerSummary: 'Normalization reduces redundancy via relations; denormalization optimizes read speeds by combining records.',
            tips: 'Provide real-world scenarios for both, such as transactional vs reporting write/read loads.'
          },
          {
            question: 'Explain the concept of virtual memory in Operating Systems.',
            topicsCovered: ['Operating System', 'Memory Allocation', 'Paging', 'Swap Space'],
            optimalAnswerSummary: 'Logical address space mapped to physical memory, page table translation, swap partition backup.',
            tips: 'Mention page faults and explain how they occur when data is loaded from disk swap.'
          },
          {
            question: 'How do you prevent SQL Injection vulnerabilities in server applications?',
            topicsCovered: ['Security', 'Backend Web Development', 'Database Queries'],
            optimalAnswerSummary: 'Parameterized queries, prepared statements, input sanitization, ORM usage.',
            tips: 'Demonstrate with a quick code contrast showing bad string concatenation vs secure bindings.'
          },
          {
            question: 'What is the role of key segments inside React reconciliation lists?',
            topicsCovered: ['React', 'Virtual DOM', 'Reconciliation', 'Performance'],
            optimalAnswerSummary: 'Unique identity preservation, element diffing acceleration, state conservation on updates.',
            tips: 'Explain why using array indices as keys can cause bugs in dynamic lists.'
          }
        ];
        break;
      }

      case 'coding-generator': {
        const { difficulty, topic } = inputs;
        prompt = `Generate a coding sandbox challenge for the topic "${topic || 'Arrays'}" and difficulty "${difficulty || 'Medium'}".
Provide a JSON object containing:
1. "title": Problem title
2. "description": Description, input format, output format, examples, constraints
3. "starterCode": JavaScript starter template function
4. "hints": Array of exactly 3 progressive hints (hint 1 is basic direction, hint 2 is data structure tip, hint 3 is optimal time complexity suggestion, WITHOUT showing code)
5. "optimalComplexity": String (e.g. O(N) time, O(1) space).

Return only valid JSON.`;
        break;
      }

      case 'career-coach': {
        const { skills, dreamRole } = inputs;
        const skillsStr = Array.isArray(skills) ? skills.join(', ') : (skills || 'General skills');
        prompt = `You are an AI Career Coach. Suggest professional career progression for a candidate with skills: [${skillsStr}] aiming for target role: "${dreamRole || 'Software Architect'}".

Provide a JSON object containing:
1. "currentAssessment": Evaluation of how close they are to the dream role
2. "salaryTrend": Estimated salary range based on skill combinations (e.g. USD 80k - 120k)
3. "progressionSteps": Array of job titles they should target in order
4. "recommendedCertificates": Array of valuable certifications (e.g. AWS Developer, Scrum Master)
5. "coachAdvice": Overall career advice paragraph.

Return only valid JSON.`;
        break;
      }

      case 'skill-gap': {
        const { currentSkills, targetSkills } = inputs;
        prompt = `Analyze technical skill gaps.
Current Candidate Skills: "${currentSkills || 'React, Node'}"
Target Job Skills: "${targetSkills || 'React, Redux, Docker, AWS, Kubernetes'}"

Provide a skill gap analysis in JSON format containing:
1. "missingSkills": Array of skills present in target but lacking in current
2. "gapSeverity": 'Low' | 'Medium' | 'High'
3. "skillPrioritization": Array of objects each with { "skillName": "string", "importance": "High" | "Medium" | "Low", "learningPlan": "short paragraph" }
4. "remedyActionPlan": Array of top 3 immediate action items.

Return only valid JSON.`;
        break;
      }

      case 'roadmap-generator': {
        const { topic, timelineWeeks } = inputs;
        prompt = `Generate a highly structured week-by-week learning roadmap for "${topic || 'Docker'}" spanning "${timelineWeeks || 4}" weeks.

Provide a JSON object containing:
1. "roadmapTitle": Short roadmap name
2. "weeklyMilestones": Array of objects, each containing:
   - "week": Number
   - "topic": Topic to study
   - "subtopics": Array of subtopics
   - "projectGoal": Small project/exercise to build this week
   - "resources": Array of resource names/links
3. "estimatedTimeCommitment": Suggested study hours per week.

Return only valid JSON.`;
        break;
      }

      case 'keyword-optimizer': {
        const { jobDescription } = inputs;
        if (!jobDescription) {
          return res.status(400).json({ success: false, message: 'Job Description is required.' });
        }
        prompt = `You are an ATS optimization specialist. Analyze the job description and extract high-impact keywords.
Job Description:
"${jobDescription}"

Provide a JSON object containing:
1. "technicalKeywords": Array of tool/framework terms
2. "softSkills": Array of behavioral terms
3. "contextUsage": Array of objects, each containing:
   - "keyword": String
   - "sampleBulletPoint": Example resume bullet point showing how to insert the keyword naturally.

Return only valid JSON.`;
        break;
      }

      case 'jd-analyzer': {
        const { jobDescription } = inputs;
        if (!jobDescription) {
          return res.status(400).json({ success: false, message: 'Job Description text is required.' });
        }
        prompt = `Analyze the target job description to details its core components.
Job Description:
"${jobDescription}"

Provide a analysis in JSON format containing:
1. "coreResponsibilities": Array of responsibilities
2. "primaryStack": Array of key programming languages and frameworks required
3. "niceToHave": Array of preferred but optional tools/experiences
4. "likelyInterviewTopics": Array of technical areas they will test you on.

Return only valid JSON.`;
        break;
      }

      case 'answer-improver': {
        const { question, draftAnswer } = inputs;
        if (!question || !draftAnswer) {
          return res.status(400).json({ success: false, message: 'Both question and draft answer are required.' });
        }
        prompt = `You are a speech coach. Improve the candidate's draft answer for target interview question.
Question: "${question}"
Candidate Draft Answer: "${draftAnswer}"

Provide a JSON object containing:
1. "originalCritique": Evaluation of what is weak or missing in the draft answer
2. "improvedAnswer": A polished, professional, and impactful answer using industry terminology
3. "addedKeywords": Array of high-value terms injected to sound more professional.

Return only valid JSON.`;
        break;
      }

      case 'grammar-checker': {
        const { text } = inputs;
        if (!text) {
          return res.status(400).json({ success: false, message: 'Text content is required.' });
        }
        prompt = `You are a professional editor. Check the spelling, grammar, punctuation, and professional tone of the text.
Text:
"${text}"

Provide a JSON object containing:
1. "hasErrors": Boolean
2. "correctedText": Polished version
3. "correctionsList": Array of objects, each containing:
   - "original": String
   - "corrected": String
   - "reason": Why the change was made.
4. "toneAnalysis": Short comment on tone (e.g. professional, passive).

Return only valid JSON.`;
        break;
      }

      case 'email-generator': {
        const { emailType, companyName, recipientName, userDetails } = inputs;
        prompt = `Draft a professional employment networking email template.
Email Category/Type: "${emailType || 'job-application-follow-up'}"
Company Name: "${companyName || 'Target Company'}"
Recipient Name: "${recipientName || 'Hiring Manager'}"
User Details/Context: "${userDetails || 'Full Stack engineer graduate with React project experience'}"

Provide a JSON object containing:
1. "subject": Subject line option
2. "salutation": Professional salutation
3. "body": String template (use \\n for line breaks)
4. "closing": Standard professional sign-off.

Return only valid JSON.`;
        break;
      }

      case 'study-planner': {
        const { targetCompany, dailyHours, timeWindowWeeks } = inputs;
        prompt = `Generate a detailed study planner for target placement prep.
Target Company: "${targetCompany || 'Google'}"
Daily Available Hours: "${dailyHours || '2'}"
Prep Time Window: "${timeWindowWeeks || '4'} weeks"

Provide a JSON object containing:
1. "plannerTitle": String title
2. "focusTopics": Array of priority areas to study
3. "schedule": Array of objects, each containing:
   - "week": Number
   - "focusArea": String
   - "dailyTasks": Array of strings (representing daily objectives)
4. "weeklyGoal": String of overall weekly milestone objective.

Return only valid JSON.`;
        break;
      }

      default: {
        return res.status(404).json({ success: false, message: 'Unknown AI tool requested.' });
      }
    }

    // Process through Gemini
    const result = await geminiService.generateCustomAIContent({
      prompt,
      isJson: true,
      });

    res.status(200).json({
      success: true,
      data: {
        tool,
        result
      }
    });

  } catch (error) {
    next(error);
  }
};
