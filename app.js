const express = require('express');
const hbs = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

/* Skipping this part first */
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb://localhost:27017/";
const dbname = "bucketlistdb";

/**
  First connection to the database once the application starts.
  This is so that we can create the collections needed prior to any transactions
  that we need to do.
**/
mongoClient.connect(databaseURL, options, function(err, client) {
    /**
      Only do database manipulation inside of the connection
      When a connection is made, it will try to make the database
      automatically. The collection(like a table) needs to be made.
    **/
    if (err) throw err;
    const dbo = client.db(dbname);
  
    //Will create a collection if it has not yet been made
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
