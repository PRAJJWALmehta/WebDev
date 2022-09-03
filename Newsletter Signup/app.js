const express = require('express');
const app = express();
const bodyParser = require('body-Parser');
const request = require('request');
const https = require('https');
app.use("/public",express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res)
{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.emailID; 

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/1161e501e6"
    const options = {
        method: "POST",
        auth: "prajju:cb532acf25edafca2115c3cdcd1735f1-us14"
    }
    const request = https.request(url, options, function(response)
    {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

//APIkey cb532acf25edafca2115c3cdcd1735f1-us14
//ListID 1161e501e6

app.listen(process.env.PORT || 8000, function(req, res) {
    console.log("server is running on heroku's port!");
});

// URL : https://stark-garden-76071.herokuapp.com/