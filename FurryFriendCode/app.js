let weatherTemperature = {
     
    
    apiKey: "e028aef30e49d53a466bc924e0bd6d56",
    fetchWeather: function (city) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial&APPID=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        
        const { name } = data;     
        const { icon } = data.weather[0];
        const { temp } = data.main;
    
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";

        if(temp > 68){
            document.querySelector(".temp").innerText = "Oh no! " + temp + "°F" + " is too hot for your furry friend's paws to walk in! Purchase paw pads below.";
            document.querySelector(".chewy").innerText="Dog paw pads purchase here!";
            document.getElementById("chewy").href="https://www.chewy.com/b/boots-shoes-1732?cat-ban-10=sb-10-ShopEarly2022&gclid=CjwKCAiA9qKbBhAzEiwAS4yeDScfLtF79k3n9Ty0dBBCDW-u_y2-rkRywcBgR-1dVLcviDmp2XyFIxoCXq0QAvD_BwE"; 
                  
        }
        else if (temp < 32){
            document.querySelector(".temp").innerText = "Oh no! " + temp + "°F" + " is too cold for your furry friend's paws to walk in!";
        }

        document.querySelector(".weather").classList.remove("loading");       
    },
    search: function () {
        // get content of the search bar
        this.fetchWeather(document.querySelector(".searchbarSecond").value);

    },
    
};

let dogBreed = {
    
    api_key: "live_CEeqmoMA0at0eI0c1bWdPhIg93fQhuvAnXhck7qkhtivgIJScvEtMosWRgvzTYnY",
    url: "https://api.thedogapi.com/v1/breeds/search?q=",
    
    fetchDogBreed: async function (breedType) {

        const response = await fetch(this.url + breedType,{headers: {
            'x-api-key': this.api_key
          }})
        
        try {
            const data = await response.json()
            this.displayDogBreed(data)
        } catch (err) {
            console.error(err)
        }
    },   
    displayDogBreed: function(data) {
        const dogName  = data[0]['name'];
        const temperament  = data[0].temperament;
        document.querySelector(".dog-breed").innerText = "Your furry friend is a " + dogName + "!";
        document.querySelector(".traits").innerText = "A " + dogName + "'s traits are: " + temperament;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + dogName + "')";

    },

    search: function () {
        this.fetchDogBreed(document.querySelector(".searchbar").value);
    },
    
};

document.querySelector(".searchSecond button").addEventListener("click", function () {
    weatherTemperature.search();
    dogBreed.search();

});

document.querySelector(".searchbarSecond").addEventListener("keyup", function(event) {
if (event.key == "Enter"){
    weatherTemperature.search();
    dogBreed.search();
}
});
