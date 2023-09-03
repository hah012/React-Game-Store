import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GameList from '../components/GameList';
import CircularProgress from '@mui/material/CircularProgress';

import { API_KEY } from '../config.jsx'; 


const PAGE_SIZE = 25;
const MAX_PAGES = 4; // Set the maximum number of pages to fetch

const Top2021 = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&dates=2021-01-01,2021-12-31&ordering=-added&page=${currentPage}&page_size=${PAGE_SIZE}`
        );
        const data = await response.json();
        setGames((prevGames) => {
          const uniqueGames = new Map(prevGames.map(game => [game.id, game]));
          data.results.forEach(game => uniqueGames.set(game.id, game));
          return Array.from(uniqueGames.values());
        });
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchGames();
  }, [currentPage]);

  const handleLoadMore = async () => {
    if (loading || currentPage >= MAX_PAGES) return;
  
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-01-01,2022-12-31&ordering=-added&page=${currentPage + 1}&page_size=${PAGE_SIZE}`
      );
      const data = await response.json();
      setGames((prevGames) => {
        const uniqueGames = new Map(prevGames.map(game => [game.id, game]));
        data.results.forEach(game => uniqueGames.set(game.id, game));
        return Array.from(uniqueGames.values());
      });
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div
      style={{
        position: 'relative',
        opacity: initialLoading ? 1 : 1,
        transform: initialLoading ? 'translateX(1.5%)' : 'none',
        transition: 'opacity 0.6s, transform 0.6s',
        padding: '24px',
      }}
    >
      {initialLoading && (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
          <CircularProgress color="secondary" />
        </div>
      )}
      
      {!initialLoading && (
        <div>
          <h2>Top Games of 2021</h2><br />
          <GameList games={games} />

          {games.length > 0 && (
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLoadMore}
                style={{ width: '300px' }}
                disabled={loading || currentPage >= MAX_PAGES}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </Grid>
          )}
        </div>
      )}
    </div>
   
  );
};

export default Top2021;