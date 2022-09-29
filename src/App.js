import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://movie-app-7fa49-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong...Retrying");
      }
      const data = await response.json();
      console.log(data);
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
      setRetry(true);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  useEffect(() => {
    if (retry === true) {
      var id = setInterval(fetchMoviesHandler, 5000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [retry, fetchMoviesHandler]);

  let content = <p>found no movies..</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const cancelRetryHandler = () => {
    setRetry(false);
    setError(null);
    setIsLoading(false);
  };
  async function addMovieHandler(NewMovieObj) {
    const response = await fetch(
      "https://movie-app-7fa49-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(NewMovieObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  async function deleteMovieHandler(mov) {
    const response = await fetch(
      `https://movie-app-7fa49-default-rtdb.firebaseio.com/movies/${mov.id}.json/`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    const existingMovies = [...movies];
    const movieIdx = existingMovies.findIndex((i) => i.id === mov.id);
    existingMovies.splice(movieIdx, 1);
    setMovies(existingMovies);
  }

  return (
    <React.Fragment>
      <section>
        <Form onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        <button onClick={cancelRetryHandler}>Cancel</button>
      </section>
    </React.Fragment>
  );
}

export default App;
