import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  if (!user) return null;

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <h1 className="text-netflix text-2xl md:text-4xl font-bold cursor-pointer transition-transform hover:scale-105">NETFLIX</h1>
          </Link>
          <ul className="hidden md:flex gap-4 text-sm font-medium text-gray-300">
            <li className="cursor-pointer hover:text-white transition" onClick={() => navigate('/')}>Home</li>
            <li className="cursor-pointer hover:text-white transition" onClick={() => navigate('/search?q=Action')}>TV Shows</li>
            <li className="cursor-pointer hover:text-white transition" onClick={() => navigate('/search?q=Sci-Fi')}>Movies</li>
            <li className="cursor-pointer hover:text-white transition" onClick={() => navigate('/search?q=')}>New & Popular</li>
            <li className="cursor-pointer hover:text-white transition" onClick={() => navigate('/')}>My List</li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-black/40 border border-gray-600 rounded px-2 py-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              className="bg-transparent text-white text-sm focus:outline-none ml-2 w-32 md:w-48 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                navigate(`/search?q=${e.target.value}`);
              }}
            />
          </form>
          <Bell className="w-5 h-5 cursor-pointer hidden md:block" />
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="hidden group-hover:block absolute top-8 right-0 bg-black/90 border border-gray-800 rounded py-2 w-32">
              <p className="px-4 py-2 text-sm text-gray-300 hover:text-white">{user.username}</p>
              <hr className="border-gray-800" />
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
