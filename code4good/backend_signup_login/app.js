const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const randomArray = require('array-random');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const MongoStore = require('connect-mongo');
const app = express();
require('dotenv').config();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect(`mongodb+srv://brainhacker507:1SPxFadRlJwVMPc4@cluster0.n8gto.mongodb.net/?retryWrites=true&w=majority

`, {
    poolSize: 460,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(session({
    secret: "You were expecting this string to be a secret used to encrypt cookies, but It was I, DIO!",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://brainhacker507:1SPxFadRlJwVMPc4@cluster0.n8gto.mongodb.net/?retryWrites=true&w=majority`
        })
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => res.render("index"));

app.get("/loginFailed", (req, res) => res.render("message", {
    message: "You password or Username was incorrect. Try again"
}));

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.email,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (!err) {
            passport.authenticate("local", {
                failureRedirect: "/loginFailed"
            })(req, res, () => {
                res.redirect("/homepage");
            });
        } else {
            console.log(err);
            res.redirect("/");
        }
    });
});

app.post("/register", (req, res) => {
    User.exists({
        username: req.body.email
    }, (err, usernameTaken) => {
        if (usernameTaken) {
            return res.render("message", {
                message: "Sorry, username taken"
            });
        } else {
            User.register({
                username: req.body.username,
                name: req.body.name
            }, req.body.password, (err, user) => {
                if (!err) {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/homepage");
                    });
                } else {
                    console.log(err);
                    res.redirect("/");
                }
            });
        }
    });
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get("/homepage", (req, res) => {
    if (!req.isAuthenticated())
        return res.redirect("/");
    return res.send(req.user);
    return res.sendFile(__dirname + "/webPages/homepage.html");
});


var port_number = process.env.PORT || 3000;
//server.listen(process.env.PORT || 3000);
app.listen(port_number, () => {
    console.log("Server started on " + port_number);
});