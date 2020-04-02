/* OPEN MODALS */
var log = document.getElementById("login-div");
var reg = document.getElementById("register-div");
var logX = document.getElementsByClassName("closeL")[0];
var regX = document.getElementsByClassName("closeR")[0];

function Login() {
    log.style.display = "block";
    document.getElementById("loginBTN").disabled = true;
    document.getElementById("registerBTN").disabled = true;
}

function Register() {
    reg.style.display = "block";
    document.getElementById("loginBTN").disabled = true;
    document.getElementById("registerBTN").disabled = true;
}

// When the user clicks on <span> (x), close the modal
logX.onclick = function() {
  log.style.display = "none";
  document.getElementById("loginBTN").disabled = false;
  document.getElementById("registerBTN").disabled = false;
}
regX.onclick = function() {
  reg.style.display = "none";
  document.getElementById("loginBTN").disabled = false;
  document.getElementById("registerBTN").disabled = false;
}

/* VALIDATE LOGIN */
var LoginValidate = function() { 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


    $.post("LoginValidate", {username:username, password:password}, function(data){
        if(data === true) {
            alert("Login succesful!");
            window.location.href = '/profile';
        }

        else {
            alert("Invalid username or password.");
        }
    });
}

/* VALIDATE REGISTRATION -- IF USER DOES NOT EXIST YET */
var RegisterValidate = function(){
    var email = document.getElementById("rName").value;
    var email = document.getElementById("rEmail").value;
    var email = document.getElementById("rUsername").value;
    var email = document.getElementById("rPass1").value;
    var email = document.getElementById("rPass2").value;

    var newUser = {
        email:email,
        username:username,
        password:password,
        }    
        
        $.post("RegisterValidate", newUser,function(data){
            if(data===true) {
                alert("Registration succesful!");
                window.location.href = '/profile';
            } else{
                alert("User already exists.")
            }
        });
    }

/* VIEW COMMENTS */
function ViewComments(){
  document.getElementById("view-comments-div").style.display = "block";
}

/* EDIT TASK */
function EditTask(){
  document.getElementById("edit-task-div").style.display = "block";
}
