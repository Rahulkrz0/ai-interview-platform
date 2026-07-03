# AI Interview Preparation Platform

A production-ready, feature-rich **AI Interview Preparation Platform** designed to help students and professionals prepare for placements. Featuring full-screen avatar simulations, voice/text mock reviews, Monaco-integrated coding platforms, dynamic ATS resume parsing, and career coaching services.

---

## 🚀 Tech Stack

* **Frontend**: React.js, React Router, Tailwind CSS, Monaco Editor, Chart.js, Lucide Icons
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (via Mongoose)
* **AI Model**: Google Gemini API (`gemini-1.5-flash`)
* **Security & Tokens**: Bcrypt, double JWT tokens, Helmet headers, Express rate limits, input sanitizers

---

## 🛠️ Installation & Setup

### Prerequisites
* **Node.js**: Version 18+
* **MongoDB**: Running locally on port `27017` or Atlas URI
* **Gemini API Key**: From Google AI Studio (optional, platform will mock if not provided)

### Step 1: Clone and Set Active Workspace
Ensure your IDE active workspace is set to this directory:
`C:\Users\rahul\.gemini\antigravity-ide\scratch\ai-interview-platform`

### Step 2: Configure Environment Files
A default `.env` is seeded in the `/server` folder. For custom keys, edit `server/.env`:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai-interview-prep
JWT_ACCESS_SECRET=your_long_term_jwt_access_secret_12345
JWT_REFRESH_SECRET=your_long_term_jwt_refresh_secret_12345
GEMINI_API_KEY=your_live_google_gemini_api_key
```

### Step 3: Launch Services

#### Option A: Running Local Node Servers
1. **Launch Server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
2. **Launch Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Open your browser at [http://localhost:5173](http://localhost:5173).

#### Option B: Deploying with Docker Compose
From the root directory, launch the entire container suite:
```bash
docker-compose up --build
```

---

## 📂 Project Structure

```
/ai-interview-platform
  /client
    /src
      /components      # Navbars, Sidebars, Skeletons
      /context         # Auth JWT token controls, light/dark themes
      /layouts         # Dashboard wraps
      /pages           # Dashboards, Monaco codes, Resume parsing panels
  /server
    /config            # DB, environment variables validation
    /controllers       # Login validation, Gemini prompt scripts, PDF reports
    /middleware        # Auth tokens checks, security headers, rate limits
    /models            # Users, reports, resumes schemas
    /routes            # API route mounts
    /services          # Google Gen AI integrations
```

---

## 🔌 Core API Routes

### Authentication
* `POST /api/auth/signup` - Register user profile
* `POST /api/auth/login` - Authenticate credentials and return double JWTs
* `POST /api/auth/refresh` - Refresh access tokens silently

### Mock Interviews
* `POST /api/interviews/create` - Generate question sheets via Gemini
* `POST /api/interviews/submit-answer` - Submit answer and measure pace/filler words
* `POST /api/interviews/end` - Compile reports and add XP points

### Resume & Career Coach
* `POST /api/resumes/upload` - Multer upload to parse ATS metrics
* `POST /api/resumes/cover-letter` - Build cover letters based on profile
* `GET /api/coach/roadmap` - View milestone paths

### Administration & Recruiting
* `GET /api/admin/stats` - Access token usage logs and feedback counters
* `POST /api/recruiter/invite` - Generate invitation codes for student rounds
.