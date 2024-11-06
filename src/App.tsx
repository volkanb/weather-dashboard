// src/App.tsx

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const App: React.FC = () => {
  const [weather, setWeather] = useState({
    city: 'New York',
    temperature: 25,
    condition: 'Sunny',
    icon: <WbSunnyIcon fontSize="large" />
  });

  const handleCitySearch = (city: string) => {
    console.log('Searching for weather in:', city);
    // We will implement the API call here in the future to update the weather state
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <SearchBar onSearch={handleCitySearch} />
      <WeatherCard
        city={weather.city}
        temperature={weather.temperature}
        condition={weather.condition}
        icon={weather.icon}
      />
    </Container>
  );
};

export default App;
