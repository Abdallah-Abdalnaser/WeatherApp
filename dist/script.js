"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.querySelector(".container .card .searchbar input"), btn = document.querySelector(".container .card .searchbar button"), weatherlogo = document.querySelector(".container .card .tem img"), temp = document.querySelector(".container .card .tem h3"), cityName = document.querySelector(".container .card .tem h4"), Humidity = document.querySelector(".container .card .humidityandwind .humidity .data h5"), windspeed = document.querySelector(".container .card .humidityandwind .windspeed .data h5"), ApiKey = "&appid=f69f48c58da9703d27f60ca76880b442", Url = "https://api.openweathermap.org/data/2.5/weather?", units = "&units=metric";
let cityNameTOApi = "q=cairo";
// to check weather in deffrent place
btn.addEventListener("click", (e) => {
    setTimeout(() => {
        e.target.style.removeProperty("animation");
    }, 300);
    e.target.style.cssText = "animation: btnAnimation 0.3s linear;";
    if (input.value !== "") {
        cityNameTOApi = `q=${input.value}`;
        checkweather();
    }
});
// control weather Icon
function weatherIcon(weatherCondition) {
    weatherlogo.src = `./img/${weatherCondition}.png`;
}
// control temp and cityName
function AddtempAndCity(tem, cityN) {
    temp.firstChild.remove();
    temp.prepend((Math.trunc(Number(tem))).toString());
    cityName.innerHTML = cityN;
}
// control Humidity and windspeed
function AddHumidityAndWindSpeed(hum, wind) {
    Humidity.firstChild.remove();
    windspeed.firstChild.remove();
    Humidity.prepend(hum);
    windspeed.prepend(wind);
}
// fetch Weather Api
function checkweather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const respone = yield fetch(`${Url}${cityNameTOApi}${ApiKey}${units}`);
            const data = yield respone.json();
            weatherIcon(data.weather[0].main);
            AddtempAndCity(data.main.temp, data.name);
            AddHumidityAndWindSpeed(data.main.humidity, data.wind.speed);
        }
        catch (_a) {
            console.log(Error("error in Api"));
        }
    });
}
checkweather();
