// src/App.tsx

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { fetchWeather, fetchForecast, WeatherData, ForecastData } from './services/weatherService';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const handleCitySearch = async (city: string) => {
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    
    if (weatherData) setWeather(weatherData);
    else alert('City not found or an error occurred.');

    if (forecastData) setForecast(forecastData);
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
      {forecast.length > 0 && <Forecast forecast={forecast} />}
    </Container>
  );
};

export default App;
