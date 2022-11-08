//Get fields for username, email, password, and password confirmation
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password_confirm = document.getElementById("password2");

//Verify that the username is not empty
function verify_username() {
    if (username.value == ""){ //Or is taken
        //set class to be is-invalid
        username.className = "form-control is-invalid";
    } else {
        //set class to be is-valid
        username.className = "form-control";
    }
}

//Verify that the email is not empty
function verify_email() {
    if ((email.value == "") || (email.value.indexOf("@") == -1) || (email.value.indexOf(".") == -1)) { //Or is taken
        email.className = "form-control is-invalid";
    } else {
        email.className = "form-control";
    }
}

//Verify strength of password
function verify_password() {
    if (password.value.length < 8) {
        password.className = "form-control is-invalid";
    } else {
        password.className = "form-control";
    }
}

//Verify that the password and password confirmation match
function verify_password_confirm() {
    if (password.value != password_confirm.value) {
        password_confirm.className = "form-control is-invalid";
    } else {
        password_confirm.className = "form-control";
    }
}

//Add event listeners to the fields
username.addEventListener("change", verify_username);
email.addEventListener("change", verify_email);
password.addEventListener("change", verify_password);
password_confirm.addEventListener("change", verify_password_confirm);

//Disable the submit button if any of the fields are invalid
//Get the submit button
