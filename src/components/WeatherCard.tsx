// src/components/WeatherCard.tsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getTemperatureColor } from '../utils/colorUtils';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  icon: React.ReactNode;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, icon }) => {
  return (
    <Card variant="outlined" sx={{ 
      minWidth: 275, 
      mt: 2, 
      boxShadow: 3, 
      borderRadius: 2, 
      padding: 1, 
      backgroundColor: getTemperatureColor(temperature) 
    }}>
      <CardContent>
        <Typography variant="h5">{city}</Typography>
        <Typography variant="h2">{temperature}°C</Typography>
        {icon}
        <Typography variant="subtitle1" color="textSecondary">
          {condition}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
