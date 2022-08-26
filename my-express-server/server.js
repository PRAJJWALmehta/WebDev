const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.send("<h1>hello world</h1>");
});

app.get("/contact/", function(req, res){
    res.send("contact me at prajjwalmehta75@gmail.com");
});

app.get("/about", function(req, res){
    res.send("<h1>Hey ! My name is Prajjwal Mehta. I am an Aspiring software developer who also loves to listen to music</h1>");
});

app.get("/hobbies", function(req, res){
    res.send("<h1>Music | Football | Code</h1>");
});

app.listen(8000, function(){
    console.log("server started on port 8000!");
});