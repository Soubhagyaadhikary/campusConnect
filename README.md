# 🎓 Campus Event Companion App

A full-featured React prototype for the hackathon problem statement.

## Features
- **Centralized event listings** with search & category filters
- **Event registration** with toast feedback
- **QR code generation** for attendance verification  
- **Calendar export** (.ics file — works with Google Calendar, Outlook, Apple Calendar)
- **My Events** page — all registrations in one place
- **Notifications** with unread badges
- **Student profile** with stats

## Quick Start

### Step 1 — Prerequisites
Make sure you have Node.js installed:
```
node --version   # should be 16+
npm --version
```

### Step 2 — Install & Run
```bash
# Navigate into the project folder
cd campus-event-app

# Install all dependencies (takes ~1 min first time)
npm install

# Start the development server
npm start
```

The app opens at **http://localhost:3000** automatically.

## Project Structure
```
src/
├── App.jsx                  ← Router + app shell
├── index.js                 ← React entry point
├── index.css                ← Global CSS variables & animations
├── data/
│   └── events.js            ← All mock events & notification data
├── context/
│   └── AppContext.jsx       ← Global state (registrations, toasts, notifications)
├── components/
│   ├── BottomNav.jsx        ← Navigation bar
│   ├── EventCard.jsx        ← Event list card
│   ├── QRModal.jsx          ← QR code bottom sheet
│   └── Toast.jsx            ← Toast notification system
└── pages/
    ├── Home.jsx             ← Discover events + search + filters
    ├── EventDetail.jsx      ← Full event info + register + QR + calendar export
    ├── MyEvents.jsx         ← Registered events list
    ├── Notifications.jsx    ← Alerts & reminders
    └── Profile.jsx          ← Student profile & settings
```

## To add real data later
1. Replace mock data in `src/data/events.js` with API calls
2. Connect `src/context/AppContext.jsx` to a backend
3. Add auth with `react-router-dom` protected routes

## Build for production
```bash
npm run build
```
Output goes to `build/` folder — deploy anywhere (Netlify, Vercel, GitHub Pages).
