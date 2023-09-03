import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { FaPlaystation, FaXbox, FaWindows, FaLinux, FaApple, FaAndroid } from 'react-icons/fa';
import { BsNintendoSwitch, BsBrowserChrome } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PriceAndAddToCart from './PriceAndAddtoCart';
import { API_KEY } from '../config'; 
const platformIcons = {
  playstation: FaPlaystation,
  xbox: FaXbox,
  windows: FaWindows,
  linux: FaLinux,
  mac: FaApple,
  nintendo: BsNintendoSwitch,
  android: FaAndroid,
  pc: FaWindows,
  web: BsBrowserChrome,
  // Add more platform icons as needed
};

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres.map((genre) => genre.name));
        setPlatforms(data.parent_platforms.map((platform) => platform.platform.slug));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [game.id]);
const isSmallScreen = window.innerWidth <= 800;
  return (
    <Card
      sx={{
        borderRadius: '15px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        ...(isSmallScreen
          ? {}
          : {
              '&:hover': {
                opacity: 1,
                transform: 'scale(1.05)'
              },
            }),
      }}
    >
      <CardActionArea
       
        sx={{
          justifyContent: 'space-between',
          height: '100%',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
        
          component="img"
          alt={game.name}
          height="180"
          image={game.background_image}
          sx={{
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            transition: 'height 0.3s ease',
            overflow: 'hidden',
            '&:hover': {
              height: isHovered ? '280px' : '180px',
            },
          }}
        /> </Link>
        <CardContent
          sx={{
            minHeight: isHovered ? '150px' : '80px',
            transition: 'min-height 0.3s ease',
            overflow: 'hidden',
            '&:hover': {
              minHeight: isHovered ? '150px' : '80px',
            },
          }}
        >
          <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              gutterBottom
             
            >
              {game.name}
            </Typography>
          </Link>
          <PriceAndAddToCart game={game} />
          {isHovered && (
            <>
              <Typography variant="body1">
                {platforms.map((platform) => {
                  const Icon = platformIcons[platform];
                  return Icon ? (
                    <Icon key={platform} size={16} style={{ margin: '0 3px' }} />
                  ) : null;
                })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Release Date:                     {game.released} 
              </Typography> <br/>
              <Typography variant="caption" color="text.secondary">
                 Genres: {genres.join(', ')}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;