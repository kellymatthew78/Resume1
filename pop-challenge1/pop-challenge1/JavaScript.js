var vGoal = 5000;
var vDonation = 0;
var vDRemaining = vGoal - vDonation;
var d = new Date();
var vDays = 30 - d.getDate();



function jsSetup() {
    document.getElementById("lblamount").innerHTML = vDRemaining;
    document.getElementById("lblDays").innerHTML = vDays; 
    document.getElementById("lblPeople").innerHTML = 0;
    clear_session();
}

function clickCounter() {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.clickcount) {
            sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
        } else {
            sessionStorage.clickcount = 1;
        }
        document.getElementById("lblPeople").innerHTML = sessionStorage.clickcount;

        if (sessionStorage.donation) {
            vDonation = Number(sessionStorage.donation);
            vDonation = vDonation + Number(document.getElementById("txtDonate").value);
            sessionStorage.donation = vDonation;
            vDRemaining = vGoal - vDonation;
        } else {
            vDonation = Number(document.getElementById("txtDonate").value);
            sessionStorage.donation = vDonation;
            vDRemaining = vGoal - vDonation;
        }
        document.getElementById("lblamount").innerHTML = vDRemaining;

    } else {
        document.getElementById("lblPeople").innerHTML = "0";
    }
}

function clear_session() {
    sessionStorage.removeItem("clickcount");
    sessionStorage.removeItem("donation");
}

function set_session() {
    sessionStorage.setItem("key", "value");
}

function pageReload() {
    location.reload();
}
