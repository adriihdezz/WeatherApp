const apiKey = '5218ad67eae2f3032e46dce70a325b70';

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

// Main function that controls the weatherApp
async function answer() {
    const city = input.value.trim();
    input.value = '';
    weatherInfo = await seeData('weather', city, apiKey);
    forecastInfo = await seeData('forecast', city, apiKey);
    exists = checkDisplay(weatherInfo.cod);

    if (exists == true) {
        place.innerHTML = weatherInfo.name;
        temp.innerHTML = `${Math.round(weatherInfo.main.temp)}° C`;
        humidity.innerHTML = `${weatherInfo.main.humidity}%`;
        wind.innerHTML = `${Math.round(weatherInfo.wind.speed)} m/s`;
        console.log(weatherInfo);
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

// Listeners for the input submition, both cliking the button and 'Enter'
btn.addEventListener('click', answer());

const form = document.getElementsByClassName('prompt')[0];
form.addEventListener('submit', e => {
    e.preventDefault();
    answer();
})



