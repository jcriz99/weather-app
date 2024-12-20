document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const message = document.getElementById('message');
    const weatherResult = document.getElementById('weatherResult');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weatherIcon');

    const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city !== '') {
            fetchWeather(city);
        } else {
            showMessage('Please enter a city name.');
        }
    });

    cityInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city !== '') {
                fetchWeather(city);
            } else {
                showMessage('Please enter a city name.');
            }
        }
    });

    async function fetchWeather(city) {
        showMessage('Loading...', false, '#333');
        weatherResult.classList.add('hidden');

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('City not found.');
            }
            const data = await response.json();

            // Extract needed data
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;
            const name = data.name;

            cityName.textContent = name;
            temperature.textContent = `${temp}°C`;
            description.textContent = desc;
            weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            weatherIcon.alt = desc;

            weatherResult.classList.remove('hidden');
            showMessage('');
        } catch (error) {
            showMessage(error.message || 'Something went wrong. Please try again.');
        }
    }

    function showMessage(msg, isError = true, color = '#d00') {
        message.textContent = msg;
        message.style.color = color;
    }
});
