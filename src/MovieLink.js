import React from "react";
import { Link } from "react-router-dom";

const MovieLink = ({ movie, handleMouseEnter }) => {
  const formatTitle = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  return (
    <Link
      key={movie.id}
      to={`/movie/${encodeURIComponent(formatTitle(movie.title))}`}
      className="movie"
      onMouseEnter={() => handleMouseEnter(movie.id)}
    >
      {/* Link content, e.g., movie card */}
      <div className="movie-card">
        <img src={movie.poster} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    </Link>
  );
};

export default MovieLink;
