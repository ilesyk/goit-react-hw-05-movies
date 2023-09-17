import { fetchTrendingMovies } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect, useRef, useState } from 'react';

export function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const controllerRef = useRef();
  useEffect(() => {
    async function getTrendingMovies() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      try {
        const topMovies = await fetchTrendingMovies({
          signal: controllerRef.current.signal,
        });
        setTrendingMovies(topMovies);
      } catch (error) {
        console.log(error);
      }
    }
    getTrendingMovies();
  }, []);

  return (
    <div>
      <MoviesList movies={trendingMovies} />
    </div>
  );
}
