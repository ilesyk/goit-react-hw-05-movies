import axios from 'axios';
const KEY = `cb0acd0bbde3e970a3d7b37a44552220`;
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `/trending/movie/day?api_key=${KEY}&language=en-US`
  );
  return response.data.results;
};

export const fetchMovieByQuery = async query => {
  const response = await axios.get(
    `/search/movie?query=${query}&api_key=${KEY}&language=en-US`
  );
  return response.data.results;
};

export const fetchMovieById = async id => {
  const response = await axios.get(
    `/movie/${id}?&api_key=${KEY}&language=en-US`
  );
  return response.data;
};

export const fetchMovieCast = async id => {
  const response = await axios.get(
    `/movie/${id}/credits?api_key=${KEY}&language=en-US`
  );
  return response.data;
};

export const fetchMovieReviews = async id => {
  const response = await axios.get(
    `/movie/${id}/reviews?api_key=${KEY}&language=en-US`
  );
  return response.data;
};
