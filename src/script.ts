const input = document.querySelector(".container .card .searchbar input") as HTMLFormElement,
btn = document.querySelector(".container .card .searchbar button") as HTMLElement,
weatherlogo = document.querySelector(".container .card .tem img") as HTMLImageElement,
temp = document.querySelector(".container .card .tem h3") as HTMLElement,
cityName = document.querySelector(".container .card .tem h4") as HTMLElement,
Humidity = document.querySelector(".container .card .humidityandwind .humidity .data h5")as HTMLElement,
windspeed = document.querySelector(".container .card .humidityandwind .windspeed .data h5")as HTMLElement,
ApiKey:string ="&appid=f69f48c58da9703d27f60ca76880b442",
Url:string= "https://api.openweathermap.org/data/2.5/weather?",
units:string="&units=metric";

let cityNameTOApi:string="q=cairo";


// to check weather in deffrent place
btn.addEventListener("click",(e:Event)=>{
  setTimeout(() => {
    (<HTMLElement>e.target).style.removeProperty("animation")
  }, 300);
  (<HTMLElement>e.target).style.cssText="animation: btnAnimation 0.3s linear;"
  if (input.value !== "") {
    cityNameTOApi = `q=${input.value}`;
    checkweather();
  }
})

// control weather Icon
function weatherIcon(weatherCondition:string) {
  weatherlogo.src=`./img/${weatherCondition}.png`
}


// control temp and cityName
function AddtempAndCity(tem:string , cityN:string) {
  (<HTMLElement>temp.firstChild).remove()
  temp.prepend((Math.trunc(Number(tem))).toString());
  cityName.innerHTML=cityN;
}

// control Humidity and windspeed
function AddHumidityAndWindSpeed(hum:string,wind:string) {
  (<HTMLElement>Humidity.firstChild).remove();
  (<HTMLElement>windspeed.firstChild).remove();
  Humidity.prepend(hum);
  windspeed.prepend(wind);
}

// fetch Weather Api
async function checkweather() {
  try {
    const respone = await fetch(`${Url}${cityNameTOApi}${ApiKey}${units}`);
    const data = await respone.json();
    weatherIcon(data.weather[0].main)
    AddtempAndCity(data.main.temp,data.name);
    AddHumidityAndWindSpeed(data.main.humidity,data.wind.speed);
  } catch {
    console.log(Error("error in Api"));
  }
}
checkweather();