Quizora – Quiz Website

Project Overview  
Quizora is a full-stack quiz web application designed to allow users to create, attempt, and analyze quizzes in an interactive and user-friendly environment. The project focuses on a clean dark-themed user interface, smooth quiz flow, and reliable functionality across all features. Users can register, log in, create quizzes with multiple questions, take quizzes with a timer-based system, and view detailed result analytics. The application is built using modern web technologies and follows a scalable frontend-backend architecture.

Getting Started  
You can run and edit this project locally using your preferred development environment.

Prerequisites  
Node.js  
npm  
MongoDB Atlas account  

Running the Project Locally  
Follow the steps below to set up the project:

# Clone the repository  
git clone https://github.com/Manalinarkhede/CODSOFT-QUIZ-Website.git  

# Navigate to the project directory  
cd CODSOFT-QUIZ-Website  

# Install backend dependencies  
cd backend  
npm install  

# Create backend environment variables  
Create a .env file in the backend folder and add:  
MONGO_URI=your_mongodb_atlas_connection_string  
JWT_SECRET=your_jwt_secret  
PORT=5000  

# Start the backend server  
npm start  

# Install frontend dependencies  
cd ../frontend  
npm install  

# Create frontend environment variables  
Create a .env file in the frontend folder and add:  
REACT_APP_API_URL=http://localhost:5000  

# Start the frontend development server  
npm start  

The frontend will run on http://localhost:3000  
The backend will run on http://localhost:5000  

Features  
User registration and login with JWT authentication  
Create, edit, and delete quizzes  
Add multiple questions and answer options  
One-question-at-a-time quiz flow with timer  
Automatic handling of skipped questions  
Result dashboard with score and accuracy analytics  
Fully responsive dark-themed user interface  

Tech Stack  
Frontend: React, Bootstrap, Axios, React Router  
Backend: Node.js, Express.js, MongoDB Atlas, Mongoose  
Authentication: JSON Web Tokens (JWT)  

Deployment  
Frontend is deployed on Vercel  
Backend is deployed on Render  
Database is hosted on MongoDB Atlas  

Author  
Manali Narkhede  
GitHub: https://github.com/Manalinarkhede  

License  
This project is created for learning and educational purposes.
