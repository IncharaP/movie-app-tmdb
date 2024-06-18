import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import Card from "./Card";

import Layout from './Layout'; // Import Layout component

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Comedy = () => {
    const [comedyMovies, setComedyMovies] = useState([]);

    useEffect(() => {
        fetchComedyMovies();
    }, []);

    const fetchComedyMovies = () => {
        const comedyUrl = `${base_url}/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=${API_key}`;

        fetch(comedyUrl)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setComedyMovies(data.results);
                } else {
                    setComedyMovies([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching comedy movies:", error);
                setComedyMovies([]);
            });
    };

    return (
        <Layout>
       
            <h2 style={{ textAlign: 'center' }}>Comedy Movies</h2>
            <div className="container">
                {comedyMovies.length === 0 ? (
                    <p className="notfound">No comedy movies found</p>
                ) : (
                    comedyMovies.map((movie, index) => <Card key={index} info={movie} />)
                )}
            </div>
        </Layout>
    );
};

export default Comedy;
