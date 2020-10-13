/* Clear input field */
function clearField(field){
  document.getElementById(field).value = '';
}

$(document).ready(function() {
	// OPEN LOGIN MODAL
	$('button#openLogin').click(function() {
    var log = document.getElementById("login-div");
    log.style.display = "block";
  });

	// CLOSE LOGIN MODAL
	$('button#closeL').click(function() {
    var log = document.getElementById("login-div");
    log.style.display = "none";
  });

  // VALIDATE LOGIN
	$('button#loginVal').click(function() {
		var username = validator.trim($('#username').val());
		var password = validator.trim($('#password').val());
		
		var unEmpty = validator.isEmpty(username);
		var pwEmpty = validator.isEmpty(password);
		
		$('p#loginError').text('');
		
		if (unEmpty) $('p#loginError').text('Enter missing credentials.');
		if (pwEmpty) $('p#loginError').text('Enter missing credentials.');
		
		if (!unEmpty && !pwEmpty){
			$.post('/login', {username: username, password: password}, function(res) {
				switch (res.status){
					case 200: {
						window.location.href = '/profile';
						break;
					}
					case 401: {
						$('p#loginError').text('Incorrect Email and/or Password.');
						break;								
					}
					case 500: {
						$('p#loginError').text('Server Error.');
						break;
					}
					case 409: {
						$('p#loginError').text('Account does not exist.');
						break;
					}
				}
			});
		}
	});
  
  // OPEN REGISTER MODAL
	$('button#openRegister').click(function() {
    var reg = document.getElementById("register-div");
    reg.style.display = "block";
  });

	// CLOSE REGISTER MODAL
	$('button#closeR').click(function() {
    var reg = document.getElementById("register-div");
    reg.style.display = "none";
	});
	
	// VALIDATE REGISTRATION
	$('button#regVal').click(function() {
		var firstName = validator.trim($('#rFName').val());
		var lastName = validator.trim($('#rLName').val());
		var email = validator.trim($('#rEmail').val());
		var username = validator.trim($('#rUsername').val());
		var password = validator.trim($('#rPass1').val());
		// var password2 = validator.trim($('#rPass2').val());

		var fnEmpty = validator.isEmpty(firstName);
		var unEmpty = validator.isEmpty(username);
		var emEmpty = validator.isEmpty(email);
		var emFormat = validator.isEmail(email);
		var pwEmpty = validator.isEmpty(password);
		
		$('p#regError').text('');
		
		if (fnEmpty) $('p#regError').text('Please enter your first name.');
		if (emEmpty) $('p#regError').text('Please enter your email.');
			else if (!emFormat) $('p#regError').text('Invalid email format.');
		if (unEmpty) $('p#regError').text('Please enter your username.');
		if (pwEmpty) $('p#regError').text('Please enter your password.');
		
		if (!fnEmpty && !emEmpty && emFormat && !unEmpty && !pwEmpty){
			$.post('/register', {firstName: firstName, lastName: lastName, email: email, username: username, password: password}, function(res) {
				switch (res.status){
					case 200: {
						window.location.href = '/profile';
						break;
					}
					case 401: {
						$('p#regError').text('Email is already connected to an existing account.');
						break;								
					}
					case 402: {
						$('p#regError').text('Username is already connected to an existing account.');
						break;								
					}
					case 500: {
						$('p#regError').text('Server Error.');
						break;
					}
				}
			});
		}
	});

	// ADD TASK
	$('button#publishTaskBTN').click(function() {
		var title = $('#taskTitle').val();
		var desciption = $('#taskDesc').val();
		var tag1 = $('#tag1').val();
		var tag2 = $('#tag2').val();
		var tag3 = $('#tag3').val();
		var isRequested = $('#isRequested').val();
		var isPrivate = $('#isPrivate').val();

		console.log(desciption);

		if(isRequested.checked)
			isRequested = true;
		else isRequested = false;

		if(isPrivate.checked)
			isPrivate = true;
		else isPrivate = false;

		$('p#addTaskError').text('');
		
		if (validator.isEmpty(title)) $('p#addTaskError').text('Please enter task title.');
		
		else {
			$.post('/add-task', {title: title, desciption: desciption, tag1: tag1, tag2: tag2, tag3: tag3, isRequested: isRequested, isPrivate: isPrivate}, function(res) {
				switch (res.status){
					case 200: {
						window.location.href = '/profile';
						break;
					}
					case 500: {
						$('p#addTaskError').text('Error adding task.');
						break;
					}
				}
			});
		}
	});

});