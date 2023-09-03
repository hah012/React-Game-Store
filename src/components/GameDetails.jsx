import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { Typography, Card, CardContent, CardActions, Collapse, IconButton, Divider, Paper, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../style.css'; 
import ReactHtmlParser from 'react-html-parser';
import BackButton from './BackButton'; 
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material'; 

import { useCart } from '../components/CartContext'; 
import PriceAndAddToCart from './PriceAndAddtoCart';
import { API_KEY } from '../config'; 

const GameDetails = () => {
  
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [expanded, setExpanded] = useState(false); 
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleAddToCart = () => {
    const newItem = { ...gameDetails, price: generateRandomPrice(id), image: gameDetails.background_image };
  
    // Check if the item is already in the cart
    if (!cart.some((item) => item.id === newItem.id)) {
      addToCart(newItem);
    }
  };
 
  useEffect(() => {
    const apiUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`;


    Promise.all([
      fetch(apiUrl),
      fetch(screenshotsUrl)
    ])
    .then(([responseDetails, responseScreenshots]) => Promise.all([responseDetails.json(), responseScreenshots.json()]))
    .then(([dataDetails, dataScreenshots]) => {
      setGameDetails(dataDetails);
      setScreenshots(dataScreenshots.results);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  return (
    <div style={{padding: '24px'}}>
      {loading ? (
        <div className="loading-container "  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress size={60} color="secondary" />
        </div>
      ) : (
        <Grid container spacing={4}  className="fade-slide-in">
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
              <BackButton  />
              <h1 style={{ textAlign: 'right', wordBreak: 'break-word', flex: 1, }}>{gameDetails.name}</h1>
            </div>
          </Grid>

         
          <Grid item xs={12} md={8.5}  >
            <Carousel className='custom-carousel'>
              {screenshots.map((screenshot, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={screenshot.image}
                    alt={`Screenshot ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Grid>

          <Grid item xs={12} md={3.5} >
            <Card elevation={1} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <CardContent style={{ maxHeight: '300px', overflow: 'auto' }}>
                <Typography variant="body1" component="div">
                  <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
                </Typography>
              </CardContent>

              <CardActions>
                <IconButton
                  aria-label="expand"
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  style={{ marginLeft: 'auto' }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Divider />
              <Collapse in={expanded}>
                <CardContent style={{ backgroundColor: '#222222' }}>
                  <Typography variant="body1" style={{ color: '#ffffff' }}>Ratings: {gameDetails.rating}/5</Typography>  
                  <Typography> Release Date: {gameDetails.released}</Typography>   
                  <Typography> Platforms: {gameDetails.parent_platforms && gameDetails.parent_platforms.map(platform => platform.platform.name).join(', ')}</Typography>
                  <Typography>Genres: {gameDetails.genres && gameDetails.genres.map(genre => genre.name).join(', ')}</Typography>
                  {/* <Typography>Price: ${generateRandomPrice(id)}</Typography> */}
                    
                    
                    
              
                </CardContent>
              </Collapse>
            </Card>
        <br/><br/>
      
        <Paper elevation={1} style={{ borderRadius: '10px', padding: '10px', margin: '5px'}}>
  <PriceAndAddToCart game={gameDetails} />
</Paper>
          </Grid>
       
        </Grid>
      )}
      
    </div>
  );
};

export default GameDetails;