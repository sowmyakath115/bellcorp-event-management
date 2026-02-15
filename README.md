# Bellcorp Event Management Application

A full-stack MERN application that allows users to explore, register, and manage event registrations efficiently.

## Tech Stack
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT

##  Features
- User registration & login
- Protected routes
- Event browsing with pagination
- Search & filter functionality
- Register & cancel event
- Seat management
- User dashboard (upcoming & past events)

##  Database Design
### Users
- name
- email
- password (hashed)
- registeredEvents (Array of Event IDs)

### Events
- name
- organizer
- location
- date
- description
- capacity
- availableSeats
- category

## Live Links
Frontend: https://bellcorp-event-management-ptit.vercel.app/
Backend: https://bellcorp-event-management.onrender.com/

## Demo Video
https://drive.google.com/file/d/1vL-KptQ0uCUNiJEnJvMSQvKdYDR2Xfu3/view?usp=sharing
