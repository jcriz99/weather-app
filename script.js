document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const message = document.getElementById('message');
    const weatherCard = document.getElementById('weatherCard');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weatherIcon');
    const spinnerContainer = document.getElementById('spinnerContainer');

    const API_KEY = 'dcb701ea617be4a3b2d29c6afce4ae2d'; // Insert your OpenWeatherMap API key here

    searchBtn.addEventListener('click', () => {
        fetchWeather();
    });

    cityInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    });

    async function fetchWeather() {
        const city = cityInput.value.trim();

        if (city === '') {
            showMessage('Please enter a city name.');
            return;
        }

        showMessage('');
        showLoading(true);
        hideWeatherCard();

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('City not found.');
            }
            const data = await response.json();

            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;
            const name = data.name;

            cityName.textContent = name;
            temperature.textContent = `${temp}°C`;
            description.textContent = desc;
            weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            weatherIcon.alt = desc;

            showWeatherCard();
        } catch (error) {
            showMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            showLoading(false);
        }
    }

    function showMessage(msg, color = '#d00') {
        message.textContent = msg;
        message.style.color = color;
    }

    function showLoading(isLoading) {
        if (isLoading) {
            spinnerContainer.classList.remove('hidden');
        } else {
            spinnerContainer.classList.add('hidden');
        }
    }

    function showWeatherCard() {
        weatherCard.classList.remove('hidden');
        // Trigger reflow to start transition
        weatherCard.offsetHeight;
        weatherCard.classList.add('shown');
    }

    function hideWeatherCard() {
        weatherCard.classList.remove('shown');
        weatherCard.classList.add('hidden');
    }
});
