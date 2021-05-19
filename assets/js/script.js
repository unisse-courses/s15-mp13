/* Clear input field */
function clearField(field){
  document.getElementById(field).value = '';
}

function searchTag() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("myTable");
	tr = table.getElementsByTagName("tr");
  
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[0];
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = "";
		} else {
		  tr[i].style.display = "none";
		}
	  }
	}
  }

// COMMENT BUTTON DISABLED until text input
  function EnableDisable(comment) {
	//Reference the Button.
	var btnSubmit = document.getElementById("addCommentBTN");
	// var comment = document.getElementById("commentInput");

	//Verify the TextBox value.
	if (comment.value.trim() != "") {
		//Enable the TextBox when TextBox has value.
		btnSubmit.disabled = false;
	} else {
		//Disable the TextBox when TextBox is empty.
		btnSubmit.disabled = true;
	}
};

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
		
		if (unEmpty) $('p#loginError').text('Enter missing username.');
		if (pwEmpty) $('p#loginError').text('Enter missing password.');
		
		if (!unEmpty && !pwEmpty){
			$.post('/login', {username: username, password: password}, function(res) {
				switch (res.status){
					case 200: {
						window.location.href = '/';
						break;
					}
					case 401: {
						$('p#loginError').text('Incorrect password.');
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
		var firstName = $('#rFName').val();
		var lastName = $('#rLName').val();
		var email = $('#rEmail').val();
		var username = $('#rUsername').val();
		var password = $('#rPass1').val();
		// var password2 = validator.trim($('#rPass2').val());

		var fnEmpty = validator.isEmpty(firstName);
		var unEmpty = validator.isEmpty(username);
		var emEmpty = validator.isEmpty(email);
		var emFormat = validator.isEmail(email);
		var pwEmpty = validator.isEmpty(password);
		
		if (fnEmpty) $('p#regError').text('Please enter your first name.');
		if (emEmpty) $('p#regError').text('Please enter your email.');
			else if (!emFormat) $('p#regError').text('Invalid email format.');
		if (unEmpty) $('p#regError').text('Please enter your username.');
		if (pwEmpty) $('p#regError').text('Please enter your password.');
		
		if (!fnEmpty && !emEmpty && emFormat && !unEmpty && !pwEmpty){
			$.post('/register', {firstName: firstName, lastName: lastName, email: email, username: username, password: password}, function(res) {
				switch (res.status){
					case 200: {
						window.location.href = '/';
						alert('Account registered!')
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

	// UPDATE PROFILE
	$('button#saveProfileBTN').click(function() {
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var bio = $('#bio').val();

		$('p#profileError').text('');

		if (validator.isEmpty(firstName)) $('p#profileError').text('Can not leave first name empty.');
		
		else{
			$.post('/update-profile', {firstName: firstName, lastName: lastName, bio: bio}, function(res) {
				switch (res.status){
					case 200: {
						alert('Profile updated!');
						window.location.href = '/profile';
						break;
					}
					case 500: {
						$('p#profileError').text('Error updating profile.');
						break;
					}
				}
			});
		}
	});
	

	// SAVE SETTINGS
	$('button#saveSettingsBTN').click(function() {
		var email = $('#email').val();
		var password = $('#password').val();

		$('p#updateSettingsError').text('');

		if (validator.isEmpty(email)) $('p#updateSettingsError').text('Can not leave email empty.');
		
		else {
			$.post('/update-settings', {email: email, password: password}, function(res) {
				switch (res.status){
					case 200: {
						alert('Settings updated!');
						window.location.href = '/profile';
						break;
					}
					case 500: {
						$('p#updateSettingsError').text('Error updating settings.');
						break;
					}
				}
			});
		}
	});

	// ADD TASK
	$('button#publishTaskBTN').click(function() {
		var title = $('#taskTitle').val();
		var description = $('#taskDesc').val();
		var tag1 = $('#tag1').val();
		var tag2 = $('#tag2').val();
		var tag3 = $('#tag3').val();
		var isRequested = document.getElementById("isRequested")
		var isPublic = document.getElementById("isPublic")

		if(isRequested.checked)
			isRequested = true;
		else isRequested = false;

		if(isPublic.checked)
			isPublic = true;
		else isPublic = false;

		$('p#addTaskError').text('');
		
		if (validator.isEmpty(title)) $('p#addTaskError').text('Please enter task title.');
		
		else {
			$.post('/add-task', {title: title, description: description, tag1: tag1, tag2: tag2, tag3: tag3, isRequested: isRequested, isPublic: isPublic}, function(res) {
				switch (res.status){
					case 200: {
						alert('Task added!');
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

	// ADD TASK FROM OTHERS (FROM HOME)
	$('button#addUTask').click(function() {
		var card = $(this).parent().parent(); 
		var formerTaskID = card.attr("id");
		var title = $('#taskTitle').text();
		var username = ($(this).parent()).attr("id");
		console.log(formerTaskID);
		var description = 'Task borrowed from @' + username;
		var tag1 = 'borrowed'

		console.log(title, description);

		var confirmAdd = confirm("Add this task to your personal list?");
		
		if(confirmAdd) {
			$.post('/add-utask', { formerTaskID: formerTaskID, title: title, description: description, tag1: tag1}, function(res) {
				switch (res.status){
					case 200: {
						alert('Task added!');
						window.location.reload();
						break;
					}
					case 500: {
						alert('Error adding task.');
						break;
					}
				}
			});
		}
	});

	// ADD TASK FROM OTHERS (FROM THEIR PROFILE)
	$('button#addPTask').click(function() {
		var row = $(this).parent().parent(); //get row of clicked button
		var formerTaskID = row.attr("id"); //get clientID from row
		var title = $('#taskTitle').text();
		var username = $('#username').text();
		console.log(formerTaskID);
		var description = 'Task borrowed from @' + username;
		var tag1 = 'borrowed'

		console.log(title, description);

		var confirmAdd = confirm("Add this task to your personal list?");
		
		if(confirmAdd) {
			$.post('/add-utask', { formerTaskID: formerTaskID, title: title, description: description, tag1: tag1}, function(res) {
				switch (res.status){
					case 200: {
						alert('Task added!');
						window.location.reload();
						break;
					}
					case 500: {
						alert('Error adding task.');
						break;
					}
				}
			});
		}
	});

	// EDIT TASK
	$('button#updateTaskBTN').click(function() {
		var taskID = $('#taskID').text();
		var title = $('#title').val();
		var description = $('#description').val();
		var tag1 = $('#tag1').val();
		var tag2 = $('#tag2').val();
		var tag3 = $('#tag3').val();

		console.log(taskID);

		$('p#updateTaskError').text('');
		
		if (validator.isEmpty(title)) $('p#updateTaskError').text('Can not leave task title empty.');
		
		else {
			$.post('/edit-task', {taskID: taskID, title: title, description: description, tag1: tag1, tag2: tag2, tag3: tag3}, function(res) {
				switch (res.status){
					case 200: {
						alert('Task updated!');
						window.location.href = '/profile';
						break;
					}
					case 500: {
						$('p#updateTaskError').text('Error updating task.');
						break;
					}
				}
			});
		}
	});

	// COMPLETE TASK
	$('button#completeBTN').click(function() {
		var row = $(this).parent().parent(); //get row of clicked button
		var taskID = row.attr("id"); //get clientID from row
		console.log(taskID);
		var completeConfirm = confirm("Mark this task as finished?");
		if(completeConfirm) {
			$.post('/complete-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						window.location.href = '/profile';
						break;
					}
					case 500: {
						alert("Error updating task.");
						break;
					}
				}
			});
		}			
	});

	// UN-COMPLETE TASK
	$('button#uncompleteBTN').click(function() {
		var row = $(this).parent().parent(); //get row of clicked button
		var taskID = row.attr("id"); //get clientID from row
		var completeConfirm = confirm("Mark this task as unfinished?");
		
		if(completeConfirm) {
			$.post('/uncomplete-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						window.location.href = '/profile';
						break;
					}
					case 500: {
						alert("Error updating task.");
						break;
					}
				}
			});
		}			
	});

	// MAKE TASK PRIVATE
	$('button#privateBTN').click(function() {
		var row = $(this).parent().parent(); //get row of clicked button
		var taskID = row.attr("id"); //get clientID from row
		var privConfirm = confirm("Make this task as private?");
		
		if(privConfirm) {
			$.post('/private-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						window.location.href = '/profile';
						break;
					}
					case 500: {
						alert("Error updating task.");
						break;
					}
				}
			});
		}			
	});

	// MAKE TASK PUBLIC
	$('button#publicBTN').click(function() {
		var row = $(this).parent().parent(); //get row of clicked button
		var taskID = row.attr("id"); //get clientID from row
		var pubConfirm = confirm("Make this task as public?");
		
		if(pubConfirm) {
			$.post('/public-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						window.location.href = '/profile';
						break;
					}
					case 500: {
						alert("Error updating task.");
						break;
					}
				}
			});
		}			
	});

	// MAKE TASK REQUESTED
	$('button#reqBTN').click(function() {
		var reqConfirm = confirm("Request help for this task?");
		var taskID = $('#taskID').text();
		
		if(reqConfirm) {
			$.post('/req-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						location.reload();
						break;
					}
					case 500: {
						alert("Error updating task.");
						break;
					}
				}
			});
		}			
	});

	// MAKE TASK UNREQUESTED
	$('button#unreqBTN').click(function() {
		var unreqConfirm = confirm("Stop requesting help for this task?");
		var taskID = $('#taskID').text();
		
		if(unreqConfirm) {
			$.post('/unreq-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						location.reload();
						break;
					}
					case 500: {
						alert("Error updating task.");
						break;
					}
				}
			});
		}			
	});

	// DELETE TASK
	$('button#deleteBTN').click(function() {
		var row = $(this).parent().parent(); //get row of clicked button
		var taskID = row.attr("id"); //get clientID from row
		var deleteConfirm = confirm("Permanently delete this task?");
		
		if(deleteConfirm) {
			$.post('/delete-task', {taskID: taskID}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						window.location.href = '/profile';
						break;
					}
					case 500: {
						alert(result.mssg);
						break;
					}
				}
			});
		}			
	});

	// COMMENT BUTTON DISABLED until text input
	$('button#addCommentBTN').prop('disabled',true);
     $(':input[type="text"]').keyup(function() {
        if($(this).val() != '') {
           $(':input[type="submit"]').prop('disabled', false);
        }
     });

	// ADD COMMENT
	$('button#addCommentBTN').click(function() {
		var taskID = $('#taskID').text();
		var comment = $('#commentInput').val();
				console.log(comment);
		$.post('/add-comment', {taskID: taskID, comment: comment}, function(res) {
			switch (res.status){
				case 200: {
					alert('Comment added!');
					window.location.reload();
					break;
				}
				case 500: {
					alert('Error adding comment.');
					break;
				}
			}
		});
	});

	// DELETE COMMENT
	$('button#deleteCommentBTN').click(function() {
		var commID = $('#commID').text(); //get commentID
		var deleteConfirm = confirm("Permanently delete this comment?");
		
		if(deleteConfirm) {				
			$.post('/delete-comment', {commID: commID}, function(res) {
				switch (res.status){
					case 200: {
						alert('Comment deleted!');
						window.location.reload();
						break;
					}
					case 500: {
						alert('Error deleting comment.');
						break;
					}
				}
			});
		}
	});

	// LIKE COMMENT
	$('button#likeComment').click(function() {
		var card = $(this).parent(); // get comment card
		var commID = card.attr("id");
		console.log(commID);
		$.post('/like-comment', { commID: commID }, function(res) {
			switch (res.status){
				case 200: {
					window.location.reload();
					break;
				}
				case 500: {
					break;
				}
			}
		});
	});

});