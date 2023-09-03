import React, { useState } from 'react';
import { Button, Menu, MenuItem, Grid } from '@mui/material';

const DropdownMenu = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenMenu}
      >
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleCloseMenu} button component={item.link}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const AppBarDropdowns = () => {
  const exploreItems = [
    { label: 'Option 1', link: '/all-time-best' },
    { label: 'Option 2', link: '/' },
    { label: 'Option 3', link: '/' },
  ];

  const genreItems = [
    { label: 'Action', link: '/Action' },
    { label: 'Strategy', link: '/Strategy' },
    { label: 'RPG', link: '/Rpg' },
    { label: 'Sports', link: '/Sports' },
    // Add more genre items here
  ];

  return (
    <div>
      <DropdownMenu title="Explore" items={exploreItems} />
      <DropdownMenu title="Genres" items={genreItems} />
    </div>
  );
};

export default AppBarDropdowns;