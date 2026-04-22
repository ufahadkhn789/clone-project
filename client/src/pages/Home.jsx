import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import api from '../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchMyList = async () => {
      try {
        const response = await api.get('/users/mylist');
        setMyList(response.data);
      } catch (error) {
        console.error('Error fetching my list:', error);
      }
    };

    fetchMovies();
    fetchMyList();
  }, []);

  const actionMovies = movies.filter(m => m.genre === 'Action');
  const sciFiMovies = movies.filter(m => m.genre === 'Sci-Fi');
  const dramaMovies = movies.filter(m => m.genre === 'Drama');
  const comedyMovies = movies.filter(m => m.genre === 'Comedy');
  const horrorMovies = movies.filter(m => m.genre === 'Horror');
  const documentaryMovies = movies.filter(m => m.genre === 'Documentary');

  return (
    <div className="pb-20">
      {movies.length > 0 && <Banner movie={movies[Math.floor(Math.random() * movies.length)]} />}
      
      <div className="pl-4 md:pl-12 -mt-32 relative z-20 space-y-8">
        {myList.length > 0 && <MovieRow title="My List" movies={myList} />}
        {actionMovies.length > 0 && <MovieRow title="Action Movies" movies={actionMovies} />}
        {sciFiMovies.length > 0 && <MovieRow title="Sci-Fi & Fantasy" movies={sciFiMovies} />}
        {comedyMovies.length > 0 && <MovieRow title="Comedies" movies={comedyMovies} />}
        {dramaMovies.length > 0 && <MovieRow title="Dramas" movies={dramaMovies} />}
        {horrorMovies.length > 0 && <MovieRow title="Horror Movies" movies={horrorMovies} />}
        {documentaryMovies.length > 0 && <MovieRow title="Documentaries" movies={documentaryMovies} />}
        {movies.length > 0 && <MovieRow title="All Movies" movies={movies} />}
      </div>
    </div>
  );
};

export default Home;
