import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Button, IconButton, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const PriceAndAddToCart = ({ game }) => {
  const { addToCart, cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [addedToCart, setAddedToCart] = useState(cart.some(item => item.id === game.id));

  const generateRandomPrice = (gameId) => {
    const storedPrice = localStorage.getItem(`game_${gameId}_price`);
    if (storedPrice) {
      return storedPrice;
    } else {
      const randomPrice = (Math.random() * (60 - 10) + 10).toFixed(2);
      localStorage.setItem(`game_${gameId}_price`, randomPrice);
      return randomPrice;
    }
  };

  const handleAddToCart = () => {
    const newItem = {
      id: game.id,
      name: game.name,
      price: generateRandomPrice(game.id),
      image: game.background_image,
    };

    addToCart(newItem);
    setAddedToCart(true);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleRemoveFromCart = () => {
    removeFromCart(game.id);
    setAddedToCart(false);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography variant="body2">Price: ${generateRandomPrice(game.id)}</Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        {addedToCart ? (
          <IconButton
            onClick={handleViewCart}
            aria-label="View in Cart"
            disabled
            style={{
              color: '#be8bd0',
              transition: 'color 0.3s',
              borderRadius: '4px', // Add this line to set the border radius
            }}
          >
            <CheckIcon fontSize="small" style={{ marginLeft: '4px' }} />
            <Typography
              variant="body2"
              style={{ fontSize: '0.875rem', marginLeft: '4px', transition: 'color 0.4s' }}
            >
              Added
            </Typography>
          </IconButton>
        ) : (
          <IconButton
            onClick={handleAddToCart}
            aria-label="Add to Cart"
            style={{ transition: 'color 0.4s', borderRadius: '4px' }} // Add this line to set the border radius
          >
            <AddIcon fontSize="small" />
            <Typography
              variant="body2"
              style={{ fontSize: '0.875rem', marginLeft: '4px', transition: 'color 0.4s' }}
            >
              Add to Cart
            </Typography>
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default PriceAndAddToCart;