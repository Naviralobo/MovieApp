import React, { useRef } from "react";
import classes from "./Form.module.css";

const Form = (props) => {
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();

  const addMovieHandler = (event) => {
    event.preventDefault();
    const movieName = nameInputRef.current.value;
    const movieDescription = descriptionInputRef.current.value;
    const movieDate = dateInputRef.current.value;
    const NewMovieObj = {
      title: movieName,
      releaseDate: movieDate,
      openingText: movieDescription,
    };
    props.onAddMovie(NewMovieObj);
  };
  return (
    <form onSubmit={addMovieHandler}>
      <div>
        <label htmlFor="movieTitle">Title</label>
        <input id="movieTitle" type="text" ref={nameInputRef} />
      </div>
      <div>
        <label htmlFor="movieDescription">Opening Text</label>
        <textarea id="movieDescription" type="text" ref={descriptionInputRef} />
      </div>
      <div>
        <label htmlFor="movieDate">Release Date</label>
        <input id="movieDate" type="text" ref={dateInputRef} />
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default Form;
