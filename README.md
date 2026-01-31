# Ghana Student Study Guide 📚

A comprehensive web-based study guide platform for Ghanaian students (Basic 1-9 and SHS 1-3).

## Features

- 📖 Study notes organized by subject and grade level
- 🎥 Embedded video tutorials (YouTube integration)
- ✅ Practice quizzes with instant feedback
- 📊 Progress tracking and score monitoring
- 🌙 Dark mode support
- 📱 Fully responsive (mobile-first design)
- 👤 User authentication and profiles

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally OR MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ghana-study-guide
```

2. **Install dependencies**

Backend:
```bash
cd server
npm install
```

Frontend:
```bash
cd ../client
npm install
```

3. **Environment Setup**

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ghana-study-guide
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ghana-study-guide
```

4. **Start MongoDB** (if using local installation)
```bash
mongod
```

5. **Run the application**

Backend (from server directory):
```bash
npm run dev
```

Frontend (from client directory, in a new terminal):
```bash
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Default Credentials

For testing, you can create an account or use these sample credentials (after running the seed script):

**Student Account:**
- Email: student@test.com
- Password: student123

**Admin Account:**
- Email: admin@test.com
- Password: admin123

## Project Structure

```
ghana-study-guide/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (auth, theme)
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── controllers/      # Route controllers
│   ├── config/           # Configuration files
│   └── server.js         # Entry point
├── database/             # Database utilities
│   └── seed.js          # Sample data seeder
└── docs/                # Documentation
    └── API.md           # API documentation
```

## Adding Content

### Via Admin Panel
1. Login with admin credentials
2. Navigate to Admin Dashboard
3. Use the forms to add:
   - Study notes (with optional YouTube video URLs)
   - Quiz questions (MCQ, True/False, Short Answer)

### Via Database Seeder
Run the seed script to populate sample data:
```bash
cd database
node seed.js
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
```bash
cd client
npm run build
```
2. Deploy the `dist` folder to Vercel or Netlify
3. Set environment variable: `VITE_API_URL=your-backend-url`

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect to your hosting platform
3. Set environment variables (PORT, MONGODB_URI, JWT_SECRET)
4. Deploy

## API Endpoints

See `docs/API.md` for complete API documentation.

### Key Endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/notes` - Get study notes
- `GET /api/quizzes` - Get quizzes
- `POST /api/progress` - Save progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Offline mode with PWA
- [ ] Discussion forums
- [ ] Study groups/collaborative learning
- [ ] Gamification (badges, leaderboards)
- [ ] AI-powered question generation
- [ ] Past exam papers repository
- [ ] Text-to-speech for notes
- [ ] Mobile apps (React Native)

## License

MIT License - feel free to use this for educational purposes.

## Support

For issues or questions, please open an issue on GitHub or contact support@ghanastudyguide.com

---

Built with ❤️ for Ghanaian students
