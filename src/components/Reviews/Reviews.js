import { fetchMovieReviews } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Reviews() {
  const params = useParams();
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    async function getMovieReviews() {
      try {
        const movieReviews = await fetchMovieReviews(params.movieId);
        setReviews(movieReviews.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieReviews(params.movieId);
  }, [params.movieId]);
  console.log(reviews);
    return (<div>
        {reviews ? <ul>
            {reviews.map(review => (<li key={review.id}><h3>Author: {review.author}</h3><p>{review.content}</p></li>))}
      </ul>: <p>We don`t have any reviews for this movie</p>}
  </div>);
};

