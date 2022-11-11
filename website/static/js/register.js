//Get fields for username, email, password, and password confirmation
var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password_confirm = document.getElementById("password2");
var submit = document.getElementById("submit");

function is_username_taken() {
    var request = new XMLHttpRequest();
    request.open("GET", "/api/is_username_available/" + username.value, false);
    request.send(null);
    if (request.responseText == "false") {
        return true;
    } else {
        return false;
    }
}

function is_email_taken() {
    var request = new XMLHttpRequest();
    request.open("GET", "/api/is_email_available/" + email.value, false);
    request.send(null);
    if (request.responseText == "false") {
        return true;
    } else {
        return false;
    }
}

function verify_username() {
    if (username.value == ""){
        document.getElementById("username_feedback").innerHTML = "Username cannot be empty";
        return false;
    } else if (is_username_taken()) {
        document.getElementById("username_feedback").innerHTML = "Username is already taken";
        return false;
    } else {
        return true;
    }
}

function manage_username() {
    if (verify_username()) {
        username.className = "form-control";
    } else {
        username.className = "form-control is-invalid";
    }
}

//Verify that the email is not empty
function verify_email() {
    if ((email.value == "") || (email.value.indexOf("@") == -1) || (email.value.indexOf(".") == -1)) { //Or is taken
        document.getElementById("email_feedback").innerHTML = "Email is of invalid format";
        return false;
    } else if (is_email_taken()) {
        document.getElementById("email_feedback").innerHTML = "Email is already taken";
        return false;
    } else {
        return true;
    }
}

function manage_email() {
    if (verify_email()) {
        email.className = "form-control";
    } else {
        email.className = "form-control is-invalid";
    }
}

//Verify strength of password
function verify_password() {
    if (password.value.length < 8) {
        password.className = "form-control is-invalid";
        return false;
    } else {
        password.className = "form-control";
        return true;
    }
}

function manage_password() {
    if (verify_password()) {
        password.className = "form-control";
    } else {
        password.className = "form-control is-invalid";
    }
}

//Verify that the password and password confirmation match
function verify_password_confirm() {
    if (password.value != password_confirm.value) {
        password_confirm.className = "form-control is-invalid";
        return false;
    } else {
        password_confirm.className = "form-control";
        return true;
    }
}

function manage_password_confirm() {
    if (verify_password_confirm()) {
        password_confirm.className = "form-control";
    } else {
        password_confirm.className = "form-control is-invalid";
    }
}

//Verify that all fields are valid
function verify_all() {
    if (verify_username() && verify_email() && verify_password() && verify_password_confirm()) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}

//Add event listeners to the fields
username.addEventListener("change", manage_username);
username.addEventListener("change", verify_all);
email.addEventListener("change", manage_email);
email.addEventListener("change", verify_all);
password.addEventListener("change", manage_password);
password.addEventListener("change", verify_all);
password_confirm.addEventListener("change", manage_password_confirm);
password_confirm.addEventListener("change", verify_all);
