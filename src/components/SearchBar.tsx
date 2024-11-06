// src/components/SearchBar.tsx

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city.trim()) {
      onSearch(city);
      setCity(''); // Clear the input field after search
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger search on Enter key press
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick}
        sx={{ ml: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
