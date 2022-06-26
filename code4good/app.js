const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const randomArray = require('array-random');
const session = require("express-session");
const bcrypt = require("bcrypt");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo');
const app = express();
require('dotenv').config();

function initializePassport(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, String(user._id)))
    passport.deserializeUser(async (id, done) => {
        return done(null, (await getUserById(id))[0])
    })
}

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

mongoose.connect(`mongodb+srv://brainhacker507:${encodeURIComponent(process.env.MONGOCLUSTERPASS)}@cluster1.n8gto.mongodb.net/?retryWrites=true&w=majority
`, {
    poolSize: 460,
    useNewUrlParser: true,

    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course_progress: {
        type: Map,
        require: true,
        default: new Map()
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true
    },
    catagory: {
        type: String,
        required: true,
        enum: ["Teacher", "Student"],
        default: "Student"
    }
});

const User = new mongoose.model("user", userSchema);

initializePassport(
    passport,
    async (email) => {
        const result = await User.find({ username: email });
        if (result.length == 0)
            return null;
        else
            return result[0];
    },
    async (id) => {
        const result = await User.find({ _id: id });
        if (result.length == 0)
            return null;
        else
            return result;
    }
)

app.use(session({
    secret: "You were expecting this string to be a secret used to encrypt cookies, but It was I, DIO!",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://brainhacker507:${encodeURIComponent(process.env.MONGOCLUSTERPASS)}@cluster1.n8gto.mongodb.net/?retryWrites=true&w=majority`
    })
}));
app.use(passport.initialize());
app.use(passport.session());


// async function hehe(email){
//     console.log(await User.find({_id : "62b6f8718cf7aec21b82c44f"}));
// }

app.get("/", (req, res) => res.render("index"));
app.get("/teacher", (req, res) => res.render("indexTeacher"));

app.get("/loginFailed", (req, res) => res.render("message", {
    message: "You password or Username was incorrect. Try again"
}));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/loginFailed',
}))
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/landing",(req,res)=>{
    res.render("landing");
})
app.get("/donate",(req,res)=>{
    res.render("donate");
})
app.post("/register", async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (await User.exists({ username: req.body.email })) {
            return res.render("message", {
                message: "This email is already in use"
            })
        }
        await User.create({
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword
        })
        passport.authenticate("local")(req, res, function () {
            res.redirect("/homepage");
        });
    } catch (err) {
        console.log(err);
        res.redirect('/register')
    }
});

app.post("/registerProf", async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (await User.exists({ username: req.body.email })) {
            return res.render("message", {
                message: "This email is already in use"
            })
        }
        await User.create({
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword,
            catagory: "Teacher"
        })
        passport.authenticate("local")(req, res, function () {
            res.redirect("/homepage");
        });
    } catch (err) {
        console.log(err);
        res.redirect('/register')
    }
});


app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.get("/homepage", async (req, res) => {
    if (!req.isAuthenticated())
        return res.redirect("/");
    // return res.send(req.user);
    if (req.user.catagory === "Student")
        return res.render("dashboard");
    else if (req.user.catagory === "Teacher") {
        const student_data = await User.find({ catagory: "Student" }, { name: 1, course_progress: 1 });
        student_data.sort((left, right) => { return  right.course_progress.size - left.course_progress.size});
        return res.render("professorDashboard", { students: student_data });
    }

    else return res.send("O_o");
});

app.get("/course_progress", (req, res) => {
    if (!req.isAuthenticated())
        return;
    return res.send(req.user.course_progress);
})


app.get("/course/:page_id", async (req, res) => {
    if (!req.isAuthenticated()) {
        console.log("unauth in course ");
        return;
    }
    // console.log(req.user, req.user.course_progress)
    req.user.course_progress.set(req.params.page_id, true)
    // console.log(req.user, req.user.course_progress)

    const promise = await User.updateOne({
        _id: req.user._id
    }, {
        $set: {
            course_progress: req.user.course_progress
        }
    });
    // console.log(promise);
    return res.send(`Course material for course ${req.params.page_id}`);
});

app.get("/completion", (req, res) => {
    // console.log(req.user.course_progress,req.user.course_progress.keys())
    // for(const key in req.user.course_progress.keys()){
    //     console.log(key);
    // }
    if (!req.isAuthenticated())
        return;

    return res.send({ "ans": req.user.course_progress.size });
});

var port_number = process.env.PORT || 5000;
//server.listen(process.env.PORT || 3000);
app.listen(port_number, () => {
    console.log("Server started on " + port_number);
});