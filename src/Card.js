// Card.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ info }) => {
  let img_path = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie">
      <Link to={`/movie/${info.title}`}>
        <img src={img_path + info.poster_path} alt={info.title || ""} className="poster" />
        <div className="overlay">
          <h4 className="title">{info.title}</h4>
          <p>{info.vote_average} / 10</p> {/* Display rating */}
        </div>
      </Link>
    </div>
  );
};

export default Card;
