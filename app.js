
// fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38ff65044045c0ef150e1a118de60f9c/37.8267,-122.4233')
// .then(response => response.json())
// .then(data => console.log(data))



// fetch('https://maps.googleapis.com/maps/api/geocode/json?address=montreal&key=AIzaSyA47Dllm4NiJ7aUZ16Q0PrFkAIav775PqQ')
// .then(response => response.json())
// .then(data => console.log(data))

(function() {
    var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
    var DARKSKY_API_KEY = '38ff65044045c0ef150e1a118de60f9c';
    var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    
    var GOOGLE_MAPS_API_KEY = 'AIzaSyA47Dllm4NiJ7aUZ16Q0PrFkAIav775PqQ';
    var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    
    // This function returns a promise that will resolve with an object of lat/lng coordinates
    function getCoordinatesForCity(cityName) {
      // This is an ES6 template string, much better than verbose string concatenation...
      var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
    
      return (
        fetch(url) // Returns a promise for a Response
        .then(response => response.json()) // Returns a promise for the parsed JSON
        .then(data => data.results[0].geometry.location) // Transform the response to only take what we need
      );
    }
    
    
    //getCoordinatesForCity("montreal").then(console.log)
    
    function getCurrentWeather(coords) {
      // Template string again! I hope you can see how nicer this is :)
      var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
      
      return (
        fetch(url)
        .then(response => response.json())
        .then(data => data.currently)
      );
    }
    
    function getDailyWeather(coords){
      var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=currently,minutely,hourly,alerts,flags`;
      
      return(
        fetch(url)
         .then(response=> response.json())
         .then(data=> data.daily.data[0])
        );
    }
  

   
    
    var app = document.querySelector('#app');
    var cityForm = app.querySelector('.city-form');
    var cityInput = cityForm.querySelector('.city-input');
    //var getWeatherButton = cityForm.que//rySelector('.get-weather-button');
    //var cityWeather = app.querySelector('.city-weather');
    
    

  
    
    cityForm.addEventListener('submit', function(event) { // this line changes
      event.preventDefault(); // prevent the form from submitting
      //question 1
      
        document.getElementById("loading").innerHTML = "loading...";
       
      // This code doesn't change!
      var city = cityInput.value;
    
      setTimeout(function() { getCoordinatesForCity(city)
        .then(getCurrentWeather)
        
        .then(function(weather) {
            //console.log(weather)
          document.getElementById("loading").innerHTML = "";
          document.getElementById("temperature").innerHTML= 'Current temperature: ' + weather.temperature;
          document.getElementById("windSpeed").innerHTML="Wind Speed: "+ weather.windSpeed;
          
          
          sky(weather.icon);
        
        });
      
      
      }, 1000);
    
        
        
    
      
    });

})()


document.querySelector('h1').style.color = 'red';

var dailyBorder =  document.getElementsByClassName('city-weather'); 

console.log(dailyBorder);
dailyBorder[0].classList.add('redborder');

 

function sky(icon) {  
  
var skycons = new Skycons({"color": "red"});
skycons.add(document.getElementById("icon0"), icon.toString());
skycons.play();

}
