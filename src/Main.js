import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Card from "./Card";
import './Styles.css'; 


const API_key = "2bbf8e6b18b17cf23a340b2bb8c11484";
const base_url = "https://api.themoviedb.org/3";

const Main = () => {
    const [movieData, setMovieData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchMovies(`${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`);
    }, []);

    const fetchMovies = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovieData(data.results))
            .catch((error) => console.error("Error fetching movies:", error));
    };

    const handleCategoryClick = (categoryUrl) => {
        // Check if the clicked category is "Popular" or search input is empty
        if (categoryUrl === "/discover/movie?sort_by=popularity.desc" || search.trim() === "") {
            // Fetch movies for the main page
            fetchMovies(`${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`);
        } else {
            // For other categories, fetch movies based on the category URL
            fetchMovies(`${base_url}${categoryUrl}&api_key=${API_key}`);
        }
    };

    const searchMovie = () => {
        if (search.trim() === "") {
            // If search input is empty, fetch movies for the main page
            fetchMovies(`${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`);
        } else {
            fetch(`${base_url}/search/movie?api_key=${API_key}&query=${search}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results && data.results.length > 0) {
                        setMovieData(data.results);
                    } else {
                        setMovieData([]);
                    }
                    setSearch([]);
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                    setMovieData([]);
                });
        }
    };

    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        <li><Link to="/" onClick={() => handleCategoryClick("/discover/movie?sort_by=popularity.desc")}>Popular</Link></li>
                        <li><Link to="/theatre" onClick={() => handleCategoryClick("/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22")}>Theatre</Link></li>
                        <li><Link to="/kids" onClick={() => handleCategoryClick("/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc")}>Kids</Link></li>
                        <li><Link to="/drama" onClick={() => handleCategoryClick("/discover/movie?with_genres=18&primary_release_year=2014")}>Drama</Link></li>
                        <li><Link to="/comedy" onClick={() => handleCategoryClick("/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc")}>Comedy</Link></li>
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
                        <FaSearch/>
                    </button>
                </div>
            </div>
            <div className="container">
                {movieData.length === 0 ? (
                    <p className="notfound">Not Found</p>
                ) : (
                    movieData.map((movie, index) => <Card key={index} info={movie} />)
                )}
            </div>
        </>
    );
};

export default Main;
