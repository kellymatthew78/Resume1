//Construct
var testPubSub = function (name, date) { //name is my param
    console.log(arguments.length);
    this.myName = name;
};
//Init Method (Public)
testPubSub.prototype.init = function () {
    this._sendButton = document.querySelector(".send-button");
    this._messageBox = document.querySelector(".message");
    this._bindEvents();
};
//sendEmail Method (Public)
testPubSub.prototype.sendEmail = function () {
    //Create event
    var event = new Event("build");
    // Dispatch the event.
    document.dispatchEvent(event);
};
//_bindEvents Method (Private indication due to _)
testPubSub.prototype._bindEvents = function () {
    var _thisScope = this;
    //console.log(this);
    document.addEventListener("build", function (e) { console.log(e); });
    this._messageBox.addEventListener("keyup", function (e) {
        console.log(e);
    });
    this._sendButton.addEventListener("click", function (e) {
        console.log(e);
        _thisScope.sendEmail();
    });
};
//Global instance creation
window.gtestPubSub = new testPubSub("Kyle"); //Kyle is my argument
window.gtestPubSub.init();