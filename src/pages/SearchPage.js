import { fetchMovieByQuery } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'components/SearchForm/SearchForm';

const Movies = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [searchedMovies, setSearchedMovies] = useState([]);
  const controllerRef = useRef();
  useEffect(() => {
    if (!query) {
      return;
    }
    async function getMoviesByQuery() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      try {
        const movies = await fetchMovieByQuery(query, {
          signal: controllerRef.current.signal,
        });
        setSearchedMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }
    getMoviesByQuery();
  }, [query]);

  return (
    <div>
      <Form />
      <MoviesList movies={searchedMovies} />
    </div>
  );
};
export default Movies;
