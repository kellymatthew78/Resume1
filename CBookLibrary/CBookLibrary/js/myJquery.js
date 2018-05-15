//
var imgTest;

function covertB64() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return false;
    };

    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        console.log(reader.result);
       return reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }

}

$(document).ready(function () {

    //test button
    $("#btntest").on("click", function () {
        let x = covertB64();
        document.getElementById("demo").innerHTML = x;
        imgTest = x;
    });
});

