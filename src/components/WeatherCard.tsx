// src/components/WeatherCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  icon: JSX.Element;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, icon }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275, mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {city}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {icon}
          <Typography variant="h3">{temperature}°C</Typography>
        </Box>
        <Typography color="textSecondary">{condition}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
