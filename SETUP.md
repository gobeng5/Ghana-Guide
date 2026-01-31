# Ghana Study Guide - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB**
   - **Option A - Local Installation:**
     - Download from: https://www.mongodb.com/try/download/community
     - Start MongoDB: `mongod`
   
   - **Option B - MongoDB Atlas (Cloud, Recommended for beginners):**
     - Create free account at: https://www.mongodb.com/cloud/atlas
     - Create a cluster
     - Get connection string

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

4. **VS Code** (recommended code editor)
   - Download from: https://code.visualstudio.com/

## 🚀 Installation Steps

### Step 1: Extract the Project

Extract the `ghana-study-guide` folder to your desired location.

### Step 2: Install Backend Dependencies

```bash
cd ghana-study-guide/server
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- cors (cross-origin requests)
- dotenv (environment variables)
- express-validator (input validation)

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

This will install:
- react & react-dom (UI library)
- vite (build tool)
- react-router-dom (routing)
- axios (HTTP client)
- tailwindcss (styling)

### Step 4: Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd ../server
touch .env  # or create manually in Windows
```

Add the following content to `.env`:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ghana-study-guide
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_xyz123
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghana-study-guide?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_xyz123
NODE_ENV=development
```

Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials.

### Step 5: Seed the Database (Add Sample Data)

```bash
# Make sure you're in the server directory
npm run seed
```

This creates:
- 2 sample users (admin and student)
- Study notes for Basic 6 Math and SHS 2 Chemistry
- Sample quizzes

**Sample Login Credentials:**
- **Student:** student@test.com / student123
- **Admin:** admin@test.com / admin123

### Step 6: Start the Application

You need TWO terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
You should see: "✅ MongoDB connected successfully" and "🚀 Server running on port 5000"

**Terminal 2 - Frontend Development Server:**
```bash
cd client
npm run dev
```
You should see: "Local: http://localhost:5173"

### Step 7: Open the Application

Open your browser and go to: **http://localhost:5173**

## 🎯 Quick Start Guide

### For Students:

1. **Sign Up:**
   - Click "Sign Up" button
   - Fill in your details
   - Select your grade level (Basic 1-9 or SHS 1-3)
   - Create account

2. **Browse Study Notes:**
   - Click "Notes" in navigation
   - Filter by your grade level and subject
   - Click on any note to read
   - Watch embedded video tutorials

3. **Take Quizzes:**
   - Click "Quizzes" in navigation
   - Select a quiz for your level
   - Answer all questions
   - Submit to see results and explanations

4. **Track Progress:**
   - View your dashboard for overall stats
   - Check "Progress" page for detailed analytics
   - See your best scores and improvement areas

### For Admins:

1. **Login with Admin Account:**
   - Email: admin@test.com
   - Password: admin123

2. **Access Admin Dashboard:**
   - Click "Admin" button in navigation
   - Add new study notes
   - Create quizzes with questions
   - Manage content

## 📁 Project Structure

```
ghana-study-guide/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Quizzes.jsx
│   │   │   └── ... (more pages)
│   │   ├── context/          # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/            # Utility functions
│   │   │   ├── api.js        # API calls
│   │   │   └── constants.js   # App constants
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Backend (Node.js/Express)
│   ├── models/               # Database models
│   │   ├── User.js
│   │   ├── Note.js
│   │   ├── Quiz.js
│   │   └── Progress.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── notes.js
│   │   ├── quizzes.js
│   │   ├── progress.js
│   │   └── users.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   ├── server.js             # Entry point
│   ├── package.json
│   └── .env                  # Environment variables (create this)
│
├── database/                  # Database utilities
│   └── seed.js               # Sample data seeder
│
├── docs/                      # Documentation
│   └── SETUP.md             # This file
│
└── README.md                  # Project overview
```

## 🔧 Troubleshooting

### Port Already in Use

If you see "Port 5000 is already in use":

**Option 1:** Kill the process using the port
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Option 2:** Change the port in `server/.env`:
```env
PORT=5001
```

### MongoDB Connection Error

1. **Local MongoDB not running:**
   ```bash
   mongod
   ```

2. **Wrong connection string:**
   - Double-check your `.env` file
   - For Atlas: Ensure IP address is whitelisted
   - For Atlas: Check username/password

3. **Network issues:**
   - Check your internet connection
   - Try using Atlas instead of local MongoDB

### npm install fails

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

### Frontend doesn't connect to backend

1. Check both servers are running
2. Ensure backend is on port 5000
3. Check browser console for errors
4. Verify CORS is enabled in backend

## 📝 Common Tasks

### Adding New Content

**Add Study Notes (as Admin):**
1. Login as admin
2. Go to Admin Dashboard
3. Fill in the "Add Note" form
4. Include title, content, subject, grade, topic
5. Optionally add YouTube video URL
6. Submit

**Add Quiz Questions (as Admin):**
1. Login as admin
2. Go to Admin Dashboard
3. Fill in the "Add Quiz" form
4. Add multiple questions
5. Set correct answers
6. Submit

### Reset Database

```bash
cd database
node seed.js
```

This will:
- Delete all existing data
- Create fresh sample data
- Reset to demo accounts

### Build for Production

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
```

The build files will be in `client/dist/`

## 🌐 Deployment

### Deploy Backend (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables:
   - MONGODB_URI (use Atlas)
   - JWT_SECRET
   - PORT (usually provided)
   - NODE_ENV=production

### Deploy Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable:
   - VITE_API_URL=your-backend-url

## 💡 Tips for Developers

1. **Code Organization:**
   - Components are in `client/src/components/`
   - Pages are in `client/src/pages/`
   - API calls are in `client/src/utils/api.js`

2. **Adding New Routes:**
   - Backend: Add to `server/routes/`
   - Frontend: Add to `client/src/App.jsx`

3. **Styling:**
   - Uses Tailwind CSS
   - Custom classes in `client/src/index.css`
   - Theme colors in `tailwind.config.js`

4. **Authentication:**
   - JWT tokens stored in localStorage
   - Protected routes use ProtectedRoute component
   - Auth context provides user state

## 📚 Learning Resources

- **React:** https://react.dev/learn
- **Express:** https://expressjs.com/
- **MongoDB:** https://www.mongodb.com/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the README.md
3. Check browser console for errors
4. Check server terminal for errors

## 🎉 Next Steps

1. Customize the design colors
2. Add more subjects and topics
3. Create additional quiz types
4. Add image upload for notes
5. Implement social features
6. Add gamification (badges, streaks)

Happy coding! 🚀
