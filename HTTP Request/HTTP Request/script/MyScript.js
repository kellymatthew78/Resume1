var map;

class Meetup {
    constructor() {
        this.oArgs = [];
        //oArgs.country;
        //oArgs.state;
        //oArgs.latitude;
        //oArgs.longitude;
        //oArgs.results;
        //oArgs.zip;
        //oArgs.city;
        //oArgs.ranking;
        //oArgs.memberCount;
    }

    int() {
        this.bindEvents()
        return true;
    };

    bindEvents() {
        return false;

    };


}

function saveSearch(response) {
    localStorage.setItem("MUKey", JSON.stringify(response));
    return localStorage.hasOwnProperty("MUKey");
}


function fillListing(response) {
    let i = 0;
    let count = 0;
    //check if storage has value
    //clear table
    $("#tblMUList").find("tr:not(:first)").remove();

    var tr;
    var x = "";
    for (i = 0; i < response.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + response[i].zip + "</td>");
        tr.append("<td>" + response[i].country + "</td>");
        tr.append("<td>" + response[i].city + "</td>");
        tr.append("<td>" + response[i].ranking + "</td>");
        tr.append("<td>" + response[i].state + "</td>");
        tr.append("<td>" + response[i].member_count + "</td>");
        tr.append("<td><span hidden id='splat" + [i] + ">" + response[i].lat + " </span></td>");
        tr.append("<td><span hidden id='splat" + [i] + ">" + response[i].lat + " </span></td>");
        $('table').first().append(tr);
        count++;
    }
}

function search() {
    $.ajax({
        dataType: 'jsonp',
        type: "GET",
        url: "https://api.meetup.com/2/cities",
        data: {
            key: "4f333828745c152bd20185ff1b7a8",
            country: $("#txtCountry").val(),
            page: $("#txtResults").val(),
            state: $("#txtState").val()
        }
    }).done(function (response) {
        console.log(response);
        saveSearch(response.results);
        fillListing(response.results);

    }).fail(function () {
        console.log("fail")
    })
}


function initMap(sLat,sLog) {
    map = new google.maps.Map(document.getElementById('map'), {
        //center: { lat: sLat, lng: sLog },
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
    });
}

$(function () {
    $("#btnSubmit").on('click', function () {
        search();
    })

    //$("#btnSave").on('click', function () {

    //}
});

