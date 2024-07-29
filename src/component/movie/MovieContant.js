import React, { useState, useEffect, useContext } from 'react';
import { GenresContext } from '../sidebar/fillter/context/GenresContext';
import { LanguageContext } from '../sidebar/fillter/context/languageContext';
import { PageContext } from '../sidebar/fillter/context/PageContext';
import { KeywordsContext } from '../sidebar/fillter/context/KeywordContext';

import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import MovieCard from './MovieCard';
import './contant.css';

export default function ContantMovie() {
  const { selectedGenres } = useContext(GenresContext);
  const { selectedLanguage } = useContext(LanguageContext);
  const { page, setPage } = useContext(PageContext);
  const { keywords } = useContext(KeywordsContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      let keywordIds = keywords.map(keyword => keyword.id).join(',');
      
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${keywordIds ? `&with_keywords=${keywordIds}` : ''}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDA2ZmI3MjM4ZTM0ZTlmMjU0NDllOWUxZmI2MmI1YyIsIm5iZiI6MTcyMDI4MDYxNC40MzQ2NjIsInN1YiI6IjY2ODk2MjFjMmY4MTM0NzI0Yjg5MDJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAAh0lm5trzy11W0Mj3kdDJ-mqnojivaEw0suodxvik'
        }
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const moviesData = data.results.map(movie => ({
          genre_ids: movie.genre_ids,
          id: movie.id,
          original_language: movie.original_language,
          original_title: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          release_date: movie.release_date,
          title: movie.title,
          video: movie.video,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count
        }));

        if (page === 1) {
          setMovies(moviesData);
          setDisplayedMovies(moviesData.slice(0, 20));
        } else {
          setMovies(prevMovies => [...prevMovies, ...moviesData]);
          setDisplayedMovies(prevDisplayedMovies => [...prevDisplayedMovies, ...moviesData]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, keywords]);

  // Combined logic for both Genres and Language filtration
  useEffect(() => {
    let filteredMovies = movies;

    if (selectedGenres.length > 0) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre_ids.some(id => selectedGenres.includes(id))
      );
    }

    if (selectedLanguage !== "en") {
      filteredMovies = filteredMovies.filter(movie =>
        movie.original_language === selectedLanguage
      );
    }

    setDisplayedMovies(filteredMovies);
  }, [selectedGenres, selectedLanguage, movies]);

  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="movie-list">
        {displayedMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button className='btn-more-movies' onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
    </>
  );
}
