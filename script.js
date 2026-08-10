// elements like:- search_button, search_input, search_location

const search_input = document.querySelector(".search-input");
const search_button = document.querySelector(".fas.fa-search");
const search_location = document.querySelector(".fas.fa-location-arrow");

// elements like:- weather_icon, temperature, description

const weather_icon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

//value of humidity, wind

const humidity_value = document.querySelector(".humidity-value");
const wind_value = document.querySelector(".wind-value");

//weather API

const API_KEY = "c877e5f885035b065e4e2c2277154729";

//Get Weather DATA

async function getweather(city) {
    if (city === "") {
        alert("Please Enter a City!!!");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        //check city/API request failded!!

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log(data);

        //temperatur
        temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;

        //weather description
        description.textContent = data.weather[0].description;

        //humidity
        humidity_value.textContent = `${data.main.humidity}%`;

        //wind speed
        wind_value.textContent = `${Math.round(data.wind.speed)} km/h`;

        // weather image + background

        const weathercondition = data.weather[0].main;
        const body = document.body;

        if (weathercondition === "Clear") {
            weather_icon.src = "clear.png";
            body.style.setProperty(
                "--weather-bg",
                "url('clear-background.png')"
            );
        }
        else if (weathercondition === "Clouds") {
            weather_icon.src = "cloud.png";
            body.style.setProperty(
                "--weather-bg",
                "url('cloud-background.png')"
            );
        }
        else if (weathercondition === "Snow") {
            weather_icon.src = "snow.png";
            body.style.setProperty(
                "--weather-bg",
                "url('snow-background.png')"
            );
        }
        else if (weathercondition === "Rain") {
            weather_icon.src = "rain.png";
            body.style.setProperty(
                "--weather-bg",
                "url('rain-background.png')"
            );
        }
        else if (weathercondition === "Mist") {
            weather_icon.src = "mist.png";
            body.style.setProperty(
                "--weather-bg",
                "url('mist-background.png')"
            );
        }
        else {
            weather_icon.src = "404.png";
            body.style.setProperty(
                "--weather-bg",
                "url('404.png')"
            );
        }
    }
    catch (error) {
        console.log("ERROR:", error.message);
        alert(error.message);
    }
}

//search button
search_button.addEventListener("click", () => {
    const city = search_input.value.trim();
    getweather(city);
});

//search input
search_input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = search_input.value.trim();
        getweather(city);
    }
});







