open main branche for code !

This is a tracking system where, it's like a clone of gamyam bus yatra!

🚍 Bus Tracking System

A real-time bus tracking platform designed locate buses, check routes, and receive live updates.
The system provides driver tracking, nearby stop search, and SOS safety features to improve public transportation reliability.

This project demonstrates a production-grade full-stack architecture, built with modern technologies and team collaboration practices.

📌 Problem

No visibility of bus location
No live updates
Poor communication during emergencies
This system solves that by providing live GPS tracking and smart passenger tools.

🎯 Solution

Real-time bus location tracking
Nearby bus stop search
Bus number filtering
Driver location tracking
Emergency SOS feature
Passenger dashboard
Secure authentication system

✨ Features

🔐 Authentication
Phone number login
OTP verification
Secure session management

🗺 Bus Tracking
Real-time driver GPS location
Live bus movement updates

🔎 Smart Search
Search nearby bus stops
Filter buses by number
View bus details

🚨 SOS Safety
Emergency SOS button
Sends alert with passenger location

👤 User Dashboard
Profile management
Settings

🧱 System Architecture
Mobile App (React Native / Expo)
        │
        │ REST API
        ▼
Backend API (Node.js / NestJS)
        │
        │ Drizzle ORM
        ▼
Database ( PostgreSQL)
        │
        ▼
Real-time Services
(WebSockets / GPS updates)

🛠 Tech Stack

Frontend (Mobile)
React Native
Expo
Tailwind CSS
TypeScript

Backend
Node.js
NestJS

REST APIs
JWT Authentication

Database
PostgreSQL
Drizzle ORM

Dev Tools
Git
GitHub
Postman
VS Code

🔄 Development Process

Clone repository
git clone https://github.com/username/bus-tracking-system.git

Install dependencies
npm install
Run backend
npm run start:dev

Run mobile app
npx expo start

![trackingapp](https://github.com/user-attachments/assets/c9290ffd-c8da-4359-8ff9-991406987904)

