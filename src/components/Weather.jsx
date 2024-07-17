import React, { useEffect, useState } from "react";
import "./Weather.css";
import SearchBar from "./SearchBar";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const handleSearchLocation = (city) => {
    search(city);
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter a City to Display weather");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();
      const weather_icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: weather_icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("Kathmandu");
  }, []);

  return (
    <div className="weather">
      <SearchBar onSearchLocation={handleSearchLocation} />
      <img src={weatherData.icon} className="weather-icon" alt="" />
      <p className="temprature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
