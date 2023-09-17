import { fetchMovieByQuery } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function MoviesSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [searchedMovies, setSearchedMovies] = useState([]);
  const controllerRef = useRef();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!hasSearched) {
      getMoviesByQuery(query);
      setHasSearched(true);
    }
  }, [query, hasSearched]);
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

  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchParams({
      query,
    });
    getMoviesByQuery(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={evt =>
            setSearchParams({
              query: evt.target.value,
            })
          }
        />
        <button type="submit">Search</button>
      </form>
      <MoviesList movies={searchedMovies} />
    </div>
  );
}
