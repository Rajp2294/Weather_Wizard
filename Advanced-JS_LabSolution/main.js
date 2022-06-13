const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', search);

function search(event) {
    if (event.keyCode === 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then((weather) => {
            console.log(weather);
            if (weather.cod === 200) {
                displayResults(weather);
            } else {
                alert(weather.message);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}


function displayResults(weather) {
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerText = weather.weather[0].main;

    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(weather.main.temp_max)}°c / ${Math.round(weather.main.temp_min)}°c`;
}

let now = new Date();
let date = document.querySelector('.date');
date.innerText = dateBuilder(now);

function dateBuilder(dateObj) {
    const DATE_FORMAT_OPTIONS = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long'
    };
    return dateObj.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
}

