import React from 'react';
import { format } from 'date-fns';

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date } = movie;

  // TMDB poster base URL
  const posterBaseUrl = 'https://image.tmdb.org/t/p/original';


  const formatDate = format(new Date(movie.release_date), "MMMM d ,yyyy")
 ;

  return (
    <div className="movie-card">
      <img
        src={`${posterBaseUrl}${poster_path}`}
        alt={title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="release-date"> {formatDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
