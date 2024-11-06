// src/services/weatherService.ts

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

export async function fetchWeather(city: string): Promise<WeatherData | null> {
  try {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export interface ForecastData {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}

export async function fetchForecast(city: string): Promise<ForecastData[] | null> {
  try {
    const response = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();

    // Group data points by day to calculate daily min and max temperatures
    const dailyData: { [date: string]: any[] } = {};

    data.list.forEach((entry: any) => {
      const date = entry.dt_txt.split(" ")[0]; // Extract date portion
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(entry);
    });

    // Calculate min/max temperature for each day and get icon/condition from the first entry
    const dailyForecast = Object.entries(dailyData)
      .slice(0, 5) // Limit to 5 days
      .map(([date, entries]: [string, any[]]) => {
        const temperatures = entries.map(entry => entry.main.temp);
        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);
        const { description: condition, icon } = entries[0].weather[0];

        return {
          date,
          minTemp: Math.round(minTemp),
          maxTemp: Math.round(maxTemp),
          condition,
          icon: `http://openweathermap.org/img/wn/${icon}.png`,
        };
      });

    return dailyForecast;
  } catch (error) {
    console.error(error);
    return null;
  }
}