import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleMovie.css"; // Import your CSS file

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const SingleMovie = () => {
  const { name } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch movie details based on the search query
        const searchResponse = await fetch(
          `${base_url}/search/movie?api_key=${API_key}&query=${name}`
        );
        if (!searchResponse.ok) {
          throw new Error("Movie not found");
        }
        const searchData = await searchResponse.json();
        if (searchData.results && searchData.results.length > 0) {
          const movieId = searchData.results[0].id;

          // Fetch detailed movie information using the movie ID
          const movieDetailsResponse = await fetch(
            `${base_url}/movie/${movieId}?api_key=${API_key}&append_to_response=credits,videos`
          );
          if (!movieDetailsResponse.ok) {
            throw new Error("Movie details not found");
          }
          const movieDetailsData = await movieDetailsResponse.json();
          setMovie(movieDetailsData);
        } else {
          throw new Error("Movie not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [name]);

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <div className="poster-container">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
      </div>
      <div className="details-container">
      <h2 style={{ color: 'black', fontFamily: 'Times New Roman' }}>{movie.title}</h2>

        {movie.tagline && <p style={{ fontVariant: 'small-caps', color: '#ff6600', marginBottom: '20px' }}>{movie.tagline}</p>

      }
        <div className="movie-info">
      
  <p>
    <span style={{ backgroundColor: '#4c094c', color: '#ffffff', border: '2px solid #4c094c', padding: '5px', marginRight: '5px', borderRadius: '5px' }}>
      {movie.vote_average} / 10 ({movie.vote_count} votes)
    </span>
    <span style={{ backgroundColor: '#4c094c', color: '#ffffff', border: '2px solid #4c094c', padding: '5px', marginRight: '5px', borderRadius: '5px' }}>
      {movie.runtime} minutes
    </span>
    <span style={{ backgroundColor: '#4c094c', color: '#ffffff', border: '2px solid #4c094c', padding: '5px', borderRadius: '5px' }}>
      {movie.release_date}
    </span>
  </p>

  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {movie.genres && movie.genres.length > 0 &&
    movie.genres.map((genre, index) => (
      <div key={index} style={{
    
        backgroundColor: '37393c',
        color: 'black',
        padding: '5px 10px',
        borderRadius: '5px',
        margin: '10px',
        marginTop:'20px',
        display: 'inline-block',
        border:'dashed', 
       borderColor: 'lightslategray'
      }}>
        {genre.name}
      </div>
    ))
  }
</div>

        </div>
        <p className="movie-overview">
          <strong>Overview:</strong> {movie.overview}
        </p>
        
        <div className="trailer-section">
          {!showTrailer ? (
            <button onClick={toggleTrailer}>Watch Trailer</button>
          ) : (
            <iframe
              title="trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
