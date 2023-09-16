import { Movie } from "pages/MoviePage";
import { Movies } from "pages/SearchPage";
import { Home } from "pages/TrendingPage";
import { Route, Routes } from "react-router-dom";
import { Cast } from "./Cast/Cast";
import { Layout } from "./Layout";
import { Reviews } from "./Reviews/Reviews";


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<Home/>} />
          <Route path="movies" element={<Movies/>} />
          <Route path="movies/:movieId" element={<Movie/>}>
            <Route path="cast" element={<Cast/>} />
            <Route path="reviews" element={<Reviews/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
