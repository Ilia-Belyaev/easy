var but = document.querySelector("button");
var divText = document.querySelector("div");
var currentTown = document.getElementById("writingTown")       
 
but.addEventListener("click",()=>{
    var currentTownValue = currentTown.value?currentTown.value.toLowerCase().replace(currentTown.value.toLowerCase()[0],currentTown.value.toLowerCase()[0].toUpperCase()):"";
    var body = document.querySelector("body");
    var thisDiv = document.querySelector("div");
    thisDiv.replaceChildren();
    const request = new XMLHttpRequest;
    const requestApi = new XMLHttpRequest();
    const requestWeather = new XMLHttpRequest();
    var apiKey;
    var apiKeyWeather="71dffb53459a694cab374641a0c54649";
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
                    var url_weather = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKeyWeather;
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
            var para = document.createElement("p");
            para.style.marginTop = "0px";
            thisDiv.style.border = "2px solid #5da3e9";
            thisDiv.style.borderRadius="30px";
            thisDiv.style.height = "80px";
            thisDiv.style.width = "300px";
            var weatherIcon = document.createElement("img");
            weatherIcon.src = chooseWeatherIcon(weatherImg);
            thisDiv.style.textAlign = "center";
            para.innerHTML = weather + temp ;
            thisDiv.style.visibility = "visible";
            thisDiv.appendChild(weatherIcon);
            thisDiv.appendChild(para);
            
        }
    
        function chooseWeatherIcon(weatherImg){
            var urlImg = "http://openweathermap.org/img/w/"+weatherImg+".png";
            return urlImg;
        }
    }else{
        thisDiv.style.visibility = "hidden";
    }
})