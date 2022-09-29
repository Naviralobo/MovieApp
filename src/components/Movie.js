import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const onDeleteMovie = () => {
    props.onDeleteMovie(props);
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={onDeleteMovie} className={classes.deleteButton}>
        Delete
      </button>
    </li>
  );
};

export default Movie;
