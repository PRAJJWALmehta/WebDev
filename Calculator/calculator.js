const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/', function(req, res){
    res.send("Your BMI is "+ (Number(req.body.w)/(Number(req.body.h)*Number(req.body.h))).toPrecision(4));
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});