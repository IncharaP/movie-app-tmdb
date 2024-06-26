import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Layout from './Layout'; // Import Layout component

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Kids = () => {
    const [kidsMovies, setKidsMovies] = useState([]);

    useEffect(() => {
        fetchKidsMovies();
    }, []);

    const fetchKidsMovies = () => {
        const kidsUrl = `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_key}`;

        fetch(kidsUrl)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setKidsMovies(data.results);
                } else {
                    setKidsMovies([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching kids movies:", error);
                setKidsMovies([]);
            });
    };

    const formatTitle = (title) => {
        // Remove non-alphanumeric characters and replace spaces with hyphens
        return title
            .toLowerCase() // Convert to lowercase
            .trim() // Remove whitespace from both ends
            .replace(/[^a-zA-Z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
            .replace(/\s+/g, "-"); // Replace spaces with hyphens
    };

    return (
        <Layout>
            <h2 style={{ textAlign: 'center' }}>Kids Movies</h2>
            <div className="container">
                {kidsMovies.length === 0 ? (
                    <p className="notfound">No kids movies found</p>
                ) : (
                    kidsMovies.map((movie, index) => (
                        <Link key={movie.id} to={`/movie/${formatTitle(movie.title)}`} className="movie-link">
                            <Card info={movie} />
                        </Link>
                    ))
                )}
            </div>
        </Layout>
    );
};

export default Kids;
