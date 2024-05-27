var but = document.querySelector("button");
var divText = document.querySelector("div");
//var selected = document.getElementById("Towns");
var currentTown = document.getElementById("writingTown")       
 
but.addEventListener("click",()=>{
    //divText.textContent = "";
    //var selectedItem = selected.options[selected.selectedIndex].value; 
    var currentTownValue = currentTown.value?currentTown.value.toLowerCase().replace(currentTown.value.toLowerCase()[0],currentTown.value.toLowerCase()[0].toUpperCase()):"";
    var body = document.querySelector("body");
    const request = new XMLHttpRequest;
    const requestApi = new XMLHttpRequest();
    const requestWeather = new XMLHttpRequest();
    var apiKey;
    var apiKeyWeather;
    function getApiKey(apiKey){
        var url = 'https://geocode-maps.yandex.ru/1.x/?apikey='+apiKey+'&geocode='+currentTownValue+'&lang=ru-RU'+'&format=json';
        request.open("GET",url);
        request.send();
        request.onload=function(){
        if(request.status!=200){
            alert('Ошибка '+ request.status +' : '+ request.statusText);
            //divText.textContent = "Sorry";
        }else{
            var coord = JSON.parse(request.response).response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            
                var latitude = coord.split(" ")[1];
                var longitude = coord.split(" ")[0];
                var url_weather = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=71dffb53459a694cab374641a0c54649';
                //var url_weather = "https://api.weather.yandex.ru/v2/forecast?lat="+latitude+"&lon="+longitude+"&lang=ru-RU";
                requestWeather.open("GET",url_weather);
                //requestWeather.setRequestHeader('X-Yandex-API-Key', 'd7559011-e187-4a22-9d1c-61febf84397b');
                requestWeather.send()
                requestWeather.onload=function(){
                    if(requestWeather.status!=200){
                        alert('Ошибка '+ requestWeather.status +' : '+ requestWeather.statusText);
                    }else{
                        //созхдать новый див и сделать его карточкой с картинкой погоды и результатами
                        
                        //var weather = "Weather: "+JSON.parse(requestWeather.responseText).weather[0].description+" Temperature: "+ Math.round(Number(JSON.parse(requestWeather.responseText).main.temp)-273) + '&deg;C';
                        var weather = JSON.parse(requestWeather.responseText).weather[0].description;
                        var temp =  Math.round(Number(JSON.parse(requestWeather.responseText).main.temp)-273);
                        createCard(weather,temp)
                        
                        //divText.innerHTML+= "Weather: "+JSON.parse(requestWeather.responseText).weather[0].description;
                        //divText.innerHTML+= '<br>';
                        //divText.innerHTML+= "Temperature: "+ Math.round(Number(JSON.parse(requestWeather.responseText).main.temp)-273) + '&deg;C' ;
                    }
                
            }
            
            }
        }
    }
    requestApi.onreadystatechange = function(){
        if(this.status == 200){
            apiKey = requestApi.responseText;
            
            getApiKey(apiKey)
        }
    };
    requestApi.open("GET","ya_api_geocoder.txt",true);
    requestApi.send();

    function createCard(weather,temp){
        var newCard = document.createElement("div");
        var weatherIcon = document.createElement("img");
        weatherIcon.src = chooseWeatherIcon(weather);
        newCard.innerHTML = weather + temp ;
        newCard.appendChild(weatherIcon);
        body.appendChild(newCard);
    }

    function chooseWeatherIcon(weather){
        var src = "";
        var weatherSplit = weather.split(" ");
        switch (weather[1]){
            case "wind": src = "weather_icons/wind.gif";
                break;
            case "sun": src = "weather_icons/sun.gif";
                break;
            case "snow": src = "weather_icons/snow.gif";
                break;
            case "rain": src = "weather_icons/rain.gif";
                break;
            case "cloud": src = "weather_icons/cloudy.gif";
                break;
            default:
                src = "weather_icons/sun.gif";
                break;
        }
        return src;
    }



    /*requestWeather.onreadystatechange = function(){
        if(this.status==200){
            apiKeyWeather = requestWeather.responseText;
            console.log(requestWeather.responseText)
            getApiKeyWeather(apiKeyWeather);
        }
    }
    requestWeather.open("GET","ya_api_weather.txt",true);
    requestWeather.send();*/
})