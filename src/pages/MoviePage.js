import { fetchMovieById } from 'api';
import { useEffect, useRef, useState } from 'react';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { useParams } from 'react-router-dom';
import Movies from './SearchPage';

export function Movie() {
    const params = useParams();
    const [clickedMovie, setClickedMovie] = useState(null);
    const controllerRef = useRef();
  useEffect(() => {
      async function getMovieById() {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
      try {
        const movie = await fetchMovieById(params.movieId, {
          signal: controllerRef.current.signal,
        });
          setClickedMovie(movie);
          ;
      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
  }, [params.movieId]);
  return (
    <div>
          {clickedMovie && <MovieDetails movie={clickedMovie} />}
    </div>
  );
};
