import { fetchMovieCast } from 'api';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
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
  console.log(cast);

  return (
    <div>
      {cast && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Cast;
