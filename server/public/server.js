const express = require('express');
const session = require('express-session');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
 
app.use(session({
    secret: 'keyboard cat',
    resave: false,    
    saveUninitialized: true,
}))

app.get('/', (req, res) => {
    if(req.session.is_logged_in){
        res.sendFile(__dirname+'/public/home/index.html');
    } else {
        res.redirect("/login");
    }
});

app.route("/login").get((req, res) => {
    if(req.session.is_logged_in){
        res.redirect('/');
    } else {
        res.sendFile(__dirname+'/public/login/index.html');
    }
})
.post((req, res) => {
    console.log(req.body);
    req.session.is_logged_in = true;
    res.redirect('/');
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname+'/public/signup/index.html');
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
    
})

app.listen(port, (req, res) => {
    console.log(`Server running at http://localhost:${port}`);
});