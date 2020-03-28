const express = require("express");
const hbs = require("express-handlebars");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, function(){
    console.log("listening to port " + port);
});

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res){
    res.render('login',{ 
        title: "Login/Register",
        layout: "login"
    })
});

app.get('/home', function(req, res){
    res.render('home',{
        title: "Home",
        auctions
    })
});

app.get('/auction/:id', function(req,res){
    res.render('auction',{
        title: auctions[req.params.id].productName,
        auction: auctions[req.params.id]
    })
});

