import React, { useState, useEffect } from 'react';
import GameList from '../components/GameList';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton'; 
import ResultsHeader from '../components/ResultsHeader';
import { CircularProgress } from '@mui/material'; // Import CircularProgress

const SearchResults = () => {
  const location = useLocation();

  const searchResults = location.state.searchResults || [];
  const searchTerm = new URLSearchParams(location.search).get('term');

  const [isContentReady, setIsContentReady] = useState(false); // State to manage content readiness

  useEffect(() => {
    setIsContentReady(false); // Set content readiness to false when new search results are received

    // Simulate an asynchronous action, like fetching data
    setTimeout(() => {
      setIsContentReady(true); // Set content readiness to true after some time
    }, 2000); // Adjust the time as needed
  }, [searchResults]); // Listen for changes in searchResults

  return (
    <div style={{ transform: `translateX(${isContentReady ? 0 : -1.5}%)`, transition: 'opacity 0.5s, transform 0.5s',  padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BackButton></BackButton>
        <ResultsHeader searchTerm={searchTerm} />
      </div> <br/><br/>

      {isContentReady ? (
        <GameList games={searchResults} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress color="secondary" /> {/* Show CircularProgress while loading */}
        </div>
      )}
    </div>
  );
};

export default SearchResults;