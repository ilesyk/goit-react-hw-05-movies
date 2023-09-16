import { MoviesSearch } from "components/MoviesSearch/MoviesSearch";
import { fetchMovieByQuery} from 'api';
import { useRef, useState } from "react";



export function Movies() {
    

  return (
    <div>
          <MoviesSearch  />
    </div>
  );
}