import { lazy } from 'react';
import { Trending } from 'pages/TrendingPage';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

const Movies = lazy(() => import('../pages/SearchPage'));
const Movie = lazy(() => import('../pages/MoviePage'));
const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Trending />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<Movie />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
