const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

// Search button functionality
document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherByLocation(location);
    } else {
        showErrorMessage("Please enter a location.");
    }
});

// Use current location button functionality
document.getElementById('currentLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, () => {
            showErrorMessage("Unable to fetch your location.");
        });
    } else {
        showErrorMessage("Geolocation is not supported by your browser.");
    }
});

// Fetch weather by city name
function fetchWeatherByLocation(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetchWeather(apiUrl);
}

// Fetch weather by coordinates (latitude, longitude)
function fetchWeatherByCoords(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeather(apiUrl);
}

// Fetch weather data from API
function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Location not found");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => showErrorMessage(error.message));
}

// Display weather data on the page
function displayWeather(data) {
    errorMessage.textContent = ''; // Clear any error messages

    const city = data.name;
    const description = data.weather[0].description;
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('cityName').textContent = city;
    document.getElementById('description').textContent = description;
    document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;

    weatherInfo.style.display = 'block'; // Show weather info
}

// Show error message
function showErrorMessage(message) {
    errorMessage.textContent = message;
    weatherInfo.style.display = 'none'; // Hide weather info
}
