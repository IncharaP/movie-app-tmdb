import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
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

    return (
        <Layout> {/* Use Layout component for consistent navigation */}
       
            <h2 style={{ textAlign: 'center' }}>Theatre Movies</h2>
            <div className="container">
                {theatreMovies.length === 0 ? (
                    <p className="notfound">No theatre movies found</p>
                ) : (
                    theatreMovies.map((movie, index) => <Card key={index} info={movie} />)
                )}
            </div>
        </Layout>
    );
};

export default Theatre; // Correct placement of export statement
