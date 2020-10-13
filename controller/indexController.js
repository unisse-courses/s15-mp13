const bcrypt = require('bcrypt');
const saltRounds = 10;

/* MODELS */
const commentModel = require('../models/comments');
const taskModel = require('../models/tasks');
const userModel = require('../models/users');
const db = require('../models/db');
const tasks = require('../models/tasks');
const comments = require('../models/comments');

/* CONSTRUCTORS and other FUNCTIONS */
function generateTaskID() {
	var taskID = "T";
	var idLength = 8;

	for (var i = 0; i < idLength; i++) {
		taskID += (Math.round(Math.random() * 10)).toString();
	}

	return taskID;
}

function addUser(firstName, lastName, email, username, password) {
	var newUser = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		username: username,
		password: password,
		bio: "",
		displayPic: "/assets/img/default.jpg"
	};

	return newUser;
}

function newTask(taskID, username, title, description, isRequested, isPrivate, tag1, tag2, tag3) {
	var newTask = {
		taskID: taskID,
		username: username,
		title: title,
		description: description,
		dateAdded: new Date(),
		isRequested: isRequested,
		isComplete: false,
		isPrivate: isPrivate,
		tag1: tag1,
		tag2: tag2,
		tag3: tag3
	};

	return newTask;
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
		res.redirect('landing');
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
				var user = addUser(firstName, lastName, email, username, password);

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

	getHome: function(req, res, next) {
		if (req.session.user){
			//display all public tasks
			taskModel.find({isPrivate: false}, function(err, data) {
				var details = JSON.parse(JSON.stringify(data));
				var taskList = details;	
	
					console.log(taskList);
	
					res.render('home', {
						tasks: taskList,
				});
			});
		} else {
			res.redirect('landing');
		}
	},

	getProfile: async function(req, res, next) {
		if (req.session.user){
			console.log(req.session.user);

		// get tasks
		// var taskList = await taskModel.aggregate([
		// 	{$match: {userID: req.session.user.userID}},
		// 	{$lookup: {
		// 			from: "tasks",
		// 			localField: "userID",
		// 			foreignField: "userID",
		// 			as: "taskList" 
		// 	}},
		// 	{$unwind: "$taskList"}
		// ]);

		taskModel.find({username: req.session.user.username}, function(err, data) {
			var details = JSON.parse(JSON.stringify(data));
			var taskList = details;	

		console.log(taskList);

				res.render('profile', {
					fullName: req.session.user.firstName + " " + req.session.user.lastName,
					username: req.session.user.username,
					bio: req.session.user.bio,
					tasks: taskList,
			});
		});
		} else {
			res.redirect('landing');
		}
	},

	getSettings: function(req, res, next) {
		if (req.session.user){
			res.render('settings', {
				firstName: req.session.user.firstName,
				lastName: req.session.user.lastName,
				firstName: req.session.user.firstName,
				bio: req.session.user.bio,
				email: req.session.user.email,
		});
		} else {
			res.redirect('landing');
		}
	},

	postAddTask: async function(req, res, next) {
		let { title, description, isRequested, isPrivate, tag1, tag2, tag3 } = req.body;

		var taskID = generateTaskID();
		var task = newTask(taskID, req.session.user.username, title, description, isRequested, isPrivate, tag1, tag2, tag3);
		console.log(task);

		taskModel.create(task, function(err) {
				if (err)
					res.send({status: 500});

				else{
					res.send({status: 200});
					console.log("-- Task added.")
				}
		})
	},

	getTaskComments: async function(req, res, next) {
		var taskID = req.params.taskID;
		console.log(taskID);
		
		taskModel.find({taskID: taskID}, function(err, data) {
			var details = JSON.parse(JSON.stringify(data));
			var task = details;	

			commentModel.find({taskID: taskID}, function(err, data) {
				var details = JSON.parse(JSON.stringify(data));
				var commentsList = details;	
				// console.log(commentsList);
				res.render('view-comments', {
					title: task[0].title,
					description: task[0].description,
					tag1: task[0].tag1,
					tag2: task[0].tag2,
					tag2: task[0].tag3,
					commentsList: commentsList,
				});
			});		
		});		
	},

	getEditTask: async function(req, res, next) {
		var taskID = req.params.taskID;
		console.log(taskID);
		
		taskModel.find({taskID: taskID}, function(err, data) {
			var details = JSON.parse(JSON.stringify(data));
			var task = details;	

				res.render('edit-task', {
					title: task[0].title,
					description: task[0].description,
					tag1: task[0].tag1,
					tag2: task[0].tag2,
					tag2: task[0].tag3,
			});
		});	
	},

}


module.exports = rendFunctions;