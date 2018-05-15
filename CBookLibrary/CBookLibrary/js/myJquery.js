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

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $("#hfb64").val(reader.result);
        console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);
}


function readImage(inputElement) {
    var deferred = $.Deferred();

    var files = inputElement.get(0).files;

    if (files && files[0]) {
        var fr = new FileReader();
        fr.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        fr.readAsDataURL(files[0]);
    } else {
        deferred.resolve(undefined);
    }

    return deferred.promise();
}

$(document).ready(function () {

    //test button
    $("#btntest").on("click", function () {
      
        document.getElementById("demo").innerHTML = $("#hfb64").val();

       
    });
});

