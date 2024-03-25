import React, { useState } from 'react';
import axios from 'axios';
import './Food.css'; // Import CSS file for styling

const MovieSearch = () => {
  const [movieId, setMovieId] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setMovieId(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setMovieDetails(null);

    const options = {
      method: 'GET',
      url: 'https://movies-tv-shows-database.p.rapidapi.com/',
      params: {
        movieid: movieId
      },
      headers: {
        Type: 'get-movie-details',
        'X-RapidAPI-Key': '08b877cdccmsh4795fe72d80589ap18f5c2jsn82ab21f6e479',
        'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setMovieDetails(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={movieId}
          onChange={handleInputChange}
          placeholder="Enter movie ID..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {movieDetails && (
        <div className="box-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Tagline</th>
                <th>Year</th>
                <th>Release Date</th>
                <th>IMDb ID</th>
                <th>IMDb Rating</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{movieDetails.title}</td>
                <td>{movieDetails.tagline}</td>
                <td>{movieDetails.year}</td>
                <td>{movieDetails.release_date}</td>
                <td>{movieDetails.imdb_id}</td>
                <td>{movieDetails.imdb_rating}</td>
                <td>{movieDetails.vote_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
