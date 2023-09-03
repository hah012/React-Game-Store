import React from 'react';
import { useCart } from '../components/CartContext';
import { Button, Paper, Typography, IconButton, Box } from '@mui/material';
import BackButton from '../components/BackButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
      <div style={{ padding: '20px' }}>
        <BackButton />
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
          My Cart
        </Typography>
        {cart.length === 0 ? (
          <div>
            <Typography variant="subtitle1" style={{ marginBottom: '10px', textAlign: 'center' }}>
              Your cart is empty&nbsp;
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Typography>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Paper elevation={3} style={{ padding: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '140px', height: '90px', marginRight: '10px' }} />
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="subtitle1">Price: ${item.price}</Typography>
                  </div>
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </motion.div>
            ))}
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Total Price: ${calculateTotalPrice()}</Typography>
              <div>
                <Button variant="outlined" color="secondary" onClick={handleClearCart} style={{ marginRight: '10px' }}>
                  Clear Cart
                </Button>
                <Button variant="contained" color="primary">
                  Checkout
                </Button>
              </div>
            </Box>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;