import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const inputRef = useRef();

  // Auto-focus the input field on page load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    try {
      const response = await axios.get(`https://weather-app-backend-7zbu.onrender.com/weather/${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <h1>आज का मौसम ताजा समाचार</h1>
      <div>
        <input 
          ref={inputRef}
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-info">
          <div className="weather-block">
            <h3>Temperature</h3>
            <p>{weather.main?.temp ?? 'N/A'}°C</p>
          </div>
          <div className="weather-block">
            <h3>Humidity</h3>
            <p>{weather.main?.humidity ?? 'N/A'}%</p>
          </div>
          <div className="weather-block">
            <h3>Weather</h3>
            <p>{weather.weather?.[0]?.description ?? 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
