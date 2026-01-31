# Ghana Study Guide API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "Kwame Mensah",
  "email": "kwame@example.com",
  "password": "password123",
  "gradeLevel": "Basic 6"
}

Response: 201 Created
{
  "_id": "user_id",
  "name": "Kwame Mensah",
  "email": "kwame@example.com",
  "gradeLevel": "Basic 6",
  "role": "student",
  "token": "jwt_token"
}
```

### Login
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "kwame@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "_id": "user_id",
  "name": "Kwame Mensah",
  "email": "kwame@example.com",
  "gradeLevel": "Basic 6",
  "role": "student",
  "token": "jwt_token"
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "_id": "user_id",
  "name": "Kwame Mensah",
  "email": "kwame@example.com",
  "gradeLevel": "Basic 6",
  "role": "student"
}
```

## Notes Endpoints

### Get All Notes
```
GET /notes?gradeLevel=Basic 6&subject=Mathematics&topic=Fractions&search=addition

Response: 200 OK
[
  {
    "_id": "note_id",
    "title": "Introduction to Fractions",
    "content": "...",
    "subject": "Mathematics",
    "gradeLevel": "Basic 6",
    "topic": "Fractions",
    "videoUrl": "https://youtube.com/...",
    "difficulty": "Easy",
    "tags": ["fractions", "basics"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Single Note
```
GET /notes/:id

Response: 200 OK
{
  "_id": "note_id",
  "title": "Introduction to Fractions",
  "content": "...",
  // ... full note details
}
```

### Create Note (Admin Only)
```
POST /notes
Authorization: Bearer {admin_token}
Content-Type: application/json

Request Body:
{
  "title": "New Topic",
  "content": "Detailed content...",
  "subject": "Mathematics",
  "gradeLevel": "Basic 6",
  "topic": "Algebra",
  "videoUrl": "https://youtube.com/...",
  "difficulty": "Medium",
  "tags": ["algebra", "equations"]
}

Response: 201 Created
{
  "_id": "note_id",
  // ... created note
}
```

### Update Note (Admin Only)
```
PUT /notes/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

Request Body: (any fields to update)
{
  "title": "Updated Title",
  "difficulty": "Hard"
}

Response: 200 OK
{
  // ... updated note
}
```

### Delete Note (Admin Only)
```
DELETE /notes/:id
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "message": "Note deleted successfully"
}
```

### Get Subjects for Grade Level
```
GET /notes/subjects/:gradeLevel

Response: 200 OK
["Mathematics", "English Language", "Science"]
```

### Get Topics for Subject
```
GET /notes/topics/:gradeLevel/:subject

Response: 200 OK
["Fractions", "Decimals", "Algebra"]
```

## Quiz Endpoints

### Get All Quizzes
```
GET /quizzes?gradeLevel=Basic 6&subject=Mathematics&topic=Fractions

Response: 200 OK
[
  {
    "_id": "quiz_id",
    "title": "Fractions Quiz",
    "description": "Test your fractions knowledge",
    "subject": "Mathematics",
    "gradeLevel": "Basic 6",
    "topic": "Fractions",
    "duration": 15,
    "passingScore": 60
    // Note: questions array doesn't include answers in listing
  }
]
```

### Get Single Quiz
```
GET /quizzes/:id

Response: 200 OK
{
  "_id": "quiz_id",
  "title": "Fractions Quiz",
  "questions": [
    {
      "_id": "question_id",
      "question": "What is 2/5 + 1/5?",
      "type": "multiple-choice",
      "options": ["1/5", "3/5", "3/10", "2/10"],
      "difficulty": "Easy",
      "points": 1
      // Note: correctAnswer and explanation not included
    }
  ]
}
```

### Submit Quiz
```
POST /quizzes/:id/submit
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "answers": [
    {
      "questionId": "question_id",
      "answer": "3/5"
    }
  ]
}

Response: 200 OK
{
  "quizId": "quiz_id",
  "score": 80,
  "correctCount": 4,
  "totalQuestions": 5,
  "earnedPoints": 8,
  "totalPoints": 10,
  "passed": true,
  "results": [
    {
      "questionId": "question_id",
      "question": "What is 2/5 + 1/5?",
      "userAnswer": "3/5",
      "correctAnswer": "3/5",
      "isCorrect": true,
      "explanation": "When adding fractions...",
      "points": 2,
      "earned": 2
    }
  ]
}
```

### Create Quiz (Admin Only)
```
POST /quizzes
Authorization: Bearer {admin_token}
Content-Type: application/json

Request Body:
{
  "title": "New Quiz",
  "description": "Quiz description",
  "subject": "Mathematics",
  "gradeLevel": "Basic 6",
  "topic": "Algebra",
  "duration": 20,
  "passingScore": 50,
  "questions": [
    {
      "question": "What is x + 5 = 10?",
      "type": "multiple-choice",
      "options": ["5", "10", "15", "20"],
      "correctAnswer": "5",
      "explanation": "x = 10 - 5 = 5",
      "difficulty": "Easy",
      "points": 1
    }
  ]
}

Response: 201 Created
```

## Progress Endpoints

### Get User Progress
```
GET /progress?subject=Mathematics&topic=Fractions
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "progress_id",
    "user": "user_id",
    "quizId": "quiz_id",
    "subject": "Mathematics",
    "topic": "Fractions",
    "score": 85,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "timeSpent": 450,
    "completedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Save Progress
```
POST /progress
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "quizId": "quiz_id",
  "subject": "Mathematics",
  "topic": "Fractions",
  "score": 85,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "answers": [
    {
      "questionId": "question_id",
      "userAnswer": "3/5",
      "isCorrect": true
    }
  ],
  "timeSpent": 450
}

Response: 201 Created
```

### Get Overall Statistics
```
GET /progress/stats
Authorization: Bearer {token}

Response: 200 OK
{
  "totalQuizzes": 15,
  "averageScore": 78,
  "totalTimeSpent": 6750,
  "subjectStats": {
    "Mathematics": {
      "quizzesTaken": 8,
      "averageScore": 82
    },
    "Science": {
      "quizzesTaken": 7,
      "averageScore": 74
    }
  },
  "recentActivity": [
    {
      "subject": "Mathematics",
      "topic": "Fractions",
      "score": 85,
      "completedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Subject Progress
```
GET /progress/subject/:subject
Authorization: Bearer {token}

Response: 200 OK
{
  "totalQuizzes": 8,
  "averageScore": 82,
  "topicProgress": {
    "Fractions": {
      "attempts": 3,
      "bestScore": 90,
      "lastAttempt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## User Endpoints

### Get Profile
```
GET /users/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "_id": "user_id",
  "name": "Kwame Mensah",
  "email": "kwame@example.com",
  "gradeLevel": "Basic 6",
  "subjects": ["Mathematics", "Science"],
  "avatar": ""
}
```

### Update Profile
```
PUT /users/profile
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "Updated Name",
  "gradeLevel": "Basic 7",
  "subjects": ["Mathematics", "Science", "English"]
}

Response: 200 OK
{
  // ... updated user
}
```

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error message"
}
```
