import React, { useState } from 'react';
import { Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: 'flex',
    alignItems: 'center', // Center the input and button vertically
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: theme.spacing(1),
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const SearchBar = ({ onSearch }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={classes.searchBar}>
      <Input
        color="secondary"
        className={classes.input}
        placeholder="Search Games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        onKeyPress={handleKeyPress} // Call handleKeyPress on key press
      />
      <IconButton className={classes.iconButton} onClick={handleSearch} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;