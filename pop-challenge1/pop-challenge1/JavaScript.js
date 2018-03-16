var vGoal = 5000;
var vDonation = 0;
var vDRemaining = vGoal - vDonation;
var d = new Date();
var vDays = 30 - d.getDate();



function jsSetup() {
    document.getElementById("lblamount").innerHTML = 5000;
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

            if (vGoal < vDonation) {
                vDRemaining = 0;
            } else {
                vDonation = vDonation + Number(document.getElementById("txtDonate").value);
                sessionStorage.donation = vDonation;
                vDRemaining = vGoal - vDonation;
            }

        } else {
            vDonation = Number(document.getElementById("txtDonate").value);
            sessionStorage.donation = vDonation;
            vDRemaining = vGoal - vDonation;
        }
        document.getElementById("lblamount").innerHTML = vDRemaining;

    } else {
        document.getElementById("lblPeople").innerHTML = "0";
    }
    SetPercentage();
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

function SetPercentage() {
    var x = 0;
    x = (vDonation * 100) / vGoal;
    if (x > 100) { x = 100; }
    document.getElementById("barline").style.width = x + "%";
}
