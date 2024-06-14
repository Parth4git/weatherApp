import React, { useState } from "react";
import Search from "./Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});

  async function fetchData(params) {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=f3bf53b252f95f125e56f157bf7ec347`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  }

  const handleSearch = () => {
    fetchData(search);
  };

  const getCurrentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {weather.main && (
            <div className="weather-card">
              <h2 className="city">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="date">{getCurrentDate}</p>
              <p className="temp">
                {(weather.main.temp - 273.15).toFixed(2)}°C
              </p>
              <p className="weather">{weather.weather[0].description}</p>
              <div className="weather-details">
                <p className="humidity">Humidity: {weather.main.humidity}%</p>
                <p className="wind">Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
