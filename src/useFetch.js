import { useState, useEffect } from "react";

const API_KEY = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3/movie";

const useFetch = (endpoint) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${base_url}${endpoint}?api_key=${API_KEY}`);
        const data = await response.json();
        if (data) {
          setMovie(data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [endpoint]);

  return { isLoading, movie, isError };
};

export default useFetch;
