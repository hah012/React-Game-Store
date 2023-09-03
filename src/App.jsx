import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import BestoftheYear from './pages/BestoftheYear';
import AllTimeBest from './pages/AllTimeBest'; // Create these components
import Home from './pages/Home'; 
import BestOf2021 from './pages/Top2021';
import BestOf2022 from './pages/Top2022'; // Create these components
import GameDetails from './components/GameDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './pages/SearchResults';
import Action from './pages/genres/Action';
import Adventure from './pages/genres/Adventure';
import Puzzle from './pages/genres/Puzzle';
import Racing from './pages/genres/Racing';
import Rpg from './pages/genres/Rpg';
import Shooter from './pages/genres/Shooter';
import Simulation from './pages/genres/Simulation';
import Sports from './pages/genres/Sports';
import Strategy from './pages/genres/Strategy';
import Multiplayer from './pages/genres/Multiplayer';
import CartPage from './pages/CartPage';
import { CartProvider } from './components/CartContext';
const App = () => {

  return (
    <CartProvider>
    <Router>
      <CssBaseline />
    
      <Layout  >
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/best-of-the-year" element={<BestoftheYear />} />
          <Route path="/all-time-best" element={<AllTimeBest />} />
         
          <Route path="/best-of-2021" element={<BestOf2021 />} />
          <Route path="/best-of-2022" element={<BestOf2022 />} />
        
          
          <Route path="/game/:id" element={<GameDetails/>} /> {/* Route for the GameDetails component */}
          <Route path="/search-results" element={<SearchResults />} /> 
          <Route path="/action" element={<Action />} />
          <Route path="/adventure" element={<Adventure />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/racing" element={<Racing/>} />
          <Route path="/rpg" element={<Rpg/>} />
          <Route path="/shooter" element={<Shooter />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add more routes here */}
        </Routes>
      </Layout>
 
    </Router>
    </CartProvider>
  );
};

export default App;