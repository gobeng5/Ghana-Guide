# 🚀 QUICK START - Ghana Study Guide

## Get Up and Running in 5 Minutes!

### Step 1: Install Dependencies (2 minutes)

```bash
# Navigate to the project
cd ghana-study-guide

# Install backend packages
cd server
npm install

# Install frontend packages
cd ../client
npm install
```

### Step 2: Setup Environment (1 minute)

Create `server/.env` file with this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ghana-study-guide
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Don't have MongoDB?** Get free cloud database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas):
1. Sign up free
2. Create cluster
3. Get connection string
4. Replace MONGODB_URI above

### Step 3: Add Sample Data (30 seconds)

```bash
cd server
npm run seed
```

This creates demo accounts and sample content!

### Step 4: Start the App! (1 minute)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 5: Open in Browser! 🎉

Go to: **http://localhost:5173**

## 🎓 Test Accounts

**Student Account:**
- Email: `student@test.com`
- Password: `student123`

**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`

## ❓ Having Issues?

### MongoDB Not Working?

**Option 1:** Use MongoDB Atlas (free cloud database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `server/.env` with new MONGODB_URI

**Option 2:** Install MongoDB locally
- Download: https://www.mongodb.com/try/download/community
- Install and run `mongod`

### Port Already in Use?

Change port in `server/.env`:
```env
PORT=5001
```

### npm install fails?

```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 What's Included?

✅ Complete authentication system
✅ Study notes for multiple subjects
✅ Interactive quizzes with instant feedback
✅ Progress tracking dashboard
✅ Dark mode support
✅ Mobile responsive design
✅ Admin panel for content management
✅ Sample data for Basic 6 Math & SHS 2 Chemistry

## 🎯 Next Steps

1. ✅ Login and explore the dashboard
2. ✅ Browse study notes
3. ✅ Take a practice quiz
4. ✅ Check your progress
5. ✅ (Admin) Add your own content

## 📖 Full Documentation

- **Setup Guide:** `docs/SETUP.md` (comprehensive instructions)
- **API Documentation:** `docs/API.md` (for developers)
- **Project Overview:** `README.md` (feature details)

## 🆘 Need Help?

Check the full setup guide in `docs/SETUP.md` for:
- Detailed troubleshooting
- Deployment instructions
- Development tips
- Architecture overview

---

**Enjoy building! 🚀**

Questions? Issues? Check the docs folder for comprehensive guides.
