import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const response = await api.get('/users/mylist');
        setList(response.data);
      } catch (error) {
        console.error('Error fetching my list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, []);

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300">
        My List
      </h1>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix"></div>
        </div>
      ) : list.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center text-gray-400">
          <p className="text-xl">You haven't added any movies to your list yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyList;
