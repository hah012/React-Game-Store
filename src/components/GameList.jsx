import React from 'react';
import { Grid } from '@mui/material';
import GameCard from './GameCard';

const GameList = ({ games }) => {

  return (
    <Grid container spacing={2} >
      {games.map((game) => (
        
        <Grid key={game.id} item xs={12} sm={6} md={4} lg={2.4}> {/* Adjusted lg value */}
          <GameCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GameList;