//  fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=9b2f9864d3456e690a618550368007b8&text=THE_SEARCH_TEXT")
//  .then(response => response.json())
//  .then(data => console.log(data))

(function() {

    var FLIKR_URL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=";
    var FLIKR_API_KEY = '9b2f9864d3456e690a618550368007b8';
    var SEARCH= "&text=";
    
    var FARM_ID="";
    var SERVER_ID="";
    var SECRET="";
    
    var FARM_URL = "https://farm"+FARM_ID+".staticflickr.com/"+SERVER_ID+"/"+SECRET+".jpg";
    
    // id: "8881919764",
    // owner: "42221957@N08",
    // secret: "0904cd44a8",
    // server: "5466",
    // farm: 6,
    // title: "the unknown",
    // ispublic: 1,
    // isfriend: 0,
    // isfamily: 0
    //"https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=9b2f9864d3456e690a618550368007b8&text=THE_SEARCH_TEXT";
    
    
    
    function getPhotosForSearch(search){
                
        var url= FLIKR_URL+FLIKR_API_KEY+SEARCH+search;
         return (
            fetch(url)
            .then(response => response.json())
            .then(data => data.photos.photo)
            
          );
        
    }
    
    function buildPhoto(photo){
        
    }
    
    
    
    var app = document.querySelector('#app');
    var photoForm = app.querySelector('.photoForm');
    var formInput = photoForm.querySelector('.form-input');
    
    
    photoForm.addEventListener('submit', function(event) { // this line changes
        event.preventDefault(); // prevent the form from submitting
        
        var formSearch = formInput.value;
    
        
    
        getPhotosForSearch(formSearch)
        .then(data=> {
            data.forEach(photo=>{
                
            })
            
         
        })
            
          
    });
        
})()