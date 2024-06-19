import { NavLink, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import "./SingleMovie.css";

const SingleMovie = () => {
  const { id } = useParams();

  const { isLoading, movie, isError } = useFetch(`/${id}`);

  if (isLoading) {
    return (
      <section className="movie-section">
        <div className="loading">Loading....</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="movie-section">
        <div className="error">Error fetching movie details.</div>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="movie-section">
        <div className="error">Movie details not available.</div>
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </figure>
        <div className="card-content">
  <p className="title">{movie.title}</p>
  <p className="card-text"><span className="label">Released : </span> <span className="value">{movie.release_date}</span></p>
  <p className="card-text"><span className="label">Genre : </span> <span className="value">{movie.genres.map(genre => genre.name).join(', ')}</span></p>
  <p className="card-text"><span className="label">Rating : </span> <span className="value">{movie.vote_average} / 10</span></p>
  <p className="card-text"><span className="label">Country : </span> <span className="value">{movie.production_countries.map(country => country.name).join(', ')}</span></p>
  <p className="card-text"><span className="label">Overview : </span> <span className="value">{movie.overview}</span></p>
  <NavLink to="/" className="back-btn">
    Go Back
  </NavLink>
</div>

      </div>
    </section>
  );
};

export default SingleMovie;
