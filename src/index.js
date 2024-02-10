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

function updateTime(){
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

            // Update time
            let timeContainer = document.getElementById("time");
            let currentDate = new Date();
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
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            // Display error message to the user
            let temperatureElement = document.querySelector(".temperature");
            temperatureElement.textContent = "Error fetching weather data";
        });
}

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleFormSubmit);

updateDate();
updateTime();
