import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import Card from "./Card";

const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Category = ({ categoryType }) => { // Pass categoryType as a prop
    const [movies, setMovies] = useState([]);
    const history = useHistory(); // Initialize useHistory

    useEffect(() => {
        fetchMovies(categoryType); // Fetch movies based on the categoryType
    }, [categoryType]);

    const fetchMovies = (categoryType) => {
        let url;
        // Determine the URL based on the categoryType
        if (categoryType === "Popular") {
            url = `${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`;
        } else if (categoryType === "Theatre") {
            url = `${base_url}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=${API_key}`;
        } else if (categoryType === "Kids") {
            url = `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_key}`;
        } else if (categoryType === "Drama") {
            url = `${base_url}/discover/movie?with_genres=18&primary_release_year=2014&api_key=${API_key}`;
        } else if (categoryType === "Comedy") {
            url = `${base_url}/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=${API_key}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setMovies(data.results);
                } else {
                    setMovies([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                setMovies([]);
            });
    };

    return (
        <>
            <div className="header">
                {/* Button to go back */}
                <button onClick={() => history.goBack()}>Go Back</button>
            </div>
            <h2>{categoryType} Movies</h2>
            <div className="container">
                {movies.length === 0 ? (
                    <p className="notfound">Not Found</p>
                ) : (
                    movies.map((movie, index) => <Card key={index} info={movie} />)
                )}
            </div>
        </>
    );
};

export default Category;
