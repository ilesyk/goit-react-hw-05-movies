import { fetchMovieByQuery } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'components/SearchForm/SearchForm';

const Movies = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [searchedMovies, setSearchedMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) {
      return;
    }
    async function getMoviesByQuery() {
      try {
        const movies = await fetchMovieByQuery(query, {
          signal: controller.signal,
        });
        setSearchedMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }
    getMoviesByQuery();
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <Form />
      <MoviesList movies={searchedMovies} />
    </div>
  );
};
export default Movies;
