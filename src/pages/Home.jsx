import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Virtual, Pagination, Navigation} from 'swiper/modules';
import { Container, Typography, Card, CardContent, CardActions,  Paper, Divider  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import {  Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Slider from 'react-slick'; // Import react-slick components
import 'slick-carousel/slick/slick.css'; // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick carousel theme styles
import { FaGamepad, FaCar, FaPuzzlePiece, FaFutbol, FaFighterJet, FaBasketballBall, FaChess } from 'react-icons/fa';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { API_KEY } from '../config.jsx'; 
const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  
  carouselContainer1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  slickCarousel: {
  width: '97%',
   
    margin: '0 auto', // Center the carousel
    position: 'relative',
   
   
  },
  slickCarousel1: {
    width: '96%',
     
      margin: '0 auto', // Center the carousel
      position: 'relative',
      marginTop: '2%',
      marginBottom: '2%',
    },
  slickItem: {
   
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    cursor: 'pointer',
    marginTop: '5%',
  },
  image: {
    width: '100%', // Set the width of the image
    height: 'auto', // Increase the height of the image for a bigger size
    // objectFit: 'cover', // Maintain aspect ratio and cover the container
    borderRadius: '4px',
    transition: 'opacity 0.3s'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
    padding: '8px',
  },
  
  cardLink: {
    textDecoration: 'none',
    display: 'block',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.02)',
      opacity: 0.8,
    },
  },

  card: {
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: '3px',
    boxShadow: theme.shadows[3],
    cursor: 'pointer',

  },
 
  paperContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      textAlign: 'left', // Align content to the left on larger screens
    },
  },
  storeContainer: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(2),
    // Add more styling if needed...
  },
  paperImage: {
    width: '100%',
  

    
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2), // Add some spacing between image and content on larger screens
    },
  },

  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh', // Adjust the height as needed

  },

  storeCard: {
    position: 'relative',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
    cursor: 'pointer',
    '&:hover $storeContent': {
      opacity: 1,
    },
  },
  storeImage: {
    width: '100%',
    height: '310px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  storeContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    borderRadius: '10px',
    transition: 'opacity 0.3s',
  },

  storeName: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },

  storeActions: {
    marginTop: 'auto',
    justifyContent: 'center',
  },

}));

const Home = () => {

  const classes = useStyles();
  const [swiperRef, setSwiperRef] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [currentSlideImage, setCurrentSlideImage] = useState(null);
  const gameIds = [ 257195,801512, 502117,801638,704634,616765,662316,  326229, 463733,917742, 494382,494384,47137,833441,401805]; // Replace with the specific game IDs you want
  const newGameIds = [662316,616765,801512,356714,616697,845261,892901,823549,962679,463733,457728,388309,793647,463723,51325,681395, 872778];
  const gameIdsWithoutLast = newGameIds.slice(0, newGameIds.length - 1);
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
 
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('md', 'lg'));
const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const genrePaths = [
    '/action',
    '/adventure',
    '/puzzle',
    '/racing',
    '/rpg',
    '/shooter',
    '/simulation',
    '/sports',
    '/strategy',
    '/multiplayer',
  ];

  const genreData = [
    { name: 'Action', icon: <FaGamepad /> },
    { name: 'Adventure', icon: <FaFighterJet /> },
    { name: 'Puzzle', icon: <FaPuzzlePiece /> },
    { name: 'Racing', icon: <FaCar /> },
    { name: 'RPG', icon: <FaGamepad /> },
    { name: 'Shooter', icon: <FaCar /> },
    { name: 'Simulation', icon: <FaFutbol /> },
    { name: 'Sports', icon: <FaBasketballBall /> },
    { name: 'Strategy', icon: <FaChess /> }, // Added 'Strategy' with icon
    { name: 'Multiplayer', icon: <FaChess /> }, 
  ];
  const storeData = [
    { name: 'Steam', url: 'https://store.steampowered.com/', image: 'https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg' },
    { name: 'Gog', url: 'https://www.gog.com/', image: 'https://images.gog-statics.com/844bac20026bcb6faf3d308fe9ad38365b3df6d1b5c4b74d0db309b426c997c5.jpg' },
    { name: 'Epic Games', url: 'https://www.epicgames.com/store/', image: 'https://images-eds-ssl.xboxlive.com/image?url=Q_rwcVSTCIytJ0KOzcjWTYl.n38D8jlKWXJx7NRJmQKBAEDCgtTAQ0JS02UoaiwRj.VcHXTwP3Gcq532nGGgSKf4ferNm21lnFyesDcwO1IjkFhrnS4yfNTRIVWYDpbzZkQlW1wufJ_rzu.AgnvejQ--&format=source' },
    { name: 'PlayStation', url: 'https://www.playstation.com/en-us/',  image: 'https://www.internetmatters.org/wp-content/uploads/2018/01/ps-logo-1.png' },
    { name: 'Xbox', url: 'https://www.xbox.com/en-US?xr=mebarnav', image: 'https://news.xbox.com/en-us/wp-content/uploads/sites/2/2023/06/Xbox_Logo_2022_JPG-e8f7e94c037056ae394d.jpg' },
    { name: 'Fanatical', url: 'https://www.fanatical.com/en/', image: 'https://cdn.lovesavingsgroup.com/content/f4cfb1d341db7c98d5896fe4d3f25f5d.jpg' },
    { name: 'EaPlay', url: 'https://www.ea.com/games/library/pc-download', image: 'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/07/ea-play-logo-and-multiple-game-covers-arranged-in-a-collage.jpg' },
    { name: 'Nintendo', url: 'https://www.nintendo.com/store/',image: 'https://images.nintendolife.com/news/2017/01/talking_point_the_challenges_and_opportunities_of_the_nintendo_switch_presentation/1280x720.jpg' },
    { name: 'Humble Bundle', url: 'https://www.humblebundle.com/store', image: 'https://pbs.twimg.com/profile_images/1681282416281890816/jAEZRDGh_400x400.jpg' },
    { name: 'Itch.io', url: 'https://itch.io/', image: 'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_itch_itchio_S1_2560x1440-1f57f016693b447e7759918f54aea344' },
  
    // Add more store data here...
  ];
  const [newGameData, setNewGameData] = useState([]);

  useEffect(() => {
    async function fetchGameData() {
      setIsLoading(true);
      try {
        const promises = gameIds.map(async (id) => {
          const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
            params: {
              key: API_KEY, // Replace with your actual API key
            },
          });
          const gameData = {
            id: id,
            image: response.data.background_image,
            name: response.data.name,
          };
          return gameData;
        });
        const gameDataList = await Promise.all(promises);
        setGameData(gameDataList);
  
        // Set the background image of the first game as the initial currentSlideImage
        if (gameDataList.length > 0) {
          setCurrentSlideImage(gameDataList[0]?.image || null);
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    }
    fetchGameData();
  }, []);

  useEffect(() => {
    async function fetchNewGameData() {
      setIsLoading(true);
      try {
        const promises = newGameIds.map(async (id) => {
          const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
            params: {
              key: API_KEY,
            },
          });
          console.log(`Response for game ID ${id}:`, response.data);
          const gameData = {
            id: id,
            image: response.data.background_image,
            name: response.data.name,
          };
          return gameData;
        });
  
        const newGameDataList = await Promise.all(promises);
        setNewGameData(newGameDataList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching new game data:', error);
        setIsLoading(false);
      }
    }
    fetchNewGameData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {isLoading ? (
        // Display a spinner while loading
        <div className={classes.loaderContainer}>
          <CircularProgress size={50} color="secondary" />
        </div>
      ) : (
        // Display your content when loading is complete
        <>
          <div
            className={classes.carouselContainer}
            style={{
              backgroundImage: currentSlideImage
                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentSlideImage})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Swiper
              slidesPerView={isMobileScreen ? '1' : '2.2'}
              centeredSlides={true}
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => {
                setSwiperRef(swiper);
                setCurrentSlideImage(gameData[0]?.image || null);
              }}
              onSlideChange={(swiper) => {
                setCurrentSlideImage(gameData[swiper.realIndex]?.image || null);
              }}
              spaceBetween={30}
              pagination={{
                type: 'bullets',
              }}
              navigation={true}
              className={classes.slickCarousel}
            >
              {gameData.map((data, index) => (
                <SwiperSlide
                  key={index}
                  className={classes.slickItem}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={classes.imageContainer}>
                    <img
                      src={data.image}
                      alt={`Game ${gameIds[index]}`}
                      className={classes.image}
                      style={{
                        opacity: hoveredIndex === index ? 0.9 : 1,
                        transform:
                          hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                        transition: 'opacity 0.3s, transform 0.2s',
                      }}
                    />
                    <div className={classes.overlay}>
                      <Button
                        component={Link}
                        to={`/game/${data.id}`}
                        variant="contained"
                        color="primary"
                        style={{
                          alignSelf: 'flex-start',
                          position: 'absolute',
                          bottom: '16px',
                          left: '16px',
                          backgroundColor: 'transparent',
                          backdropFilter: 'blur(5px)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#F8F8F8',
                        }}
                      >
                        {data.name}
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <br />
            <h1>Welcome to the Game Store</h1>
            <Button variant="outlined" color="primary">
              Explore more
            </Button>
            <br />
          </div>
          <br />
          <div className={classes.carouselContainer1}>
            <h2>New & Trending</h2>
            <Swiper
              slidesPerView={isMobileScreen ? '2' : '4'}
              slidesPerGroup={isMobileScreen ? 2 : 4}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              className={classes.slickCarousel1}
              modules={[Navigation]}
            >
              {newGameData.slice(0, newGameData.length - 1).map((data, index) => (
                <SwiperSlide key={index} className={classes.slickItem}>
                  <Link to={`/game/${data.id}`} className={classes.cardLink}>
                    <div className={classes.imageContainer}>
                      <img
                        src={data.image}
                        alt={`Game ${newGameIds[index]}`}
                        className={classes.image}
                        style={{
                          borderRadius: '8px',
                          transition: 'transform 0.2s, border-radius 0.2s',
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.transform = 'scale(1.07)';
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                  </Link>
                  <CardContent>
                    <Typography variant="h6">{data.name}</Typography>
                  </CardContent>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Divider />
          <br />
          <div className={classes.carouselContainer1}>
            <h2>Genres</h2>
            <Swiper
              slidesPerView={isMobileScreen ? '2' : '6'}
              spaceBetween={20}
              className={classes.slickCarousel1}
            >
              {genreData.map((genre, index) => (
                <SwiperSlide key={index} className={classes.slickItem}>
                  <Link to={genrePaths[index]} className={classes.cardLink}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h6">{genre.name}</Typography>
                        <Typography variant="h6">{genre.icon}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <br />
          <div className={classes.carouselContainer} style={{ backgroundColor: '#18191A' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: isMediumScreen ? 'flex-end' : 'center' }}>
                <img src={newGameData[16]?.image} alt="Paper" className={classes.paperImage} />
              </Grid>
              <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={classes.paperContent}>
                  <h1>Explore The Best of all Time</h1>
                  <br />
                  <Button variant="outlined" color="secondary" component={Link} to="/all-time-best">
                    Explore
                  </Button>
                  <br />
                </div>
              </Grid>
            </Grid>
          </div>
          <br />
          <br />
          <br />
          <div className={classes.carouselContainer1}>
            <h2>Stores</h2>
            <Swiper
              slidesPerView={isSmallScreen ? '1' : isMediumScreen ? '3' : isLargeScreen ? '5' : '2'}
              slidesPerGroup={isSmallScreen ? '1' : isMediumScreen ? '3' : isLargeScreen ? '4' : '5'}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              className={classes.slickCarousel1}
              modules={[Navigation]}
            >
              {storeData.map((store, index) => (
                <SwiperSlide key={index} className={classes.slickItem}>
                  <a href={store.url} target="_blank" rel="noopener noreferrer" className={classes.cardLink}>
                    <Card className={classes.storeCard}>
                      <img src={store.image} alt={store.name} className={classes.storeImage} />
                      <CardContent className={classes.storeContent}>
                        <span className={classes.storeName}>{store.name}</span>
                      </CardContent>
                    </Card>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
  
};

export default Home;