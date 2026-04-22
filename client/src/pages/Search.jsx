import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const endpoint = query ? `/movies/search?q=${query}` : '/movies';
        const response = await api.get(endpoint);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300">
        {query ? `Search results for "${query}"` : 'Explore all movies'}
      </h1>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center text-gray-400">
          <p className="text-xl">No movies found for your search.</p>
          <p className="mt-2">Try searching with another keyword.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
