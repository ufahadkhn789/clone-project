import React from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Banner = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div className="relative w-full h-[80vh] bg-black">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      </div>

      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{movie.title}</h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md line-clamp-3 text-gray-200">{movie.description}</p>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded md:px-8 md:py-3 font-bold hover:bg-white/80 transition"
          >
            <Play fill="black" className="w-5 h-5 md:w-6 md:h-6" /> Play
          </button>
          <button 
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 rounded md:px-8 md:py-3 font-bold hover:bg-gray-500/50 transition"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
