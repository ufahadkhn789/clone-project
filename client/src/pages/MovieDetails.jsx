import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, Plus } from 'lucide-react';
import api from '../services/api';
import VideoPlayer from '../components/VideoPlayer';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix"></div></div>;
  }

  if (!movie) {
    return <div className="h-screen w-full flex items-center justify-center text-xl">Movie not found</div>;
  }

  if (isPlaying) {
    return (
      <div className="relative h-screen w-full bg-black">
        <button 
          onClick={() => setIsPlaying(false)}
          className="absolute top-6 left-6 z-50 text-white hover:text-gray-300 transition"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <VideoPlayer videoUrl={movie.videoUrl} />
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/60 to-black/20"></div>
      </div>

      <div className="relative z-10 pt-32 px-4 md:px-12 max-w-4xl">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
        
        <div className="flex items-center gap-4 mb-8 text-sm md:text-base text-gray-300">
          <span className="text-green-500 font-semibold">98% Match</span>
          <span>{movie.releaseYear}</span>
          <span className="border border-gray-600 px-1 text-xs">HD</span>
          <span>{movie.genre}</span>
        </div>

        <p className="text-lg text-gray-200 mb-10 leading-relaxed">
          {movie.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => setIsPlaying(true)}
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-white/80 transition"
          >
            <Play fill="black" className="w-6 h-6" /> Play
          </button>
          
          <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 hover:border-white text-white transition bg-black/50">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
