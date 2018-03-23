//JS Global Varibles


//JS Varibles

//JS Functions
$("input").datepicker();
var datepicker1 = $("#datepicker-1").on("change", function () {
    $("#datepicker-2").datepicker("option",
        "minDate", datepicker1.val());
});
