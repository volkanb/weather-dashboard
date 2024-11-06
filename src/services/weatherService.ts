// src/services/weatherService.ts

const API_KEY = '311ef8bfb36d1f2557b8c79ddd3ebabc';
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
  temperature: number;
  condition: string;
  icon: string;
}

export async function fetchForecast(city: string): Promise<ForecastData[] | null> {
  try {
    const response = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();

    // Filter for one forecast per day around noon
    const dailyForecast = data.list.filter((entry: any) => entry.dt_txt.includes("12:00:00"))
      .slice(0, 5)
      .map((entry: any) => ({
        date: entry.dt_txt,
        temperature: Math.round(entry.main.temp),
        condition: entry.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${entry.weather[0].icon}.png`,
      }));

    return dailyForecast;
  } catch (error) {
    console.error(error);
    return null;
  }
}