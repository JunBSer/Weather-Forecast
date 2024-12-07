const API_KEY = '08952b1a4f383cb9be36dd83093ba5ab'; 
var weatherParams = document.getElementById('weather-result').innerHTML;

document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('city-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        handleSearch();
    }
});

async function handleSearch() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        document.getElementById('weather-result').innerHTML = weatherParams
        displayWeather(data); 
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const description = weather[0].description;
    const weatherCondition = weather[0].main.toLowerCase();
    const iconCode = weather[0].icon;

    console.log(`Weather condition: ${weatherCondition}`); 

  
    updateElementText('city-name', name);
    updateElementText('temperature', `Temperature: ${main.temp}°C`);
    updateElementText('description', capitalizeFirstLetter(description));
    updateElementText('humidity', `Humidity: ${main.humidity}%`);
    updateElementText('wind-speed', `Wind Speed: ${wind.speed} m/s`);

 
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIconElement = document.getElementById('weather-icon');
    if (weatherIconElement) weatherIconElement.src = iconURL;


    setAdvice(weatherCondition, main.temp);
}


function setAdvice(condition, temperature) {
    const adviceElement = document.getElementById('advice');
    let advice = '';

    switch (condition) {
        case 'clear':
            advice = 'It\'s a sunny day! Don\'t forget your sunglasses and sunscreen!';
            break;
        case 'clouds':
            advice = 'Cloudy weather ahead. It might be a good idea to carry a light jacket!';
            break;
        case 'rain':
        case 'drizzle':
            advice = 'Don\'t forget your umbrella, it\'s going to rain!';
            break;
        case 'snow':
            advice = 'It\'s snowing! Wear warm clothes and be careful on the roads.';
            break;
        case 'thunderstorm':
            advice = 'Thunderstorm warning! Stay indoors and stay safe.';
            break;
        default:
            advice = 'Weather conditions are unpredictable. Stay prepared!';
            break;
    }

    if (temperature < 5) {
        advice += ' It\'s quite cold, so dress warmly!';
    } else if (temperature > 30) {
        advice += ' It\'s hot outside, stay hydrated!';
    }

    updateElementText('advice', advice);
}

function updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) element.textContent = text;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
document.getElementById('play-music-button').addEventListener('click', function() {
    const music = document.getElementById('background-music');
    
    if (music.paused) {
        music.play();
        this.textContent = 'Pause Music'; 
    } else {
        music.pause();
        this.textContent = 'Play Music'; 
    }
});


document.getElementById('volume-control').addEventListener('input', function() {
    const music = document.getElementById('background-music');
    music.volume = this.value; 
});