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
    let hours= currentDate.getHours().toString().padStart(2,'0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    // let formattedTime = '${hours}:${time}'
    let formattedTime = `${hour} ${minutes}`;
    let timeContainer = document.getElementById("time");
    timeContainer.textContent = formattedTime;


}

function handleFormSubmit(event) {
    event.preventDefault();


    let cityInput = document.getElementById("city-input");
    let cityName = cityInput.value.trim();


    let cityNameElement = document.getElementById("city-name");
    cityNameElement.textContent = cityName;


    cityInput.value = "";
}

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleFormSubmit);


updateDate();
updateTime();