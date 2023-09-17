import { fetchTrendingMovies } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { useEffect,  useState } from 'react';

export function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    async function getTrendingMovies() {
      try {
        const topMovies = await fetchTrendingMovies({
          signal: controller.current.signal,
        });
        setTrendingMovies(topMovies);
      } catch (error) {
        console.log(error);
      }
    }
    getTrendingMovies();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <MoviesList movies={trendingMovies} />
    </div>
  );
}
