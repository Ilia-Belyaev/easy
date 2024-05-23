var but = document.querySelector("button");
var divText = document.querySelector("div");
var selected = document.getElementById("Towns");
        
        
but.addEventListener("click",()=>{
    var selectedItem = selected.options[selected.selectedIndex].value;   
    const request = new XMLHttpRequest;
    const requestApi = new XMLHttpRequest();
    const requestWeather = new XMLHttpRequest();
    var apiKey;
    var apiKeyWeather;
    function getApiKey(apiKey){
        var url = 'https://geocode-maps.yandex.ru/1.x/?apikey='+apiKey+'&geocode='+selectedItem+'&lang=ru-RU'+'&format=json';
        request.open("GET",url);
        request.send();
        request.onload=function(){
        if(request.status!=200){
            alert('Ошибка '+ request.status +' : '+ request.statusText);
            divText.textContent = "Sorry";
            console.log(request.response)
        }else{
            alert("Complete,take "+ request.length + ' bytes');
            var coord = JSON.parse(request.response).response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            var latitude = coord.split(" ")[1];
            var longitude = coord.split(" ")[0];
            var url_weather = "https://api.weather.yandex.ru/v2/forecast?lat="+latitude+"&lon="+longitude+"&ru-RU"+"X-Yandex-API-Key:"+apiKeyWeather;
            requestWeather.open("GET",url_weather);
            requestWeather.send()
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
})