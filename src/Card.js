import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ info }) => {
  let img_path = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie">
      <Link to={`/movie/${info.id}`}>
        <img src={img_path + info.poster_path} alt={info.title || ""} className="poster" />
      </Link>
      <div className="movie-details">
        <div className="box">
          <h4 className="title">{info.title}</h4>
         
        </div>
        
      </div>
    </div>
  );
};

export default Card;
