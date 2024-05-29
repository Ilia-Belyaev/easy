var but = document.querySelector("button");
var divText = document.querySelector("div");
var currentTown = document.getElementById("writingTown")       
 
but.addEventListener("click",()=>{
    var currentTownValue = currentTown.value?currentTown.value.toLowerCase().replace(currentTown.value.toLowerCase()[0],currentTown.value.toLowerCase()[0].toUpperCase()):"";
    var body = document.querySelector("body");
    const request = new XMLHttpRequest;
    const requestApi = new XMLHttpRequest();
    const requestWeather = new XMLHttpRequest();
    var apiKey;
    var apiKeyWeather;
    if (currentTownValue!==""){
        function getApiKey(apiKey){
            var url = 'https://geocode-maps.yandex.ru/1.x/?apikey='+apiKey+'&geocode='+currentTownValue+'&lang=ru-RU'+'&format=json';
            request.open("GET",url);
            request.send();
            request.onload=function(){
                if(request.status!=200){
                    alert('Ошибка '+ request.status +' : '+ request.statusText);
                }else{
                    var coord = JSON.parse(request.response).response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                    var latitude = coord.split(" ")[1];
                    var longitude = coord.split(" ")[0];
                    var url_weather = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=71dffb53459a694cab374641a0c54649';
                    requestWeather.open("GET",url_weather);
                    requestWeather.send()
                    requestWeather.onload=function(){
                        if(requestWeather.status!=200){
                            alert('Ошибка '+ requestWeather.status +' : '+ requestWeather.statusText);
                        }else{
                            var weatherImg = JSON.parse(requestWeather.responseText).weather[0].icon;
                            var weather = JSON.parse(requestWeather.responseText).weather[0].description+", ";
                            var temp =  Math.round(Number(JSON.parse(requestWeather.responseText).main.temp)-273)+'&deg;C';
                            createCard(weather,temp,weatherImg)
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
    
        function createCard(weather,temp,weatherImg){
            var newCard = document.createElement("div");
            var para = document.createElement("div");
            newCard.style.border = "2px solid #5da3e9";
            newCard.style.borderRadius="30px";
            newCard.style.height = "80px";
            newCard.style.width = "300px";
            var weatherIcon = document.createElement("img");
            weatherIcon.src = chooseWeatherIcon(weatherImg);
            newCard.style.textAlign = "center";
            para.innerHTML = weather + temp ;
            body.appendChild(newCard);
            newCard.appendChild(weatherIcon);
            newCard.appendChild(para);
            
        }
    
        function chooseWeatherIcon(weatherImg){
            var urlImg = "http://openweathermap.org/img/w/"+weatherImg+".png";
            return urlImg;
        }
    }
})