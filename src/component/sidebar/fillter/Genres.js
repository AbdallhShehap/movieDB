import React, { useState, useEffect, useContext } from 'react';
import { GenresContext } from '../fillter/context/GenresContext';
import "./genres.css";

export default function Genres() {
  const { selectedGenres, setSelectedGenres } = useContext(GenresContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const storedGenres = JSON.parse(localStorage.getItem('selectedGenres')) || [];
    setSelectedGenres(storedGenres);
  }, [setSelectedGenres]);

  useEffect(() => {
    const fetchGenres = async () => {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDA2ZmI3MjM4ZTM0ZTlmMjU0NDllOWUxZmI2MmI1YyIsIm5iZiI6MTcyMDI4MDYxNC40MzQ2NjIsInN1YiI6IjY2ODk2MjFjMmY4MTM0NzI0Yjg5MDJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAAh0lm5trzy11W0Mj3kdDJ-mqnojivaEw0suodxvik'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const genresData = data.genres.map(genre => ({
          id: genre.id,
          name: genre.name
        }));
        setGenres(genresData);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  const handleGenresClick = (id) => {
    let updatedGenres;
    if (selectedGenres.includes(id)) {
      updatedGenres = selectedGenres.filter(genreId => genreId !== id);
    } else {
      updatedGenres = [...selectedGenres, id];
    }
    setSelectedGenres(updatedGenres);
    localStorage.setItem('selectedGenres', JSON.stringify(updatedGenres));
  };

  return (
    <div className='genres'>
      <p style={{ color: "gray" }}>Genres</p>
      <div className='genres-btn-container'>
        {genres.map(genre => (
          <div className='genres-btn' key={genre.id} onClick={() => handleGenresClick(genre.id)}>
            <span className='genre-name'>{genre.name}</span>
            <div className={`genres-first-overlay ${selectedGenres.includes(genre.id) ? "active" : ""}`}>
              <span className='hover-genre-name'>{genre.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



