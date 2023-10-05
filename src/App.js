import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import search_icon from "./Components/Assets/search.png";
import clear_icon from "./Components/Assets/clear.png";
import cloud_icon from "./Components/Assets/cloud.png";
import drizzle_icon from "./Components/Assets/drizzle.png";
import rain_icon from "./Components/Assets/rain.png";
import snow_icon from "./Components/Assets/snow.png";
import wind_icon from "./Components/Assets/wind.png";
import humidity_icon from "./Components/Assets/humidity.png";

// App adlı React bileşeni oluşturuluyor.
const App = () => {
  const api_key = "";
  // Hava ikonunu saklamak için bir durum (state) değişkeni tanımlanıyor.
  const [wicon, setWicon] = useState(clear_icon);
  // Kullanıcının şehir girişini saklamak için bir durum değişkeni tanımlanıyor.
  const [city, setCity] = useState("");
  // Hava durumu verilerini saklamak için bir durum değişkeni tanımlanıyor.
  const [weatherData, setWeatherData] = useState({
    humidity: "75 %",
    windSpeed: "5 km/h",
    temperature: "28 °C",
    location: "Location",
  });

  // Kullanıcının şehir girişini izleyen useEffect kullanılıyor.
  useEffect(() => {
    if (city) {
      // OpenWeatherMap API'sine istek yapılıyor ve hava durumu verileri alınıyor.
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
        )
        .then((response) => {
          const data = response.data;
          // Hava durumu verileri güncelleniyor.
          setWeatherData({
            humidity: data.main.humidity + " %",
            windSpeed: Math.floor(data.wind.speed) + " km/h",
            temperature: Math.floor(data.main.temp) + " °C",
            location: data.name,
          });

          const weatherIcon = data.weather[0].icon;
          // Hava ikonu güncelleniyor.
          setWeatherIcon(weatherIcon);
        })
        .catch((error) => {
          console.error("Hava durumu verileri alınamadı: ", error);
        });
    }
  }, [city]);

  // Hava ikonunu belirlemek için kullanılan fonksiyon.
  const setWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        break;
      case "04d":
      case "04n":
        setWicon(drizzle_icon);
        break;
      case "09d":
      case "09n":
        setWicon(rain_icon);
        break;
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      default:
        setWicon(clear_icon);
    }
  };

  // Kullanıcının şehir aramasını işleyen fonksiyon.
  const handleSearch = () => {
    setCity(document.getElementsByClassName("cityInput")[0].value);
  };

  // JSX içinde kullanılan bileşenler ve veriler oluşturuluyor ve görüntüleniyor.
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={handleSearch}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
