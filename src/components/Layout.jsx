import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemText, Divider, Button, IconButton, Collapse, Typography, Menu, MenuItem,  Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import SearchBar from './SearchBar';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  
import clsx from 'clsx'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import Badge from '@mui/material/Badge';
import { useCart } from '../components/CartContext';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { API_KEY } from '../config'; 


const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
   
  },
  content: {
    flexGrow: 1,
  
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    
    }),
    marginLeft: 0
    
  },
  drawerContainer: {
    overflow: 'auto',
    textAlign: 'center', // Center-align the content
    // backgroundColor: 'black',
  },
  drawerPaper: {


    [theme.breakpoints.down('sm')]: {
      width: '100%', // Adjust for smaller screens
      marginLeft: 'auto', // Center-align the drawer horizontally
      textAlign: 'center',
      
    },
  },
  
}));

const Layout = ({ children, applyPadding = true }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOpen1, setCollapseOpen1] = useState(false);
  const { cart } = useCart();
 const [anchorElExplore, setAnchorElExplore] = useState(null);
  const [anchorElGenres, setAnchorElGenres] = useState(null);
 
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
 
  const handleOpenExploreMenu = (event) => {
    setAnchorElExplore(event.currentTarget);
  };

  const handleCloseExploreMenu = () => {
    setAnchorElExplore(null);
  };

  const handleOpenGenresMenu = (event) => {
    setAnchorElGenres(event.currentTarget);
  };

  const handleCloseGenresMenu = () => {
    setAnchorElGenres(null);
  };
  

   
  
    

  const handleCollapseToggle = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCollapseToggle1 = () => {
    setCollapseOpen1(!collapseOpen1);
  };

  const handleDrawerToggle1 = () => {
    setMobileOpen1(!mobileOpen1);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?search=${searchTerm}&search_precise=true&key=${API_KEY}`);
      const data = await response.json();
      const searchResults = data.results;
      // Navigate to the SearchResultsPage with search results as state
      navigate(`/search-results?term=${searchTerm}`, { state: { searchResults } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }



    
  };
  
  return (
    <div className={classes.root} > 
       <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: 'black' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          
        {isMobileScreen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <IconButton
    component={Link}
    to="/cart"
    color="inherit"
  >
    <Badge badgeContent={cart.length} color="secondary">
      <ShoppingCartIcon />
    </Badge>
  </IconButton>
  <SearchBar onSearch={handleSearch} />
  </div>

           
        </Toolbar>
      </AppBar>
      
          {isMobileScreen ? (
            
            // Render tabs in drawer menu

           
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
          
              <div className={classes.drawerContainer}>
              <IconButton
      color="inherit"
      aria-label="close drawer"
      onClick={handleDrawerToggle}
      className={classes.menuButton}
    >
      <CloseIcon />
    </IconButton>
       <List>
       <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
       </List>
              <ListItem button onClick={handleCollapseToggle1} >
            <ListItemText primary="Explore"  />
            {collapseOpen1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={collapseOpen1} timeout="auto" unmountOnExit >
            <List component="div" disablePadding >
              <ListItem button component={Link} to="/best-of-the-year">
                <ListItemText primary="Best of the Year" />
              </ListItem>
              <ListItem button component={Link} to="/all-time-best">
                <ListItemText primary="Best of All Time" />
              </ListItem>
              <ListItem button component={Link} to="/best-of-2022">
                <ListItemText primary="Best of 2022" />
              </ListItem>
              <ListItem button component={Link} to="/best-of-2021">
                <ListItemText primary="Best of 2021" />
              </ListItem>
         </List>
         </Collapse>
           
          

            <ListItem button onClick={handleCollapseToggle} >
            <ListItemText primary="Genres"  />
            {collapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit >
            <List component="div" disablePadding >
              {/* Add your lists inside the collapsible box */}
              <ListItem button component={Link} to="/Action">
                <ListItemText primary="Action" />
              </ListItem>
              <ListItem button component={Link} to="/Strategy">
                <ListItemText primary="Strategy" />
              </ListItem>
              <ListItem button component={Link} to="/Rpg">
                <ListItemText primary="RPG" />
              </ListItem>
              <ListItem button component={Link} to="/Sports">
                <ListItemText primary="Sports" />
              </ListItem>
              <ListItem button component={Link} to="/Adventure">
                <ListItemText primary="Adventure" />
              </ListItem>
              <ListItem button component={Link} to="/Shooter">
                <ListItemText primary="Shooter" />
              </ListItem>
              <ListItem button component={Link} to="/Puzzle">
                <ListItemText primary="Puzzle" />
              </ListItem>
              <ListItem button component={Link} to="/Racing">
                <ListItemText primary="Racing" />
              </ListItem>
              <ListItem button component={Link} to="/Simulation">
                <ListItemText primary="Simulation" />
              </ListItem>
              <ListItem button component={Link} to="/Multiplayer">
                <ListItemText primary="Multiplayer" />
              </ListItem>
     
              {/* Add more list items here */}
            </List>
            
          </Collapse>
      

            
              </div>
             
            </Drawer>
        
          ) : (
            // Render tabs in app bar
   
            <div style={{ display: 'flex', alignItems: 'center' }}>
          <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: 'black' }}>
        <Toolbar >
          <h2  style={{ paddingRight:'15px', }}>Dribble</h2>
          <Button
              variant="text"
              color="primary"
              button component={Link} to="/"
              style={{
                width: '100px', // Set the width
                color: 'white', // Change the text color
               
              }}
            >
              Home
            </Button>
    <Button
              variant="text"
              color="primary"
              onClick={handleOpenExploreMenu}
              style={{
                width: '100px', // Set the width
                color: 'white', // Change the text color
               
              }}
              
            >
              Explore
            </Button>

            <Menu
              anchorEl={anchorElExplore}
              open={Boolean(anchorElExplore)}
              onClose={handleCloseExploreMenu}
              style={{  width: '300px' }} 
            >
              <MenuItem onClick={handleCloseExploreMenu} component={Link} to="/best-of-the-year" style={{  width: '200px' }} >
                Best of the Year
              </MenuItem>
              <MenuItem onClick={handleCloseExploreMenu} component={Link} to="/all-time-best" style={{  width: '200px' }} >
                All Time Best
              </MenuItem>
              <MenuItem onClick={handleCloseExploreMenu} component={Link} to="/best-of-2022" style={{  width: '200px' }} >
                Best of 2022
              </MenuItem>
              <MenuItem onClick={handleCloseExploreMenu} component={Link} to="/best-of-2021" style={{  width: '200px' }} >
                Best of 2021
              </MenuItem>
            </Menu>

            <Button
  variant="text"
  
  onClick={handleOpenGenresMenu}
  style={{
    width: '100px', // Set the width
    color: 'white', // Change the text color
   
  }}
>
  Genres
</Button>
<Menu
  anchorEl={anchorElGenres}
  open={Boolean(anchorElGenres)}
  onClose={handleCloseGenresMenu}

>
  <Grid container spacing={2}> {/* Grid container */}
    <Grid item xs={4}> {/* First column */}
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Action"
        style={{  width: '160px' }} 
      >
        Action
      </MenuItem>
     
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Adventure"
        style={{  width: '160px' }} 
      >
        Adventure
      </MenuItem>
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Shooter"
        style={{  width: '160px' }} 
      >
        Shooter
      </MenuItem>
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Simulation"
        style={{  width: '160px' }} 
      >
        Simulation
      </MenuItem>
      {/* Add more genre items here */}
    </Grid>
    <Grid item xs={4}> {/* Second column */}
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Rpg"
        style={{  width: '160px' }} 
      >
        RPG
      </MenuItem>
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Puzzle"
        style={{  width: '160px' }} 
      >
        Puzzle
      </MenuItem>
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Strategy"
        style={{  width: '160px' }} 
      >
        Strategy
      </MenuItem>
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Multiplayer"
        style={{  width: '160px' }} 
      >
        Multiplayer
      </MenuItem>
      {/* Add more genre items here */}
    </Grid>

    <Grid item xs={4}> 

    <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Racing"
        style={{  width: '160px' }} 
      >
        Racing
      </MenuItem>
      <MenuItem
        onClick={handleCloseGenresMenu}
        component={Link}
        to="/Sports"
        style={{  width: '160px' }} 
      >
        Sports
      </MenuItem>
    </Grid>
  </Grid>
</Menu>
<div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
  <IconButton
    component={Link}
    to="/cart"
    color="inherit"
    style={{ marginRight: '20px' }}
  >
    <Badge badgeContent={cart.length} color="secondary">
      <ShoppingCartIcon />
    </Badge>
  </IconButton>
  <SearchBar onSearch={handleSearch} />
  </div>

</Toolbar>
</AppBar>

</div>
          )}

     


     
     
   
    
    
      {/* Main Content */}
    
      <main  className={clsx(classes.content, {
        [classes.contentShift]: mobileOpen, // Apply this class when the drawer is open
        [classes.noPadding]: !applyPadding,
      })} >
        <Toolbar />
        {children}
      
      </main>
    </div>
  );
};

export default Layout;