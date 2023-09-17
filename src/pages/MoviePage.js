import { fetchMovieById } from 'api';
import { useEffect, useState } from 'react';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { useParams } from 'react-router-dom';

const Movie = () => {
  const params = useParams();
  const [clickedMovie, setClickedMovie] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function getMovieById() {
      try {
        const movie = await fetchMovieById(params.movieId, {
          signal: controller.signal,
        });
        setClickedMovie(movie);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieById();
    return () => {
      controller.abort();
    };
  }, [params.movieId]);
  return <div>{clickedMovie && <MovieDetails movie={clickedMovie} />}</div>;
};
export default Movie;
