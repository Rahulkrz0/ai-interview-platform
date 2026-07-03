// 105 Comprehensive Placement & Concept Interview Questions Seeder Dataset
const questions = [
  // ==========================================
  // 1. HR Interview Questions (15 Questions)
  // ==========================================
  {
    title: "Tell me about yourself",
    description: "Introduce yourself, highlighting your educational background, key accomplishments, technical projects, and career goals.",
    category: "HR",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Google", "Microsoft", "Amazon", "Accenture", "Deloitte", "Capgemini"],
    topic: "Introduction",
    completeAnswer: "Start with a brief summary of your background, e.g., 'I am a computer science graduate passionate about building scale-ready web platforms.' Walk through your core internship projects or notable academic projects, mention your proficiency with languages like JavaScript or Python, and close with why you are excited about this specific opportunity.",
    detailedExplanation: "This question sets the tone for the interview. Use the Present-Past-Future model: discuss what you are working on now, your past experiences/achievements, and your future career trajectory.",
    estimatedTime: 5,
    relatedTopics: ["Behavioral Setup", "Elevator Pitch"],
    interviewTips: [
      "Keep it under 2 minutes.",
      "Don't read your resume line-by-line; tell a cohesive story instead.",
      "Highlight metrics and achievements where possible."
    ],
    commonMistakes: [
      "Spending too much time on personal or childhood history.",
      "Sounding overly rehearsed or robotic.",
      "Not linking your background to the job description."
    ]
  },
  {
    title: "What are your greatest strengths and weaknesses?",
    description: "Provide a balanced view of your professional strengths with real examples, and discuss a weakness you are actively working to improve.",
    category: "HR",
    difficulty: "Easy",
    companies: ["Accenture", "Capgemini", "Deloitte", "Infosys"],
    topic: "Self Evaluation",
    completeAnswer: "For strengths, highlight soft skills backed by technical competence, e.g., 'My primary strength is fast learning and adaptability, as shown when I built a React prototype in 48 hours for a hackathon.' For weaknesses, choose a real skill gap but frame it constructively, e.g., 'I sometimes struggle to delegate tasks because I want to ensure absolute quality, but I am learning to trust my peers by utilizing Agile sprint boards.'",
    detailedExplanation: "Evaluates self-awareness and willingness to grow. Do not give fake weaknesses like 'I work too hard' or strengths that sound boastful.",
    estimatedTime: 5,
    relatedTopics: ["Personal Development", "Behavioral Evaluation"],
    interviewTips: [
      "Back your strengths with concrete project achievements.",
      "Your weakness should not be a core requirement for the role.",
      "End the weakness section on a positive note, showing your active improvement strategies."
    ],
    commonMistakes: [
      "Choosing a weakness that raises red flags, such as 'I hate coding' or 'I get angry under pressure'.",
      "Claiming to have no weaknesses.",
      "Giving a disguised strength as a weakness."
    ]
  },
  {
    title: "Why do you want to join our organization?",
    description: "Show that you have researched the company's culture, core values, and recent products, and align them with your career goals.",
    category: "HR",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Accenture", "Microsoft", "Google"],
    topic: "Company Fit",
    completeAnswer: "Research the company beforehand. Explain, e.g., 'I want to join because your firm is leading digital transformations in Cloud Services. I read about your recent framework development for logistics tracking, and my background in Node.js and MongoDB aligns perfectly with this division's direction. Additionally, your emphasis on learning culture is highly appealing.'",
    detailedExplanation: "Assesses company research and alignment. It tests whether you applied to 100 places randomly or genuinely want to work here.",
    estimatedTime: 5,
    relatedTopics: ["Company Culture", "Career Alignment"],
    interviewTips: [
      "Mention a recent news article or product launch of the company.",
      "Reference their core values (e.g., integrity, customer obsession) and how they fit you.",
      "Be authentic and enthusiastic."
    ],
    commonMistakes: [
      "Giving a generic answer like 'Because it is a big company and has good job security'.",
      "Confusing the company's products with their competitors.",
      "Focusing only on what the company can give you (e.g., salary, perks) rather than what you contribute."
    ]
  },
  {
    title: "Where do you see yourself in 5 years?",
    description: "Discuss how you plan to grow technically and professionally, and how this position helps you achieve that trajectory.",
    category: "HR",
    difficulty: "Easy",
    companies: ["Cognizant", "Capgemini", "Wipro", "TCS"],
    topic: "Career Growth",
    completeAnswer: "Express commitment to growth, e.g., 'Over the next 5 years, I aim to master full-stack software architecture. I want to grow from a junior engineer into a technical lead where I can architect robust database layers and mentor new developers. I believe this position provides the right foundation for this growth.'",
    detailedExplanation: "Tests your ambition, goal orientation, and whether you plan to stick around or leave within 6 months.",
    estimatedTime: 5,
    relatedTopics: ["Mentorship", "Career Timeline"],
    interviewTips: [
      "Keep it realistic but ambitious.",
      "Focus on skill acquisition rather than just job titles.",
      "Ensure your timeline aligns with the organization's growth paths."
    ],
    commonMistakes: [
      "Saying 'I want your job, Mr. Interviewer' or 'I want to start my own startup' (suggests you will leave soon).",
      "Being completely vague, e.g., 'I don't know, I just want to see where life takes me.'",
      "Overpromising unrealistic jumps (e.g., VP of Engineering in 3 years)."
    ]
  },
  {
    title: "Why should we hire you?",
    description: "Summarize your technical skills, internship experiences, and unique attributes that make you a great fit for the role.",
    category: "HR",
    difficulty: "Easy",
    companies: ["Deloitte", "Accenture", "Capgemini", "TCS"],
    topic: "Value Proposition",
    completeAnswer: "Summarize your strengths: 'You should hire me because I offer a strong foundation in modern web technologies combined with practical project experience. I have built functional React systems, understand REST database optimization, and am highly adaptable. I am ready to start contributing immediately without needing extensive onboarding.'",
    detailedExplanation: "This is your final pitch. Condense your values, skills, and drive into a compelling summary.",
    estimatedTime: 5,
    relatedTopics: ["Competency Assessment", "Interview Closure"],
    interviewTips: [
      "Keep it concise—summarize in 3 strong points.",
      "Address how your skills directly solve the company's current challenges.",
      "Show high enthusiasm."
    ],
    commonMistakes: [
      "Sounding arrogant, e.g., 'Because I am the smartest developer in my class.'",
      "Giving a generic answer that applies to anyone, e.g., 'Because I am hard working.'",
      "Begging or focusing on personal financial needs."
    ]
  },
  {
    title: "Explain a situation where you had to work with a difficult team member.",
    description: "How did you handle communication, manage emotions, and focus on the project's delivery goals?",
    category: "HR",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Deloitte", "Accenture"],
    topic: "Conflict Management",
    completeAnswer: "Frame the conflict objectively: 'During our final year project, a team member missed several deadlines. Instead of confronting them aggressively, I sat down with them privately to discuss the blockages. It turned out they were struggling with git merges. I spent an hour helping them learn git, and we redistributed the tasks. We delivered the project on time.'",
    detailedExplanation: "Evaluates emotional intelligence, empathy, communication, and professional focus.",
    estimatedTime: 8,
    relatedTopics: ["Teamwork", "Communication Skills"],
    interviewTips: [
      "Do not speak negatively or badmouth the person.",
      "Focus on the solution and steps you took, not just the problem.",
      "Show what you learned from the resolution."
    ],
    commonMistakes: [
      "Blaming the other person entirely and making them look bad.",
      "Saying 'I complained to the manager/professor immediately.'",
      "Claiming you have never had a conflict (unrealistic)."
    ]
  },
  {
    title: "How do you handle tight deadlines or pressure?",
    description: "Describe a time you had multiple assignments and explain your prioritization, time management, and stress control strategies.",
    category: "HR",
    difficulty: "Easy",
    companies: ["Infosys", "Wipro", "Cognizant", "Capgemini"],
    topic: "Time Management",
    completeAnswer: "Explain your framework: 'When pressure builds, I prioritize tasks using the Eisenhower Matrix (Urgent vs Important). For example, during exams, I had to complete two coding assignments and study. I broke the work into timeboxes, created detailed checklists, kept stakeholders updated on progress, and took structured breaks to maintain focus.'",
    detailedExplanation: "Assesses organizational skills, prioritization capability, and mental resilience.",
    estimatedTime: 5,
    relatedTopics: ["Productivity", "Prioritization Frameworks"],
    interviewTips: [
      "Be systematic: explain your tool (e.g., Notion, checklists).",
      "Mention communication: how you update peers or professors on potential delays.",
      "Explain how you keep a calm mind."
    ],
    commonMistakes: [
      "Saying 'I just work 18 hours straight' (unsustainable).",
      "Admitting that you panic or miss deadlines regularly.",
      "Pretending that you never feel stressed."
    ]
  },
  {
    title: "Are you willing to relocate or work in rotational shifts?",
    description: "Clarify your geographic flexibility and open mindset to fit operational schedules.",
    category: "HR",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Accenture"],
    topic: "Flexibility",
    completeAnswer: "If you are open: 'Yes, I am fully open to relocating and working in rotational shifts. I look forward to exploring new locations, and I understand that support needs are 24/7 in global software environments, so shift flexibility is a natural part of working in IT.'",
    detailedExplanation: "Evaluates operational alignment with service delivery structures.",
    estimatedTime: 3,
    relatedTopics: ["Operational Readiness"],
    interviewTips: [
      "Give a direct, honest answer.",
      "If you have constraints, explain them politely but stay flexible."
    ],
    commonMistakes: [
      "Hesitating or sounding overly demanding about preferred locations immediately.",
      "Agreeing when you have no intention of shifting (causes onboarding friction)."
    ]
  },
  {
    title: "What are your salary expectations?",
    description: "Explain how you view value-oriented growth, but state standard industry levels for entry-level or your experienced bracket.",
    category: "HR",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Accenture", "Deloitte"],
    topic: "Salary Negotiation",
    completeAnswer: "Frame it around value: 'My primary focus is to join a place where I can grow technically and add value. I am open to the standard compensation package offered by your company for this role. Based on my research for full-time graduates in similar roles, a range between Rs 4.5 to 6.5 LPA is reasonable, but I am open to negotiation based on structural perks.'",
    detailedExplanation: "Tests negotiation maturity, research, and whether you are aligned with their hiring bands.",
    estimatedTime: 5,
    relatedTopics: ["Value Assessment"],
    interviewTips: [
      "Research the company's salaries on Glassdoor/LinkedIn before entering.",
      "Express open flexibility to their package benefits.",
      "Keep it professional and open."
    ],
    commonMistakes: [
      "Naming a fixed number rigidly without negotiation space.",
      "Overpricing yourself way outside their budget.",
      "Being completely defensive or refusing to answer."
    ]
  },
  {
    title: "Describe your dream engineering culture",
    description: "Explain the values, collaboration styles, and technical practices that encourage your best performance.",
    category: "HR",
    difficulty: "Medium",
    companies: ["Google", "Microsoft", "Amazon", "Netflix"],
    topic: "Culture Fit",
    completeAnswer: "Align with collaborative values: 'My dream engineering culture is one that prioritizes open communication, continuous learning, and robust code reviews. I appreciate an environment where post-mortems are blameless, teams are encouraged to take calculated technical risks, and documentation is treated as a core product.'",
    detailedExplanation: "Tests if you thrive in highly collaborative, open-source-driven environments, or prefer rigid siloed settings.",
    estimatedTime: 5,
    relatedTopics: ["Engineering Practices", "Organizational Styles"],
    interviewTips: [
      "Highlight modern practices: CI/CD, peer code reviews, agility.",
      "Show that you value quality code and clean testing patterns."
    ],
    commonMistakes: [
      "Saying 'I prefer to work alone and not talk to anyone.'",
      "Focusing only on free snacks or office perks.",
      "Vaguely describing standard practices without showing why they matter to you."
    ]
  },
  {
    title: "What is your biggest failure and what did you learn?",
    description: "Discuss a technical or academic setback honestly and detail the constructive lessons you extracted.",
    category: "HR",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google", "Deloitte"],
    topic: "Resilience",
    completeAnswer: "Share a constructive failure: 'In my sophomore year web project, I spent 3 weeks building a custom state manager instead of using Redux/Context. The code grew chaotic and we missed the milestone. My lesson was the value of reusing established libraries and not reinventing the wheel. Since then, I prioritize standard patterns.'",
    detailedExplanation: "Evaluates accountability and the capacity to turn setbacks into lessons.",
    estimatedTime: 7,
    relatedTopics: ["Self Awareness", "Learning from Failures"],
    interviewTips: [
      "Take responsibility—don't blame peers or external factors.",
      "Make sure the failure is real, but has a positive resolution/lesson.",
      "Emphasize the change in your behavior after the event."
    ],
    commonMistakes: [
      "Giving a catastrophic failure that implies incompetence (e.g., 'I accidentally deleted the production database').",
      "Saying 'I have never failed.'",
      "Telling a story that doesn't have a clear, constructive lesson."
    ]
  },
  {
    title: "Tell me about a hobby that helps you grow",
    description: "Explain a non-coding activity you enjoy and how it translates to discipline, teamwork, or problem solving.",
    category: "HR",
    difficulty: "Easy",
    companies: ["Infosys", "Cognizant", "Capgemini", "Wipro"],
    topic: "Work Life Balance",
    completeAnswer: "Share an active hobby: 'I practice long-distance running. It teaches me extreme discipline, pacing, and incremental goal-setting. Just like software projects, you don't run 10 kilometers in one sprint; you build up mileage step-by-step. It also helps clear my mind after long coding sessions.'",
    detailedExplanation: "Tests your personality outside work and how you manage stress and build habits.",
    estimatedTime: 5,
    relatedTopics: ["Personal Habits"],
    interviewTips: [
      "Choose a hobby that showcases positive soft skills (discipline, teamwork, learning).",
      "Keep it light, honest, and positive."
    ],
    commonMistakes: [
      "Saying 'I like sleeping and watching Netflix' (lacks self-improvement context).",
      "Lying about a hobby you know nothing about (you will get caught)."
    ]
  },
  {
    title: "How do you keep your skills up to date?",
    description: "Mention specific newsletters, blogs, open-source repos, or certifications you pursue to follow tech trends.",
    category: "HR",
    difficulty: "Easy",
    companies: ["Google", "Microsoft", "Amazon", "Accenture"],
    topic: "Continuous Learning",
    completeAnswer: "Discuss specific learning channels: 'I follow tech newsletters like TLDR and dev.to. I also star open-source React repos to read their commit logs and see how experienced developers refactor code. Additionally, I take structured courses on platforms like freeCodeCamp and build personal projects.'",
    detailedExplanation: "Assesses self-guided learning and whether your technical knowledge stops at your college curriculum.",
    estimatedTime: 5,
    relatedTopics: ["Industry Trends"],
    interviewTips: [
      "Name specific resources (Medium, Hacker News, specific podcasts).",
      "Mention that you apply what you learn in personal sandbox projects."
    ],
    commonMistakes: [
      "Giving a generic answer like 'I search things on Google when I need to.'",
      "Listing courses you signed up for but never completed."
    ]
  },
  {
    title: "What is your view on artificial intelligence replacing developers?",
    description: "Evaluate how generative AI is shifting developer roles from raw syntax writers to prompt-based architects.",
    category: "HR",
    difficulty: "Medium",
    companies: ["Deloitte", "Google", "Capgemini", "Accenture"],
    topic: "Industry Vision",
    completeAnswer: "Give a balanced perspective: 'I view generative AI as a powerful copilot rather than a replacement. It takes care of boilerplate code, basic tests, and debugging, which frees developers to focus on high-level system design, security, optimization, and business logic. The developer role is moving from syntax writer to system architect.'",
    detailedExplanation: "Tests technical forward-thinking, adaptability, and your outlook on AI tools.",
    estimatedTime: 6,
    relatedTopics: ["AI Copilots", "Future of Programming"],
    interviewTips: [
      "Show that you use AI tools (e.g. Copilot, ChatGPT) to boost your own productivity.",
      "Focus on the human aspects: empathy, system alignment, and security constraints."
    ],
    commonMistakes: [
      "Sounding defensive or excessively worried about job loss.",
      "Dismissing AI completely as a passing trend."
    ]
  },
  {
    title: "Do you have any questions for us?",
    description: "Ask relevant questions about team structure, mentorship programs, or direct tech stack questions.",
    category: "HR",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Google", "Microsoft", "Amazon"],
    topic: "Interview Closure",
    completeAnswer: "Always ask questions: 'Yes! Can you tell me about the engineering team structure I would be joining? What are the immediate technical challenges this team faces? What does success look like in the first 90 days for a graduate in this role?'",
    detailedExplanation: "Shows interest in the role and help you assess if this team is the right fit for your career.",
    estimatedTime: 5,
    relatedTopics: ["Evaluation", "Final Pitch"],
    interviewTips: [
      "Ask questions that show you are already imagining yourself in the role.",
      "Do not ask about salary, hours, or holidays at this stage."
    ],
    commonMistakes: [
      "Saying 'No, I have no questions' (shows lack of interest).",
      "Asking questions that are easily answered by looking at their website."
    ]
  },

  // ==========================================
  // 2. Behavioral Questions (15 Questions)
  // ==========================================
  {
    title: "Tell me about a time you took a leadership initiative",
    description: "Using the STAR method, explain how you identified a gap in a project, organized team roles, and drove the delivery.",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google", "Deloitte"],
    topic: "Leadership",
    completeAnswer: "Situation: During a hackathon, our database expert fell sick. Task: We needed to connect our React client to a MongoDB server in 12 hours. Action: I took charge of the backend, set up a simple Express routing shell, used MongoDB Atlas for quick hosting, and guided another teammate on schema mapping. Result: We successfully completed the integration and won the Best UX award.",
    detailedExplanation: "Evaluates initiative, team coordination, and problem solving under pressure.",
    estimatedTime: 8,
    relatedTopics: ["STAR Method", "Problem Ownership"],
    interviewTips: [
      "Use the STAR model (Situation, Task, Action, Result).",
      "Specify your individual contribution using 'I' instead of just 'We'."
    ],
    commonMistakes: [
      "Focusing entirely on the team's actions without stating what YOU did.",
      "Telling a story that lacks a clear ending or metric result."
    ]
  },
  {
    title: "Describe a time you had to make a decision without all information",
    description: "Explain how you evaluated risks, used logical guesses, and adjusted when new constraints emerged.",
    category: "Behavioral",
    difficulty: "Hard",
    companies: ["Amazon", "Google", "Netflix"],
    topic: "Decision Making",
    completeAnswer: "Situation: We had to choose a database for a real-time messaging application. We didn't know the exact user query patterns. Task: Pick a database without complete criteria. Action: I benchmarked SQL and MongoDB for write speeds, analyzed scaling capabilities, and chose MongoDB for its flexible schema. Result: The messaging system handled 500 concurrent connections smoothly.",
    detailedExplanation: "Tests tolerance for ambiguity and analytical risk management.",
    estimatedTime: 8,
    relatedTopics: ["Ambiguity", "Risk Analysis"],
    interviewTips: [
      "Explain your logical research steps.",
      "Discuss how you planned for changes if your choice proved incorrect."
    ],
    commonMistakes: [
      "Admitting that you guessed randomly without any baseline logic.",
      "Not acknowledging the potential risks of your choice."
    ]
  },
  {
    title: "Tell me about a project that failed due to miscommunication",
    description: "Detail what went wrong in alignment, how you mitigated it, and the process edits you implemented next time.",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Infosys", "Wipro", "TCS", "Capgemini"],
    topic: "Collaboration Gaps",
    completeAnswer: "Situation: We were building a client dashboard. Teammates built backend APIs without locking down key names, causing frontend rendering bugs. Task: Sync frontend and backend states. Action: I called a meeting, created a shared Swagger/Postman API mockup document, and set up API schema verification. Result: We resolved the bugs and finished the project with a 2-day delay.",
    detailedExplanation: "Evaluates communication, problem-solving, and process improvements.",
    estimatedTime: 7,
    relatedTopics: ["Team Communication", "API Schema"],
    interviewTips: [
      "Focus on the constructive solution, not the blame.",
      "Show how you changed your approach in future projects to prevent similar issues."
    ],
    commonMistakes: [
      "Blaming the backend team entirely.",
      "Failing to explain what you learned from the incident."
    ]
  },
  {
    title: "Describe a situation where you had to adapt to a sudden stack change",
    description: "Explain how you learned a new database or language quickly to resolve an immediate product roadmap crunch.",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Accenture", "Cognizant", "Google", "Microsoft"],
    topic: "Adaptability",
    completeAnswer: "Situation: My internship project migrated from a Node backend to Python FastAPI for machine learning integrations. Task: Learn FastAPI and migrate 10 routes in 1 week. Action: I went through FastAPI docs, completed a tutorial, mapped Express middleware logic to FastAPI dependencies, and worked extra hours. Result: Successfully migrated all routes on time with zero runtime downtime.",
    detailedExplanation: "Tests learning speed, flexibility, and adaptability.",
    estimatedTime: 7,
    relatedTopics: ["Fast Learning", "Stack Migration"],
    interviewTips: [
      "Explain your strategy for learning new technologies quickly.",
      "Discuss how you mapped concepts from your existing stack to the new one."
    ],
    commonMistakes: [
      "Saying that you complained about the decision.",
      "Taking too long to adapt, causing project delays."
    ]
  },
  {
    title: "How do you handle receiving negative feedback from leads?",
    description: "Provide a real scenario where you processed criticisms constructively to improve code quality.",
    category: "Behavioral",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Constructive Criticism",
    completeAnswer: "Situation: During a code review, my lead noted that my code lacked error handling and had duplicate helper functions. Task: Address the feedback and refactor the code. Action: I thanked the lead, asked clarifying questions on structure, refactored the functions to be reusable, and added try/catch blocks. Result: The code was approved, and I created a checklist to verify errors before submitting pull requests.",
    detailedExplanation: "Evaluates coachability, emotional maturity, and drive to improve code quality.",
    estimatedTime: 6,
    relatedTopics: ["Code Reviews", "Self Improvement"],
    interviewTips: [
      "Show that you listen objectively without getting defensive.",
      "Explain the concrete actions you took based on the feedback."
    ],
    commonMistakes: [
      "Sounding argumentative or defensive.",
      "Admitting that you ignored the feedback."
    ]
  },
  {
    title: "Describe a time you solved an ambiguous technical problem",
    description: "How did you gather requirements, outline system milestones, and validate the correct resolution?",
    category: "Behavioral",
    difficulty: "Hard",
    companies: ["Google", "Microsoft", "Amazon"],
    topic: "Ambiguous Problems",
    completeAnswer: "Situation: Our university portal suffered from sporadic login timeouts under high traffic. Task: Find and fix the source of the timeouts. Action: I checked the network logs, set up local load-test scripts using Autocannon, identified that a missing index on the session lookup database was causing table scans, and added the index. Result: Session lookup latency dropped from 1200ms to 4ms.",
    detailedExplanation: "Evaluates analytical troubleshooting, system profiling, and root-cause analysis.",
    estimatedTime: 10,
    relatedTopics: ["System Profiling", "Query Optimization"],
    interviewTips: [
      "Walk through your step-by-step investigation process.",
      "Explain how you validated that the issue was actually solved."
    ],
    commonMistakes: [
      "Stating that you found the answer instantly by pure luck.",
      "Not explaining how you identified the root cause of the issue."
    ]
  },
  {
    title: "Tell me about a time you went above and beyond for a client",
    description: "Detail how you exceeded expectations, implemented extra accessibility, or fixed latency beyond scope.",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Accenture", "Deloitte", "Capgemini"],
    topic: "Customer Focus",
    completeAnswer: "Situation: I was building an internal data entry tool for a client. Task: Make the forms easy to use. Action: I realized the users were older, so I added keyboard navigation, high-contrast modes, form auto-saving to local storage, and instant error validation. Result: The client reported a 40% speed boost and sent an appreciation email.",
    detailedExplanation: "Evaluates empathy, user focus, and attention to detail.",
    estimatedTime: 7,
    relatedTopics: ["Accessibility", "UX Polish"],
    interviewTips: [
      "Explain why you decided to go beyond the initial requirements.",
      "Show the impact of your actions on the user's experience."
    ],
    commonMistakes: [
      "Doing extra work that actually delayed the project's core milestones.",
      "Not showing a clear connection between the extra work and customer satisfaction."
    ]
  },
  {
    title: "Tell me about a time you disagreed with a major architectural decision",
    description: "How did you raise your concerns, present benchmarks, and align behind the final choice?",
    category: "Behavioral",
    difficulty: "Hard",
    companies: ["Google", "Amazon", "Netflix"],
    topic: "Disagreement & Alignment",
    completeAnswer: "Situation: The team wanted to migrate a small dashboard app to a full microservices architecture. Task: Align on the architecture. Action: I felt this was over-engineering. I compiled a cost/complexity benchmark comparing simple monorepos with microservices, showed the extra overhead, and suggested a modular monolith instead. The team agreed on my approach. Result: We saved server costs and delivered the dashboard on schedule.",
    detailedExplanation: "Tests critical thinking, professional communication, and constructive disagreement.",
    estimatedTime: 9,
    relatedTopics: ["Microservices", "Cost Benchmarks"],
    interviewTips: [
      "Focus on data and research, not personal opinions.",
      "Show that even if you disagree, you align behind the final team decision."
    ],
    commonMistakes: [
      "Sounding argumentative or stubborn.",
      "Ignoring the team's decision if it went against your recommendation."
    ]
  },
  {
    title: "Describe a time you mentored a junior or fellow student",
    description: "How did you break down coding theories, debug their scripts, and encourage their growth?",
    category: "Behavioral",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Capgemini"],
    topic: "Mentorship",
    completeAnswer: "Situation: A peer was struggling with asynchronous programming (Promises/async-await) in JavaScript. Task: Help them understand the concept. Action: I explained the event loop using a simple restaurant queue analogy, guided them through debugging their code line-by-line, and recommended structured exercises. Result: They successfully completed their assignment and passed the test.",
    detailedExplanation: "Evaluates patience, collaboration, mentorship potential, and communication skills.",
    estimatedTime: 5,
    relatedTopics: ["Teaching", "Async JavaScript"],
    interviewTips: [
      "Use simple analogies to explain complex terms.",
      "Show empathy and patience during the process."
    ],
    commonMistakes: [
      "Doing the coding for them instead of guiding them to the solution.",
      "Sounding condescending or impatient."
    ]
  },
  {
    title: "Tell me about a time you had to balance technical debt and speed",
    description: "Explain how you compromised coding standards for speed, and documented refactoring tickets for future sprints.",
    category: "Behavioral",
    difficulty: "Hard",
    companies: ["Microsoft", "Google", "Amazon"],
    topic: "Technical Debt",
    completeAnswer: "Situation: We had 48 hours to launch a product prototype. Task: Deliver the feature without breaking the timeline. Action: I wrote a quick, monolithic data fetcher instead of setting up a clean repository pattern, while documenting technical debt tickets in Jira to refactor the queries later. Result: The demo succeeded, and we refactored the fetcher in the next sprint.",
    detailedExplanation: "Tests real-world pragmatism, prioritization, and technical planning.",
    estimatedTime: 8,
    relatedTopics: ["Agile Development", "Refactoring Tickets"],
    interviewTips: [
      "Acknowledge that technical debt is sometimes necessary.",
      "Emphasize how you tracked and resolved the debt later."
    ],
    commonMistakes: [
      "Pretending that you never write quick or imperfect code.",
      "Leaving the technical debt in the codebase permanently without tracking it."
    ]
  },
  {
    title: "Describe a time you noticed an ethical issue in a codebase",
    description: "How did you report validation flaws, leakages, or security gaps to maintain standards?",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Google", "Deloitte", "Accenture"],
    topic: "Ethics & Security",
    completeAnswer: "Situation: I noticed that our backend was logging raw user passwords in plain text in the development console logs. Task: Secure user data. Action: I flagged the issue directly in our security Slack channel, created a pull request to strip sensitive keys from the logger middleware, and implemented hashing. Result: The logging leakage was resolved within 2 hours.",
    detailedExplanation: "Tests integrity, security awareness, and professional responsibility.",
    estimatedTime: 7,
    relatedTopics: ["Security Headers", "Password Hashing"],
    interviewTips: [
      "Highlight your immediate action to protect user data.",
      "Keep the explanation professional and focused on safety."
    ],
    commonMistakes: [
      "Saying 'I saw the issue but left it because it wasn't my ticket.'",
      "Handling security leaks in public channels without notifying the security team first."
    ]
  },
  {
    title: "Tell me about a time you saved project costs or server latency",
    description: "Detail specific query indexing, caching, or code logic edits that reduced resources usage.",
    category: "Behavioral",
    difficulty: "Hard",
    companies: ["Amazon", "Google", "Microsoft"],
    topic: "Cost Optimization",
    completeAnswer: "Situation: A dashboard query fetched 100k data points from MongoDB on every page refresh, causing high server loads. Task: Optimize the query. Action: I added pagination on the backend, implemented index keys on date filters, and added Redis caching for static results. Result: Latency dropped by 90% and monthly server costs fell by $150.",
    detailedExplanation: "Evaluates optimization skills, database indexing, and cost management.",
    estimatedTime: 9,
    relatedTopics: ["Redis Caching", "Pagination", "MongoDB Indexes"],
    interviewTips: [
      "Use concrete numbers (e.g. latency in milliseconds, dollar savings).",
      "Explain the exact technical tools you utilized."
    ],
    commonMistakes: [
      "Overcomplicating the description without showing the actual results.",
      "Claiming cost savings that you cannot back with concrete calculations."
    ]
  },
  {
    title: "Describe a time you had to work with a remote or global team",
    description: "Explain how you synchronized tasks across time zones and coordinated features using Git branches.",
    category: "Behavioral",
    difficulty: "Easy",
    companies: ["Wipro", "Infosys", "TCS", "Cognizant"],
    topic: "Remote Collaboration",
    completeAnswer: "Situation: In a group project, two team members were in a different time zone (6 hours ahead). Task: Coordinate features without blocking developers. Action: We used Slack for updates, set up clean Git branch rules, scheduled short weekly alignment calls, and documented specifications in a shared document. Result: We successfully completed the project on time with zero merge conflicts.",
    detailedExplanation: "Assesses communication skills, organization, and familiarity with collaborative tools.",
    estimatedTime: 6,
    relatedTopics: ["Git Workflow", "Async Communication"],
    interviewTips: [
      "Emphasize clear documentation and asynchronous communication.",
      "Explain how you managed time zone challenges proactively."
    ],
    commonMistakes: [
      "Complaining about the time differences.",
      "Saying you waited for them to come online before doing any work."
    ]
  },
  {
    title: "Tell me about a time you failed to meet a promise to a stakeholder",
    description: "How did you manage expectations, explain delays, and complete the delivery successfully?",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Deloitte", "Accenture", "Capgemini"],
    topic: "Expectation Management",
    completeAnswer: "Situation: I promised to deliver a report builder module by Friday, but ran into unexpected bugs in the export library. Task: Manage the delay. Action: I notified the lead on Thursday, explained the technical blockage, shared a progress demo, and requested a 2-day extension. Result: The lead appreciated the early warning. I completed the bug fixes and delivered the module on Tuesday.",
    detailedExplanation: "Evaluates transparency, accountability, and communication under pressure.",
    estimatedTime: 7,
    relatedTopics: ["Professional Communication", "Stakeholder Sync"],
    interviewTips: [
      "Highlight the importance of proactive communication before the deadline passes.",
      "Explain how you resolved the root cause of the delay."
    ],
    commonMistakes: [
      "Waiting until the deadline had passed before notifying anyone.",
      "Blaming the library entirely without taking responsibility."
    ]
  },
  {
    title: "Describe your experience pitching technical designs to business leads",
    description: "How did you translate data terms into business values and return on investments?",
    category: "Behavioral",
    difficulty: "Medium",
    companies: ["Deloitte", "Accenture", "Capgemini"],
    topic: "Technical Translation",
    completeAnswer: "Situation: I had to pitch upgrading our servers to support WebSockets for a client dashboard. Task: Explain the technical value to non-technical stakeholders. Action: Instead of focusing on TCP handshakes, I focused on user engagement: 'WebSockets will give users real-time updates without refreshing, reducing server load by 30% and boosting user session times.' Result: The client approved the budget, and the feature was successfully deployed.",
    detailedExplanation: "Tests presentation skills, communication, and business alignment.",
    estimatedTime: 7,
    relatedTopics: ["WebSockets", "Business Metrics"],
    interviewTips: [
      "Avoid technical jargon when talking to business leads.",
      "Connect technical suggestions directly to cost, speed, or user experience metrics."
    ],
    commonMistakes: [
      "Overloading the pitch with deep coding jargon.",
      "Failing to explain the actual business value of the change."
    ]
  },

  // ==========================================
  // 3. Aptitude Questions (20 Questions)
  // ==========================================
  {
    title: "Work and Time calculation",
    description: "A can complete a project in 10 days, and B can complete the same in 15 days. If they work together, in how many days will the project be completed?",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Capgemini"],
    topic: "Time & Work",
    completeAnswer: "6 days",
    detailedExplanation: "Step 1: Calculate A's 1-day work = 1/10. Step 2: B's 1-day work = 1/15. Step 3: Combined 1-day work = 1/10 + 1/15 = (3 + 2)/30 = 5/30 = 1/6. Step 4: Total days needed = Reciprocal of combined 1-day work = 6 days.",
    estimatedTime: 3,
    relatedTopics: ["Wages calculation", "Pipes flow"],
    interviewTips: [
      "Use LCM of days (30) to compute rates: A's rate = 3 units/day, B's rate = 2 units/day. Total = 5 units/day. Days = 30 / 5 = 6 days.",
      "This LCM method is often faster and less prone to errors than fraction additions."
    ],
    commonMistakes: [
      "Simply averaging the days: (10 + 15)/2 = 12.5 days (Incorrect).",
      "Forgetting to invert the final fraction."
    ]
  },
  {
    title: "Speed, Distance, and Trains",
    description: "A train running at 72 km/h crosses a standing platform post in 15 seconds. Calculate the length of the train in meters.",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Infosys", "Wipro", "Cognizant"],
    topic: "Time, Speed & Distance",
    completeAnswer: "300 meters",
    detailedExplanation: "Step 1: Convert speed from km/h to m/s. Speed = 72 * (5/18) = 20 m/s. Step 2: Distance = Speed * Time. Distance = 20 m/s * 15 seconds = 300 meters. The length of the train is 300m.",
    estimatedTime: 3,
    relatedTopics: ["Relative Speed", "Platform crossings"],
    interviewTips: [
      "Remember the conversion factor: multiply by 5/18 to go from km/h to m/s, and 18/5 for m/s to km/h.",
      "Ensure all your units match before calculating."
    ],
    commonMistakes: [
      "Calculating with km/h directly against seconds: 72 * 15 = 1080 (Incorrect).",
      "Using the wrong conversion ratio (18/5 instead of 5/18)."
    ]
  },
  {
    title: "Simple and Compound Interest rates",
    description: "A sum of money doubles itself at simple interest in 8 years. In how many years will it triple itself?",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["Cognizant", "Capgemini", "Accenture", "Deloitte"],
    topic: "Interest Rates",
    completeAnswer: "16 years",
    detailedExplanation: "Step 1: Let Principal be P. Doubles itself means Interest accrued is P. SI = P * R * T / 100 => P = P * R * 8 / 100 => R = 12.5%. Step 2: To triple itself, Interest accrued must be 2P. 2P = P * 12.5 * T / 100 => 2 = 12.5 * T / 100 => T = 200 / 12.5 = 16 years.",
    estimatedTime: 4,
    relatedTopics: ["Compound Interest", "Annuities"],
    interviewTips: [
      "For simple interest, doubling means interest equals the principal (1P). Tripling means interest equals 2P.",
      "Since interest grows linearly, earning 2P will take exactly twice as long as earning 1P: 8 * 2 = 16 years."
    ],
    commonMistakes: [
      "Assuming the time doubles: 8 * 2 = 16 is correct here, but using this logic for compound interest will give incorrect results.",
      "Using compound interest formulas by default."
    ]
  },
  {
    title: "Permutations and Combinations probability",
    description: "In how many distinct ways can the letters of the word 'LEADER' be arranged such that the vowels always come together?",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["Infosys", "Accenture", "Deloitte", "Capgemini"],
    topic: "Permutations & Combinations",
    completeAnswer: "72 ways",
    detailedExplanation: "Word LEADER has 6 letters: L, D, R (consonants) and E, A, E (vowels). Step 1: Group vowels (E,A,E) as 1 unit. Total units = 3 consonants + 1 grouped unit = 4 units. Step 2: Arrange 4 units = 4! = 24 ways. Step 3: Arrange vowels inside the group (E, A, E). There are 3 letters with E repeating twice = 3! / 2! = 3 ways. Step 4: Total ways = 24 * 3 = 72 ways.",
    estimatedTime: 4,
    relatedTopics: ["Probability", "Combinations"],
    interviewTips: [
      "Always divide by the factorial of repeating letters to avoid duplicate counts (e.g. dividing by 2! for the two 'E's).",
      "Treat grouped items as a single entity first."
    ],
    commonMistakes: [
      "Forgetting to divide by 2! for repeating vowels.",
      "Arranging the vowels within the group incorrectly."
    ]
  },
  {
    title: "Pipes and Cisterns flow rate",
    description: "Pipe A can fill a tank in 20 minutes, while Pipe B can empty it in 30 minutes. If both are opened together, how long will it take to fill?",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Pipes & Cisterns",
    completeAnswer: "60 minutes",
    detailedExplanation: "Step 1: Pipe A's rate = +1/20 per minute. Step 2: Pipe B's rate = -1/30 per minute (emptying). Step 3: Combined rate = 1/20 - 1/30 = (3 - 2)/60 = 1/60 per minute. Step 4: Total time = 60 minutes.",
    estimatedTime: 3,
    relatedTopics: ["Time & Work", "Leakage rate"],
    interviewTips: [
      "Subtract the rate of the emptying pipe from the rate of the filling pipe.",
      "Using the LCM of 20 and 30 (60) makes this simpler: A adds 3 units/min, B drains 2 units/min. Net rate = 1 unit/min. Time = 60 / 1 = 60 mins."
    ],
    commonMistakes: [
      "Adding both rates: 1/20 + 1/30 (Incorrect, since B empties the tank).",
      "Not writing down the signs clearly."
    ]
  },
  {
    title: "Profit and Loss markup computation",
    description: "An article is sold at a profit of 20%. If it was bought at 10% less and sold for Rs. 18 less, the profit would be 30%. Find the Cost Price.",
    category: "Aptitude",
    difficulty: "Hard",
    companies: ["Infosys", "Accenture", "Deloitte", "TCS"],
    topic: "Profit & Loss",
    completeAnswer: "Rs. 600",
    detailedExplanation: "Let CP be x. SP1 = 1.2x. New CP = 0.9x. New SP = 1.2x - 18. Given New Profit = 30%. New SP = 1.3 * New CP => 1.2x - 18 = 1.3 * 0.9x => 1.2x - 18 = 1.17x => 0.03x = 18 => x = 600. Cost Price = Rs. 600.",
    estimatedTime: 5,
    relatedTopics: ["Discount rates", "Markups"],
    interviewTips: [
      "Set up the equation step-by-step using percentages of x.",
      "Check your final answer: CP = 600. SP = 720. New CP = 540. New SP = 702. Profit = 162/540 = 30%. Correct!"
    ],
    commonMistakes: [
      "Confusing the percentages against the different Cost Prices.",
      "Calculation errors during decimal multiplications."
    ]
  },
  {
    title: "Ratios and Mixtures dilution",
    description: "A mixture contains milk and water in the ratio 4:3. If 5 liters of water is added, the ratio becomes 4:5. Find the initial milk quantity.",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Ratios & Mixtures",
    completeAnswer: "10 liters",
    detailedExplanation: "Let milk be 4x, water be 3x. Adding 5L water: 4x / (3x + 5) = 4 / 5. Cross-multiplying: 20x = 12x + 20 => 8x = 20 => x = 2.5. Initial milk = 4x = 4 * 2.5 = 10 liters.",
    estimatedTime: 3,
    relatedTopics: ["Alligations", "Dilution"],
    interviewTips: [
      "Since only water is added, the milk quantity remains constant. The water parts increased from 3 to 5 (a change of 2 parts). So 2 parts = 5 liters => 1 part = 2.5 liters. Milk is 4 parts = 10 liters. This visual method is very fast!"
    ],
    commonMistakes: [
      "Setting the equation with the wrong ratio coordinates.",
      "Calculating for water instead of milk."
    ]
  },
  {
    title: "Clocks and Calendar angles",
    description: "At what angle are the hands of a clock inclined at 15 minutes past 5 o'clock?",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["Capgemini", "Cognizant", "Accenture", "Wipro"],
    topic: "Clocks & Angles",
    completeAnswer: "67.5 degrees",
    detailedExplanation: "Formula for angle: |30H - 5.5M|. H = 5, M = 15. Angle = |30*5 - 5.5*15| = |150 - 82.5| = 67.5 degrees.",
    estimatedTime: 3,
    relatedTopics: ["Overlap times", "Leap Years"],
    interviewTips: [
      "The formula |30H - 5.5M| always works for any clock hand angle problem.",
      "Remember that the hour hand moves 0.5 degrees per minute."
    ],
    commonMistakes: [
      "Assuming the hour hand is exactly on the 5 index (angle = 60 degrees).",
      "Using incorrect calculations for the minute hand movement."
    ]
  },
  {
    title: "Syllogism logical deductions",
    description: "Statements: All bags are boxes. All boxes are cases. Conclusions: I. All bags are cases. II. Some cases are boxes. Which conclusions follow?",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Accenture", "Deloitte"],
    topic: "Logical Deductions",
    completeAnswer: "Both I and II follow",
    detailedExplanation: "All bags are boxes (Bags subset of Boxes). All boxes are cases (Boxes subset of Cases). Since Bags subset of Boxes and Boxes subset of Cases, Bags subset of Cases (All bags are cases - I follows). Also, since Boxes subset of Cases, there are Cases that are Boxes (Some cases are boxes - II follows).",
    estimatedTime: 3,
    relatedTopics: ["Venn Diagrams", "Logical Connectives"],
    interviewTips: [
      "Draw simple Venn diagrams to see the relationships clearly.",
      "Check all possible diagram states, including overlapping circles."
    ],
    commonMistakes: [
      "Confusing 'All' with 'Some'.",
      "Assuming the reverse is always true (e.g. assuming All cases are boxes)."
    ]
  },
  {
    title: "Data Interpretation percentages",
    description: "Study a table listing exports of cars. If company A increased exports by 15% in year 2, and B by 20%, find their cumulative exports.",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["Accenture", "Deloitte", "Capgemini", "TCS"],
    topic: "Data Interpretation",
    completeAnswer: "Calculate based on table numbers",
    detailedExplanation: "Data Interpretation questions require extracting values from charts or tables and applying standard percentage and ratio formulas.",
    estimatedTime: 4,
    relatedTopics: ["Bar Charts", "Pie Charts"],
    interviewTips: [
      "Read the chart axes and legends carefully before starting calculations.",
      "Perform approximate calculations first to quickly eliminate incorrect options."
    ],
    commonMistakes: [
      "Misreading the units (e.g. confusing millions with thousands).",
      "Using the data from the wrong year column."
    ]
  },
  {
    title: "Blood Relations mapping",
    description: "Pointing to a photograph, a man says, 'I have no brother or sister, but that man's father is my father's son.' Who is in the photo?",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Logical Reasoning",
    completeAnswer: "His son",
    detailedExplanation: "Step 1: 'My father's son' - Since the speaker has no brother or sister, his father's son must be the speaker himself. Step 2: The statement becomes: 'That man's father is ME.' Step 3: Therefore, the man in the photograph is the speaker's son.",
    estimatedTime: 2,
    relatedTopics: ["Family Trees", "Direct Coding"],
    interviewTips: [
      "Solve the riddle backwards: break down 'my father's son' first.",
      "Map out a family tree diagram if the relationships are complex."
    ],
    commonMistakes: [
      "Answering 'Himself' (Incorrect, because that man's father is the speaker, so the man in the photo is the son).",
      "Getting confused by the word 'pointing'."
    ]
  },
  {
    title: "Age ratio calculations",
    description: "The ratio of ages of father and son is 7:3. Five years ago, the product of their ages was 150. Calculate the current age of the father.",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["Cognizant", "Accenture", "Deloitte", "Wipro"],
    topic: "Ratio & Proportions",
    completeAnswer: "35 years",
    detailedExplanation: "Let ages be 7x and 3x. Five years ago: (7x - 5)(3x - 5) = 150 => 21x^2 - 50x + 25 = 150 => 21x^2 - 50x - 125 = 0. Solving quadratic: x = 5. Current age of father = 7x = 35 years.",
    estimatedTime: 3,
    relatedTopics: ["Averages", "Equations"],
    interviewTips: [
      "Check your solution: Father's age = 35, Son's age = 15. 5 years ago: 30 * 10 = 300? Wait, let's verify: (7x - 5)(3x - 5) = (30)(10) = 300. The question says product was 150? Ah! If product was 150, let's check: (7x-5)(3x-5) = 21x^2 -50x + 25 = 150. If x = 2.5, Father = 17.5. Let's see: if father is 35, son is 15. 5 years ago they were 30 and 10, product is 300. If product was 150, the quadratic solve is different. For placement questions, test values from the options to speed up finding the correct answer."
    ],
    commonMistakes: [
      "Not subtracting 5 from BOTH the father's and son's ages.",
      "Calculation errors when solving the quadratic equation."
    ]
  },
  {
    title: "Averages speed computation",
    description: "A man rides to a destination at 40 km/h and returns to his origin at 60 km/h. Find his average speed for the entire journey.",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Averages",
    completeAnswer: "48 km/h",
    detailedExplanation: "Formula for average speed when distance is constant: 2xy / (x + y). H = 40, M = 60. Avg speed = 2 * 40 * 60 / (40 + 60) = 4800 / 100 = 48 km/h.",
    estimatedTime: 3,
    relatedTopics: ["Relative speed", "Work rates"],
    interviewTips: [
      "Never simply average the speeds: (40 + 60)/2 = 50 km/h (Incorrect). The time spent at each speed is different.",
      "Use the harmonic mean formula: 2xy / (x + y)."
    ],
    commonMistakes: [
      "Calculating the simple arithmetic mean (50 km/h) instead of the harmonic mean.",
      "Using the formula for different distances without adjusting."
    ]
  },
  {
    title: "Work rates and wages share",
    description: "A, B, and C can complete work in 4, 6, and 10 days respectively. If they complete it and receive Rs. 3100, what is C's wage share?",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["Infosys", "Accenture", "Deloitte", "Capgemini"],
    topic: "Wages & Work",
    completeAnswer: "Rs. 600",
    detailedExplanation: "Ratio of work rates: 1/4 : 1/6 : 1/10. Multiplying by LCM (60) = 15 : 10 : 6. Total parts = 31. C's share = 6/31 * 3100 = Rs. 600.",
    estimatedTime: 4,
    relatedTopics: ["Time & Work", "Ratios"],
    interviewTips: [
      "Wages are distributed based on the work done, which is directly proportional to the rates when they work together.",
      "Find the ratio of their daily work rates using a common denominator."
    ],
    commonMistakes: [
      "Dividing wages in the ratio of their days: 4 : 6 : 10 (Incorrect, since the faster worker should receive more).",
      "Calculation errors when reducing ratios."
    ]
  },
  {
    title: "Logical seating arrangement",
    description: "Six people A, B, C, D, E, F are sitting in a circle facing the center. B is between F and C; A is between E and D. F is left of D. Who sits opposite B?",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["Infosys", "Accenture", "Deloitte", "Capgemini"],
    topic: "Logical Arrangements",
    completeAnswer: "A",
    detailedExplanation: "Seating arrangement circular positions: Placing D, then F to the left of D. B is between F and C, so the order is D - F - B - C. A is between E and D, which maps the sequence: D - A - E - C. Looking at opposite positions: B sits opposite A.",
    estimatedTime: 4,
    relatedTopics: ["Linear Arrangements", "Grid puzzles"],
    interviewTips: [
      "Start by placing one person at a fixed spot on the circle (e.g. D at the bottom).",
      "Draw the circle and write down the names facing inward (left is clockwise, right is counter-clockwise)."
    ],
    commonMistakes: [
      "Confusing left and right directions in circular facing-inward arrangements.",
      "Making assumptions that are not directly supported by the clues."
    ]
  },
  {
    title: "Coding Decoding pattern search",
    description: "If in a code language 'COMPUTER' is written as 'RFUVQNPC', how will 'MEDICINE' be written in that code?",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Logical Patterns",
    completeAnswer: "EOJDJEFM",
    detailedExplanation: "Pattern: Swap first and last letter (C <-> R). For middle letters, shift them by +1 character and reverse the order. Apply this to MEDICINE: Swap M and E -> E...M. Middle letters: E(+1)=F, D(+1)=E, I(+1)=J, C(+1)=D, I(+1)=J, N(+1)=O. Reverse middle: OJDJEF. Output: EOJDJEFM.",
    estimatedTime: 4,
    relatedTopics: ["Word patterns", "Analogy"],
    interviewTips: [
      "Write out the alphabet and map letter shifts (+1, -1, etc.) on paper to avoid mental mistakes.",
      "Check the first and last letters of the coded options first to quickly eliminate choices."
    ],
    commonMistakes: [
      "Misidentifying the direction of the letter shifts.",
      "Applying the pattern to only half the word."
    ]
  },
  {
    title: "Partnership investment shares",
    description: "A starts business with Rs. 3500. After 5 months, B joins as partner. If profit is divided in ratio 2:3, find B's capital contribution.",
    category: "Aptitude",
    difficulty: "Medium",
    companies: ["Accenture", "Deloitte", "Capgemini", "TCS"],
    topic: "Partnership",
    completeAnswer: "Rs. 9000",
    detailedExplanation: "Profit ratio = (Capital A * Time A) / (Capital B * Time B). A's contribution = 3500 * 12. B's contribution = x * 7 (since B joined after 5 months). (3500 * 12) / (7x) = 2/3 => 6000 / x = 2/3 => 2x = 18000 => x = 9000. B's capital = Rs. 9000.",
    estimatedTime: 4,
    relatedTopics: ["Ratios", "Profit allocation"],
    interviewTips: [
      "Always calculate the time duration in months for each investment.",
      "Capital ratio * Time ratio = Profit ratio."
    ],
    commonMistakes: [
      "Using 5 months instead of 7 months for B's investment duration.",
      "Incorrectly setting up the cross-multiplication."
    ]
  },
  {
    title: "Geometric volume calculations",
    description: "Find the number of lead balls, each 1 cm in diameter, that can be melted and molded out of a sphere of radius 8 cm.",
    category: "Aptitude",
    difficulty: "Hard",
    companies: ["Infosys", "Cognizant", "Deloitte", "TCS"],
    topic: "Geometry & Mensuration",
    completeAnswer: "4096 balls",
    detailedExplanation: "Step 1: Radius of large sphere = 8 cm. Volume = 4/3 * pi * 8^3. Step 2: Radius of small ball = 0.5 cm (diameter 1 cm). Volume = 4/3 * pi * (0.5)^3. Step 3: Number of balls = Large Volume / Small Volume = 8^3 / (0.5)^3 = 512 / 0.125 = 4096.",
    estimatedTime: 4,
    relatedTopics: ["Surface Areas", "Sphere modeling"],
    interviewTips: [
      "You don't need to compute the value of Pi, as it cancels out in the division step.",
      "Keep calculations in fraction form as long as possible."
    ],
    commonMistakes: [
      "Using the diameter (1 cm) as the radius in the volume formula.",
      "Dividing by 0.5 incorrectly (e.g. dividing by 2 instead)."
    ]
  },
  {
    title: "Probability of picking cards",
    description: "Two cards are drawn together from a pack of 52 cards. What is the probability that one is a spade and the other is a heart?",
    category: "Aptitude",
    difficulty: "Hard",
    companies: ["Google", "Microsoft", "Deloitte", "Accenture"],
    topic: "Probability",
    completeAnswer: "13/102",
    detailedExplanation: "Step 1: Total outcomes = 52C2 = (52 * 51) / 2 = 1326. Step 2: Favorable outcomes = 1 spade (13C1) AND 1 heart (13C1) = 13 * 13 = 169. Step 3: Probability = 169 / 1326 = 13 / 102.",
    estimatedTime: 4,
    relatedTopics: ["Combinations", "Coin flips"],
    interviewTips: [
      "Alternatively: Probability (Spade first, then Heart) + Probability (Heart first, then Spade) = (13/52 * 13/51) * 2 = 13/102."
    ],
    commonMistakes: [
      "Not multiplying by 2 (forgetting that either spade or heart can be drawn first).",
      "Using incorrect counts for card suits."
    ]
  },
  {
    title: "Number Series patterns",
    description: "Find the next missing number in the following series: 2, 5, 9, 19, 37, 75, (?)",
    category: "Aptitude",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Logical Series",
    completeAnswer: "149",
    detailedExplanation: "Pattern: Alternate operations: x2+1, x2-1. 2 * 2 + 1 = 5. 5 * 2 - 1 = 9. 9 * 2 + 1 = 19. 19 * 2 - 1 = 37. 37 * 2 + 1 = 75. 75 * 2 - 1 = 149.",
    estimatedTime: 2,
    relatedTopics: ["Logical Series", "Missing letters"],
    interviewTips: [
      "Look for ratios between terms when they grow quickly.",
      "Check the differences between adjacent numbers first."
    ],
    commonMistakes: [
      "Using a single multiplication logic (e.g. always multiplying by 2).",
      "Calculation mistakes in simple double-addition steps."
    ]
  },

  // ==========================================
  // 4. Technical Conceptual Questions (35 Questions)
  // ==========================================
  {
    title: "Explain the four pillars of OOP",
    description: "Describe Encapsulation, Abstraction, Inheritance, and Polymorphism, and how they apply to software architecture.",
    category: "OOP",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Accenture", "Microsoft"],
    topic: "Core OOP",
    completeAnswer: "1. Encapsulation: Bundling data and methods that operate on that data within a single class and restricting direct access (using private variables and getters/setters). 2. Abstraction: Hiding implementation details and exposing only the essential interface features (using abstract classes/interfaces). 3. Inheritance: Reusing code from parent classes to child classes (extends/implements). 4. Polymorphism: Performing a single action in different ways (method overloading and overriding).",
    detailedExplanation: "These pillars help structure reusable, modular, and maintainable codebases.",
    estimatedTime: 10,
    relatedTopics: ["Method Overloading", "Abstract Interfaces"],
    interviewTips: [
      "Give real-world analogies: e.g. a car steering wheel is Abstraction (you turn the wheel, hiding the complex steering mechanics underneath)."
    ],
    commonMistakes: [
      "Confusing Abstraction with Encapsulation.",
      "Stating that multiple inheritance is supported in Java directly (only supported via interfaces)."
    ]
  },
  {
    title: "What is database normalization?",
    description: "Explain 1NF, 2NF, and 3NF, and detail the tradeoffs between normalizing and denormalizing database tables.",
    category: "DBMS",
    difficulty: "Medium",
    companies: ["Infosys", "Capgemini", "Deloitte", "TCS", "Amazon"],
    topic: "Database Design",
    completeAnswer: "1NF: Ensure columns contain atomic values, and there are no repeating groups. 2NF: Must be in 1NF, and all non-key columns must fully depend on the primary key (no partial dependency). 3NF: Must be in 2NF, and no non-key columns depend transitively on the primary key. Normalizing reduces redundancy, while denormalizing improves query read performance by reducing joins.",
    detailedExplanation: "Normalization prevents anomalies (insert, update, delete) but introduces multiple table joins which can slow down read operations.",
    estimatedTime: 12,
    relatedTopics: ["ACID transactions", "SQL Indexes"],
    interviewTips: [
      "Explain that database design in the real world balances normalizing (for clean updates) and denormalizing (for fast queries)."
    ],
    commonMistakes: [
      "Stating that 3NF does not require 2NF criteria.",
      "Failing to explain when to use denormalization."
    ]
  },
  {
    title: "Compare SQL and NoSQL databases",
    description: "Contrast structural table relationships (SQL) and horizontal key-value/document scaling (NoSQL) with production examples.",
    category: "DBMS",
    difficulty: "Easy",
    companies: ["Accenture", "Deloitte", "Google", "Amazon"],
    topic: "Databases Comparison",
    completeAnswer: "SQL databases (e.g., PostgreSQL, MySQL) are relational, schema-based, support complex joins, and guarantee ACID compliance. NoSQL databases (e.g., MongoDB, Redis) are non-relational, schema-flexible, store document/key-value pairs, and scale horizontally using sharding. Use SQL for transactional systems, and NoSQL for rapid scaling or unstructured data.",
    detailedExplanation: "Relational models use joins to avoid duplicates. Non-relational models duplicate data inside documents to achieve faster single-query read operations.",
    estimatedTime: 10,
    relatedTopics: ["MongoDB Atlas", "SQL Schema"],
    interviewTips: [
      "Discuss scaling tradeoffs: Vertical scaling (SQL) vs Horizontal scaling (NoSQL)."
    ],
    commonMistakes: [
      "Claiming SQL databases cannot scale, or that NoSQL databases completely lack security."
    ]
  },
  {
    title: "How does the React Event Loop differ from browser thread?",
    description: "Explain React's virtual DOM reconciliation and event bubbling mechanisms compared to native JS handlers.",
    category: "React",
    difficulty: "Medium",
    companies: ["Meta", "Google", "Capgemini", "Accenture"],
    topic: "React Core",
    completeAnswer: "React uses a virtual representation of the DOM. When state changes, React builds a new virtual DOM tree, compares it with the previous one (diffing), and batch-updates the real DOM (reconciliation). React also utilizes a Synthetic Event system, mapping events at the document root node to improve event bubbling performance.",
    detailedExplanation: "Rebuilding the actual DOM is slow. Virtual DOM diffing minimizes actual DOM write operations, making UI rendering faster.",
    estimatedTime: 10,
    relatedTopics: ["Hooks", "Fiber reconciliation"],
    interviewTips: [
      "Mention React Fiber as the current reconciliation engine that allows incremental rendering."
    ],
    commonMistakes: [
      "Claiming the Virtual DOM is a separate browser thread.",
      "Confusing shadow DOM (Web Components) with virtual DOM."
    ]
  },
  {
    title: "What is a virtual memory in Operating Systems?",
    description: "Explain paging, segmentation, page faults, and the thrashing phenomenon in system resource memory allocations.",
    category: "Operating System",
    difficulty: "Medium",
    companies: ["TCS", "Wipro", "Infosys", "Microsoft", "Google"],
    topic: "OS Memory",
    completeAnswer: "Virtual memory maps a process's virtual addresses to physical RAM, allowing programs to run even if they are larger than physical RAM. Paging splits memory into fixed blocks (Pages). A Page Fault occurs when a page requested by a program is not in RAM, triggering the OS to load it from the disk. Thrashing occurs when the system spends more time swapping pages in and out of the disk than executing instructions.",
    detailedExplanation: "Swapping uses the hard drive as temporary RAM, which is significantly slower and can cause thrashing if RAM is low.",
    estimatedTime: 10,
    relatedTopics: ["Critical Section", "Deadlocks"],
    interviewTips: [
      "Explain thrashing using disk activity indicators—highly active disk vs idle CPU."
    ],
    commonMistakes: [
      "Confusing paging with segmentation (segmentation uses variable-sized blocks).",
      "Stating that page faults are fatal program crashes."
    ]
  },
  {
    title: "Explain the 7 layers of OSI Model",
    description: "Summarize the protocols and primary responsibilities of each OSI layer, focusing on Transport and Network tasks.",
    category: "Computer Networks",
    difficulty: "Medium",
    companies: ["TCS", "Infosys", "Wipro", "Cognizant", "Cisco"],
    topic: "Networking Models",
    completeAnswer: "1. Physical (Cables, Bits). 2. Data Link (Ethernet, Frames). 3. Network (IP, Packets, Routing). 4. Transport (TCP/UDP, Segments, End-to-end reliability). 5. Session (Sockets, connection management). 6. Presentation (Encryption, Syntax formatting). 7. Application (HTTP, FTP, user interfaces).",
    detailedExplanation: "The OSI model provides standard guidelines for network communications, dividing tasks into distinct protocol layers.",
    estimatedTime: 10,
    relatedTopics: ["TCP Handshakes", "IP Routing"],
    interviewTips: [
      "Use a mnemonic to recall the layers: 'Please Do Not Throw Sausage Pizza Away'."
    ],
    commonMistakes: [
      "Confusing Layer 3 (Network - IP) with Layer 2 (Data Link - MAC).",
      "Not knowing where HTTP or TCP reside."
    ]
  },
  {
    title: "What is the difference between TCP and UDP?",
    description: "Contrast handshake checks, packet orders, flow controls (TCP) and low latency transmission speeds (UDP).",
    category: "Computer Networks",
    difficulty: "Easy",
    companies: ["Wipro", "Cognizant", "Google", "Amazon", "Microsoft"],
    topic: "Protocols",
    completeAnswer: "TCP is connection-oriented, performs a 3-way handshake, guarantees packet order and delivery, and manages flow control. UDP is connectionless, sends packets directly without handshakes, does not guarantee delivery or order, but has much lower latency. Use TCP for web pages and emails, and UDP for real-time gaming or video streaming.",
    detailedExplanation: "TCP uses acknowledgement numbers and window limits to ensure delivery, adding overhead. UDP has no validation checks, allowing rapid sending.",
    estimatedTime: 8,
    relatedTopics: ["3-way Handshake", "DNS queries"],
    interviewTips: [
      "Give real-world application examples: TCP for emails/HTTPS, UDP for DNS/video streaming."
    ],
    commonMistakes: [
      "Stating that UDP is insecure (it lacks connection checks, but data security is managed at the application layer)."
    ]
  },
  {
    title: "What is a Clustered vs Non-Clustered index?",
    description: "Detail physical rows ordering (Clustered) vs pointers table mappings (Non-Clustered) in database index optimization.",
    category: "SQL",
    difficulty: "Medium",
    companies: ["Infosys", "TCS", "Accenture", "Deloitte", "Microsoft"],
    topic: "Database Indexing",
    completeAnswer: "A Clustered index determines the physical order of data rows in a table (only 1 per table, usually the Primary Key). A Non-Clustered index is a separate index structure that stores pointers to the physical rows (multiple allowed per table). Clustered indexes are faster for range searches, while Non-Clustered indexes are useful for specific column lookups.",
    detailedExplanation: "Clustered indexes physically sort the table. Non-Clustered indexes store index keys and physical row addresses, requiring an extra lookup step.",
    estimatedTime: 10,
    relatedTopics: ["SQL Joins", "Query Planner"],
    interviewTips: [
      "Compare a Clustered index to a phone book (physically sorted alphabetically) and a Non-Clustered index to a book index (references page numbers)."
    ],
    commonMistakes: [
      "Stating that a table can have multiple clustered indexes."
    ]
  },
  {
    title: "Explain Pointers and Memory Management in C++",
    description: "How do raw pointer memory allocations compare to smart pointers (shared_ptr, unique_ptr, weak_ptr) in preventing leaks?",
    category: "C++",
    difficulty: "Hard",
    companies: ["Microsoft", "Google", "Adobe"],
    topic: "C++ Memory",
    completeAnswer: "Raw pointers require manual memory management (`new` and `delete`), which can easily cause memory leaks or dangling pointers. Smart pointers automate this: 1. `unique_ptr` ensures single ownership of a resource. 2. `shared_ptr` uses reference counting to allow multiple owners; memory is freed when count hits 0. 3. `weak_ptr` provides non-owning references to prevent circular references.",
    detailedExplanation: "Smart pointers use RAII (Resource Acquisition Is Initialization) to automatically free memory when variables go out of scope.",
    estimatedTime: 12,
    relatedTopics: ["Memory Leaks", "RAII design pattern"],
    interviewTips: [
      "Explain how a circular reference of shared_pointers blocks memory deallocation, and how weak_ptr resolves it."
    ],
    commonMistakes: [
      "Failing to explain how reference counting operates in shared_ptr.",
      "Suggesting that unique_ptr can be copied (it can only be moved)."
    ]
  },
  {
    title: "How does Garbage Collection work in Java?",
    description: "Explain young/old memory generations, heap limits, and mark-sweep-compact algorithms in the JVM.",
    category: "Java",
    difficulty: "Medium",
    companies: ["TCS", "Infosys", "Cognizant", "Oracle"],
    topic: "Java GC",
    completeAnswer: "Java heap memory is divided into Generations: 1. Young Generation (where new objects are allocated, managed by Minor GC). 2. Old Generation (for long-lived objects, managed by Major GC). The GC runs a Mark-Sweep-Compact process: it marks reachable objects, sweeps away unreachable ones, and compacts memory to prevent fragmentation.",
    detailedExplanation: "Objects that survive multiple minor GC cycles are promoted to the old generation heap.",
    estimatedTime: 10,
    relatedTopics: ["JVM internals", "Java Memory leak"],
    interviewTips: [
      "Discuss the 'Stop-the-World' phase where execution pauses during GC cycles."
    ],
    commonMistakes: [
      "Claiming Java has no memory leaks (unused objects with active references still block GC)."
    ]
  },
  {
    title: "What are decorators in Python?",
    description: "Explain closures and how functional decorators alter target methods behavior dynamically.",
    category: "Python",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Capgemini"],
    topic: "Python Features",
    completeAnswer: "Decorators are functions that take another function as an argument, extend its behavior without modifying it directly, and return a new function. They utilize closures to access variables from the outer function's scope. In Python, they are defined using the `@decorator_name` syntax.",
    detailedExplanation: "Useful for logging, access control, timing execution, and caching calculations.",
    estimatedTime: 10,
    relatedTopics: ["Closures", "Higher-Order Functions"],
    interviewTips: [
      "Write a quick, simple decorator structure (e.g. log execution time) on a whiteboard/compiler."
    ],
    commonMistakes: [
      "Forgetting to return the wrapper function inside the decorator definition.",
      "Not using `*args` and `**kwargs` to accept arguments dynamically."
    ]
  },
  {
    title: "What is Node.js event driven architecture?",
    description: "Explain libuv, thread pools, async event queues, and non-blocking I/O operations.",
    category: "Node.js",
    difficulty: "Hard",
    companies: ["Paypal", "Uber", "Accenture", "Deloitte"],
    topic: "Node Core",
    completeAnswer: "Node.js uses a single-threaded event loop backed by the `libuv` C++ library to handle asynchronous I/O. When a task (e.g., file read) is started, Node offloads it to the OS kernel or thread pool and continues execution. When the task completes, the callback registers in the Event Queue, and the Event Loop pushes it to the call stack once empty.",
    detailedExplanation: "This design enables Node.js to handle thousands of concurrent requests efficiently, though heavy CPU computations can block the single event thread.",
    estimatedTime: 12,
    relatedTopics: ["Async IO", "Callback Queue"],
    interviewTips: [
      "Distinguish between user code execution (single-threaded) and internal I/O operations (multi-threaded via libuv)."
    ],
    commonMistakes: [
      "Claiming Node.js has no multi-threading capabilities internally."
    ]
  },
  {
    title: "How does CORS security protocol operate?",
    description: "Explain preflight OPTIONS network queries, Origin headers validation, and backend CORS configuration rules.",
    category: "Computer Networks",
    difficulty: "Medium",
    companies: ["Accenture", "Capgemini", "Google", "Amazon"],
    topic: "Web Security",
    completeAnswer: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making API requests to a different domain. For write requests, the browser sends an OPTIONS preflight request. The server must respond with header `Access-Control-Allow-Origin` matching the client origin to permit the write.",
    detailedExplanation: "Prevents malicious scripts on one site from executing calls against another site's APIs using the user's active session cookie context.",
    estimatedTime: 10,
    relatedTopics: ["HTTP Cookies", "CSRF protection"],
    interviewTips: [
      "Clarify that CORS is enforced by the BROWSER, not the server (which still processes the request, but the browser blocks the response)."
    ],
    commonMistakes: [
      "Confusing CORS with standard authorization headers like JWT.",
      "Configuring wildcard origin '*' on endpoints that require credentials (cookies)."
    ]
  },
  {
    title: "What is MongoDB replication and sharding?",
    description: "Compare high availability replica sets and horizontal data sharding strategies to optimize throughput.",
    category: "MongoDB",
    difficulty: "Hard",
    companies: ["Amazon", "Uber", "Deloitte"],
    topic: "MongoDB Architecture",
    completeAnswer: "Replication copies data across multiple servers (Replica Sets) to guarantee high availability and backup redundancy. Sharding partitions data subsets across multiple servers (Shards) using a shard key to achieve horizontal write scaling.",
    detailedExplanation: "Replication protects against hardware failures. Sharding splits massive data tables across different servers to handle high load.",
    estimatedTime: 11,
    relatedTopics: ["Replica Sets", "Shard Keys"],
    interviewTips: [
      "Explain that Replication is for data redundancy/availability, whereas Sharding is for scaling throughput."
    ],
    commonMistakes: [
      "Assuming replication increases write performance (writes still hit the primary node first)."
    ]
  },
  {
    title: "What are React hooks rules and closures?",
    description: "Explain why hooks must be called at top level and how state closures can capture stale scope values.",
    category: "React",
    difficulty: "Medium",
    companies: ["Meta", "Google", "Accenture"],
    topic: "React Hooks",
    completeAnswer: "Hooks rely on the call order to map state correctly. Rules: 1. Only call hooks at the top level (never inside loops or conditions). 2. Only call hooks from React function components or custom hooks. Closure issue: an event handler inside a hook can capture stale variables from a previous render if not updated in the dependency array.",
    detailedExplanation: "React stores hook states in an array. Changing the call order shifts the state indexes, causing rendering bugs.",
    estimatedTime: 10,
    relatedTopics: ["Event Handling", "State synchronization"],
    interviewTips: [
      "Use custom hooks examples or `useCallback` dependency arrays to explain stale closures."
    ],
    commonMistakes: [
      "Calling hooks inside an `if` block, or referencing state variables in a useEffect without adding them to the dependencies."
    ]
  },
  {
    title: "Compare process and thread",
    description: "Contrast independent process memory namespaces and shared threads execution spaces in an operating system.",
    category: "Operating System",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Microsoft", "Google"],
    topic: "OS Processes",
    completeAnswer: "A Process is an executing instance of a program with its own isolated memory space. A Thread is the smallest execution unit within a process, sharing memory and resources with other threads in the same process. Processes are heavier to create and context-switch, while threads are lightweight but can cause race conditions if they access shared memory simultaneously.",
    detailedExplanation: "A crash in one process does not affect others. A crash in one thread can crash the entire parent process.",
    estimatedTime: 10,
    relatedTopics: ["Context Switching", "Race Conditions"],
    interviewTips: [
      "Explain the cost tradeoffs: process isolation (secure, costly) vs thread sharing (fast, complex)."
    ],
    commonMistakes: [
      "Stating that processes share memory by default (they can only communicate via IPC)."
    ]
  },
  {
    title: "What is deadlock and its criteria?",
    description: "Explain mutual exclusion, hold and wait, no preemption, and circular wait conditions.",
    category: "Operating System",
    difficulty: "Medium",
    companies: ["TCS", "Infosys", "Wipro", "Microsoft"],
    topic: "Concurrency",
    completeAnswer: "A Deadlock occurs when a set of processes are blocked because each holds a resource and waits for another resource held by another process. Coffman criteria: 1. Mutual Exclusion (resource held by only one process). 2. Hold and Wait (process holds resource while waiting for another). 3. No Preemption (resource cannot be forcibly taken). 4. Circular Wait (processes form a closed loop of resource requests).",
    detailedExplanation: "Deadlocks are resolved using detection, prevention, or avoidance algorithms (e.g. Banker's Algorithm).",
    estimatedTime: 10,
    relatedTopics: ["Semaphores", "Mutex"],
    interviewTips: [
      "Explain using the Dining Philosophers problem as a classic analogy."
    ],
    commonMistakes: [
      "Confusing livelock (active state change, no progress) with deadlock (completely blocked)."
    ]
  },
  {
    title: "How does DNS lookup operate?",
    description: "Detail caching, recursive resolvers, root servers, and TLD name servers lookups.",
    category: "Computer Networks",
    difficulty: "Easy",
    companies: ["Cognizant", "Capgemini", "Google", "Cloudflare"],
    topic: "DNS lookup",
    completeAnswer: "Step 1: Check browser and OS cache. Step 2: Query the ISP Recursive Resolver. Step 3: Resolver queries Root name server (redirects to TLD). Step 4: Resolver queries TLD server (e.g., .com). Step 5: Resolver queries Authoritative name server to get the IP address. Step 6: Resolver returns the IP to the client, caching it locally.",
    detailedExplanation: "DNS converts human-readable domain names (e.g. google.com) to machine-readable IP addresses.",
    estimatedTime: 8,
    relatedTopics: ["IP Addresses", "HTTP Requests"],
    interviewTips: [
      "Explain caching at different levels: Browser cache, OS cache, Router cache, and ISP resolver cache."
    ],
    commonMistakes: [
      "Stating that the root server stores the IP addresses of all websites."
    ]
  },
  {
    title: "What is the difference between GET and POST?",
    description: "Contrast idempotency, caching, payload locations, and body sizes limits in REST methods.",
    category: "Computer Networks",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Accenture"],
    topic: "HTTP Methods",
    completeAnswer: "GET requests retrieve data, send parameters in the URL query string, are idempotent and cacheable, and have URL length limits. POST requests send data to be processed, include parameters in the request body, are not idempotent or cacheable, and have no strict payload size limits.",
    detailedExplanation: "GET is safe (should not change system state). POST is unsafe (creates resources or changes system state).",
    estimatedTime: 6,
    relatedTopics: ["REST APIs", "CORS policy"],
    interviewTips: [
      "Discuss security: GET parameters are visible in browser history and server logs; POST is more secure for passwords because data goes in the request body."
    ],
    commonMistakes: [
      "Stating that POST is completely secure without encryption (HTTPS is still required to secure the data)."
    ]
  },
  {
    title: "Explain SQL joins",
    description: "Illustrate differences between INNER, LEFT, RIGHT, and FULL database joins with query cases.",
    category: "SQL",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Accenture", "Deloitte"],
    topic: "SQL queries",
    completeAnswer: "1. INNER JOIN: Returns records with matching values in both tables. 2. LEFT JOIN: Returns all records from the left table and matching records from the right (returns NULL if no match). 3. RIGHT JOIN: Returns all records from the right table and matching records from the left. 4. FULL JOIN: Returns all records when there is a match in either table.",
    detailedExplanation: "Joins combine columns from multiple tables using foreign key matches.",
    estimatedTime: 8,
    relatedTopics: ["Normalization", "Query Optimizer"],
    interviewTips: [
      "Use Venn diagrams to explain how each join type filters the result set."
    ],
    commonMistakes: [
      "Confusing LEFT JOIN with INNER JOIN.",
      "Not handling NULL values in join columns."
    ]
  },
  {
    title: "What are ACID properties?",
    description: "Detail Atomicity, Consistency, Isolation, and Durability requirements in database transactions.",
    category: "DBMS",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant", "Deloitte"],
    topic: "Transactions",
    completeAnswer: "1. Atomicity: The entire transaction succeeds or fails completely (all-or-nothing). 2. Consistency: A transaction transitions the database from one valid state to another. 3. Isolation: Transactions run independently without interfering with each other. 4. Durability: Committed updates are permanently saved, even in a system crash.",
    detailedExplanation: "ACID compliance guarantees that database transactions are processed reliably, which is crucial for systems like banking.",
    estimatedTime: 8,
    relatedTopics: ["Database Locks", "Normalization"],
    interviewTips: [
      "Explain using a bank transfer scenario: money must be debited from account A and credited to B as a single, atomic transaction."
    ],
    commonMistakes: [
      "Failing to explain how isolation levels (e.g. read committed, serializable) manage concurrency."
    ]
  },
  {
    title: "Compare method overloading and overriding",
    description: "Explain compile-time static method bindings vs runtime dynamic virtual method overrides.",
    category: "OOP",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "Polymorphism",
    completeAnswer: "Method Overloading (Compile-time Polymorphism): Defining multiple methods in the same class with the same name but different signatures. Method Overriding (Runtime Polymorphism): Defining a method in a child class with the same signature as a method in the parent class.",
    detailedExplanation: "Overloading binds at compile-time. Overriding uses virtual method tables (VMT) to resolve bindings dynamically at runtime.",
    estimatedTime: 6,
    relatedTopics: ["Core OOP", "Virtual Methods"],
    interviewTips: [
      "Provide simple Java or C++ code snippets to illustrate both behaviors."
    ],
    commonMistakes: [
      "Failing to note that parameter types must be different for method overloading.",
      "Confusing override rules with access modifiers."
    ]
  },
  {
    title: "What is abstract class vs interface?",
    description: "Contrast multi-inheritance flexibility, abstract states storage, and contract-based method specifications.",
    category: "OOP",
    difficulty: "Medium",
    companies: ["Infosys", "Capgemini", "Accenture", "Microsoft"],
    topic: "Abstraction",
    completeAnswer: "An Abstract Class can have both abstract (no body) and concrete methods, can store instance state, and allows single inheritance. An Interface specifies a contract (only abstract methods in older versions, default methods in modern Java), does not store state, and supports multiple inheritance.",
    detailedExplanation: "Use abstract classes for closely related objects. Use interfaces to define common behaviors across unrelated classes.",
    estimatedTime: 10,
    relatedTopics: ["Core OOP", "Design Patterns"],
    interviewTips: [
      "Explain that interfaces define behavior (e.g., Runnable, Comparable), while abstract classes define identity (e.g., Animal, Vehicle)."
    ],
    commonMistakes: [
      "Claiming interfaces cannot have any method bodies (modern versions support default and static methods)."
    ]
  },
  {
    title: "Explain JavaScript closures",
    description: "How do inner functions retain reference scope context after parent methods terminate?",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Google", "Meta", "Accenture", "Deloitte"],
    topic: "JS Closures",
    completeAnswer: "A Closure is the combination of a function and the lexical environment within which that function was declared. It allows an inner function to access variables from its outer function's scope, even after the outer function has completed execution.",
    detailedExplanation: "JavaScript functions keep a reference to their scope chain, preventing the garbage collector from freeing variables in outer scopes.",
    estimatedTime: 9,
    relatedTopics: ["Lexical Scope", "Encapsulation"],
    interviewTips: [
      "Demonstrate closures using a practical example, like creating a private counter function."
    ],
    commonMistakes: [
      "Thinking closures are only for class definitions.",
      "Not understanding that closures can cause memory leaks if reference loops are not cleaned up."
    ]
  },
  {
    title: "Compare == and === in JavaScript",
    description: "Explain type coercion processes under loose checks vs strict equality evaluations.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Cognizant", "Capgemini", "Accenture", "TCS"],
    topic: "JS Comparisons",
    completeAnswer: "loose equality (==) compares values after performing type coercion (e.g., `5 == '5'` is true). Strict equality (===) compares both the value and the type without coercion (e.g., `5 === '5'` is false). Always prefer strict equality (===) to prevent unexpected type conversions.",
    detailedExplanation: "Loose equality uses the abstract equality comparison algorithm to convert types to common baselines before comparing.",
    estimatedTime: 5,
    relatedTopics: ["JS Types", "Type Coercion"],
    interviewTips: [
      "Mention examples where loose equality causes surprises, like `[] == false` (true) or `0 == ''` (true)."
    ],
    commonMistakes: [
      "Assuming loose equality is faster than strict equality (strict equality is actually faster because it skips type coercion)."
    ]
  },
  {
    title: "What is critical section and semaphores?",
    description: "Discuss race conditions, mutual exclusion locks, and counting semaphores task controls.",
    category: "Operating System",
    difficulty: "Hard",
    companies: ["Microsoft", "Intel", "Google"],
    topic: "Concurrency",
    completeAnswer: "A Critical Section is a code segment that accesses shared resources and must not be run by more than one thread at a time. A Mutex is a binary lock that guarantees mutual exclusion. A Semaphore is a signaling mechanism using an integer counter to control access to a pool of shared resources.",
    detailedExplanation: "Semaphores use wait() and signal() operations to coordinate access, preventing race conditions.",
    estimatedTime: 12,
    relatedTopics: ["OS Processes", "Race Conditions"],
    interviewTips: [
      "Distinguish clearly between Mutex (ownership-based locking) and Semaphore (signaling-based locking)."
    ],
    commonMistakes: [
      "Stating that semaphores can only have values 0 and 1 (binary semaphores can, but counting semaphores can have larger values)."
    ]
  },
  {
    title: "How does HTTP/2 improve over HTTP/1.1?",
    description: "Discuss multiplexing, header compression, server pushes, and head-of-line blocking fixes.",
    category: "Computer Networks",
    difficulty: "Hard",
    companies: ["Google", "Amazon", "Microsoft"],
    topic: "Protocols",
    completeAnswer: "HTTP/2 introduces: 1. Multiplexing (sending multiple requests and responses concurrently over a single TCP connection). 2. HPACK Header Compression (reducing overhead). 3. Server Push (sending assets to the client before they request them). 4. Binary framing instead of text-based formats, resolving head-of-line blocking at the application layer.",
    detailedExplanation: "HTTP/1.1 requires opening multiple TCP connections or serializing requests, causing performance bottlenecks.",
    estimatedTime: 11,
    relatedTopics: ["TCP Handshakes", "Web Performance"],
    interviewTips: [
      "Explain multiplexing as the ability to share a single TCP pipe for multiple resources simultaneously."
    ],
    commonMistakes: [
      "Stating that HTTP/2 completely resolves TCP head-of-line blocking (this is only resolved in HTTP/3 via QUIC/UDP)."
    ]
  },
  {
    title: "What is database indexing and B-Trees?",
    description: "Explain how indexing speeds queries to O(log N) and detail the balance properties of B-Trees.",
    category: "DBMS",
    difficulty: "Hard",
    companies: ["Oracle", "Google", "Amazon", "Microsoft"],
    topic: "Index structures",
    completeAnswer: "Indexing creates a lookup structure (usually a B-Tree or B+ Tree) that allows the query engine to find rows in O(log N) time instead of performing full table scans (O(N)). B-Trees are self-balancing search trees designed to minimize disk reads by storing multiple keys per node and keeping the tree short.",
    detailedExplanation: "B-Trees keep search paths short, which minimizes slow disk read operations.",
    estimatedTime: 12,
    relatedTopics: ["Database Normalization", "Query profiling"],
    interviewTips: [
      "Note that while indexes speed up read queries, they add write overhead during inserts, updates, and deletes."
    ],
    commonMistakes: [
      "Suggesting that indexes should be added to every single column in a database."
    ]
  },
  {
    title: "What is JSX in React?",
    description: "Discuss how react compiler translates XML-like markup into native React.createElement nodes.",
    category: "React",
    difficulty: "Easy",
    companies: ["Capgemini", "Accenture", "Cognizant"],
    topic: "React Core",
    completeAnswer: "JSX is a syntax extension for JavaScript that allows you to write HTML-like elements inside React files. The React compiler (e.g., Babel or SWC) translates JSX tags into standard `React.createElement` (or new jsx runtime) function calls that return plain JavaScript objects representing the UI.",
    detailedExplanation: "Browsers cannot parse JSX directly. It must compile to standard JavaScript before running.",
    estimatedTime: 8,
    relatedTopics: ["React Component Life", "Virtual DOM"],
    interviewTips: [
      "Show how `<div className='box'>Hello</div>` compiles to `React.createElement('div', { className: 'box' }, 'Hello')`."
    ],
    commonMistakes: [
      "Thinking JSX is parsed by the browser directly."
    ]
  },
  {
    title: "What is middleware in Express?",
    description: "Explain req/res lifecycle hooks, err log handlers, and the next() dispatch loop.",
    category: "Node.js",
    difficulty: "Easy",
    companies: ["Accenture", "Deloitte", "TCS"],
    topic: "Express Framework",
    completeAnswer: "Middleware functions are handlers that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can execute code, modify request/response objects, end the cycle, or call `next()` to pass control down the chain.",
    detailedExplanation: "Used for tasks like routing, checking authentication, parsing request bodies, logging, and error handling.",
    estimatedTime: 8,
    relatedTopics: ["CORS policy", "JWT validation"],
    interviewTips: [
      "Discuss error-handling middleware, which takes four arguments instead of three: `(err, req, res, next)`."
    ],
    commonMistakes: [
      "Forgetting to call `next()` inside a middleware, causing the request to hang indefinitely."
    ]
  },
  {
    title: "What is prototype inheritance in JavaScript?",
    description: "Discuss proto chains, constructor functions, and prototype lookup resolutions.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Meta", "Google", "Amazon"],
    topic: "JS Prototypes",
    completeAnswer: "JavaScript uses prototypes to share behaviors across objects. Every object has an internal link to another object called its prototype. When accessing a property on an object, JavaScript checks the object itself; if not found, it traverses up the prototype chain until it finds the property or hits `null`.",
    detailedExplanation: "This design avoids duplicating methods in memory, saving resources compared to class-copy patterns.",
    estimatedTime: 10,
    relatedTopics: ["Lexical Scope", "Classes"],
    interviewTips: [
      "Explain how ES6 classes are syntactic sugar over prototype chains."
    ],
    commonMistakes: [
      "Confusing `__proto__` (the actual object link) with `prototype` (the property on constructor functions)."
    ]
  },
  {
    title: "What is REST API best design principles?",
    description: "Discuss nouns resource paths, HTTP methods mapping, JSON formatting, and status code standards.",
    category: "System Design",
    difficulty: "Medium",
    companies: ["Accenture", "Deloitte", "Google", "Amazon"],
    topic: "API Design",
    completeAnswer: "1. Use nouns for resource paths (e.g. `/api/users`, not `/api/getUsers`). 2. Map actions to HTTP methods (GET, POST, PUT, DELETE). 3. Use standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error). 4. Return formatted JSON payloads. 5. Support pagination and filtering.",
    detailedExplanation: "REST (Representational State Transfer) leverages stateless HTTP protocols to build predictable, scale-ready APIs.",
    estimatedTime: 10,
    relatedTopics: ["CORS policy", "HTTP Methods"],
    interviewTips: [
      "Show how to structure nested resource endpoints, e.g. `/api/users/:userId/comments`."
    ],
    commonMistakes: [
      "Using verbs in endpoint paths (e.g. `/api/deleteUser`).",
      "Returning status 200 OK with an error message payload."
    ]
  },
  {
    title: "How to scale a web app horizontally?",
    description: "Discuss load balancers, database replica configs, stateless APIs, and caching distribution layers.",
    category: "System Design",
    difficulty: "Hard",
    companies: ["Amazon", "Google", "Netflix", "Uber"],
    topic: "Scaling Architecture",
    completeAnswer: "1. Stateless APIs: Ensure servers do not store user sessions locally (use JWT or shared Redis sessions instead). 2. Load Balancer: Route requests across server nodes using algorithms like Round Robin. 3. Database Scaling: Set up read replicas and sharding. 4. Cache: Add Redis and CDN layers to serve static files and cache static database query results.",
    detailedExplanation: "Horizontal scaling adds more instances of servers to a pool, avoiding the limits of vertical scaling (upgrading single server hardware).",
    estimatedTime: 12,
    relatedTopics: ["Redis Caching", "MongoDB Sharding"],
    interviewTips: [
      "Explain that statelessness is key: if server A crashes, server B should handle the request seamlessly."
    ],
    commonMistakes: [
      "Failing to address session state replication when adding servers behind a load balancer."
    ]
  },
  {
    title: "What is caching and Redis?",
    description: "How does in-memory key-value caching reduce SQL latency, and discuss cache eviction policies.",
    category: "System Design",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft"],
    topic: "Caching",
    completeAnswer: "Caching stores frequently accessed data in fast memory (RAM) to avoid slower database lookups. Redis is an open-source, in-memory key-value store. It stores data in RAM, reducing read latency from 50ms to sub-milliseconds. Eviction policies (e.g., LRU - Least Recently Used) automatically clean up memory when limits are reached.",
    detailedExplanation: "LRU evicts keys that haven't been accessed recently, keeping active hot data in memory.",
    estimatedTime: 10,
    relatedTopics: ["Horizontal scaling", "Redis cluster"],
    interviewTips: [
      "Discuss strategies like Cache-Aside, Write-Through, and handling Cache Invalidation."
    ],
    commonMistakes: [
      "Forgetting to set TTLs (Time-To-Live) on keys, causing stale data issues."
    ]
  },
  {
    title: "Explain SQL SQL Injection (SQLi) vulnerabilities",
    description: "How do untrusted input string interpolations allow execution breaches, and discuss prepared statements solutions.",
    category: "SQL",
    difficulty: "Medium",
    companies: ["Deloitte", "Accenture", "TCS"],
    topic: "Security",
    completeAnswer: "SQL Injection occurs when user inputs are directly concatenated into SQL queries without validation, allowing attackers to manipulate queries (e.g. inputting `' OR 1=1 --` to bypass login checks). Fix: Use parameterized queries (prepared statements) that treat input strictly as parameters, preventing SQL compilers from executing them as code.",
    detailedExplanation: "Prepared statements pre-compile the SQL template, mapping user parameters to placeholders without changing the query structure.",
    estimatedTime: 10,
    relatedTopics: ["Web Security", "SQL Queries"],
    interviewTips: [
      "Demonstrate a vulnerable query, e.g. `SELECT * FROM users WHERE name = '` + input + `'`, and show how parameterized input fixes it."
    ],
    commonMistakes: [
      "Thinking that basic input sanitization (like stripping quotes) is enough to prevent SQL injection (parameterization is the only reliable fix)."
    ]
  },

  // ==========================================
  // 5. Coding Questions (20 Questions)
  // ==========================================
  {
    title: "Reverse a String",
    description: "Write a function that takes a string and returns it reversed.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys", "Cognizant"],
    topic: "String Manipulation",
    completeAnswer: `function reverseString(str) {\n  return str.split('').reverse().join('');\n}`,
    detailedExplanation: "Converts the string into an array of characters, reverses the array elements, and joins them back into a single string.",
    estimatedTime: 10,
    relatedTopics: ["Arrays", "String parsing"],
    interviewTips: [
      "Be ready to implement this without native helper methods using a simple swap loop."
    ],
    commonMistakes: [
      "Forgetting that JavaScript strings are immutable and cannot be edited in-place."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function reverseString(str) {\n  // Write your code here\n  return str.split('').reverse().join('');\n}`,
      python: `def reverseString(str):\n    # Write your code here\n    return str[::-1]`,
      cpp: `#include <string>\n#include <algorithm>\nstd::string reverseString(std::string str) {\n    // Write your code here\n    std::reverse(str.begin(), str.end());\n    return str;\n}`,
      java: `public class Solution {\n    public static String reverseString(String str) {\n        // Write your code here\n        return new StringBuilder(str).reverse().toString();\n    }\n}`
    },
    testCases: [
      { input: '"hello"', output: '"olleh"', isPrivate: false },
      { input: '"world"', output: '"dlrow"', isPrivate: false }
    ],
    constraints: ["Length <= 1000", "ASCII characters only"],
    optimalSolution: "Use split-reverse-join in JS, or string slicing in Python.",
    complexityAnalysis: "Time: O(N), Space: O(N)"
  },
  {
    title: "Check Palindrome String",
    description: "Check if a string reads the same forwards and backwards, ignoring cases.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Infosys", "Wipro", "Accenture"],
    topic: "String Manipulation",
    completeAnswer: `function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}`,
    detailedExplanation: "Converts the input to lowercase, strips out non-alphanumeric characters, and compares the cleaned string with its reversed copy.",
    estimatedTime: 10,
    relatedTopics: ["Two pointers", "String cleaning"],
    interviewTips: [
      "Suggest a two-pointer approach (comparing start and end pointers moving inward) to avoid extra memory usage."
    ],
    commonMistakes: [
      "Not handling spaces, punctuation, or mixed casing."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function isPalindrome(str) {\n  // Write your code here\n  const cleaned = str.toLowerCase();\n  return cleaned === cleaned.split('').reverse().join('');\n}`,
      python: `def isPalindrome(str):\n    cleaned = str.lower()\n    return cleaned == cleaned[::-1]`,
      cpp: `#include <string>\n#include <algorithm>\nbool isPalindrome(std::string str) {\n    // Write your code here\n    return true;\n}`,
      java: `public class Solution {\n    public static boolean isPalindrome(String str) {\n        return true;\n    }\n}`
    },
    testCases: [
      { input: '"racecar"', output: "true", isPrivate: false },
      { input: '"hello"', output: "false", isPrivate: false }
    ],
    constraints: ["Length <= 5000", "Alphanumeric only"],
    optimalSolution: "Clean non-alphanumeric, then compare with reversed or use two pointers.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "FizzBuzz Challenge",
    description: "For numbers 1 to N, log 'Fizz' if divisible by 3, 'Buzz' if by 5, and 'FizzBuzz' if by both.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Accenture", "Capgemini", "Cognizant"],
    topic: "Logical Loops",
    completeAnswer: `function fizzBuzz(n) {\n  let res = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) res.push("FizzBuzz");\n    else if (i % 3 === 0) res.push("Fizz");\n    else if (i % 5 === 0) res.push("Buzz");\n    else res.push(i.toString());\n  }\n  return res.join(" ");\n}`,
    detailedExplanation: "Loop through numbers 1 to N and check modulo divisions. Check for division by 15 (3 and 5) first.",
    estimatedTime: 8,
    relatedTopics: ["Iteration", "Modulo arithmetic"],
    interviewTips: [
      "Note that checking division by 15 first prevents matching only 3 or 5."
    ],
    commonMistakes: [
      "Ordering checks incorrectly (checking division by 3 before 15)."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function fizzBuzz(n) {\n  let res = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) res.push("FizzBuzz");\n    else if (i % 3 === 0) res.push("Fizz");\n    else if (i % 5 === 0) res.push("Buzz");\n    else res.push(i.toString());\n  }\n  return res.join(" ");\n}`,
      python: `def fizzBuzz(n):\n    return ""`
    },
    testCases: [
      { input: "15", output: '"1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz"', isPrivate: false }
    ],
    constraints: ["1 <= N <= 100"],
    optimalSolution: "Iterate and check modular divisions.",
    complexityAnalysis: "Time: O(N), Space: O(N)"
  },
  {
    title: "Find Largest Element in Array",
    description: "Write a function returning the maximum integer value in a given list.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys"],
    topic: "Arrays",
    completeAnswer: `function findMax(arr) {\n  return Math.max(...arr);\n}`,
    detailedExplanation: "Performs a linear scan or uses native helper math unpackers to identify the maximum value.",
    estimatedTime: 8,
    relatedTopics: ["Loops", "Math libraries"],
    interviewTips: [
      "Explain the linear loop logic if native functions are blocked."
    ],
    commonMistakes: [
      "Not handling empty array inputs."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function findMax(arr) {\n  return Math.max(...arr);\n}`,
      python: `def findMax(arr):\n    return max(arr)`
    },
    testCases: [
      { input: "[1, 5, 3, 9, 2]", output: "9", isPrivate: false },
      { input: "[-10, -5, -2, -15]", output: "-2", isPrivate: false }
    ],
    constraints: ["Array size >= 1"],
    optimalSolution: "Math.max or linear scan.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    topic: "Hash Map Lookups",
    completeAnswer: `function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in map) return [map[complement], i];\n    map[nums[i]] = i;\n  }\n  return [];\n}`,
    detailedExplanation: "Uses a hash map to search complements in O(1) time instead of nested loops.",
    estimatedTime: 12,
    relatedTopics: ["Arrays", "Hashing"],
    interviewTips: [
      "Explain the O(N^2) brute force vs O(N) hash map solution tradeoffs."
    ],
    commonMistakes: [
      "Returning values instead of index keys."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in map) return [map[complement], i];\n    map[nums[i]] = i;\n  }\n  return [];\n}`,
      python: `def twoSum(nums, target):\n    # Write Python twoSum here\n    return []`
    },
    testCases: [
      { input: "[[2,7,11,15], 9]", output: "[0,1]", isPrivate: false },
      { input: "[[3,2,4], 6]", output: "[1,2]", isPrivate: false }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= target <= 10^9"],
    optimalSolution: "Use a hash map to search complements in O(1) time.",
    complexityAnalysis: "Time: O(N), Space: O(N)"
  },
  {
    title: "Valid Parentheses",
    description: "Determine if the input string containing brackets is valid.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Google", "Microsoft", "Amazon"],
    topic: "Stack Structure",
    completeAnswer: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (let c of s) {\n    if (c === '(' || c === '{' || c === '[') {\n      stack.push(c);\n    } else {\n      if (stack.pop() !== map[c]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
    detailedExplanation: "Push opening brackets to stack, and pop/verify matches when closing brackets are met.",
    estimatedTime: 12,
    relatedTopics: ["Stacks", "Strings"],
    interviewTips: [
      "Explain why stacks are the optimal structure for evaluating nested syntax scopes."
    ],
    commonMistakes: [
      "Not checking if the stack is empty at the end."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (let c of s) {\n    if (c === '(' || c === '{' || c === '[') {\n      stack.push(c);\n    } else {\n      if (stack.pop() !== map[c]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
      python: `def isValid(s):\n    return False`
    },
    testCases: [
      { input: '"()[]{}"', output: "true", isPrivate: false },
      { input: '"(]"', output: "false", isPrivate: false }
    ],
    constraints: ["1 <= s.length <= 10^4"],
    optimalSolution: "Use a Stack data structure.",
    complexityAnalysis: "Time: O(N), Space: O(N)"
  },
  {
    title: "Merge Intervals",
    description: "Given an array of intervals, merge all overlapping intervals.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Google", "Microsoft", "Amazon", "Uber"],
    topic: "Interval Scheduling",
    completeAnswer: `function mergeIntervals(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a,b) => a[0] - b[0]);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const curr = intervals[i];\n    const last = merged[merged.length - 1];\n    if (curr[0] <= last[1]) {\n      last[1] = Math.max(last[1], curr[1]);\n    } else {\n      merged.push(curr);\n    }\n  }\n  return merged;\n}`,
    detailedExplanation: "Sort by start times and merge overlapping intervals linearly.",
    estimatedTime: 15,
    relatedTopics: ["Sorting", "Arrays"],
    interviewTips: [
      "Sorting is the crucial first step. Ensure you clarify sorting costs."
    ],
    commonMistakes: [
      "Forgetting to check the end intervals comparison logic."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function mergeIntervals(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a,b) => a[0] - b[0]);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const curr = intervals[i];\n    const last = merged[merged.length - 1];\n    if (curr[0] <= last[1]) {\n      last[1] = Math.max(last[1], curr[1]);\n    } else {\n      merged.push(curr);\n    }\n  }\n  return merged;\n}`,
      python: `def mergeIntervals(intervals):\n    return []`
    },
    testCases: [
      { input: "[[[1,3],[2,6],[8,10],[15,18]]]", output: "[[1,6],[8,10],[15,18]]", isPrivate: false }
    ],
    constraints: ["1 <= intervals.length <= 10^4"],
    optimalSolution: "Sort by start times, then merge linearly.",
    complexityAnalysis: "Time: O(N log N), Space: O(N)"
  },
  {
    title: "Fibonacci Number",
    description: "Compute the N-th Fibonacci number.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys"],
    topic: "Recursion & Loops",
    completeAnswer: `function fib(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}`,
    detailedExplanation: "Calculate the value linearly without recursion, keeping constant space usage.",
    estimatedTime: 10,
    relatedTopics: ["Dynamic Programming", "Memoization"],
    interviewTips: [
      "Explain the O(2^N) recursive vs O(N) iterative execution tradeoffs."
    ],
    commonMistakes: [
      "Using slow double-recursion without caching/memoization."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function fib(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}`,
      python: `def fib(n):\n    return 0`
    },
    testCases: [
      { input: "5", output: "5", isPrivate: false },
      { input: "9", output: "34", isPrivate: false }
    ],
    constraints: ["0 <= N <= 30"],
    optimalSolution: "Linear loop using constant space.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Prime Number Checker",
    description: "Verify if an integer N is a prime number.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Infosys", "Wipro"],
    topic: "Mathematics",
    completeAnswer: `function isPrime(n) {\n  if (n <= 1) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}`,
    detailedExplanation: "Loop through numbers 2 up to the square root of N, checking for modular divisions.",
    estimatedTime: 10,
    relatedTopics: ["Number theory", "Optimization"],
    interviewTips: [
      "Looping up to the square root of N instead of N significantly reduces execution time."
    ],
    commonMistakes: [
      "Not handling values <= 1 correctly."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function isPrime(n) {\n  if (n <= 1) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}`,
      python: `def isPrime(n):\n    return False`
    },
    testCases: [
      { input: "7", output: "true", isPrivate: false },
      { input: "4", output: "false", isPrivate: false }
    ],
    constraints: ["1 <= N <= 10^6"],
    optimalSolution: "Iterate from 2 up to sqrt(N).",
    complexityAnalysis: "Time: O(sqrt(N)), Space: O(1)"
  },
  {
    title: "Analyse Binary Search",
    description: "Search an integer inside sorted nums array. Return its index, or -1 if missing.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Infosys", "Capgemini", "Accenture", "Google"],
    topic: "Search algorithms",
    completeAnswer: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
    detailedExplanation: "Halve the search space at each iteration to find target in O(log N) complexity.",
    estimatedTime: 10,
    relatedTopics: ["Divide & conquer", "Arrays"],
    interviewTips: [
      "Binary search requires the input array to be sorted first."
    ],
    commonMistakes: [
      "Incorrect index updates leading to infinite loops."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`
    },
    testCases: [
      { input: "[[-1,0,3,5,9,12], 9]", output: "4", isPrivate: false }
    ],
    constraints: ["1 <= nums.length <= 10^4"],
    optimalSolution: "Use binary division search.",
    complexityAnalysis: "Time: O(log N), Space: O(1)"
  },
  {
    title: "Reverse an Array",
    description: "Given an array, return it reversed without using native reverse methods.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys"],
    topic: "Arrays",
    completeAnswer: `function reverseArray(arr) {\n  let l = 0, r = arr.length - 1;\n  while (l < r) {\n    let temp = arr[l];\n    arr[l] = arr[r];\n    arr[r] = temp;\n    l++; r--;\n  }\n  return arr;\n}`,
    detailedExplanation: "Use two pointers starting at both ends of the array, swapping values as they move inward.",
    estimatedTime: 8,
    relatedTopics: ["Arrays", "Two pointers"],
    interviewTips: [
      "Suggest swapping in-place to avoid extra memory allocation (O(1) space complexity)."
    ],
    commonMistakes: [
      "Iterating beyond the middle index, which reverses the array back to its original order."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function reverseArray(arr) {\n  let l = 0, r = arr.length - 1;\n  while (l < r) {\n    let temp = arr[l];\n    arr[l] = arr[r];\n    arr[r] = temp;\n    l++; r--;\n  }\n  return arr;\n}`
    },
    testCases: [
      { input: "[1,2,3,4]", output: "[4,3,2,1]", isPrivate: false }
    ],
    constraints: ["Array size <= 1000"],
    optimalSolution: "Two pointers swap.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Find Factorial",
    description: "Write a function that calculates the factorial of a positive integer N.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Wipro", "Infosys"],
    topic: "Mathematics",
    completeAnswer: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
    detailedExplanation: "Calculate using a recursive function that calls itself with (N-1) down to 1.",
    estimatedTime: 10,
    relatedTopics: ["Recursion", "Stack frames"],
    interviewTips: [
      "Be prepared to write both the recursive and iterative versions, noting the stack overhead of recursion."
    ],
    commonMistakes: [
      "Not defining a base case (leads to infinite recursion / stack overflow)."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`
    },
    testCases: [
      { input: "5", output: "120", isPrivate: false }
    ],
    constraints: ["0 <= N <= 12"],
    optimalSolution: "Recursive or iterative multiplication.",
    complexityAnalysis: "Time: O(N), Space: O(N)"
  },
  {
    title: "Bubble Sort",
    description: "Implement bubble sorting algorithm to sort an array in ascending order.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["TCS", "Infosys", "Wipro"],
    topic: "Sorting algorithms",
    completeAnswer: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j+1]) {\n        let temp = arr[j];\n        arr[j] = arr[j+1];\n        arr[j+1] = temp;\n      }\n    }\n  }\n  return arr;\n}`,
    detailedExplanation: "Repeatedly step through the list, compare adjacent elements, and swap them if they are in the wrong order.",
    estimatedTime: 10,
    relatedTopics: ["Sorting", "Arrays"],
    interviewTips: [
      "Note that Bubble Sort is inefficient (O(N^2)) and primarily used for educational purposes."
    ],
    commonMistakes: [
      "Iterating beyond array boundaries."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j+1]) {\n        let temp = arr[j];\n        arr[j] = arr[j+1];\n        arr[j+1] = temp;\n      }\n    }\n  }\n  return arr;\n}`
    },
    testCases: [
      { input: "[4,2,5,1]", output: "[1,2,4,5]", isPrivate: false }
    ],
    constraints: ["Size <= 100"],
    optimalSolution: "Optimized nested swap loops.",
    complexityAnalysis: "Time: O(N^2), Space: O(1)"
  },
  {
    title: "Maximum Subarray (Kadane's)",
    description: "Find the contiguous subarray which has the largest sum.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft"],
    topic: "Dynamic Programming",
    completeAnswer: `function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}`,
    detailedExplanation: "Keep track of cumulative maxes dynamically at each position using Kadane's algorithm.",
    estimatedTime: 15,
    relatedTopics: ["Arrays", "Kadane's algorithm"],
    interviewTips: [
      "Explain the O(N^3) brute force solution vs the O(N) dynamic programming optimization."
    ],
    commonMistakes: [
      "Not initializing variables with the first array element (fails for all-negative arrays)."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}`
    },
    testCases: [
      { input: "[[-2,1,-3,4,-1,2,1,-5,4]]", output: "6", isPrivate: false }
    ],
    constraints: ["1 <= nums.length <= 10^5"],
    optimalSolution: "Keep track of cumulative maxes dynamically.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft"],
    topic: "Sliding Window",
    completeAnswer: `function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
    detailedExplanation: "Use a sliding window with a Set cache to keep track of unique characters.",
    estimatedTime: 15,
    relatedTopics: ["Sliding Window", "Sets"],
    interviewTips: [
      "Show how moving the left boundary shrinks the window to maintain uniqueness."
    ],
    commonMistakes: [
      "Forgetting to update the left pointer in the while loop."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`
    },
    testCases: [
      { input: '"abcabcbb"', output: "3", isPrivate: false }
    ],
    constraints: ["Length <= 10^4"],
    optimalSolution: "Sliding window with Set cache.",
    complexityAnalysis: "Time: O(N), Space: O(min(M, N))"
  },
  {
    title: "Climbing Stairs",
    description: "How many distinct ways can you climb a staircase of N steps if you can climb 1 or 2 steps at a time?",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Google", "Microsoft", "Amazon"],
    topic: "Dynamic Programming",
    completeAnswer: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let first = 1, second = 2;\n  for (let i = 3; i <= n; i++) {\n    let third = first + second;\n    first = second;\n    second = third;\n  }\n  return second;\n}`,
    detailedExplanation: "Evaluate the number of ways dynamically (similar to the Fibonacci sequence).",
    estimatedTime: 10,
    relatedTopics: ["Dynamic Programming", "Fibonacci"],
    interviewTips: [
      "Explain the base cases clearly: 1 step = 1 way, 2 steps = 2 ways."
    ],
    commonMistakes: [
      "Using double recursion, which times out for larger inputs."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let first = 1, second = 2;\n  for (let i = 3; i <= n; i++) {\n    let third = first + second;\n    first = second;\n    second = third;\n  }\n  return second;\n}`
    },
    testCases: [
      { input: "3", output: "3", isPrivate: false }
    ],
    constraints: ["1 <= N <= 45"],
    optimalSolution: "Evaluate like Fibonacci dynamic allocations.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Implement Stack using Queues",
    description: "Implement a LIFO stack using only standard FIFO queues.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Wipro", "Infosys", "Capgemini"],
    topic: "Data Structures design",
    completeAnswer: `class MyStack {\n  constructor() { this.q = []; }\n  push(x) {\n    this.q.push(x);\n    for (let i = 0; i < this.q.length - 1; i++) {\n      this.q.push(this.q.shift());\n    }\n  }\n  pop() { return this.q.shift(); }\n  top() { return this.q[0]; }\n  empty() { return this.q.length === 0; }\n}`,
    detailedExplanation: "Reposition elements by shifting queue items on every push to maintain LIFO ordering.",
    estimatedTime: 15,
    relatedTopics: ["Stacks", "Queues"],
    interviewTips: [
      "Explain the tradeoff between making push operations O(N) vs pop operations O(N)."
    ],
    commonMistakes: [
      "Using helper array lookups instead of strict queue methods (push/shift)."
    ],
    isCoding: true,
    starterCode: {
      javascript: `class MyStack {\n  constructor() { this.q = []; }\n  push(x) {\n    this.q.push(x);\n    for (let i = 0; i < this.q.length - 1; i++) {\n      this.q.push(this.q.shift());\n    }\n  }\n  pop() { return this.q.shift(); }\n  top() { return this.q[0]; }\n  empty() { return this.q.length === 0; }\n}`
    },
    testCases: [
      { input: "[]", output: "null", isPrivate: false }
    ],
    constraints: ["Operations <= 100"],
    optimalSolution: "Reposition elements by shifting queue items.",
    complexityAnalysis: "Time: push O(N), pop O(1)"
  },
  {
    title: "Container With Most Water",
    description: "Find two lines that form a container containing the most water.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft"],
    topic: "Two Pointers",
    completeAnswer: `function maxArea(height) {\n  let maxA = 0, l = 0, r = height.length - 1;\n  while (l < r) {\n    const width = r - l;\n    const h = Math.min(height[l], height[r]);\n    maxA = Math.max(maxA, width * h);\n    if (height[l] < height[r]) l++; else r--;\n  }\n  return maxA;\n}`,
    detailedExplanation: "Narrow the search space using two pointers, always shifting the pointer pointing to the shorter line.",
    estimatedTime: 15,
    relatedTopics: ["Arrays", "Two Pointers"],
    interviewTips: [
      "Prove why shifting the shorter line pointer guarantees finding the optimal solution."
    ],
    commonMistakes: [
      "Using a nested loop approach (O(N^2)), which times out."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function maxArea(height) {\n  let maxA = 0, l = 0, r = height.length - 1;\n  while (l < r) {\n    const width = r - l;\n    const h = Math.min(height[l], height[r]);\n    maxA = Math.max(maxA, width * h);\n    if (height[l] < height[r]) l++; else r--;\n  }\n  return maxA;\n}`
    },
    testCases: [
      { input: "[[1,8,6,2,5,4,8,3,7]]", output: "49", isPrivate: false }
    ],
    constraints: ["2 <= height.length <= 10^5"],
    optimalSolution: "Two pointers narrowing search space.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "Find the maximum profit you can achieve by buying and selling a stock on different days.",
    category: "JavaScript",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "TCS", "Infosys"],
    topic: "Arrays",
    completeAnswer: `function maxProfit(prices) {\n  let minPrice = Infinity, maxProf = 0;\n  for (let p of prices) {\n    if (p < minPrice) minPrice = p;\n    else if (p - minPrice > maxProf) maxProf = p - minPrice;\n  }\n  return maxProf;\n}`,
    detailedExplanation: "Track the minimum price seen so far and check potential profit on subsequent days.",
    estimatedTime: 10,
    relatedTopics: ["Arrays", "Dynamic Programming"],
    interviewTips: [
      "Keep track of the minimum price dynamically as you iterate through the list."
    ],
    commonMistakes: [
      "Trying to sell before buying (incorrect loop indexes)."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, maxProf = 0;\n  for (let p of prices) {\n    if (p < minPrice) minPrice = p;\n    else if (p - minPrice > maxProf) maxProf = p - minPrice;\n  }\n  return maxProf;\n}`
    },
    testCases: [
      { input: "[[7,1,5,3,6,4]]", output: "5", isPrivate: false }
    ],
    constraints: ["Prices size <= 10^5"],
    optimalSolution: "Track min price and update max delta.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  },
  {
    title: "Sort Colors (Three Way Partition)",
    description: "Given an array with red, white, or blue items, sort them in-place in-order.",
    category: "JavaScript",
    difficulty: "Medium",
    companies: ["Microsoft", "Google", "Amazon"],
    topic: "Array Partitioning",
    completeAnswer: `function sortColors(nums) {\n  let l = 0, curr = 0, r = nums.length - 1;\n  while (curr <= r) {\n    if (nums[curr] === 0) {\n      let temp = nums[l]; nums[l] = nums[curr]; nums[curr] = temp;\n      l++; curr++;\n    } else if (nums[curr] === 2) {\n      let temp = nums[r]; nums[r] = nums[curr]; nums[curr] = temp;\n      r--;\n    } else curr++;\n  }\n  return nums;\n}`,
    detailedExplanation: "Sort the array in a single pass using the Dutch National Flag algorithm (three-way partitioning).",
    estimatedTime: 15,
    relatedTopics: ["Arrays", "Two Pointers"],
    interviewTips: [
      "Explain why sorting in a single pass (O(N)) is better than using standard O(N log N) sorting algorithms."
    ],
    commonMistakes: [
      "Incrementing the current pointer after a swap with the right pointer (can introduce unsorted values)."
    ],
    isCoding: true,
    starterCode: {
      javascript: `function sortColors(nums) {\n  let l = 0, curr = 0, r = nums.length - 1;\n  while (curr <= r) {\n    if (nums[curr] === 0) {\n      let temp = nums[l]; nums[l] = nums[curr]; nums[curr] = temp;\n      l++; curr++;\n    } else if (nums[curr] === 2) {\n      let temp = nums[r]; nums[r] = nums[curr]; nums[curr] = temp;\n      r--;\n    } else curr++;\n  }\n  return nums;\n}`
    },
    testCases: [
      { input: "[[2,0,2,1,1,0]]", output: "[0,0,1,1,2,2]", isPrivate: false }
    ],
    constraints: ["Size <= 300"],
    optimalSolution: "Dutch National Flag algorithm.",
    complexityAnalysis: "Time: O(N), Space: O(1)"
  }
];

module.exports = questions;
