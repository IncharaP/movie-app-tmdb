import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Card from "./Card";
import "./Styles.css";

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Main = () => {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies(`${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`);
  }, []);

  const fetchMovies = useCallback((url) => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((data) => {
        setMovieData(data.results);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const fetchMovieDetails = useCallback(async (movieId) => {
    try {
      const res = await fetch(`${base_url}/movie/${movieId}?api_key=${API_key}`);
      if (!res.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  }, []);

  const handleCategoryClick = (categoryUrl) => {
    fetchMovies(`${base_url}${categoryUrl}&api_key=${API_key}`);
  };

  const searchMovie = () => {
    if (search.trim() === "") {
      fetchMovies(`${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`);
    } else {
      setIsLoading(true);
      fetch(`${base_url}/search/movie?api_key=${API_key}&query=${encodeURIComponent(search)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch search results");
          }
          return res.json();
        })
        .then((data) => {
          setMovieData(data.results);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setError("Failed to fetch search results. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleMouseEnter = useCallback((movieId) => {
    fetchMovieDetails(movieId).then((data) => {
      if (data) {
        setMovieData((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieId ? { ...movie, rating: data.vote_average } : movie
          )
        );
      }
    });
  }, [fetchMovieDetails]);

  const formatTitle = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
      .replace(/\s+/g, "-"); // Replace spaces (including multiple spaces) with hyphens
  };
  

  return (
    <>
      <div className="header">
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={() => handleCategoryClick("/discover/movie?sort_by=popularity.desc")}>
                Popular
              </Link>
            </li>
            <li>
              <Link
                to="/theatre"
                onClick={() =>
                  handleCategoryClick(
                    "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"
                  )
                }
              >
                Theatre
              </Link>
            </li>
            <li>
              <Link
                to="/kids"
                onClick={() =>
                  handleCategoryClick(
                    "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"
                  )
                }
              >
                Kids
              </Link>
            </li>
            <li>
              <Link to="/drama" onClick={() => handleCategoryClick("/discover/movie?with_genres=18&primary_release_year=2014")}>
                Drama
              </Link>
            </li>
            <li>
              <Link
                to="/comedy"
                onClick={() =>
                  handleCategoryClick("/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc")
                }
              >
                Comedy
              </Link>
            </li>
          </ul>
        </nav>
        <div className="search-btn">
          <input
            type="text"
            placeholder="Enter Movie Name"
            className="inputText"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyPress={(evt) => {
              if (evt.key === "Enter") searchMovie();
            }}
          />
          <button onClick={searchMovie} className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="container">
        {movieData.length === 0 ? (
          <p className="notfound">No movies found.</p>
        ) : (
          movieData.map((movie) => (
            <Link
              key={movie.title}
              to={`/movie/${formatTitle(movie.title)}`}
              className="movie"
              onMouseEnter={() => handleMouseEnter(movie.id)}
            >
              <Card info={movie} />
              <div className="overlay">
                <h4>{movie.title}</h4>
                {movie.rating && <p>Rating: {movie.rating}</p>}
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Main;
