import { Suspense, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export function MovieDetails({ movie }) {
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const location = useLocation();
  const backLocationRef = useRef(location.state?.from ?? '/');
  return (
    <div>
      <Link to={backLocationRef.current}>Go Back</Link>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
            : defaultImg
        }
        alt={movie.original_title}
      ></img>
      <h2>
        {movie.original_title} ({movie.release_date.substring(0, 4)})
      </h2>
      <p>User score: {movie.popularity}</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      <h3>Genres</h3>
      {movie.genres.map(genre => (
        <p key={genre.id}>{genre.name}</p>
      ))}
      <p>Additional information</p>
      <ul>
        <li>
          <Link to={`/movies/${movie.id}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movie.id}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
