Lead Tracker CRM

About the Project

Lead Tracker CRM is a web application that helps users manage business leads in one place.
Users can add new leads, update their details, track their status, search for leads, 
and delete records when they are no longer needed. The goal of this project is to make
lead management simple and organized for small businesses and freelancers.

Features

Add new leads
Edit lead details
Delete leads
Search and filter leads
Dashboard to view all leads
Responsive user interface

Tech Stack

Frontend

React.js
React Router
Axios
Bootstrap

Backend

Node.js
Express.js

Database

MongoDB Atlas
Mongoose

Deployment

Vercel (Both Frontend and Backend)

How to Run the Project Locally

1. Clone the repository

git clone <your-repository-url>
cd lead-tracker-crm

2. Install dependencies

Frontend:

cd frontend
npm install

Backend:

cd backend
npm install

3. Create a .env file in the backend
   
MONGO_URI=mongodb+srv://ananthesakki01_db_user:password @cluster0.lqrmbms.mongodb.net/?appName=Cluster0
PORT=5000
CLIENT_URL=http://localhost:3000

4. Create a .env file in the frontend

VITE_API_URL=https://lead-tracker-server.vercel.app/api

5. Start the backend
   
cd backend

npm run seed    # loads dummy data

npm run dev

6. Start the frontend

cd frontend

npm run dev

7. Open the Link

Author
Ananth E
