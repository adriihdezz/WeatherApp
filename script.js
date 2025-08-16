// apiKey (shouldn't be public but it's a personal project)
const apiKey = '5218ad67eae2f3032e46dce70a325b70';

// Variables
const weather = document.getElementsByClassName('weather')[0];
const search = document.getElementsByClassName('search')[0];
const notFound = document.getElementsByClassName('notFound')[0];

const input = document.getElementById('input');
const btn = document.getElementById('btnSearch');

const place = document.getElementById('name');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const image = document.getElementById('image');

// Main function that controls the weatherApp
async function answer() {
    const city = input.value.trim();
    input.value = '';
    weatherInfo = await seeData('weather', city, apiKey);
    forecastInfo = await seeData('forecast', city, apiKey);
    exists = checkDisplay(weatherInfo.cod);

    // If the place exists, then shows info
    if (exists == true) {
        place.innerHTML = weatherInfo.name;
        temp.innerHTML = `${Math.round(weatherInfo.main.temp)}° C`;
        humidity.innerHTML = `${weatherInfo.main.humidity}%`;
        wind.innerHTML = `${Math.round(weatherInfo.wind.speed)} m/s`;
        checkImage(weatherInfo.weather[0].id);
        console.log(weatherInfo);
        
        let realDate = new Date(weatherInfo.dt * 1000);
        realDate = realDate.toLocaleDateString("es-ES", {weekday: "short", day: "numeric", month: "short"});
        date.innerHTML = realDate;
    }
}

// Function that fetchs the database and cast to json the data given
async function seeData(weatherOrForecast, city,key) {
    const url = `https://api.openweathermap.org/data/2.5/${weatherOrForecast}?q=${city}&appid=${key}&units=metric`;
    return (await fetch(url)).json();
}

//Function that checks the display in the screen among the search, weather and not found
function checkDisplay(cod) {
    let existingPlace = false;

    if (cod == 400) {
        weather.style.display = 'none';
        search.style.display = '';
        notFound.style.display = 'none';
        return existingPlace;
    } else if (cod == 404){
        weather.style.display = 'none';
        search.style.display = 'none';
        notFound.style.display = '';
        return existingPlace;
    } else {
        weather.style.display = '';
        search.style.display = 'none';
        notFound.style.display = 'none';
        existingPlace = true;
        return existingPlace;
    }
}

// Checks what image (weather state) should the web show
function checkImage(id) {
    if (id >= 200 && id <= 232) {
        image.src = "./assets/weather/thunderstorm.svg";
    } else if (id >= 300 && id <= 321) {
        image.src = "./assets/weather/drizzle.svg";
    } else if (id >= 500 && id <= 531) { 
        image.src = "./assets/weather/rain.svg";
    } else if (id >= 600 && id <= 622) {
        image.src = "./assets/weather/snow.svg";
    } else if (id >= 700 && id <= 781) { 
        image.src = "./assets/weather/atmosphere.svg";
    } else if (id === 800) {
        image.src = "./assets/weather/clear.svg";
    } else {
        image.src = "./assets/weather/clouds.svg";
    }
}

// Listeners for the input submition, both cliking the button and 'Enter'
btn.addEventListener('click', answer());

const form = document.getElementsByClassName('prompt')[0];
form.addEventListener('submit', e => {
    e.preventDefault();
    answer();
})



