// src/components/Forecast.tsx

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { getTemperatureColor } from '../utils/colorUtils';

interface ForecastProps {
  forecast: {
    date: string;
    temperature: number;
    condition: string;
    icon: string;
  }[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6">5-Day Forecast</Typography>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={2}>
        {forecast.map((entry, index) => (
          <Card 
            key={index} 
            variant="outlined" 
            sx={{ 
              width: '120px', 
              mb: 2, 
              boxShadow: 1, 
              borderRadius: 2, 
              padding: 1, 
              backgroundColor: getTemperatureColor(entry.temperature) 
            }}
          >
            <CardContent>
              <Typography variant="body2">
                {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </Typography>
              <img src={entry.icon} alt={entry.condition} width={40} />
              <Typography variant="body1">{entry.temperature}°C</Typography>
              <Typography variant="body2" color="textSecondary">{entry.condition}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Forecast;
