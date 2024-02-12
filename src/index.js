const apiKey = "c1edbbc490ac997oa774bt7ea2363fa5";

function updateDate() {
    let currentDate = new Date();
    let day = currentDate.getDate().toString().padStart(2, '0');
    let monthIndex = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    let formattedDate = `${day} ${months[monthIndex]} ${year}`;
    let dateContainer = document.getElementById("date");
    dateContainer.textContent = formattedDate;
}

function updateTime() {
    let currentDate = new Date();
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let formattedTime = `${hours}:${minutes}`;
    let timeContainer = document.getElementById("time");
    timeContainer.textContent = formattedTime;
}

function handleFormSubmit(event) {
    event.preventDefault();

    let cityInput = document.getElementById("city-input");
    let cityName = cityInput.value.trim();

    // Fetch weather data for the entered city
    fetchWeather(cityName);
}
function fetchWeather(cityName) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            // Update city name
            let cityNameElement = document.getElementById("city-name");
            cityNameElement.textContent = data.city;

            // Update temperature
            let temperatureElement = document.querySelector(".temperature");
            let temperature = Math.round(data.temperature.current);
            temperatureElement.textContent = `${temperature}°`;

            // Update the time
            let timeContainer = document.getElementById("time");
            let currentDate = new Date(data.time * 1000); // Convert UNIX timestamp to milliseconds
            let hours = currentDate.getHours().toString().padStart(2, '0');
            let minutes = currentDate.getMinutes().toString().padStart(2, '0');
            timeContainer.textContent = `${hours}:${minutes}`;

            // Update date
            let dateContainer = document.getElementById("date");
            let day = currentDate.getDate().toString().padStart(2, '0');
            let monthIndex = currentDate.getMonth();
            let year = currentDate.getFullYear();
            let months = [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ];
            let formattedDate = `${day} ${months[monthIndex]} ${year}`;
            dateContainer.textContent = formattedDate;

            // Update weather icon
            let weatherIconElement = document.querySelector(".weather-icon img");
            weatherIconElement.src = data.condition.icon_url;

            // Update weather description
            let weatherDescriptionElement = document.querySelector(".underimg");
            weatherDescriptionElement.textContent = data.condition.description;

            // Update wind speed
            let windSpeedElement = document.getElementById("wind-speed");
            windSpeedElement.textContent = data.wind.speed;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            // Display error message to the user
            let temperatureElement = document.querySelector(".temperature");
            temperatureElement.textContent = "Error fetching weather data";
        });
}


// Event listener for form submission
let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleFormSubmit);

// Update current date and time
updateDate();
updateTime();
