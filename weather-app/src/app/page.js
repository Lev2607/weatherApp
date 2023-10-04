"use client"

import React, { useState } from 'react';
import axios from 'axios';
import './/globals.css';

export default function Home() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=de&appid=72575412087162548c37c7e59d3b2ebc`
      );

      const weatherData = {
        temperature: response.data.main.temp,
        weatherDescription: response.data.weather[0].description,
        humidity: response.data.main.humidity,
      };

      setWeatherData(weatherData);
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
    }
  };

  return (
    <div>
      <h1>Wetter-App</h1>
      <input
        type="text"
        placeholder="Ort eingeben"
        value={location}
        onChange={handleLocationChange}
      />
      <button onClick={fetchWeatherData}>Search</button>

      {weatherData && (
        <div className="weather-container">
          <h2 className="weather-title"> {location}</h2>
          <div className="sun-icon"></div>
          <p className="weather-data">Temperatur: {weatherData.temperature}°C</p>
          <p className="weather-data">Wetterbeschreibung: {weatherData.weatherDescription}</p>
          <p className="weather-data">Luftfeuchtigkeit: {weatherData.humidity}%</p>     
        </div>
      )}
    </div>
  );
}
