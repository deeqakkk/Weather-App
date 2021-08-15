const express = require("express");
const https = require("https");
const app = express();


app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
var query = "";
var Temp = "";
var weatherDes = "";
var imgURL = "";
var cityName="";

app.get("/", function (request, response) {
     response.render("index");
  });


app.post("/", function (req, res) {
    query = req.body.cityName;
    
    const url = "API_KEY";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            weatherDes = weatherData.weather[0].description;
            cityName=weatherData.name;
            Temp = weatherData.main.temp;
            const imgSrc = weatherData.weather[0].icon;
            imgURL = "https://openweathermap.org/img/wn/" + imgSrc + "@2x.png";

            res.render("index2"  , {  
                varplace: cityName,
                vartemp: Temp,
                varweather: weatherDes,
                varimg: imgURL,
            });
            
        })
        
      
    })
    
   
   

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 0822;
}
app.listen(port);