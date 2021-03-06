/* DEPENDENCIES */
const express = require('express');
const hbs = require('handlebars');
const exphbs = require('express-handlebars');
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser'); //generates cookies to keep track of logged-in user
const session = require('express-session'); //keeps track of who's logged in
const mongoose = require('mongoose');
//For sessions
const MongoStore = require('connect-mongo')(session);
const path = require('path');

/* INITIALIZING DOTENV (to access db info)*/
require('dotenv').config(); 

const { envPort, sessionKey } = require('./config');

/* EXPRESS APPLICATION */
const app = express();
const port = envPort || 3000;

/* CONNECT TO DB */ 
const db = require('./models/db');
db.connect();

/* INITIALIZING COOKIES & SESSION, BODYPARSER */
app.use(cookieParser());

app.use(session({
	secret: sessionKey,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* CREATE HBS ENGINE */
app.engine('hbs', exphbs({  
	extname: 'hbs',
	defaultView: 'main',
	layoutsDir: path.join(__dirname, '/views/layouts'),
	partialsDir: path.join(__dirname, '/views/partials')
}));

app.set('view engine', 'hbs');

/* ROUTER */
const router = require('./router/indexRouter');
app.use('/', router);

app.use(express.static(__dirname));
app.use(express.static('/public'));

/* PORT */  
app.listen(port, function(){
    console.log("Listening to http://localhost:" + port);
});