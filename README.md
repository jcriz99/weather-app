# Weather Fetch App

A simple web application that retrieves the current weather of a specified city using the OpenWeatherMap API. Enter a city name, hit "Search," and see the temperature, weather conditions, and an associated icon.

## Features

- **City-based Search:** Input any city name and fetch its current weather.
- **Real-Time Data:** Uses OpenWeatherMap API to display up-to-date conditions.
- **Error Handling:** Informs you if the city isn’t found or if something goes wrong.
- **Clean UI:** A minimal, modern design that’s easy to use and mobile-friendly.

## Live Demo

[View Live Demo](https://jcriz99.github.io/weather-app/)

## Setup & Usage

1. **Obtain an API Key:**  
   Sign up on [OpenWeatherMap](https://openweathermap.org/) for a free API key.

2. **Insert Your API Key:**  
   In `script.js`, replace `YOUR_API_KEY` with your actual key:
   ```javascript
   const API_KEY = 'YOUR_API_KEY';
