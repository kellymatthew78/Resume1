var map;
var mu;
var tblConfig;

var TableConfig = function () {
    this.data = [];
    this.recordCount = 0;
    this.pagenum = 0;
    this.currentPage = 1;
    this.pagesize = 0;
    this.lastIndex = -1;
    this.startIndex = -1;
    this.stopIndex = -1;
    this.selectedIndex = -1;
}

class Meetup {
    constructor() {
        this.country;
        this.state;
        this.lat;
        this.lon;
        this.zip;
        this.city;
        this.ranking;
        this.memberCount;
        this.response;
    }

    listingSetup() {
        if (mu.response.length > 0) {
            $('.jPager').jPager({
                counts: mu.response.length,
            });
            tblConfig.recordCount = mu.response.length;
            tblConfig.startIndex = 0;
            tblConfig.currentPage = 1;
            if (tblConfig.pagesize > mu.response.length) {
                tblConfig.stopIndex = mu.response.length;
            } else { tblConfig.stopIndex = tblConfig.pagesize; }
            mu.fillListing(mu.response);
        }
    }

    tblPaging(sort = false) {
        tblConfig.stopIndex = (tblConfig.currentPage * tblConfig.pagesize) - 1;
        tblConfig.startIndex = (tblConfig.stopIndex - tblConfig.pagesize);
        if (tblConfig.stopIndex > tblConfig.recordCount) {
            tblConfig.stopIndex = tblConfig.recordCount;
        }
        if (tblConfig.startIndex < 0) { tblConfig.startIndex = 0; }
        if (!sort) { mu.fillListing(mu.response); } else { mu.fillListing(tblConfig.data);}
       
    }

    fillListing(response) {
        let i = tblConfig.startIndex;
        //clear table
        $("#tblMUList").find("tr:not(:first)").remove();

        let tr;
        for (i; i < tblConfig.stopIndex; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + response[i].zip + "</td>");
            tr.append("<td>" + response[i].localized_country_name + "</td>");
            tr.append("<td>" + response[i].city + "</td>");
            tr.append("<td>" + response[i].ranking + "</td>");
            tr.append("<td>" + response[i].state + "</td>");
            tr.append("<td>" + response[i].member_count + "</td>");
            tr.append("<td><a href='javascript: void (0)' class='setLocation' id=MP" + [i] + ">Map</a></td>");
            tr.append("<td hidden>" + response[i].lat + "</td>");
            tr.append("<td hidden>" + response[i].lon + "</td>");
            $('table').first().append(tr);
        }
    }

    saveSearch(response) {
        mu.response = response.results;
        localStorage.setItem("MUKey", JSON.stringify(mu.response));
        return localStorage.hasOwnProperty("MUKey");
    }

    //Sort Methods------------------------------------------------------------------------
    sortList(sortType, decend) {
        let List = [];

        switch (sortType) {
            case "zip":
                List = this.sortZip(decend);
                tblConfig.data = List;
                mu.tblPaging(true);
                return true;
            case "city":
                List = this.sortCity(decend);
                tblConfig.data = List;
                mu.tblPaging(true);
                return true;
            case "state":
                List = this.sortState(decend);
                tblConfig.data = List;
                mu.tblPaging(true);
                return true;
            case "member":
                List = this.sortMember(decend);
                tblConfig.data = List;
                mu.tblPaging(true);
                return true;
        }
    }

    sortZip(decend = false) {
        let List = mu.response;
        List.sort(function (a, b) {
            return a.zip > b.zip;
        })
        if (decend == true) {
            return List.reverse();
        } else {
            return List;
        }
    }

    sortCity(decend = false) {
        let List = mu.response;
        List.sort(function (a, b) {
            return a.city > b.city;
        })
        if (decend == true) {
            return List.reverse();
        } else {
            return List;
        }
    }

    sortState(decend = false) {
        let List = mu.response;
        List.sort(function (a, b) {
            return a.state > b.state;
        })
        if (decend == true) {
            return List.reverse();
        } else {
            return List;
        }
    }

    sortMember(decend = false) {
        let List = mu.response;
        List.sort(function (a, b) {
            return a.member_count > b.member_count;
        })
        if (decend == true) {
            return List.reverse();
        } else {
            return List;
        }
    }


    //Google Map Functions ----------------------------------------------------------------
    getLocationandSetMap(i) {
        mu.lat = mu.response[i].lat;
        mu.lon = mu.response[i].lon;
        initMap(parseFloat(mu.lat), parseFloat(mu.lon));
    }



    setPin(tr) {
        mu.lat = tr[0].cells[7].innerText;
        mu.lon = tr[0].cells[8].innerText;
        var myLatlng = { lat: parseFloat(mu.lat), lng: parseFloat(mu.lon) };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: myLatlng
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Click to zoom'
        });

        map.addListener('center_changed', function () {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            window.setTimeout(function () {
                map.panTo(marker.getPosition());
            }, 3000);
        });

        marker.addListener('click', function () {
            map.setZoom(13);
            map.setCenter(marker.getPosition());
        });
    }
}



function initialize() {
    mu = new Meetup();
    tblConfig = new TableConfig();
};


function search() {
    mu.country = $("#txtCountry").val();
    mu.results = $("#txtResults").val();
    mu.state = $("#txtState").val();

    $.ajax({
        dataType: 'jsonp',
        type: "GET",
        url: "https://api.meetup.com/2/cities",
        data: {
            key: "4f333828745c152bd20185ff1b7a8",
            country: mu.country,
            page: mu.results,
            state: mu.state
        }
    }).done(function (response) {
        console.log(response);
        mu.saveSearch(response);
        mu.listingSetup();

    }).fail(function () {
        console.log("failed to retrieve data...")
    })
}


//-------------------------------------------Google Map Functions Initialzation----------------------------------------------------
function setMap() {
    if (!mu.lat && !mu.lon) {
        mu.lat = 39.740774;
        mu.lon = -104.995233;
    }
    initMap(parseFloat(mu.lat), parseFloat(mu.lon));
}

function initMap(sLat, sLog) {
    var myLatlng = { lat: sLat, lng: sLog };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatlng
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click to zoom'
    });

    map.addListener('center_changed', function () {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 3000);
    });

    marker.addListener('click', function () {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
    });
}




$(function () {
    $("#btnSubmit").on('click', function () {
        search();
    })

    $("#tblMUList").on("click","a", function (e) {
        var id = $(e.target).attr("id");
        console.log(id);
        if (id.startsWith("MP")) {
            var tr = $(e.target).closest("tr");
            mu.setPin(tr);

        }
    });

    //Meetup Sort events
    $("#sortAZip").on("click", function () {
        mu.sortList("zip", false)
    });
    $("#sortDZip").on("click", function () {
        mu.sortList("zip", true)
    });
    $("#sortACity").on("click", function () {
        mu.sortList("city", false)
    });
    $("#sortDCity").on("click", function () {
        mu.sortList("city", true)
    });
    $("#sortAState").on("click", function () {
        mu.sortList("state", false)
    });
    $("#sortDState").on("click", function () {
        mu.sortList("state", true)
    });
    $("#sortAMember").on("click", function () {
        mu.sortList("member", false)
    });
    $("#sortDMember").on("click", function () {
        mu.sortList("member", true)
    });

    //-------------------------------------------Pagination Control Plugin--------------------------------------------------------------
    $.fn.jPager = function (options) {

        var defaults = { counts: 1, pagin: {}, callback: function (page) { } };

        var settings = $.extend({}, defaults, options);

        //console.log(settings);

        var _this = this;
        var first = _this.find('span[data-pager-action="first"]');
        var next = _this.find('span[data-pager-action="next"]');
        var previous = _this.find('span[data-pager-action="previous"]');
        var last = _this.find('span[data-pager-action="last"]');
        var pagenum = _this.find('input[data-pager-action="pagenum"]');
        var pagesize = _this.find('select[data-pager-action="pagesize"]');

        tblConfig.pagesize = parseInt(pagesize[0].value);

        _this.init = function () {
            first.on("click", _this.firstClicked);
            next.on("click", _this.nextClicked);
            previous.on("click", _this.previousClicked);
            last.on("click", _this.lastClicked);
            pagenum.on("change", _this.pagenumChanged);
            pagesize.on("change", _this.pagesizeChanged);
            var max_pages = Math.ceil(settings.counts / pagesize.val());
            settings.pagin.max_pages = max_pages;
            settings.pagin.counts = settings.counts;
            settings.pagin.pagesize = pagesize.val();
            settings.pagin.current_page = 1;
            _this.setInputval(1, max_pages);

        };
        _this.setInputval = function (pageno, totalpages) {
            //console.log("setInputval");
            pagenum.val("Page " + pageno + " of " + totalpages);
        };
        _this.page = function () {
            //console.log(settings.pagin.current_page +" :: "+settings.pagin.max_pages);
            pagenum.val("Page " + settings.pagin.current_page + " of " + settings.pagin.max_pages);
            tblConfig.currentPage = parseInt(settings.pagin.current_page);
            tblConfig.pagesize = parseInt(pagesize.val());
            tblConfig.pagenum = parseInt(settings.pagin.max_pages);
            settings.callback({ "pageno": settings.pagin.current_page, "pagesize": pagesize.val() });

        };
        _this.disable_action = function (el) {
            el.addClass('disabled');
        };
        _this.enable_action = function (el) {
            el.removeClass('disabled');
        };
        _this.setAction = function () {
            if (settings.pagin.max_pages == settings.pagin.current_page) {
                _this.disable_action(next);
                _this.disable_action(last);
                _this.enable_action(first);
                _this.enable_action(previous);
            }
            else if (settings.pagin.current_page == 1) {
                _this.disable_action(first);
                _this.disable_action(previous);
                _this.enable_action(next);
                _this.enable_action(last);
            }
            else {
                _this.enable_action(next);
                _this.enable_action(last);
                _this.enable_action(first);
                _this.enable_action(previous);
            }
        };
        _this.firstClicked = function () {
            settings.pagin.current_page = 1;
            _this.setAction();
            _this.page();
            mu.tblPaging();
        };

        _this.nextClicked = function () {
            settings.pagin.current_page = settings.pagin.current_page + 1;
            _this.setAction();
            _this.page();
            mu.tblPaging();
        };

        _this.previousClicked = function () {
            if (settings.pagin.current_page > 1) {
                settings.pagin.current_page = settings.pagin.current_page - 1;
            }
            _this.setAction();
            _this.page();
            mu.tblPaging();
        };
        _this.lastClicked = function () {
            settings.pagin.current_page = settings.pagin.max_pages;
            _this.setAction();
            _this.page();
            mu.tblPaging();
        };
        _this.pagenumChanged = function () {
            console.log("pagenumChanged");
            _this.page();
        };
        _this.pagesizeChanged = function () {
            var max_pages = Math.ceil(settings.counts / pagesize.val());
            settings.pagin.max_pages = max_pages;
            settings.pagin.current_page = 1;
            _this.setInputval(1, max_pages);
            _this.enable_action(next);
            _this.enable_action(last);
            _this.enable_action(first);
            _this.enable_action(previous);
            _this.page();
            mu.listingSetup();
        };

        _this.init();
    };
});

initialize();