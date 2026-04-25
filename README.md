# Netflix Clone Fullstack

A fully functional Netflix clone built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features
- User Authentication (JWT + bcrypt)
- Browse movies by categories
- Search for movies
- View movie details
- Play video trailers
- Responsive UI matching Netflix's modern dark theme

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (local or Atlas)

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Rename `.env.example` to `.env`
   - Update `MONGO_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string
4. Seed the database with sample movies:
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend should now be running on `http://localhost:5000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Check the `.env` file to ensure `VITE_API_URL` points to your backend URL (default is `http://localhost:5000/api`).
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend should now be running (usually on `http://localhost:5173`).

## Usage
- Open your browser to the frontend URL.
- Create an account or log in.
- Browse, search, and play movies!
