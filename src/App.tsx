// src/App.tsx

import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { fetchWeather, fetchForecast, WeatherData, ForecastData } from './services/weatherService';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(''); // New error state

  const handleCitySearch = async (city: string) => {
    setLoading(true);
    setError(''); // Reset error message
    setWeather(null);
    setForecast([]);

    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);

      if (weatherData) setWeather(weatherData);
      if (forecastData) setForecast(forecastData);

      if (!weatherData || !forecastData) throw new Error('City not found or an error occurred.');
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 3, backgroundColor: '#f0f0f5', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <SearchBar onSearch={handleCitySearch} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" mt={2}>
          {error}
        </Typography>
      ) : (
        <>
          {weather && (
            <WeatherCard
              city={weather.city}
              temperature={weather.temperature}
              condition={weather.condition}
              icon={<img src={weather.icon} alt={weather.condition} />}
            />
          )}
          {forecast.length > 0 && <Forecast forecast={forecast} />}
        </>
      )}
    </Container>
  );
};

export default App;
