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
	var idLength = 5;

	for (var i = 0; i < idLength; i++) {
		taskID += (Math.round(Math.random() * 10)).toString();
	}

	return taskID;
}

function generateCommID() {
	var commID = "C";
	var idLength = 5;

	for (var i = 0; i < idLength; i++) {
		commID += (Math.round(Math.random() * 10)).toString();
	}

	return commID;
}

function addUser(firstName, lastName, email, username, password) {
	var newUser = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		username: username,
		password: password,
		bio: "",
		displayPic: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
	};

	return newUser;
}

function newTask(taskID, username, title, description, dateAdded, isRequested, isPublic, tag1, tag2, tag3) {
	var newTask = {
		taskID: taskID,
		username: username,
		title: title,
		description: description,
		dateAdded: dateAdded,
		isRequested: isRequested,
		isComplete: false,
		isPublic: isPublic,
		tag1: tag1,
		tag2: tag2,
		tag3: tag3,
		numAdded: 0,
	};

	return newTask;
}

function newComment(commID, taskID, username, comment) {
	var newComment = {
		commID: commID,
		taskID: taskID,
		username: username,
		comment: comment,
		numLikes: 0,
		numDislikes: 0,
	};

	return newComment;
}

// format date
function formatDate(date) {
	var newDate = new Date(date);

	var mm = newDate.getMonth() + 1;
	switch(mm) {
		case 1: mm = "Jan"; break;
		case 2: mm = "Feb"; break;
		case 3: mm = "Mar"; break;
		case 4: mm = "Apr"; break;
		case 5: mm = "May"; break;
		case 6: mm = "Jun"; break;
		case 7: mm = "Jul"; break;
		case 8: mm = "Aug"; break;
		case 9: mm = "Sep"; break;
		case 10: mm = "Oct"; break;
		case 11: mm = "Nov"; break;
		case 12: mm = "Dec"; break;
	}

	var dd = newDate.getDate();
	var yy = newDate.getFullYear();

	return dd + " " + mm + " " + yy;
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
				// userModel.findOne({password: user.password}, function(err, match) {
						if (password === user.password){
							req.session.user = user;
							res.send({status: 200});
							// console.log("-- Logged in successfully.")
						} else
							res.send({status: 401});
				// });
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

	getHome: async function(req, res, next) {
		if (req.session.user){
			//display all public tasks
			taskModel.find({isPublic: true, isComplete: false}, async function(err, data) {
				var taskList = JSON.parse(JSON.stringify(data));
		
				var numComments = 0;
				for(var i = 0; i < taskList.length; i++){
					// find comments in task
					var details = await db.findMany(commentModel, {taskID: taskList[i].taskID});
					var commentsList = JSON.parse(JSON.stringify(details));
				
					taskList[i].numComments = commentsList.length;

					var date = formatDate(taskList[i].dateAdded);
	
					taskList[i].dateAdded = date;
				}
				
					res.render('home', {
						tasks: taskList,
						firstName: req.session.user.firstName,
				});
			});
		} else {
			res.redirect('landing');
		}
	},

	// view of home if no user is signed in
	getFeed: async function(req, res, next) {
		//display all public tasks
		taskModel.find({isPublic: true, isComplete: false}, async function(err, data) {
			var details = JSON.parse(JSON.stringify(data));
			var taskList = details;	
			
			var numComments = 0;
			for(var i = 0; i < taskList.length; i++){
				// find comments in task
				var details = await db.findMany(commentModel, {taskID: taskList[i].taskID});
				var commentsList = JSON.parse(JSON.stringify(details));
			
				var date = formatDate(taskList[i].dateAdded);
	
				taskList[i].dateAdded = date;
			}
			
				res.render('feed', {
					tasks: taskList,
			});
		});
	},

	getProfile: async function(req, res, next) {
		if (req.session.user){
			// console.log(req.session.user);

		taskModel.find({username: req.session.user.username, isComplete: false}, function(err, data) {
			var taskList = JSON.parse(JSON.stringify(data));

			for(var i = 0; i < taskList.length; i++) {
				var date = formatDate(taskList[i].dateAdded);

				taskList[i].dateAdded = date;
			}

			taskModel.find({username: req.session.user.username, isComplete: true}, function(err, data) {
				var doneList = JSON.parse(JSON.stringify(data));

				for(var i = 0; i < doneList.length; i++) {
					var date = formatDate(doneList[i].dateAdded);

					doneList[i].dateAdded = date;
				}

				res.render('profile', {
					firstName: req.session.user.firstName,
					lastName: req.session.user.lastName,
					username: req.session.user.username,
					bio: req.session.user.bio,
					tasks: taskList,
					done: doneList,
				});
			});
		});
		} else {
			res.redirect('landing');
		}
	},

	postUpdateProfile: async function(req, res, next) {
		let { firstName, lastName, bio } = req.body;
		
		userModel.findOneAndUpdate(
			{username: req.session.user.username},
			{ $set: { 
				firstName: firstName, lastName: lastName, bio: bio,
			}},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					req.session.reload(function(err) { // reload not working
						if(err) console.log(err);
					
						else{
							res.send({status: 200});
							console.log("-- Profile updated.");
						}
					});
					
				}
			});
	},

	getUserProfile: async function(req, res, next) {
		if (req.session.user){
			// var username = req.params.username;   
			var user = await userModel.findOne({username: req.params.username});
			// console.log(user);

		taskModel.find({username: user.username, isComplete: false, isPublic: true}, function(err, data) {
			var taskList = JSON.parse(JSON.stringify(data));

			for(var i = 0; i < taskList.length; i++) {
				var date = formatDate(taskList[i].dateAdded);

				taskList[i].dateAdded = date;
			}

			taskModel.find({username: user.username, isComplete: true, isPublic: true}, function(err, data) {
				var doneList = JSON.parse(JSON.stringify(data));
				
				for(var i = 0; i < doneList.length; i++) {
					var date = formatDate(doneList[i].dateAdded);
	
					doneList[i].dateAdded = date;
				}
	
				res.render('user-profile', {
					fullName: user.firstName + " " + user.lastName,
					username: user.username,
					bio: user.bio,
					tasks: taskList,
					done: doneList,
					firstName: req.session.user.firstName,
				});
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
				password: req.session.user.password,
				bio: req.session.user.bio,
				email: req.session.user.email,
		});
		} else {
			res.redirect('landing');
		}
	},

	postSettings: async function(req, res, next) {
		let { email, password } = req.body;
		
		userModel.findOneAndUpdate(
			{username: req.session.user.username},
			{ $set: { 
				email: email, password: password,
			}},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200});
					console.log("-- Settings updated.");
				}
			});
	},

	postAddComment: async function(req, res, next) {
		let { taskID, comment } = req.body;
		console.log(comment);
		
		var commID = generateCommID();
		var comm = newComment(commID, taskID, req.session.user.username, comment);

		commentModel.create(comm, function(err) {
				if (err)
					res.send({status: 500});

				else{
					res.send({status: 200});
					console.log("-- Comment added.")
				}
		})
	},

	postDeleteComment: function(req, res, next) {
		let { commID } = req.body;

		commentModel.findOneAndDelete({commID: commID}, function(err) {
			 if (err) {
				 res.send({status: 500});
			 }			
			 else {
				 res.send({status: 200});
			 }
		 });
	},

	postAddTask: async function(req, res, next) {
		let { title, description, isRequested, isPublic, tag1, tag2, tag3 } = req.body;
		console.log(isPublic);

		var taskID = generateTaskID();
		var dateAdded = formatDate(new Date());
		var task = newTask(taskID, req.session.user.username, title, description, dateAdded, isRequested, isPublic, tag1, tag2, tag3);
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

	postAddUTask: async function(req, res, next) {
		let { formerTaskID, title, description, tag1 } = req.body;

		// increment numAdded value since a user added this task to their list
		var oldTask = await taskModel.findOne({taskID: formerTaskID});
		var increment = oldTask.numAdded + 1;
		
		console.log(increment);
		taskModel.findOneAndUpdate(
			{taskID: formerTaskID},
			{ $set: { 
				numAdded: increment,
			}},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}
			});

		var taskID = generateTaskID();
		var dateAdded = formatDate(new Date());
		var task = newTask(taskID, req.session.user.username, title, description, dateAdded, false, true, tag1, '', '');
		// console.log(task);

		taskModel.create(task, function(err) {
				if (err)
					res.send({status: 500});

				else{
					res.send({status: 200});
					console.log("-- Task added to profile.")
				}
		})
	},

	getEditTask: async function(req, res, next) {
		if (req.session.user){
			var taskID = req.params.taskID;
			// console.log(taskID);
			
			taskModel.find({taskID: taskID}, function(err, data) {
				var details = JSON.parse(JSON.stringify(data));
				var task = details;	

					res.render('edit-task', {
						taskID: taskID,
						title: task[0].title,
						description: task[0].description,
						tag1: task[0].tag1,
						tag2: task[0].tag2,
						tag3: task[0].tag3,
						firstName: req.session.user.firstName,
				});
			});	
		} else {
			res.redirect('landing');
		}
	},

	postEditTask: async function(req, res, next) {
		let { taskID, title, description, tag1, tag2, tag3 } = req.body;
		console.log(taskID, title);
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { 
				title: title, description: description, tag1: tag1, tag2: tag2, tag3: tag3,
			}},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200});
					console.log("-- Task updated.")
				}
			});
	},

	postCompleteTask: async function(req, res, next) {
		let { taskID } = req.body;
		
		try{
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { isComplete: true }},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200, mssg:'Task marked finished.'});
				}
			});
		} catch(e) {
			console.log(e);
		}
	},

	postUncompleteTask: async function(req, res, next) {
		let { taskID } = req.body;
		
		try{
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { isComplete: false }},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200, mssg:'Task marked unfinished.'});
				}
			});
		} catch(e) {
			console.log(e);
		}
	},

	postPrivateTask: async function(req, res, next) {
		let { taskID } = req.body;
		
		try{
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { isPublic: false }},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200, mssg:'Task is now private.'});
				}
			});
		} catch(e) {
			console.log(e);
		}
	},

	postPublicTask: async function(req, res, next) {
		let { taskID } = req.body;
		
		try{
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { isPublic: true }},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200, mssg:'Task is now public.'});
				}
			});
		} catch(e) {
			console.log(e);
		}
	},

	postRequestTask: async function(req, res, next) {
		let { taskID } = req.body;
		
		try{
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { isRequested: true }},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200, mssg:'Help is now requested.'});
				}
			});
		} catch(e) {
			console.log(e);
		}
	},

	postUnrequestTask: async function(req, res, next) {
		let { taskID } = req.body;
		
		try{
		taskModel.findOneAndUpdate(
			{taskID: taskID},
			{ $set: { isRequested: false }},
			{ useFindAndModify: false},
			function(err, match) {
				if (err) {
					res.send({status: 500});
				}

				else{
					res.send({status: 200, mssg:'Request for help now stopped.'});
				}
			});
		} catch(e) {
			console.log(e);
		}
	},

	postDeleteTask: function(req, res, next) {
		let { taskID } = req.body;
		
			taskModel.findOne({taskID: taskID}, function(err, match) {
			 if (err) {
				 res.send({status: 500, mssg:'Error in deleting task.'});
			 }			
			 else {
				 match.remove();
				 res.send({status: 200, mssg:'Task successfully deleted.'});
			 }
		 });
	},

	getTaskDetails: async function(req, res, next) {
		var taskID = req.params.taskID;
		// console.log(taskID);
		
		taskModel.find({taskID: taskID}, function(err, data) {
			var details = JSON.parse(JSON.stringify(data));
			var task = details;	

			commentModel.find({taskID: taskID}, function(err, data) {
				var details = JSON.parse(JSON.stringify(data));
				var commentsList = details;	
				// console.log(commentsList);
				res.render('view-task', {
					taskID: taskID,
					title: task[0].title,
					description: task[0].description,
					tag1: task[0].tag1,
					tag2: task[0].tag2,
					tag3: task[0].tag3,
					isRequested: task[0].isRequested,
					commentsList: commentsList,
					firstName: req.session.user.firstName,
				});
			});		
		});		
	},

	getUTaskDetails: async function(req, res, next) {
		var taskID = req.params.taskID;
		// console.log(taskID);
		
		taskModel.find({taskID: taskID}, function(err, data) {
			var details = JSON.parse(JSON.stringify(data));
			var task = details;	

			commentModel.find({taskID: taskID}, function(err, data) {
				var details = JSON.parse(JSON.stringify(data));
				var commentsList = details;	
				// console.log(commentsList);
				res.render('view-utask', {
					taskID: taskID,
					username: task[0].username,
					title: task[0].title,
					description: task[0].description,
					tag1: task[0].tag1,
					tag2: task[0].tag2,
					tag3: task[0].tag3,
					isRequested: task[0].isRequested,
					commentsList: commentsList,
					firstName: req.session.user.firstName,
				});
			});		
		});		
	},
}


module.exports = rendFunctions;