import { useState, useEffect } from "react";

const API_KEY = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const useFetch = (name) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      setIsError(false); // Reset error state

      try {
        // Step 1: Search for movies by name
        const searchResponse = await fetch(`${base_url}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`);
        if (!searchResponse.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const searchData = await searchResponse.json();

        // Step 2: Retrieve detailed movie information using the first result
        if (searchData.results && searchData.results.length > 0) {
          const movieId = searchData.results[0].id;
          const detailsResponse = await fetch(`${base_url}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
          if (!detailsResponse.ok) {
            throw new Error("Failed to fetch movie details");
          }
          const detailsData = await detailsResponse.json();
          setMovie(detailsData);
        } else {
          setMovie(null); // Clear movie details if no results found
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (name) {
      fetchMovie();
    } else {
      setIsLoading(false);
    }
  }, [name]);

  return { isLoading, movie, isError };
};

export default useFetch;
