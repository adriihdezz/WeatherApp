const apiKey = '34ebd284d16bfb0770b1e9e45f500bf2'

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

async function answer() {
    const city = input.value.trim();
    input.value = '';
    weatherInfo = weatherResponse(city);

    if (weatherInfo.cod != 404) {
        weather.style.display = '';
        search.style.display = 'none';
        console.log(weatherInfo);
        
    }
}

async function seeData(weatherOrForecast, city,key) {
    const url = `https://api.openweathermap.org/data/2.5/${weatherOrForecast}?q=${city}&appid=${key}&units=metric`;
    
    const response = await fetch(url);
    return response.json();
}

async function weatherResponse(city) {
    const response = await seeData('weather', city, apiKey);
    return response
}

btn.addEventListener('click', answer());

const form = document.getElementsByClassName('prompt')[0];
form.addEventListener('submit', e => {
    e.preventDefault();
    answer();
})