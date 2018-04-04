//Global Var
var firstName = "";
var lastName = "";
var phone = "";
var email = "";
var password = "";

document.getElementById("btnsReg").addEventListener("click", myFunction);

function clearError() { document.getElementById("msgError").innerHTML = ""; }

function Profile(firstName, lastName, phone, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.password = password;
}

function fullName(Profile) { return Profile.firstName + " " + Profile.lastName; }
Profile.prototype.fullName2 = function () { return this.firstName + " " + this.lastName; }

function registerUser() {
    clearError();
    if (typeof (Storage) !== "undefined") {
        email = document.getElementById("email").value;
        password = document.getElementById("pwd").value;
        firstName = document.getElementById("fName").value;
        lastName = document.getElementById("lName").value;
        phone = document.getElementById("phone").value;
        var user = new Profile(firstName, lastName, phone, email, password);
        console.log(user);
        localStorage.uemail = email;
        localStorage.upwd = password;
        localStorage.fname = firstName;
        localStorage.lname = lastName;
        localStorage.uphone = phone;
        if (!checkUser()) {
            alert('Registration Failed!');
            return false;
        }
        return false;
    } else {
        document.getElementById("msgError").innerHTML = "Sorry, your browser does not support web storage...";
        return false;
    }
}

function checkUser() {
    if (localStorage.getItem("uemail") === null) {
        return false;
    }
    if (localStorage.getItem("fname") === null) {
        return false;
    }
    if (localStorage.getItem("lname") === null) {
        return false;
    }
    if (localStorage.getItem("uphone") === null) {
        return false;
    }
    if (localStorage.getItem("upwd") === null) {
        return false;
    }
    return true;
}

function userLogin() {
    if (typeof (Storage) !== "undefined") {
        var uemail = document.getElementById("txtemail").value;
        var upass = document.getElementById("txtpassword").value;

        if (password !== upass) {
            alert("The email and/or password does not match what is on file! Please try again!");
            clearText();
        }

        var user = new Profile("John", "Talbane", "(247)458-7785", uemail)

        localStorage.theUser = user;
        console.log(user);
        console.log(localStorage.theUser);
        //testing
        document.getElementById("name").innerHTML = fullName(user);
        document.getElementById("phonenumber").innerHTML = user.phone;
        document.getElementById("useremail").innerHTML = user.email;
        console.log(sessionStorage.getItem("theUser"));
        //testing

        //loadUser();
        return false;

    } else {
        document.getElementById("msgError").innerHTML = "Sorry, your browser does not support web storage...";
        return false;
    }
}

function regLogin() {
    clearError();
    if (typeof (Storage) !== "undefined") {
        var uemail = document.getElementById("lgemail").value;
        var upass = document.getElementById("lgpwd").value;
        var remail = localStorage.getItem("uemail");
        var rpass = localStorage.getItem("upwd");

        if (uemail !== remail) {
            alert("The email and/or password does not match what is on file! Please try again!");
            clearlgText();
            return false;
        }
        if (password !== upass) {
            alert("The email and/or password does not match what is on file! Please try again!");
            clearlgText();
            return false;
        }

        var uemail = localStorage.getItem("uemail");
        var upwd = localStorage.getItem("upwd");
        var fname = localStorage.getItem("fname");
        var lname = localStorage.getItem("lname");
        var uphone = localStorage.getItem("uphone");
        var user = new Profile(fname, lname, uphone, uemail, upwd);

        //testing
        document.getElementById("welcome").innerHTML = "Welcome " + fullName(user) + " to the site!";
        document.getElementById("contact1").innerHTML = "Contact Phone: " + user.phone;
        document.getElementById("contact2").innerHTML = "Contact Email: " + user.email;
        console.log(user);

        var x = document.getElementById("welForm");
        x.style.display = "block";
        return false;

    } else {
        document.getElementById("msgError").innerHTML = "Sorry, your browser does not support web storage...";
        return false;
    }
}

function checkuser(fname, lname, uphone, uemail, upwd) {
    var uemail = localStorage.getItem("uemail");
    var upwd = localStorage.getItem("upwd");
    var fname = localStorage.getItem("fname");
    var lname = localStorage.getItem("lname");
    var uphone = document.getElementById("uphone").value;
}

function loadUser() {
    if (typeof (Storage) !== "undefined") {

        //var user = sessionStorage.getItem("theUser");
        var user = localStorage.getItem("theUser");
        document.getElementById("name").innerHTML = fullName(user);
        document.getElementById("phonenumber").innerHTML = user.phone;
        document.getElementById("useremail").innerHTML = user.email;
        console.log(sessionStorage.getItem("theUser"));

    } else {
        document.getElementById("msgError").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function clearText() {
    document.getElementById("name").innerHTML = "";
    document.getElementById("phonenumber").innerHTML = "";
    document.getElementById("useremail").innerHTML = "";
    return false;
}

function clearlgText() {
    document.getElementById("lgemail").innerHTML = "";
    document.getElementById("lgpwd").innerHTML = "";
    return false;
}

function SHregForm() {
    var x = document.getElementById("regForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function SHlogForm() {
    var x = document.getElementById("logForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function SHwelForm() {
    var x = document.getElementById("welForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function clearSession() {
    sessionStorage.removeItem("theUser");
    localStorage.removeItem("theUser");
    localStorage.removeItem("uemail");
    localStorage.removeItem("upwd");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("uphone");
    return false;
}

function resetProfilePage() {
    document.getElementById("email").innerHTML = "";
    document.getElementById("pwd").innerHTML = "";
    document.getElementById("fName").innerHTML = "";
    document.getElementById("lName").innerHTML = "";
    document.getElementById("phone").innerHTML = "";
    document.getElementById("lgemail").innerHTML = "";

    document.getElementById("welcome").innerHTML = "Welcome";
    document.getElementById("contact1").innerHTML = "Contact 1";
    document.getElementById("contact2").innerHTML = "Contact 2";

    document.getElementById("msgError").innerHTML = "";

    var x = document.getElementById("regForm");
    x.style.display = "block";

    x = document.getElementById("logForm");
    x.style.display = "block";

    x = document.getElementById("welForm");
    x.style.display = "none";
    clearSession();
    return false;
}