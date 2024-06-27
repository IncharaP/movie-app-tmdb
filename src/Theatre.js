import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Layout from './Layout'; // Import Layout component

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Theatre = () => {
  const [theatreMovies, setTheatreMovies] = useState([]);

  useEffect(() => {
    fetchTheatreMovies();
  }, []);

  const fetchTheatreMovies = () => {
    const theatreUrl = `${base_url}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=${API_key}`;

    fetch(theatreUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setTheatreMovies(data.results);
        } else {
          setTheatreMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching theatre movies:", error);
        setTheatreMovies([]);
      });
  };

  const formatTitle = (title) => {
    // Remove non-alphanumeric characters and replace spaces with hyphens
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/[^\w\s]/g, "") // Remove non-alphanumeric characters except spaces
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  };
  
  

  return (
    <Layout> {/* Use Layout component for consistent navigation */}
      <h2 style={{ textAlign: 'center' }}>Theatre Movies</h2>
      <div className="container">
        {theatreMovies.length === 0 ? (
          <p className="notfound">No theatre movies found</p>
        ) : (
          theatreMovies.map((movie, index) => (
            <Link key={movie.title} to={`/movie/${formatTitle(movie.title)}`} className="movie-link">
            <Card info={movie} />
          </Link>
          

          ))
        )}
      </div>
    </Layout>
  );
};

export default Theatre;
