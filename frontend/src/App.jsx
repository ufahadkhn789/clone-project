import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import MyList from './pages/MyList';

// Components
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="app bg-[#141414] min-h-screen text-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/movie/:id" element={user ? <MovieDetails /> : <Navigate to="/login" />} />
          <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
          <Route path="/mylist" element={user ? <MyList /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
