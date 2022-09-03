const express = require("express");
const bodyParser = require("body-parser");


const date = require(__dirname+"/date.js")
console.log(date.getDate());

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true})); // necessary to use req.body in post request
app.use(express.static("public"));

const Items = [];
const workItems = [];

app.get("/", function(req, res){
    let day = date.getDate();
    res.render("list", {listTitle: day, newLi: Items});
});

app.post("/", function(req, res){

    let item = req.body.item;

    if (req.body.list === "Work") {
        workItems.push(item); 
        res.redirect("/work");
    } else {
        Items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newLi: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.item;
    newLi.push(item);
    res.redirect("/");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(8080, function(){
    console.log("Server up and running at port 8080 ");
});