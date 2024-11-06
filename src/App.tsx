// src/App.tsx

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { fetchWeather, WeatherData } from './services/weatherService';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleCitySearch = async (city: string) => {
    const data = await fetchWeather(city);
    if (data) {
      setWeather(data);
    } else {
      alert('City not found or an error occurred.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <SearchBar onSearch={handleCitySearch} />
      {weather && (
        <WeatherCard
          city={weather.city}
          temperature={weather.temperature}
          condition={weather.condition}
          icon={<img src={weather.icon} alt={weather.condition} />}
        />
      )}
    </Container>
  );
};

export default App;
