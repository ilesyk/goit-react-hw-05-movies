import { useSearchParams } from 'react-router-dom';
export function Form() {
  const [, setSearchParams] = useSearchParams();
  const handleSubmit = value => {
    if (value === '') {
      return;
    }
    setSearchParams({ query: value });
  };
  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        handleSubmit(evt.target[0].value);
      }}
    >
      <input type="text" />
      <button type="submit">Search</button>
    </form>
  );
}
