let elWeatherInfo = document.querySelector('.weather-info')
let API_KEY = '7c1cdecbf7891bc044ab454dff9cea78';

let elForm = document.querySelector('.weather-form');
let elSearchCity = document.querySelector('.weather-form__input');

let searchCity = '';

elSearchCity.addEventListener('keyup', () => {
  searchCity = elSearchCity.value
})

elForm.addEventListener('submit', (e) => {
  e.preventDefault();
  elSearchCity.value = ''
  getCityWeather(searchCity)
})

function getWeatherDate() {
  navigator.geolocation.getCurrentPosition((success) => {
    let {latitude, longitude} = success.coords;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      showWeatherData(data);
      let elCountry = document.querySelector('.weather-day__city').textContent = data.timezone.split("/", 2)[1];
      let temp = data.current.temp;
      let elTemp = document.querySelector('.weather-day__temp').innerHTML = `${temp = Math.round(temp)}<sup>°</sup><sup>c</sup>`
      let elWeatherImage = document.querySelector('.weather-day__img').innerHTML = `
      <img class="weather-day__image" src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"/>
      `;
    })
  })
}

getWeatherDate();

function getCityWeather(value) {
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${API_KEY}`)
    .then((res) => res.json())
    .then(data => {
      let elCountry = document.querySelector('.weather-day__city').textContent = data.name;
      let temp = data.main.temp;
      let elTemp = document.querySelector('.weather-day__temp').innerHTML = `${temp = Math.round(temp)}<sup>°</sup><sup>c</sup>`
      let elWeatherImage = document.querySelector('.weather-day__img').innerHTML = `
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
      `;
      
      showOneDay(data)
    })
}

function showOneDay(data) {
  elWeatherInfo.innerHTML = `
  <div class="weather-day__info">
    <p class="weather-day__text">humidity</p>
    <p class="weather-day__number">${data.main.humidity}<span>%</span></p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">pressure</p>
    <p class="weather-day__number">${data.main.pressure}</p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">sunrise</p>
    <p class="weather-day__number">${window.moment(data.sys.sunrise * 1000).format('HH:mm a')}</p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">sunset</p>
    <p class="weather-day__number">${window.moment(data.sys.sunset * 1000).format('HH:mm a')}</p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">wind speed</p>
    <p class="weather-day__number">${data.wind.speed}<span> km/h</span></p>
  </div>
  `;
}

function showWeatherData(data) {
  let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
  elWeatherInfo.innerHTML = `
  <div class="weather-day__info">
    <p class="weather-day__text">humidity</p>
    <p class="weather-day__number">${humidity}<span>%</span></p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">pressure</p>
    <p class="weather-day__number">${pressure}</p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">sunrise</p>
    <p class="weather-day__number">${window.moment(sunrise * 1000).format('HH:mm a')}</p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">sunset</p>
    <p class="weather-day__number">${window.moment(sunset * 1000).format('HH:mm a')}</p>
  </div>
  <div class="weather-day__info">
    <p class="weather-day__text">wind speed</p>
    <p class="weather-day__number">${wind_speed}<span> km/h</span></p>
  </div>
  `;

  let otherDay = '';
  let elWaetherWeek = document.querySelector('.weather-week__list');
  data.daily.forEach((value, index) => {
    if (index == 0) {

    } else {
      otherDay += `
      <li class="weather-week__item">
        <p class="weather-week__text">${window.moment(value.dt * 1000).format('ddd')}</p>
        <img src="http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png"/>
        <p class="weather-week__temp-ligth"><i class="weather-week__icon fas fa-circle"></i>${value.temp.night = Math.round(value.temp.night)}<span>°C</span></p>
        <p class="weather-week__temp-nigth"><i class="weather-week__icon fas fa-moon"></i>${value.temp.day = Math.round(value.temp.day)}<span>°C</span></p>
      </li>
      `;
    }
  })
  elWaetherWeek.innerHTML = otherDay;
}


