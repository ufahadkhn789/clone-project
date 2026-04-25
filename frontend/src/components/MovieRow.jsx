import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 group relative">
      <h2 className="w-56 text-xl md:text-2xl font-semibold text-[#e5e5e5] hover:text-white transition duration-200 cursor-pointer">
        {title}
      </h2>
      
      <div className="relative">
        <ChevronLeft 
          className="absolute left-0 top-0 bottom-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 bg-black/50 text-white hidden md:block" 
          onClick={() => handleScroll('left')}
        />
        
        <div 
          ref={rowRef}
          className="flex items-center gap-2 md:gap-4 overflow-x-scroll scrollbar-hide py-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        
        <ChevronRight 
          className="absolute right-0 top-0 bottom-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 bg-black/50 text-white hidden md:block" 
          onClick={() => handleScroll('right')}
        />
      </div>
    </div>
  );
};

export default MovieRow;
