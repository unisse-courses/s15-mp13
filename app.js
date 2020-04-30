const express = require('express');
const hbs = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

/* DATABASE STUFF */
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb://localhost:27017/";
const dbname = "bucketlistdb";

mongoClient.connect(databaseURL, options, function(err, client) {
    if (err) throw err;
    const dbo = client.db(dbname);
  
    dbo.createCollection("list", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      client.close();
    });
  });
  
app.listen(port, function(){
    console.log("Listening to http://localhost:" + port);
});

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, '/views/partials')
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname));


//ROUTERS
app.get('/', function(req, res){
    res.render('landing',{ 
        layout: 'landing'
    });
});

app.get('/profile', function(req, res){
    res.render('profile',{ 
        layout: 'main'
    });
});

app.get('/account-settings', function(req, res){
    res.render('accountsettings',{ 
        layout: 'main'
    });
});
