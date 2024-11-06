// src/App.tsx

import React from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const handleCitySearch = (city: string) => {
    console.log('Searching for weather in:', city);
    // This function will handle API calls in the future steps
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <SearchBar onSearch={handleCitySearch} />
      {/* WeatherCard and Forecast components will go here in future steps */}
    </Container>
  );
};

export default App;
