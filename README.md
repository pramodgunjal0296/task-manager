# ✅ Task Manager Application

A full-stack Task Manager application built with **React**, **Node.js**, **Express**, and **MongoDB**, secured using **OAuth 2.0 (Google Login)**. This project is containerized using Docker and includes both frontend and backend services.

---

## 📌 Features

- 🔐 **OAuth 2.0 Authentication (Google Login)** using Passport.js
- 📝 **Task CRUD** operations (Create, Read, Update, Delete)
- 🎨 Clean and responsive **React-based UI**
- ⚡ **Animations** when creating, updating, or deleting tasks
- 🗂 **MongoDB** integration using Mongoose
- 🐳 Optional **Docker** support for easy deployment

---
## 🚀 How to Run the App
## Without docker 
1. Install dependencies for both frontend and backend:
cd backend
npm install
cd ../frontend
npm install
2.Configure environment variables:
Create a .env file inside the backend folder with the following content:
AS below mentioned credentials put in your backend folder .env file
Start the backend server:
cd backend
npm run dev
4.Start the frontend application:
cd frontend
npm start

⚠️ Make sure MongoDB is running locally or accessible via your connection string.

### 🐳 Using Docker (Recommended)

1. **Make sure Docker is installed**  
2. Run the app with one command:
 code path: task-manager/
docker-compose up --build

**Frontend runs at: http://localhost:3000**

**Backend runs at: http://localhost:5000**

**backend/ .env file credentials**


** Backend - API Endpoints**
All task routes are protected and require login.

Auth: 

Method	Route	              Description
GET	  /auth/google	        Google OAuth login
GET	  /auth/google/callback	OAuth redirect URI
GET	  /auth/user	        Get current user
GET	  /auth/logout	        Log out user

 Tasks:
Method   Route            Description
GET    /api/tasks        Get all tasks
POST   /api/tasks        Create a task
PUT    /api/tasks/:id   Update a task
DELETE /api/tasks/:id   Delete a task


 **Frontend - UI Features**
- OAuth 2.0 login screen
- Task dashboard showing tasks by the logged-in user
- Create new tasks using a form
- Edit task status, title, or description
- Delete tasks with confirmation
**Animations using framer-motion**:
- Slide-in on new task
- Scale-up on update
- Fade-out on delete

**Docker Setup Details**
Dockerfile (Backend & Frontend)
Each folder (frontend, backend) contains a Dockerfile that:
Installs dependencies
Builds the app (React or Node)
Serves the app with appropriate commands (Node )
docker-compose.yml
Spins up:
React frontend (frontend)
Express backend (backend)
MongoDB database (mongo)
Uses volume for MongoDB persistence

**Bonus Features**
🔄 Smooth UI transitions

🔒 Session-secured backend routes

🌐 Inline-styled login screen

📦 Dockerized microservices with MongoDB container


🧑‍💻 Author
Developed by Pramod Gunjal(Reactjs developer)
📫 For queries: [pramodgunjal2023@gmail.com]
