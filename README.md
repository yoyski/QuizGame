# QuizGame 🎯

A fullstack quiz platform where users can create, manage, and play quizzes. Built with React, Node.js, Express, and MongoDB.

🔗 **Live Demo:** [quiz-game-yoyski.vercel.app](https://quiz-game-yoyski.vercel.app)

---

## Features

- 🔐 **Authentication** — Secure JWT-based auth with httpOnly cookies and bcrypt password hashing
- 📝 **Quiz Management** — Create, edit, and delete your own quizzes
- 🌐 **Public Quizzes** — Browse and play published quizzes from other users
- 🎮 **Quiz Gameplay** — Interactive quiz experience with score tracking and answer review
- ⭐ **Favorites** — Bookmark quizzes to your favorites list
- 📱 **Responsive** — Works on both mobile and desktop

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM
- Zustand (state management)
- Axios
- Tailwind CSS
- React Hot Toast

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- cookie-parser

---

## Project Structure

```
QuizGame/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainLayout.jsx
│   │   │   └── navigation.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── CreateQuizForm.jsx
│   │   │   ├── PlayQuiz.jsx
│   │   │   ├── MyQuizzes.jsx
│   │   │   └── Favorite.jsx
│   │   ├── stores/
│   │   │   ├── authStore.js
│   │   │   └── quizStore.js
│   │   ├── lib/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── vercel.json
│
└── server/                   # Express backend
    ├── controllers/
    │   ├── authController.js
    │   └── quizController.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── User.js
    │   └── Quiz.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── quizRoutes.js
    └── index.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yoyski/QuizGame.git
cd QuizGame
```

2. **Setup the server**
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

3. **Setup the client**
```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the client:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register a new user | ❌ |
| POST | `/auth/login` | Login and receive cookie | ❌ |
| POST | `/auth/logout` | Clear auth cookie | ❌ |
| GET | `/auth/me` | Get current user | ✅ |

### Quiz
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/quiz` | Get all published quizzes | ❌ |
| GET | `/quiz/my` | Get current user's quizzes | ✅ |
| GET | `/quiz/:id` | Get a quiz by ID | ❌ |
| POST | `/quiz` | Create a new quiz | ✅ |
| PUT | `/quiz/:id` | Update a quiz | ✅ |
| DELETE | `/quiz/:id` | Delete a quiz | ✅ |

---

## Deployment

- **Frontend** — Vercel
- **Backend** — Render
- **Database** — MongoDB Atlas

---

## License

MIT