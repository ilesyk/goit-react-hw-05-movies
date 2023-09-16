import { Link, useLocation } from "react-router-dom";

export function MoviesList({movies}) {
const location = useLocation();
return (
  <div>
    <ul>
      {movies.map(item => (
        <li key={item.id}>
              <Link to={`/movies/${item.id}/`} state={{from: location}}>{item.original_title}</Link>
        </li>
      ))}
    </ul>
  </div>
);
}
    