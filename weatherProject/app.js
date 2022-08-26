const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const https = require('https');
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
} );

app.post('/', function(req, res,)
{
    const query = req.body.cityName;
    const APIkey = "4580d7a3c3a05832c8335662febd5223";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+APIkey+"&units=metric";
    https.get(url, function(res1)
    {
        console.log(res1.statusCode);

        res1.on("data", function(data)
        {
            const weatherData = JSON.parse(data); 
            const temp = weatherData.main.temp;
            const location = weatherData.name;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The temperature in "+ location + " is " + temp + " degree Celsius</h1>");    
            res.write("the weather is having " + desc); 
            res.write("<br><img src = "+imageUrl+" >");

            res.send();  
        });
    });
    //res.sendFile(__dirname + "/index.html" );
});


// app.get('/', function(req, res)
// {
// });


app.listen(8000, function(req, res)
{
    console.log("server started at port 8000 !")
});