import { fetchMovieCast } from 'api';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const params = useParams();
  const [cast, setCast] = useState(null);
  const controllerRef = useRef();
  useEffect(() => {
    async function getMovieCast() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      try {
        const movieCast = await fetchMovieCast(params.movieId, {
          signal: controllerRef.current.signal,
        });
        setCast(movieCast.cast);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieCast(params.movieId);
  }, [params.movieId]);

  return (
    <div>
      {cast && cast.length > 0 ? (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No actors</p>
      )}
    </div>
  );
};
export default Cast;
