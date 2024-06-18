import React, { useState, useEffect } from "react";
import Card from "./Card";


const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = () => {
        const popularUrl = `${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`;

        fetch(popularUrl)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setPopularMovies(data.results);
                } else {
                    setPopularMovies([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching popular movies:", error);
                setPopularMovies([]);
            });
    };

    return (
        <>
             
            <h2 style={{ textAlign: 'center' }}>Popular Movies</h2>
            <div className="container">
                {popularMovies.length === 0 ? (
                    <p className="notfound">No popular movies found</p>
                ) : (
                    popularMovies.map((movie, index) => <Card key={index} info={movie} />)
                )}
            </div>
        </>
    );
};

export default Popular;
