Instagram Mini Clone

A mini Instagram-style web application built using Node.js, Express, MongoDB, and React.
This project demonstrates backend development skills, database relationships, authentication, and frontend-backend integration.

🎯 Project Objective

The goal of this project is to build a simplified Instagram-like system that supports:

User authentication

Following users

Creating posts

Liking and commenting on posts

Viewing a personalized feed

This project was developed as part of a mini project assignment to test backend logic, database design, and full-stack integration.

🚀 Features
🔐 User Authentication

User signup

User login

Password hashing using bcrypt

JWT-based authentication for protected routes

🧑‍🤝‍🧑 Follow System

Users can follow other users

Users can unfollow users

Proper follower and following relationships are maintained

📝 Post Creation

Authenticated users can create posts

Each post contains:

Image URL

Caption

❤️ Likes

Users can like a post

Users cannot like the same post more than once

Like count updates correctly

💬 Comments

Users can comment on posts

Each comment stores:

Comment text

User who commented

Timestamp

📰 Feed

Feed API returns posts only from users the logged-in user follows

Mimics real Instagram feed behavior

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT (JSON Web Token)

bcrypt

Frontend

React (Vite)

Fetch API

Custom CSS (Instagram-inspired pastel UI)

🗂 Database Design
User Schema

username

email

password (hashed)

followers (array of user IDs)

following (array of user IDs)

Post Schema

author (user reference)

imageUrl

caption

likes (array of user IDs)

comments (user, text, createdAt)

createdAt

📡 API Endpoints
Authentication

POST /signup – Register a new user

POST /login – Login user and return JWT token

User Actions

POST /follow/:userId – Follow or unfollow a user

Posts

POST /posts – Create a new post

POST /posts/:id/like – Like or unlike a post

POST /posts/:id/comment – Add a comment to a post

GET /feed – Fetch feed for logged-in user

All protected routes require a valid JWT token in the Authorization header.

▶ How to Run the Project
1 Clone the Repository
git clone <your-github-repo-url>
cd instagram-mini

2 Backend Setup
cd backend
npm install


Create a .env file inside the backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

node server.js


Expected output:

Server running on port 5000
MongoDB Connected

3 Frontend Setup
cd frontend
npm install
npm run dev


Open the application in your browser:

http://localhost:5173

🧪 Testing

All backend APIs were tested using Postman

Frontend functionality tested manually:

Signup and Login

Create Post

Like and Comment

Feed updates based on follow/unfollow logic

📌 Project Highlights

         -Demonstrates CRUD operations

         -Implements JWT authentication

         -Shows one-to-many and many-to-many database relationships

         -Clean backend code structure

         -Frontend and backend fully integrated

         -Simple, clean, Instagram-inspired UI


Author
Vaishnavi Parsai
Engineering Student
Mini Project – Instagram Clone

Project Status

✔ All required features implemented
✔ Fully tested
✔ Ready for submission