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

// CURRENT LOCATION

search_location.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    // Get current GPS position
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log("Latitude:", lat);
            console.log("Longitude:", lon);

            try {
                //  GET WEATHER USING GPS COORDINATES
                const weatherURL =
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

                const weatherResponse = await fetch(weatherURL);

                if (!weatherResponse.ok) {
                    throw new Error("Unable to fetch weather data");
                }
                const weatherData = await weatherResponse.json();
                console.log("Weather Data:", weatherData);

                // REVERSE GEOCODING
                const locationURL =
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

                const locationResponse = await fetch(locationURL);
                if (!locationResponse.ok) {
                    throw new Error("Unable to fetch location name");
                }

                const locationData = await locationResponse.json();

                console.log("Location Data:", locationData);
                console.log("Address:", locationData.address);

                // FIND MOST PRECISE LOCALITY

                const address = locationData.address;
                const locationName =
                    address.neighbourhood ||
                    address.suburb ||
                    address.quarter ||
                    address.city_district ||
                    address.town ||
                    address.city ||
                    "Current Location";

                // Put location name in search box
                search_input.value = locationName;

                // WEATHER INFORMATION
                temperature.innerHTML =
                    `${Math.round(weatherData.main.temp)}<span>°C</span>`;

                description.textContent =
                    weatherData.weather[0].description;

                humidity_value.textContent =
                    `${weatherData.main.humidity}%`;

                wind_value.textContent =
                    `${Math.round(weatherData.wind.speed)} km/h`;

                // 5. WEATHER ICON + BACKGROUND
                const weathercondition =
                    weatherData.weather[0].main;

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
                // LOG FINAL LOCATION
                console.log("Detected Location:", locationName);
            }
            catch (error) {
                console.log("ERROR:", error);
                alert("Unable to fetch your location/weather.");
            }
        },

        // LOCATION ERROR

        (error) => {
            console.log(error);
            if (error.code === error.PERMISSION_DENIED) {
                alert("Please allow location permission.");
            }
            else if (error.code === error.POSITION_UNAVAILABLE) {
                alert("Location information is unavailable.");
            }
            else if (error.code === error.TIMEOUT) {
                alert("Location request timed out.");
            }
            else {
                alert("Unable to get your location.");
            }
        },

        // GPS OPTIONS 
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );
});