import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=e255925';



const App = () => {

  const [movies, setMovies] = useState();
  const [SearchTerm, setSearchTerm] = useState('');


  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }


  useEffect(() => {
    searchMovies('ghost');
  }, []);


  return (
    <div className='app'>
      <h1>Mr. D First Movie App</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={SearchTerm }
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt='Search'
          onClick={() => searchMovies(SearchTerm)}
        />
      </div>


      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) =>
                <MovieCard movie={movie} />
              )}
            </div>
          ) :
          (
            <div className='empty'><h2>No Movies found</h2></div>
          )
      }

    </div>
  );
}

export default App