import { fetchMovieReviews } from 'api';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState(null);
  const controllerRef = useRef();
  useEffect(() => {
    async function getMovieReviews() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();
      try {
        const movieReviews = await fetchMovieReviews(params.movieId, {
          signal: controllerRef.current.signal,
        });
        setReviews(movieReviews.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieReviews(params.movieId);
  }, [params.movieId]);

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie</p>
      )}
    </div>
  );
};

export default Reviews;
