const express = require('express')
const hbs = require('express-handlebars');
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
        title: "Login | BucketList",
        layout: "login"
    })
});

