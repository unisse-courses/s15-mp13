const bcrypt = require('bcrypt');
const saltRounds = 10;

/* MODELS */
const commentModel = require('../models/comments');
const itemModel = require('../models/items');
const userModel = require('../models/users');
const db = require('../models/db');

/* CONSTRUCTORS and other FUNCTIONS */
function addUser(firstName, lastName, email, username, password, bio) {
	var newUser = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		username: username,
		password: password,
		bio: bio,
		// img
	};

	return newUser;
}

/* MAIN FUNCTIONS */
const rendFunctions = {

  getLanding: function(req, res, next) {
		if (req.session.user){
			res.redirect('/');
		} else {
			res.render('landing', {
			});
		}
	},

	postLogin: async function(req, res, next) {
		let { username, password } = req.body;

		// search for user
		var user = await db.findOne(userModel, {username: username});

		try {
			if (!user) // user does not exist
				res.send({status: 409});
			else {
				// bcrypt.compare(password, user.password, function(err, match) {
				userModel.findOne({password: user.password}, function(err, match) {
						if (match){
							req.session.user = user;
							res.send({status: 200});
							console.log("-- Logged in successfully.")
						} else
							res.send({status: 401});
				});
			}		
		} catch(e) {
			console.log(e);
		}
	},

	postLogout: function(req, res) {
		req.session.destroy();
		res.redirect("login");
	},

	postRegister: async function(req, res, next) {
		let { firstName, lastName, email, username, password } = req.body;

		// check to see if email and username exists
		var EM = await db.findOne(userModel, { email: email });
		var UN = await db.findOne(userModel, {username: username});

		try{
			if(EM) // email exists
				res.send({status: 401});
			
			else if(UN) // username exists
				res.send({status: 402});

			else{ // email and username is available
				var bio = '';
				var user = addUser(firstName, lastName, email, username, password, bio);

				userModel.create(user, function(err){		
					if (err) {
						res.send({status: 500});
					}
					else{
						req.session.user = user;
						res.send({status: 200});
						console.log("-- User created.")
					}
				})
			}
		} catch(e) {
			console.log(e);
		}
	},

	getProfile: function(req, res, next) {
		if (req.session.user){
			res.render('profile', {
				fullName: req.session.user.firstName + " " + req.session.user.lastName,
				username: req.session.user.username,
				bio: req.session.user.bio,

				// tasks: ,
		});
		} else {
			res.redirect('/');
		}
	},

	getSettings: function(req, res, next) {
		if (req.session.user){
			res.render('settings', {
				
		});
		} else {
			res.redirect('/');
		}
	},

}


module.exports = rendFunctions;