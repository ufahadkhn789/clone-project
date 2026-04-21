import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-w-[160px] md:min-w-[240px] h-[90px] md:h-[135px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:z-50"
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      <img 
        src={movie.thumbnailUrl} 
        alt={movie.title}
        className="rounded object-cover w-full h-full"
      />
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-white text-xs md:text-sm font-semibold truncate">{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
