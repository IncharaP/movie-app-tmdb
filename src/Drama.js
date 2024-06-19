import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import Card from "./Card";

import Layout from './Layout'; // Import Layout component

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Drama = () => {
    const [dramaMovies, setDramaMovies] = useState([]);

    useEffect(() => {
        fetchDramaMovies();
    }, []);

    const fetchDramaMovies = () => {
        const dramaUrl = `${base_url}/discover/movie?with_genres=18&primary_release_year=2014&api_key=${API_key}`;

        fetch(dramaUrl)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setDramaMovies(data.results);
                } else {
                    setDramaMovies([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching drama movies:", error);
                setDramaMovies([]);
            });
    };

    return (
        <Layout>
           
            <h2 style={{ textAlign: 'center' }}>Drama Movies</h2>
            <div className="container">
                {dramaMovies.length === 0 ? (
                    <p className="notfound">No drama movies found</p>
                ) : (
                    dramaMovies.map((movie, index) => <Card key={index} info={movie} />)
                )}
            </div>
        </Layout>
    );
};

export default Drama;
